import React, { useEffect, useState } from 'react';
import { fetchEquipments } from '../../services/equipmentService';
import EquipmentListItem from './equipmentListItem';
import { Equipment } from '../../models/equipment';
import SearchBar from '../commons/SearchBar';
import './EquipmentList.css';

const EquipmentList: React.FC = () => {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [searchTerms, setSearchTerms] = useState({
    name: '',
    domain: '',
    nbFaults: ''
  });

  useEffect(() => {
    fetchEquipments().then((data) => {
      setEquipments(data.sort((a, b) => a.name.localeCompare(b.name)));
    });
  }, []);

  const handleSearchChange = (name: string, value: string) => {
    setSearchTerms((prev) => ({
      ...prev,
      [name]: value
    }));
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
      <h1>Equipment List</h1>
      <table className="equipment-table">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Domain</th>
            <th>Number of Faults</th>
          </tr>
          <tr>
            <th></th>
            <th>
              <SearchBar
                placeholder="Search by name"
                value={searchTerms.name}
                onChange={(value) => handleSearchChange('name', value)}
              />
            </th>
            <th>
              <SearchBar
                placeholder="Search by domain"
                value={searchTerms.domain}
                onChange={(value) => handleSearchChange('domain', value)}
              />
            </th>
            <th>
              <SearchBar
                placeholder="Search by number of faults"
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
