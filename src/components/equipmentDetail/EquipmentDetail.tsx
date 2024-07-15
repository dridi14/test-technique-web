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
      <h1>{equipment.name}</h1>
      <img src={equipment.photo} alt={equipment.name} className="equipment-detail-photo" />
      <div className="equipment-info">
        <h2>General Info</h2>
        <p><strong>Domain:</strong> {equipment.domain}</p>
        <p><strong>Number of Faults:</strong> {equipment.nbFaults}</p>
      </div>
      <div className="equipment-characteristics">
        <h2>Characteristics</h2>
        <p><strong>Building:</strong> {equipment.building}</p>
        <p><strong>Level:</strong> {equipment.niveau}</p>
        <p><strong>Local:</strong> {equipment.local}</p>
        <p><strong>Brand:</strong> {equipment.brand}</p>
        <p><strong>Model:</strong> {equipment.model}</p>
        <p><strong>Serial Number:</strong> {equipment.serialNumber}</p>
        <p><strong>Quantity:</strong> {equipment.quantity}</p>
        <p><strong>Status:</strong> {equipment.status}</p>
        <p><strong>Notes:</strong> {equipment.notes}</p>
      </div>
      <div className="equipment-checkpoints">
        <h2>Checkpoints</h2>
        {checkpoints.map((checkpoint, index) => (
          <div key={index} className="checkpoint-item">
            <p><strong>Checkpoint:</strong> {checkpoint.name}</p>
            {checkpoint.fault && <p><strong>Fault:</strong> {checkpoint.fault}</p>}
            {checkpoint.recommendation && <p><strong>Recommendation:</strong> {checkpoint.recommendation}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EquipmentDetail;
