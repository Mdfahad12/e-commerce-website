const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./user/user.model');
const Razorpay = require('razorpay');
const { validateUserSignup, validateUserLogin } = require('./user/user.validator');

router.post('/signup', async (req, res) => {
  try {
    const { error } = validateUserSignup(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) return res.status(400).json({ error: 'Email is already registered.' });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    // Validate user input
    const { error } = validateUserLogin(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    // Check if the email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ error: 'Invalid email or password.' });

    // Check if the password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'Invalid email or password.' });

    // Create and sign a JSON Web Token (JWT)
    const token = jwt.sign({ _id: user._id, email: user.email }, 'your-secret-key');
  
    res.header('auth-token', token).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const razorpay = new Razorpay({
  key_id: "rzp_test_8uh70UDOEw5eSV",
  key_secret: "ojT7xA3DHqmfWiBiS5TQiCb8",
});

router.post('/create-order', async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100, 
    currency: 'INR',
    receipt: 'order_receipt_' + Math.random().toString(36).substring(7),
    payment_capture: 1,
  };

  try {
    const response = await razorpay.orders.create(options);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// router.use(verifyToken);

// // Confirm Order Route
// router.post('/confirm-order', async (req, res) => {
//   try {
//     const decodedToken = jwt.decode(req.headers['auth-token'], { complete: true });
//     const userId = decodedToken.payload._id;

//     // Find the user based on the decoded user ID
//     const user = await User.findById(userId);
//     const { orderId, paymentId, amount } = req.body;
//     const verification = await razorpay.payments.fetch(paymentId);
//     if (verification.status === 'captured') {
//       res.status(200).json({ message: 'Order confirmed successfully.' });
//     } else {
//       res.status(400).json({ error: 'Payment verification failed.' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// })

module.exports = router;
