const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Simulated Stripe payment intent
router.post('/create-payment-intent', auth, async (req, res) => {
  try {
    const { amount } = req.body;

    // Simulate Stripe payment intent creation
    const paymentIntent = {
      id: 'pi_' + Math.random().toString(36).substr(2, 9),
      client_secret: 'pi_secret_' + Math.random().toString(36).substr(2, 9),
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      status: 'requires_payment_method'
    };

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ message: 'Payment failed', error: error.message });
  }
});

// Confirm payment
router.post('/confirm-payment', auth, async (req, res) => {
  try {
    const { paymentIntentId } = req.body;

    // Simulate payment confirmation
    setTimeout(() => {
      res.json({ 
        success: true, 
        paymentIntent: {
          id: paymentIntentId,
          status: 'succeeded'
        }
      });
    }, 2000);
  } catch (error) {
    res.status(500).json({ message: 'Payment confirmation failed', error: error.message });
  }
});

module.exports = router;
