import React, { useState } from 'react';
import { Tabs, Tab, Container } from '@mui/material';
import ProductView from './ProductView';
import ProductEdit from './ProductEdit';

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Container>
      <Tabs value={selectedTab} onChange={handleTabChange} centered>
        <Tab label="View Products" />
        <Tab label="Create Products" />
      </Tabs>
      {selectedTab === 1 && <ProductView />}
      {selectedTab === 0 && <ProductEdit />}
    </Container>
  );
};

export default AdminDashboard;
