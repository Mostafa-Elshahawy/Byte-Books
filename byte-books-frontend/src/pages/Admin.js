import React from 'react';
import AdminDashboard from '../components/AdminDashboard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Admin = ()=>{
    return (
        <>
            <Navbar />
            <AdminDashboard />
            <Footer />
        </>
    );
};

export default Admin;