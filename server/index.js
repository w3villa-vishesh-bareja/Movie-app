import express from 'express'
import connectDB from './config/db.js';
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth2'; 
import session from 'express-session';
import userSchema from './model/userSchema.js';
import jwt from 'jsonwebtoken'
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true, 
  }));
dotenv.config()

connectDB(); // confirm

const port = 5000;

app.use(session({
    secret:process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(new GoogleStrategy({
    clientID:process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    callbackURL:process.env.CALLBACK_URL
}, async (token , tokenSecret , profile , done) =>{
    try{
        let user = await userSchema.findOne({email: profile.emails[0].value});

        if(!user){
            user = await userSchema({
                name:profile.displayName,
                email:profile.emails[0].value,
                password : 'random'
            });
            await user.save();
            const token = jwt.sign({
                id: user._id,        
                name: user.name,
                email: user.email
              }, process.env.JWT_SECRET, { expiresIn: '1d' }); 
        }
        return done(null , {user,token});

    }catch(error){
        console.log('Error in google login:' , error);
        return done(error , null)
    }
}
)) 

passport.serializeUser(({user}, done) => {
    console.log('Serializing user:', user); 
    done(null, user._id); 
});

passport.deserializeUser(async (_id, done) => {
    console.log('Deserializing user with _id:', _id);  
    try {
        const user = await userSchema.findById(_id);
        if (!user) {
            console.error('User not found with _id:', _id);  
            return done(new Error('User not found'), null);
        }
        console.log('Deserialized user:', user);  
        done(null, user);  
    } catch (err) {
        console.error('Error in deserialization:', err);  
        done(err, null);
    }
});


app.use('/',userRoutes);


app.listen(port , ()=>{
    console.log(`server running on port ${port}`)
})