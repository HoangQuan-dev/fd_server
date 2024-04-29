const express = require('express');
const loginUser = require('../../services/authentication/login.service');
const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const user = await loginUser(req.body.emailOrPhone, req.body.password);
        res.json(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;