import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EquipmentList from './components/equipmentList/EquipmentList';
import EquipmentDetail from './components/equipmentDetail/EquipmentDetail';
import Header from './components/commons/header';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<EquipmentList />} />
        <Route path="/equipment/:equipmentKey" element={<EquipmentDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
