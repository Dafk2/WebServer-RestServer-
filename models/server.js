const express = require('express')
const cors = require('cors'); 
const { connectionDb } = require('../db/config.js');

class Server {
   constructor () {
     this.app = express();
     this.port = process.env.PORT
     this.userPath = '/api/users' 
     this.middlewares();
     this.routes();
      
     this.dbConnection(); 
   }

   async dbConnection () {
     await connectionDb()
   }
   
   middlewares () {
     // cors  
     this.app.use(cors())
     
     this.app.use(express.json())

     // public
     this.app.use(express.static('public'))
   }

   routes () {
     this.app.use(this.userPath, require('../routes/user_routes.js'))
   }

   listen () {
     this.app.listen(this.port, () => {
       console.clear()
       console.log(`server on port ${this.port}`)
     })    
   }

}

module.exports = Server
