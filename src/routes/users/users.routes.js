const express = require('express');
const router = express.Router();

const userService = require('../../services/users/users.service');
const User = require('../../models/users.model');

// GET: /users
router.get('/', async (req, res) => {
    const user = await userService.getAllUsers();
    res.send(user);
})

router.get('/:id', async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.send(user);
    } catch (error) {
        console.error('Error: ' + error);
        res.status(500).send('error');
    }
});

// POST: /users/add
router.post('/add', async (req, res) => {
    try {
        const user = await userService.createUser(
            req.body.name,
            req.body.email,
            req.body.password,
            req.body.phone,
            req.body.address
        );
        res.send(user.id);
    } catch (error) {
        console.error('Error: ' + error);
        res.status(500).send('error');
    }
});

// PUT: /users/"id"
router.put('/update/:id', async (req, res) => {
    try {
        const user = await userService.updateUser(
            req.params.id,
            req.body.name,
            req.body.email,
            req.body.password,
            req.body.phone,
            req.body.address
        );
        res.send(user.id);
    } catch (error) {
        console.error('Error: ' + error);
        res.status(500).send('error');
    }
});

module.exports = router;