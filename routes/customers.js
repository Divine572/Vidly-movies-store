const { Customer, validate } = require('../models/customers');
const express = require('express');
const router = express.Router();




router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');  
    res.send(customers);
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.body.id);

    if (!customer) res.status(404).send('Invalid CustomerID');

    res.send(customer);
});


router.post('/', async (req, res) => {
    const {  error } = validate(req.body);
    if (error) res.status(400).send(error.details[0].message);

    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
    customer = await customer.save();

    res.send(customer);
});


router.put('/:id', async (req, res) => {
    const {  error } = validate(req.body);
    if (error) res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id,
        {
            name: req.params.name, 
            phone: req.body.phone,
            isGold: req.body.isGold
    }, { new: true });

    if (!customer) res.status(404).send('Invalid CustomerID');

    res.send(customer);

});


router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) res.status(404).send('Invalid CustomerID');

    res.send(customer);
});


module.exports = router;