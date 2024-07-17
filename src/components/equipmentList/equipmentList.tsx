import React, { useEffect, useState } from 'react';
import { fetchEquipments, sortEquipments } from '../../services/EquipmentService';
import EquipmentListItem from './EquipmentListItem';
import { Equipment } from '../../models/Equipment';
import SearchBar from '../commons/SearchBar';
import { saveTableSettingsToLocalStorage, getTableSettingsFromLocalStorage } from '../../utils/localStorageUtils';
import { propertyTranslations } from '../../utils/propertyTranslations';
import PropertySelector from './PropertySelector';
import './EquipmentList.css';

const EquipmentList: React.FC<{ tableKey: string }> = ({ tableKey }) => {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [settings, setSettings] = useState(() =>
    getTableSettingsFromLocalStorage(tableKey, {
      searchTerms: { name: '', domain: '', nbFaults: '' },
      sortOrder: { key: 'name', order: 'asc' }
    })
  );
  const [selectedProperties, setSelectedProperties] = useState<Array<keyof Equipment>>(['name', 'domain', 'nbFaults']);

  useEffect(() => {
    fetchEquipments().then((data) => {
      setEquipments(sortEquipments(data, settings.sortOrder.key, settings.sortOrder.order));
    });
  }, [settings.sortOrder]);

  const handleSearchChange = (name: keyof Equipment, value: string) => {
    const newSearchTerms = { ...settings.searchTerms, [name]: value };
    const newSettings = { ...settings, searchTerms: newSearchTerms };
    setSettings(newSettings);
    saveTableSettingsToLocalStorage(tableKey, newSettings);
  };

  const handleSortClick = (key: keyof Equipment) => {
    const order = settings.sortOrder.key === key && settings.sortOrder.order === 'asc' ? 'desc' : 'asc';
    const newSortOrder = { key, order };
    const newSettings = { ...settings, sortOrder: newSortOrder };
    setSettings(newSettings);
    saveTableSettingsToLocalStorage(tableKey, newSettings);
  };

  const handleSelectProperty = (selectedOptions: any) => {
    const selected = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
    setSelectedProperties(selected);

    // Initialize search terms for new properties if they don't exist
    const newSearchTerms = { ...settings.searchTerms };
    selected.forEach((property: keyof Equipment) => {
      if (!(property in newSearchTerms)) {
        newSearchTerms[property] = '';
      }
    });
    const newSettings = { ...settings, searchTerms: newSearchTerms };
    setSettings(newSettings);
    saveTableSettingsToLocalStorage(tableKey, newSettings);
  };

  const filteredEquipments = equipments.filter((equipment: Equipment) => {
    return selectedProperties.every((property: keyof Equipment) => {
      return equipment?.[property]?.toString().toLowerCase().includes(settings.searchTerms[property]?.toLowerCase() || '');
    });
  });

  return (
    <div className="equipment-list-container">
      <h1>Liste des équipements</h1>
      <PropertySelector
        selectedProperties={selectedProperties}
        onSelect={handleSelectProperty}
        equipments={equipments}
      />
      <table className="equipment-table">
        <thead>
          <tr>
            <th>Image</th>
            {selectedProperties.map((property) => (
              <th key={property} onClick={() => handleSortClick(property)} style={{ cursor: 'pointer' }}>
                {propertyTranslations[property] || property}
                <i className={`fas fa-sort-${settings.sortOrder.key === property && settings.sortOrder.order === 'asc' ? 'up' : 'down'}`}></i>
              </th>
            ))}
          </tr>
          <tr>
            <th></th>
            {selectedProperties.map((property) => (
              <th key={property}>
                <SearchBar
                  placeholder={`Rechercher par ${propertyTranslations[property] || property}`}
                  value={settings.searchTerms[property] || ''}
                  onChange={(value) => handleSearchChange(property, value)}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredEquipments.map((equipment) => (
            <EquipmentListItem key={equipment.equipmentKey} equipment={equipment} selectedProperties={selectedProperties} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EquipmentList;
