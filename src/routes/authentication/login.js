const express = require('express');
const loginUser = require('../../services/authentication/login.service');
const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        console.log(req.body.emailOrPhone);
        const user = await loginUser(req.body.emailOrPhone, req.body.password);
        res.send(user);  
    } 
    catch (error) {
        res.send('failed');
    }
});

module.exports = router;