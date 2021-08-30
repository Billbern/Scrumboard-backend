const express = require('express');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const bcrypt = require('bcrypt');
const route = express.Router();

const User = require('../models/user');
route.use(express.json());

route.post('/login', async (req, res) => {
    try {
        const logUser = await User.findOne({ username: req.body.username });
        if (logUser) {
            const match = await bcrypt.compare(req.body.password, logUser.password);
            if (match) {
                const token = await jwt.sign({id: logUser._id}, process.env.SECRET_KEY, { expiresIn: '8h' })
                if (token) {
                    res.cookie('ahyensew', token, {sameSite: "lax", secure: true,  domain: '' , httpOnly: true, expires: new Date(moment().add(8, 'hours'))});
                    res.status(200).json({loggedIn: true, user:{ name: logUser.username, mail: logUser.email, pic: logUser.picture }});
                }else{
                    res.status(500).json('Sorry something went wrong');
                }
            }else{
                res.status(400).json('Wrong Username or Password');
            }
        }else{
            res.status(400).json('Wrong Username or Password');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json('Sorry something went wrong');
    }
})

route.post('/register', async (req, res) => {
    try {
        const hashpass = await bcrypt.hash(req.body.password, 10);
        let newUser = new User({ username: req.body.username, email: req.body.email, password: hashpass });
        await newUser.save();
        res.status(200).send();
    } catch (err) {
        console.error(err);
        res.status(500).send({ data: "Error" })
    }
})

route.get('/logout', async (req, res)=>{
    res.clearCookie('ahyensew');
    res.status(200).json('Done');
})


module.exports = route;