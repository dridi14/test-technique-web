import React from 'react';
import { Equipment } from '../../models/Equipment';
import { useNavigate } from 'react-router-dom';

interface EquipmentListItemProps {
  equipment: Equipment;
}

const EquipmentListItem: React.FC<EquipmentListItemProps> = ({ equipment }) => {

  const navigate = useNavigate();

  const navigateToDetailsPage = () => {
    navigate(`/equipment/${equipment.equipmentKey}`);
  };

  return (
    <tr onClick={navigateToDetailsPage} style={{ cursor: 'pointer' }}>
      <td className="equipment-photo-cell">
        <img src={equipment.photo} alt={equipment.name} className="equipment-photo" />
      </td>
      <td>{equipment.name}</td>
      <td>{equipment.domain}</td>
      <td>{equipment.nbFaults}</td>
    </tr>
  );
};

export default EquipmentListItem;
