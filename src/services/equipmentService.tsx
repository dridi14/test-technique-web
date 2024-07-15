import { database } from './firebase';
import { ref, get } from 'firebase/database';
import { Equipment } from '../models/equipment';

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
  const equipment = equipments.find(e => e.equipmentKey === equipmentKey) || null;
  return equipment;
};

