import React from 'react';
import { Link } from 'react-router-dom';

import { Equipment } from '../../models/equipment';

interface EquipmentListItemProps {
  equipment: Equipment;
}

const EquipmentListItem: React.FC<EquipmentListItemProps> = ({ equipment }) => {
  return (
    <li className="equipment-item">
      <Link to={`/equipment/${equipment.equipmentKey}`}>
        <img src={equipment.photo} alt={equipment.name} className="equipment-photo" />
        <div className="equipment-info">
          <h2>{equipment.name}</h2>
          <p><strong>Domain:</strong> {equipment.domain}</p>
          <p><strong>Number of Faults:</strong> {equipment.nbFaults}</p>
        </div>
      </Link>
    </li>
  );
};

export default EquipmentListItem;
