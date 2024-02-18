import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PastOrders from "../components/PastOrders";

const Orders = ()=>{
    return (
        <>
            <Navbar />
            <PastOrders />
            <Footer />
        </>
    );
};

export default Orders;