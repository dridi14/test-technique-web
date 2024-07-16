import React, { useEffect, useState } from 'react';
import { fetchEquipments, sortEquipments } from '../../services/EquipmentService';
import EquipmentListItem from './EquipmentListItem';
import { Equipment } from '../../models/Equipment';
import SearchBar from '../commons/SearchBar';
import './EquipmentList.css';

const EquipmentList: React.FC = () => {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [searchTerms, setSearchTerms] = useState({
    name: '',
    domain: '',
    nbFaults: ''
  });
  const [sortOrder, setSortOrder] = useState<{ key: keyof Equipment, order: 'asc' | 'desc' }>({
    key: 'name',
    order: 'asc'
  });

  useEffect(() => {
    fetchEquipments().then((data) => {
      setEquipments(sortEquipments(data, sortOrder.key, sortOrder.order));
    });
  }, [sortOrder]);

  const handleSearchChange = (name: string, value: string) => {
    setSearchTerms((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSortClick = (key: keyof Equipment) => {
    const order = sortOrder.key === key && sortOrder.order === 'asc' ? 'desc' : 'asc';
    setSortOrder({ key, order });
  };

  const filteredEquipments = equipments.filter((equipment) => {
    return (
      equipment.name.toLowerCase().includes(searchTerms.name.toLowerCase()) &&
      equipment.domain.toLowerCase().includes(searchTerms.domain.toLowerCase()) &&
      equipment.nbFaults.toString().includes(searchTerms.nbFaults)
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
              <i className={`fas fa-sort-${sortOrder.key === 'name' && sortOrder.order === 'asc' ? 'up' : 'down'}`}></i>
            </th>
            <th onClick={() => handleSortClick('domain')} style={{ cursor: 'pointer' }}>
              Domaine
              <i className={`fas fa-sort-${sortOrder.key === 'domain' && sortOrder.order === 'asc' ? 'up' : 'down'}`}></i>
            </th>
            <th onClick={() => handleSortClick('nbFaults')} style={{ cursor: 'pointer' }}>
              Nombre de défauts
              <i className={`fas fa-sort-${sortOrder.key === 'nbFaults' && sortOrder.order === 'asc' ? 'up' : 'down'}`}></i>
            </th>
          </tr>
          <tr>
            <th></th>
            <th>
              <SearchBar
                placeholder="Rechercher par nom"
                value={searchTerms.name}
                onChange={(value) => handleSearchChange('name', value)}
              />
            </th>
            <th>
              <SearchBar
                placeholder="Recherche par domaine"
                value={searchTerms.domain}
                onChange={(value) => handleSearchChange('domain', value)}
              />
            </th>
            <th>
              <SearchBar
                placeholder="Recherche par nombre de défauts"
                value={searchTerms.nbFaults}
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