const Stripe = require("stripe");
const stripe = Stripe("sk_test_51R4Bs7B7L6tvwmzEQYKopllGE5Jw2VdOOui9mNYVB5cisd19m01Uf1XsOeDKcenyOirgPPMB2dGMWKNkX5jMeATH00Reuq4JWK"); // Replace with your Stripe Secret Key

// Create Payment Intent
const createPaymentIntent = async (req, res) => {
    try {
        const { order_id, amount } = req.body;

        // Create a PaymentIntent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Convert to cents
            currency: "usd",
            metadata: { order_id },
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createPaymentIntent };
