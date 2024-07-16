import { ref, get } from 'firebase/database';
import { database } from './firebase';
import { Checkpoint } from '../models/Equipment';

/**
 * Fetches checkpoints for a specific equipment by its serial number
 * @param {string} equipmentKey - Equipment key
 * @returns {Promise<Checkpoint[]>} - Array of checkpoints
 */
export const fetchCheckpointsByEquipmentKey = async (equipmentKey: String): Promise<Checkpoint[]> => {
  const dbRef = ref(database, 'Checkpoints');
  try {
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const allCheckpoints = Object.values(snapshot.val()) as Checkpoint[];
      return allCheckpoints.filter(cp => cp.equipmentKey === equipmentKey);
    } else {
      console.log("No data available");
      return [];
    }
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};