import React, { useState } from 'react';
import { Tabs, Tab, Container } from '@material-ui/core';
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
        <Tab label="Edit Products" />
      </Tabs>
      {selectedTab === 0 && <ProductView />}
      {selectedTab === 1 && <ProductEdit />}
    </Container>
  );
};

export default AdminDashboard;
