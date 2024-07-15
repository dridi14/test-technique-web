import React, { useEffect, useState } from 'react';

import './EquipmentList.css';
import { Equipment } from '../../models/equipment';
import { fetchEquipments, getFilteredEquipments } from '../../services/equipmentService';
import EquipmentListItem from './equipmentListItem';
import SearchBar from '../commons/search-bar';

const EquipmentList: React.FC = () => {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchEquipments().then((data) => {
      setEquipments(data.sort((a, b) => a.name.localeCompare(b.name)));
    });
  }, []);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setEquipments(getFilteredEquipments(term).sort((a, b) => a.name.localeCompare(b.name)));
  };

  return (
    <div className="equipment-list-container">
      <h1>Equipment List</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={handleSearchChange} />
      <ul className="equipment-list">
        {equipments.map((equipment) => (
          <EquipmentListItem key={equipment.equipmentKey} equipment={equipment} />
        ))}
      </ul>
    </div>
  );
};

export default EquipmentList;
