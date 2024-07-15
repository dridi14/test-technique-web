import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchEquipmentByKey } from '../../services/equipmentService';
import { fetchCheckpointsByEquipmentKey } from '../../services/checkpointService';
import { Equipment, Checkpoint } from '../../models/equipment';

import './EquipmentDetail.css';

const EquipmentDetail: React.FC = () => {
  const { equipmentKey } = useParams<{ equipmentKey: string }>();
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);

  useEffect(() => {
    if (equipmentKey) {
      fetchEquipmentByKey(equipmentKey).then((data) => {
        setEquipment(data);
      });
      fetchCheckpointsByEquipmentKey(equipmentKey).then((data) => {
        setCheckpoints(data);
      });
    }
  }, [equipmentKey]);

  if (!equipment) {
    return <div>Loading...</div>;
  }

  return (
    <div className="equipment-detail-container">
      <div className="equipment-detail-header">
        <img src={equipment.photo} alt={equipment.name} className="equipment-detail-photo" />
        <div className="equipment-info">
          <h1>{equipment.name}</h1>
          <p><strong>Domaine:</strong> {equipment.domain}</p>
          <p><strong>Nombre de défauts:</strong> {equipment.nbFaults}</p>
        </div>
      </div>
      <div className="equipment-details-main">
        <div className="equipment-characteristics">
          <h2 style={{ width: '100%' }}>Caractéristiques</h2>
          <p><strong>Bâtiment :</strong> {equipment.building}</p>
          <p><strong>Niveau :</strong> {equipment.niveau}</p>
          <p><strong>Local :</strong> {equipment.local}</p>
          <p><strong>Marque :</strong> {equipment.brand}</p>
          <p><strong>Modèle :</strong> {equipment.model}</p>
          <p><strong>Numéro de série :</strong> {equipment.serialNumber}</p>
          <p><strong>Quantité :</strong> {equipment.quantity}</p>
          <p><strong>Statut :</strong> {equipment.status}</p>
          <p><strong>Notes :</strong> {equipment.notes}</p>
        </div>
        <div className="equipment-checkpoints">
          <h2>Points de contrôle</h2>
          {checkpoints.map((checkpoint, index) => (
            <div key={index} className="checkpoint-item">
              <p><strong>Points de contrôle: </strong> {checkpoint.name}</p>
              {checkpoint.fault && <p><strong>Défaut:</strong> {checkpoint.fault}</p>}
              {checkpoint.recommendation && <p><strong>Recommandation:</strong> {checkpoint.recommendation}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EquipmentDetail;
