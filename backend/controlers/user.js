// npm install --save bcrypt 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then((hash)=> {
        const user = new User({
            email:req.body.email,
            password: hash
        });
        user.save()
            .then(()=>{
                res.status(201).json(
                    { message: 'User added successfully'}
                );
            })
            .catch((error)=>{
            res.status(500).json(
                { error:error }
                );
                // return;
            });
    });
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email}).then(
        (user) => {
            if (!user){
                res.status(401).json({
                    error: new Error('User nor found!')
                });
                return;}
            bcrypt.compare(req.body.password, user.password).then(
                (valid) => {
                    if (!valid){
                        res.status(401).json({
                            error: new Error('Incorrect password!')
                        });
                        return;
                    }
                    const token = jwt.sign(
                        {userId: user._id},
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h'});
                    res.status(200).json({
                        userId: user._id,
                        token
                    });
                }
                ).catch(
                (error)=>{
                    console.error("an error when comparing pwd ", error);
                    res.status(500).json({ error });
                });
        })
        .catch(
        (error)=> {
            console.error("An error from finding a user? ", error);
            res.status(500).json({ error });
        });
};