const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const app = express();

app.use(bodyParser.json());
app.use(cors());

const db = [
    {
        id:"auto-generated",
        name:"Ben",
        email:"ben@gmail.com",
        phone:"07023457444",
        password:"ben12"
    }
]
 
app.post('/register', function (req, res) {
    const {name, email, phone, password} = req.body;
    const newUser = {
        id:'auto-generated',
        name: name,
        email: email,
        phone: phone,
        password: password
    }
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) {
                //throw err;
                res.json(
                    {
                        success: false,
                        message: 'Registration was not successful',
                    }
                );
            } else{
                // Set the hashed password and save the model
                newUser.password = hash;
                db.push(newUser);
                res.json(
                    {
                        success: true,
                        message: 'Registration was successful',
                        user:{
                            name:name,
                            email:email,
                            phone:phone
                        }
                    }
                );
            }
        })
     })
});

app.post('/login', function (req, res) {

    bcrypt.compare(placeRequestPasswordHere , db[1].password, function(err, result) {
        // result == true
        if(result === true){
            //allow login
        }
    });
});

/**
 * i saw somewhere that this is what i will use to compare request password and database hashed password
 * when user wants to login
 * // Pass saved encrypted password as second parameter
    bcrypt.compare(PlaintextPassword, user.password, function(err, res) {
        // res == true
    });
 */
 
app.listen(3001, () => {
    console.log("App is running")
});