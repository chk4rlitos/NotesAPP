const {Schema, model} = require('mongoose');
const bycrypt = require('bcryptjs');

const UserSchema =  new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
}, {
    timestamps:true
})

UserSchema.methods.encrypPassword = async passowrd => {
    const salt = await bycrypt.genSalt(10);
    return await bycrypt.hash(passowrd, salt);
};

UserSchema.methods.MatchPassword = async function(password){
    return await bycrypt.compare(password, this.password)
}

module.exports=model('User',UserSchema);