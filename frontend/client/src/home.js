import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  const [apiKey, setApiKey] = useState("rzp_test_PRFQGDZLdDOuYM");
  const [subscriptionPlans, setSubscriptionPlans] = useState([])

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await axios.post("http://localhost:5000/payment/orders");
    console.log("res", result)
    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { amount, id, currency } = result.data;
    console.log("amount, id: order_id, currency", result.data)
    const options = {
      key: "rzp_test_PRFQGDZLdDOuYM", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "Soumya Corp.",
      description: "Test Transaction",
      image: { logo },
      order_id: id,
      handler: async function (response) {
        const data = {
          orderCreationId: id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await axios.post("http://localhost:5000/payment/success", data);

        alert(result.data.msg);
      },
      prefill: {
        name: "Soumya Dey",
        email: "SoumyaDey@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "champhunt",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  const getAllSubscriptions = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/subscription/fetchSubscriptionPlans'
      );
      if (!response) {
        console.log("error")
        return
      }
      setSubscriptionPlans(response.data.items)
    } catch (error) {
      console.error(error.response.data);
    }
  };
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
      getAllSubscriptions()
    } catch (error) {
      console.error(error.response.data);
    }
  }
  useEffect(() => {
    getAllSubscriptions();
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button style={{ background: "green", color: "white" }}><div onClick={createPlans}>
          CREATE SUBSCRIPTION PLANS
        </div></button>
        <div>
          <p>Subscription plans</p>
          {subscriptionPlans.map((key, index) => (
            < div style={{ color: "white", background: "purple" }} key={index} >
              <ul><li>{key.item.name}</li><li>{key.item.description}</li>
                <li>{key.item.amount / 100}</li></ul>


            </div>
          ))
          }
        </div>

        <p>Buy Subscription now!</p>

        <button className="App-link" onClick={displayRazorpay}>
          Pay ₹500
        </button>
      </header >
    </div >
  );
}

export default App;