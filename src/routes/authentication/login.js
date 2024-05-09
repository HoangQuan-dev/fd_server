const express = require('express');
const loginUser = require('../../services/authentication/login.service');
const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const user = await loginUser(req.body.emailOrPhone, req.body.password);        
    } 
    catch (error) {
        res.send('failed');
    }
});

module.exports = router;