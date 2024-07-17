import React from 'react';
import { Equipment } from '../../models/Equipment';
import { useNavigate } from 'react-router-dom';

interface EquipmentListItemProps {
  equipment: Equipment;
  selectedProperties: string[];
}

const EquipmentListItem: React.FC<EquipmentListItemProps> = ({ equipment, selectedProperties }) => {
  const navigate = useNavigate();

  const navigateToDetailsPage = () => {
    navigate(`/equipment/${equipment.equipmentKey}`);
  };

  return (
    <tr onClick={navigateToDetailsPage} style={{ cursor: 'pointer' }}>
      <td className="equipment-photo-cell">
        <img src={equipment.photo} alt={equipment.name} className="equipment-photo" />
      </td>
      {selectedProperties.map((property) => (
        <td key={property}>{equipment[property as keyof Equipment]}</td>
      ))}
    </tr>
  );
};

export default EquipmentListItem;
