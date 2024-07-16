import React, { useEffect, useState } from 'react';
import { fetchEquipments, sortEquipments } from '../../services/EquipmentService';
import EquipmentListItem from './EquipmentListItem';
import { Equipment } from '../../models/Equipment';
import SearchBar from '../commons/SearchBar';
import { saveTableSettingsToLocalStorage, getTableSettingsFromLocalStorage } from '../../utils/localStorageUtils';
import './EquipmentList.css';

const EquipmentList: React.FC<{ tableKey: string }> = ({ tableKey }) => {
  const [equipments, setEquipments] = useState<Equipment[]>([]);

  const [settings, setSettings] = useState(() =>
    getTableSettingsFromLocalStorage(tableKey, {
      searchTerms: { name: '', domain: '', nbFaults: '' },
      sortOrder: { key: 'name', order: 'asc' }
    })
  );

  useEffect(() => {
    fetchEquipments().then((data) => {
      setEquipments(sortEquipments(data, settings.sortOrder.key, settings.sortOrder.order));
    });
  }, [settings.sortOrder]);

  const handleSearchChange = (name: string, value: string) => {
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

  const filteredEquipments = equipments.filter((equipment) => {
    return (
      equipment.name.toLowerCase().includes(settings.searchTerms.name.toLowerCase()) &&
      equipment.domain.toLowerCase().includes(settings.searchTerms.domain.toLowerCase()) &&
      equipment.nbFaults.toString().includes(settings.searchTerms.nbFaults)
    );
  });

  return (
    <div className="equipment-list-container">
      <h1>Liste d'équipement</h1>
      <table className="equipment-table">
        <thead>
          <tr>
            <th>Image</th>
            <th onClick={() => handleSortClick('name')} style={{ cursor: 'pointer' }}>
              Nom
              <i className={`fas fa-sort-${settings.sortOrder.key === 'name' && settings.sortOrder.order === 'asc' ? 'up' : 'down'}`}></i>
            </th>
            <th onClick={() => handleSortClick('domain')} style={{ cursor: 'pointer' }}>
              Domaine
              <i className={`fas fa-sort-${settings.sortOrder.key === 'domain' && settings.sortOrder.order === 'asc' ? 'up' : 'down'}`}></i>
            </th>
            <th onClick={() => handleSortClick('nbFaults')} style={{ cursor: 'pointer' }}>
              Nombre de défauts
              <i className={`fas fa-sort-${settings.sortOrder.key === 'nbFaults' && settings.sortOrder.order === 'asc' ? 'up' : 'down'}`}></i>
            </th>
          </tr>
          <tr>
            <th></th>
            <th>
              <SearchBar
                placeholder="Rechercher par nom"
                value={settings.searchTerms.name}
                onChange={(value) => handleSearchChange('name', value)}
              />
            </th>
            <th>
              <SearchBar
                placeholder="Recherche par domaine"
                value={settings.searchTerms.domain}
                onChange={(value) => handleSearchChange('domain', value)}
              />
            </th>
            <th>
              <SearchBar
                placeholder="Recherche par nombre de défauts"
                value={settings.searchTerms.nbFaults}
                onChange={(value) => handleSearchChange('nbFaults', value)}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredEquipments.map((equipment) => (
            <EquipmentListItem key={equipment.equipmentKey} equipment={equipment} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EquipmentList;
