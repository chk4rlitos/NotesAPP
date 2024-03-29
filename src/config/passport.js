const passport = require('passport');
const User= require('../models/User');
const LocalStrategy = require('passport-local').Strategy;




passport.use(new LocalStrategy({
    usernameField:'email',
    passwordField:'password'
}, async (email,password,done) => {

    // MAtch exists Eamils USers
    const user = await User.findOne({email});

    if(!user){
        return done(null,false,{message:"Not User Found"});
    }else{
        //Match Password's User
        const match = await user.MatchPassword(password);
        if(match){
            return done(null,user);
        }else{
            return done(null,false,{message:"Incorrect Passowrd"});
        }

    }
}));

passport.serializeUser((user,done) =>{
    done(null,user.id)
});

passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        done(err,user);
    })
});