/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const bcrypt = require('bcryptjs');
const express = require('express');
const User = require('../models/User');
const { log } = require('../log');
const validate = require('jsonschema').validate;
const { getConnection } = require('../db');

const router = express.Router();

/**
 * Route for getting all users
 */
router.get('/', async (req, res) => {
	const conn = getConnection();
	try {
		const rows = await User.getAll(conn);
		res.json(rows);
	} catch (err) {
		log.error(`Error while performing GET all users query: ${err}`, err);
	}
});

/**
 * Route for getting a specific user by ID
 * @param user_id
 */
router.get('/:user_id', async (req, res) => {
	const validParams = {
		type: 'object',
		maxProperties: 1,
		required: ['user_id'],
		properties: {
			user_id: {
				type: 'string',
				pattern: '^\\d+$'
			}
		}
	};
	if (!validate(req.params, validParams).valid) {
		res.sendStatus(400);
	} else {
		const conn = getConnection();
		try {
			const rows = await User.getByID(req.params.user_id, conn);
			res.json(rows);
		} catch (err) {
			log.error(`Error while performing GET specific user by id query: ${err}`, err);
			res.sendStatus(500);
		}
	}
});

router.post('/', async (req, res) => {
	const validParams = {
		type: 'object',
		maxProperties: 1,
		required: ['email', 'password', 'role'],
		properties: {
			email: {
				type: 'string',
				pattern: '^\\d+$'
			},
			password: {
				type: 'string',
				pattern: '^\\d+$'
			},
			role: {
				type: 'string',
				enum: Object.keys(User.role)
			}
		}
	};
	if (!validate(req.body, validParams)) {
		res.status(400).json({ message: 'Invalid params' });
	} else {
		try {
			const conn = getConnection();
			const { email, password, role } = req.body;
			const hashedPassword = bcrypt.hash(password)
			const userRole = User.role[role];
			const user = new User(undefined, email, hashedPassword, userRole);
			user.insert(conn);
		} catch (error) {
			log.error(`Error while performing POST request to create user: ${error}`, error);
			res.status(500).json({ message: 'Internal Server Error', error: error });
		}
	}
});

module.exports = router;

