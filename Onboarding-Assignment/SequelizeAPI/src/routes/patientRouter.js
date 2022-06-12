const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const { Op } = require("sequelize");

const patientRouter = express.Router();
patientRouter.use(bodyParser.json());

const Patient=require('../models/patientModel');

patientRouter.route('/')
.post( async (req,res) => {
    if(!req.body.name) {
        res.statusCode = 400;
        res.setHeader('Content-Type','text/plain');
        res.end('Patient details are required');
        return;
    }
    console.log('data is valid');

    try{
        const patient = await Patient.create({
            name:req.body.name,
            age:req.body.age,
            gender: req.body.gender,
            wallet:req.body.wallet
        });
        res.status(200).send(patient);
    }catch(err) {
        res.send('Error while creating the entry ');
    };
});

patientRouter.route('/:amount').get(async (req,res)=> {
    try{
        const patient = await Patient.findAll({
            where: {
                wallet : {
                [Op.gt]: req.params.amount
                }
            }
        });
        res.status(200).send(patient);
    }catch(err) {
        res.send('Error while fetching details');
    };
});

patientRouter.route('/:id').put(async (req,res) => {
    if(!req.body.name) {
        res.statusCode = 400;
        res.setHeader('Content-Type','text/plain');
        res.end('Patient details are required');
        return;
    }
    console.log('data is valid');

    try{
        const patient = await Patient.update(
            {
                name:req.body.name,
                age:req.body.age,
                gender: req.body.gender,
                wallet:req.body.wallet
            },
            {
              where: {id: req.params.id}
            }
        );
        res.status(200).send(patient);
    }catch(err) {
        res.send('Error while updating details');
    };

});

module.exports = patientRouter;