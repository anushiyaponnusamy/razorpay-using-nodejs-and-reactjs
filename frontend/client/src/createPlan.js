import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {

    const [apiKey, setApiKey] = useState("rzp_test_PRFQGDZLdDOuYM");

    const navigate = useNavigate();

    const createPlans = () => {
        try {
            const data = {
                // Include your parameters here
                period: 'monthly',
                interval: 3,
                itemName: 'Gold Plan',
                amount: 80000,
                currency: 'INR',
            };
            const response = axios.post(
                'http://localhost:5000/subscription/createSubscriptionPlans', data
            );
            if (!response) {
                console.log("error")
                return
            }
            navigate('/home')
        } catch (error) {
            console.error(error.response.data);
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <button style={{ background: "green", color: "white" }}><div onClick={createPlans}>
                    CREATE SUBSCRIPTION PLANS
                </div></button>



            </header >
        </div >
    );
}

export default App;