const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route  Post api/auth
// @desc   Register user
// @access Public

router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
	// res.send("Auth route");
});

// @route  Post api/auth
// @desc   Authenticate user and get token
// @access Public
router.post(
	'/',
	[
		check('email', 'Please include a valid email').isEmail(),
		check('password', 'Password is required').exists(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { email, password } = req.body;
		try {
			//See is user exists or not
			let user = await User.findOne({ email });

			if (!user) {
				res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
			}

			//Compare password
			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
			}

			//Return jwt token

			const payload = {
				user: {
					id: user.id,
				},
			};
			jwt.sign(
				payload,
				config.get('jwtsecret'),
				{ expiresIn: 360000 },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
			// res.send("User registered");
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

module.exports = router;
