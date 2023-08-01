const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const {getOne, getByEmail, create} = require('../db/user');

router.get('/', (req, res)=> {
    res.json({
        message: '👍'
    })
});

router.post('/signup', async (req, res, next)=> {
    try{
        if(validateUser(req.body)){
                const user = await getByEmail(req.body.email);
                // Checking email is unique
                if(user.length === 0){
                    // TODO: create password and insert into DB
                    const passwordHash = await bcrypt.hash(req.body.password, 10);
                    const user = {
                        email: req.body.email,
                        password: passwordHash
                    };
                    const id = await create(user);
                    res.json({
                        id,
                        message: '👍'
                    })
                }else{
                    throw new Error('email is use 🙏')
                }
        }else{
            throw new Error('Invalid User ⛔');
        }
    }catch(e){
        next(e)
    }
});

router.post('/login', async (req, res, next)=> {
    console.log(req.body)
    try{
        if(validateUser(req.body)){
                const users = await getByEmail(req.body.email);
                if(users.length > 0){
                    const isSame = await bcrypt.compare(req.body.password, users[0].password);
                    console.log(isSame)
                    if(isSame){
                        setUserIdCookie(req, res, users[0].id);
                        res.json({
                            message: '🔓',
                            id: users[0].id
                        })
                    }else{
                        throw new Error('Paswword mismatch')
                    }
                }else{
                    throw new Error('User not present')
                }
        }else{
            throw new Error('Invalid login')
        }
    }catch(e){
        next(e);
    }
});

router.get('/logout', (req, res)=> {
    res.clearCookie('user_id');
    res.json({
        message: 'Logged out'
    })
})

// Validate required fields
function validateUser(user) {
    const validEmail = typeof user.email == 'string' && user.email.trim() !== '';
    const validPassword = typeof user.password == 'string' &&
                            user.password.trim() !== '' &&
                            user.password.trim().length >= 5;
    return validEmail && validPassword;

};

function setUserIdCookie(req, res, id) {
    const isSecure = req.app.get('env') !== 'development';
    res.cookie('user_id', id, {
        httpOnly: true,
        secure: isSecure,
        signed: true
    })
}

module.exports = router;