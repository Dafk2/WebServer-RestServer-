const Role = require('../models/role.js')
const UserModel = require('../models/users_models.js')

const rolValidator = async (role = '') => { 
    const Isrole = await Role.findOne({ role }) 
    if (!Isrole) {
       throw new Error(`El rol (${role}) no esta registrado en la DB`)
    }
}

const emailValidator = async (email = '') => {
    const userEmail = await UserModel.findOne({ email })
    if (userEmail) {
       throw new Error(`El email (${email}) ya esta registrado`)
    };
}

const idValidator = async (id) => {
    const isId = await UserModel.findById(id) 
    if (!isId) {
       throw new Error(`El id (${id}) no se encuentra en la DB`)
    };
}

module.exports = {
    rolValidator,
    emailValidator,
    idValidator,
}
