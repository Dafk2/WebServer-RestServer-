// modulo para encritar el password
const bcryptjs = require('bcryptjs');

const UserModel = require('../models/users_models.js')

// obtener usarios listados
const userGet = async (req, res) => {  
    const { limit = 10, desde = 0} = req.query 
    const status = { status:true }
    
    const [ counUsers, users ] = await Promise.all([  
      UserModel.countDocuments(status),
            
      UserModel.find(status) 
        .limit(Number(limit))
        .skip(Number(desde))
    ])
    
    res.json({
        counUsers,
        users
    })
}

const userPost = async (req, res) => {
    const { password, email, role, name} = req.body;
    
    // instancia del modelo
    const userModel = new UserModel({ email, password, role, name });
    
    // incritar el password
    const salt = bcryptjs.genSaltSync(10)
    
    userModel.password = bcryptjs.hashSync(password, salt) /* hashSync el hash de una sola via */
    
    res.json({
        userModel,
        msg:'new post',
    })
    
    // guardando en la DB
    await userModel.save()
}

const userPut = async (req, res) => {
    const { id } = req.params;
    
    const { _id, password, google, email, ...params } = req.body
    
    // Todo validar contra la DB. Si biene el password significa que quiere actulizarlo
    if (password) {  
        const salt = bcryptjs.genSaltSync(10)
        params.password = bcryptjs.hashSync(password, salt) 
    }                                   

    const user = await UserModel.findByIdAndUpdate(id, params) 
    
    res.json({
       user,
       id, 
       message:'actulizacion exitosa',
    })
}

const userPath = (req, res) => {
    res.json({
       msg:'new patch' 
    })
}

const userDelete = async (req, res) => {
    //No lo voy a borrar físicamente, solo voy a cambiar el estado
    const user = await UserModel.findByIdAndUpdate(id, { status:false }) 
    
    res.json(user)
}

module.exports = {
    userGet,
    userPost,
    userPath,
    userPut,
    userDelete
}
