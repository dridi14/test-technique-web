import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import EquipmentList from './components/equipmentList/equipmentList';
import EquipmentDetail from './components/equipmentDetail/EquipmentDetail';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EquipmentList />} />
        <Route path="/equipment/:equipmentKey" element={<EquipmentDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
