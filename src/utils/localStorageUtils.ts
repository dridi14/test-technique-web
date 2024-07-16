/**
 * Save a value to local storage
 * @param tableKey The key of the table
 * @param settings The settings to save
 */
export const saveTableSettingsToLocalStorage = (tableKey: string, settings: any) => {
    localStorage.setItem(tableKey, JSON.stringify(settings));
};

/**
 * Get a value from local storage
 * @param tableKey The key of the table
 * @param defaultValue The default value if no value is found
 */
export const getTableSettingsFromLocalStorage = (tableKey: string, defaultValue: any) => {
    const savedValue = localStorage.getItem(tableKey);
    return savedValue ? JSON.parse(savedValue) : defaultValue;
};