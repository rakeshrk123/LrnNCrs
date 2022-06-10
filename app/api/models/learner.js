const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const LearnerSchema = new mongoose.Schema({
    learner_name :{
        type:String,
        required:true
    },
    learner_email :{
        type:String,
        required:true
    },
    learner_password :{
        type:String,
        required:true
    }
})

LearnerSchema.pre('save', function (next){
    const saltRounds = 10
    this.password = bcrypt.hashSync(this.password, saltRounds)
    next()
})

module.exports = mongoose.model("learner",LearnerSchema)
