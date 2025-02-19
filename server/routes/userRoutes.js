import express from 'express'
import { registerUser,loginUser } from '../controllers/userController.js';
// import userSchema from '../model/userSchema'
import passport from 'passport';

const router = express.Router()

router.post('/register' , registerUser);
router.post('/login' , loginUser);

router.get('/auth/google' , passport.authenticate('google', {
    scope:['profile' , 'email']
    
}));

router.get('/auth/google/callback' , 
    passport.authenticate('google' , {failureRedirect: '/login'}),
    (req,res)=>{
        const {token , user} = req.user;
        res.redirect(`http://localhost:5173/?token=${token}`);
    }
)
export default router;