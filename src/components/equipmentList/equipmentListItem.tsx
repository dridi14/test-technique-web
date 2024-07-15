import React from 'react';
import { Link } from 'react-router-dom';
import { Equipment } from '../../models/equipment';

interface EquipmentListItemProps {
  equipment: Equipment;
}

const EquipmentListItem: React.FC<EquipmentListItemProps> = ({ equipment }) => {
  return (
    <tr>
      <td className="equipment-photo-cell">
        <Link to={`/equipment/${equipment.equipmentKey}`}>
          <img src={equipment.photo} alt={equipment.name} className="equipment-photo" />
        </Link>
      </td>
      <td>{equipment.name}</td>
      <td>{equipment.domain}</td>
      <td>{equipment.nbFaults}</td>
    </tr>
  );
};

export default EquipmentListItem;
