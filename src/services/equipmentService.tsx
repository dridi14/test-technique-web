import { database } from './firebase';
import { ref, get } from 'firebase/database';
import { Equipment } from '../models/Equipment';

let equipments: Equipment[] = [];

/**
 * Fetches all equipments from the database and stores them locally.
 * @returns {Promise<Equipment[]>} - Array of equipments
 */
export const fetchEquipments = async (): Promise<Equipment[]> => {
  const dbRef = ref(database, 'Equipments');
  try {
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      equipments = Object.values(snapshot.val()) as Equipment[];
      // assign the key for easier equipment identification
      equipments.map((equipment: Equipment) => {
        // get it from the image URL sited between %2F and %2F
        const photo = equipment.photo;
        const start = photo.indexOf('%2F') + 3;
        const end = photo.indexOf('%2F', start);
        const key = photo.substring(start, end);
        equipment.equipmentKey = key;
        return equipment;
      });
      return equipments;
    } else {
      console.log("No data available");
      return [];
    }
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};

/**
 * Filters the stored equipments based on search criteria.
 * @param {string} searchTerm - The term to filter equipments by name or domain.
 * @returns {Equipment[]} - Array of filtered equipments
 */
export const getFilteredEquipments = (searchTerm: string): Equipment[] => {
  const term = searchTerm.toLowerCase();
  return equipments.filter(
    (equipment) =>
      equipment.name.toLowerCase().includes(term) ||
      equipment.domain.toLowerCase().includes(term)
  );
};

/**
 * Fetches an equipment by its equipmentKey
 * @param {string} equipmentKey - Equipment key
 * @returns {Promise<Equipment | null>} - Equipment object or null if not found
 */
export const fetchEquipmentByKey = async (equipmentKey: string): Promise<Equipment | null> => {
  if (equipments.length === 0) {
    await fetchEquipments()
  }
  const equipment = equipments.find(e => e.equipmentKey === equipmentKey) || null;
  return equipment;
};

/**
 * Filters equipments by a specific property.
 * @param {string} searchWord - The search term.
 * @param {keyof Equipment} property - The property to search in.
 * @returns {Equipment[]} - Array of filtered equipments
 */
export const filterEquipmentsByProperty = (searchWord: string, property: keyof Equipment): Equipment[] => {
  const term = searchWord.toLowerCase();
  return equipments.filter(
    (equipment) => {
      const prop = equipment[property];
      if (typeof prop === 'string') {
        return prop.toLowerCase().includes(term);
      } else if (typeof prop === 'number') {
        return prop.toString().includes(term);
      }
      return false;
    }
  );
};

/**
 * Sorts equipments by a specific property.
 * @param {Equipment[]} equipments - Array of equipments to sort.
 * @param {keyof Equipment} key - The property to sort by.
 * @param {'asc' | 'desc'} order - The sorting order.
 * @returns {Equipment[]} - Array of sorted equipments
 */
export const sortEquipments = (
  equipmentList: Equipment[],
  key: keyof Equipment,
  order: 'asc' | 'desc'
): Equipment[] => {
  return [...equipmentList].sort((a, b) => {
    if (typeof a[key] === 'string' && typeof b[key] === 'string') {
      return order === 'asc' ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key]);
    } else if (typeof a[key] === 'number' && typeof b[key] === 'number') {
      return order === 'asc' ? a[key] - b[key] : b[key] - a[key];
    }
    return 0;
  });
};