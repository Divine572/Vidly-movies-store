const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User, validate } = require('../models/users');
const express = require('express');
const router = express.Router();



router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(404).send('User already registered.');

    
    user = new User(_.pick(req.body), ['name', 'password', 'email']);
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    res.send(_.pick(user, ['_id', 'name', 'email']));


    // user = new User({ 
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // });

    // await user.save();
    // res.send({
    //     name: user.name,
    //     email: user.email
    // });
});

module.exports = router;