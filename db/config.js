// coneccion a la base de datos
const mongoose = require('mongoose')

const connectionDb = async () => {
   
   try {  
     await mongoose.connect(process.env.MONGODB_CNN, {
       useNewUrlParser: true,
       useUnifiedTopology: true,
       useCreateIndex: true,
       useFindAndModify: false
     }) 
   
     console.log('successful connection to the database')
   } 
   
   catch (error) {
      console.log(error)
      throw new Error('database connection error') 
   }
}

module.exports = {
    connectionDb,
}