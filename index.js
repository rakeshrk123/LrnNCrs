const express = require('express') 

const logger = require('morgan')

const bodyParser = require('body-parser')

const mongoose = require('mongoose')

const jwt = require('jsonwebtoken')

const app = express()


app.use(logger('dev'))

app.use(bodyParser.json())


app.listen(5000,() => {
    console.log("Successfully Running on the PORT: 5000")
})


app.get('/', (req,res) => {
    console.log("Hello");
})


//const mongoURI = "mongodb+srv://arjunuvlad:arjun123@hitman24.ct1jy.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongoURI) 
.then(() => { 
    console.log("Successfully Connected to the Database")
})
.catch((err) => {
    console.log(err)
})

//app.set('secretKey','hdjsakfhdjskgfsdfgsdf')


const userValidation = (req, res,next) => { 
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), 
    (err,decoded) =>{
        if(err){
            res.json({
                message: err 
            })
        }
        next() 
    }) 
}

// // Imported Routes of User and Movie
// const userRoute = require('./app/api/routes/users')
// const movieRoute = require('./app/api/routes/movies')


// Express to use user Route with a default URL => /user
app.use('/user',userRoute)
// Express to use user Route with a default URL => /movie
app.use('/movie',userValidation, movieRoute)

