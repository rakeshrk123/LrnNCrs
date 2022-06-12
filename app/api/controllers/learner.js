const learnerModel=require('../models/learner')

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const create = (req,res,next) => {
    const {learner_name, learner_email,learner_password} = req.body
    learnerModel.create({
        learner_name, 
        learner_email,
        learner_password
    }, (err,result) => {
        console.log("Not found")
        if(err)
            next(err) 
        else 
            res.status(200).json({
                status: "Success",
                message: "User Added Successfully",
                data: result
            })
    })
}



const login = (req,res,next) => {

    learnerModel.findOne({learner_email:req.body.learner_email}, (err,result) => {
    if(err){
        next(err)
    }
    else{
       
        if(bcrypt.compare(req.body.learner_password, result.learner_password)){
            
            const token = jwt.sign({id:result._id},req.app.get('secretKey'), {expiresIn:'10h'})

            res.json({
                status:"Success",
                message:"Successfully Logged in",
                data: {
                    learner: result,
                    token: token
                }
            })
        }
    }
})
}

module.exports = {create, login}

