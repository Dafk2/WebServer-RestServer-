const { model, Schema } = require('mongoose')

const userSchema = Schema({  
   name:{
       type:String,
       required:[true, 'the name is required'] 
   },

   email:{
       type:String,
       required:[true, 'the email is required'],
       unique:true, 
   },
   
   password:{
       type:String,
       required:[true, 'the password is required'],
   },
   
   img:{  
       type:String
   },
   
   role:{ 
       type:String,
       required:[true, 'The role is required'],
       emun:['ADMIN_ROLE', 'USER_ROLE'] 
   },

   status:{ 
       type:Boolean,
       default:true 
   },
   
   google:{ 
       type:Boolean,
       default:false 
   }
})

userSchema.methods.toJSON = function () {  
  const { password, __v, ...params } = this.toObject() 

  return params
} 

module.exports = model('User', userSchema) 
