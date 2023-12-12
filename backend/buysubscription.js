

const express = require('express');
const axios = require("axios");

const Razorpay = require("razorpay");

const router = express.Router();

router.get("/fetchSubscriptionPlans", async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });
        const asn = await instance.plans.all();
        res.json(asn)
    } catch (error) {
        res.status(500).send(error);
    }
});
router.post("/createSubscriptionPlans", async (req, res) => {
    try {
        const { period, interval, itemName, amount, currency } = req.body;
        const planData = {
            period,
            interval,
            item: {
                name: itemName,
                amount,
                currency,
            },
        };
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });
        const asn = await instance.plans.create(planData);
        res.json(asn)
    } catch (error) {
        res.status(500).send(error);
    }
});
module.exports = router