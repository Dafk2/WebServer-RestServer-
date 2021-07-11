const { Router } = require('express');
const { check } = require('express-validator')

const { userGet, userPost, userPath, userDelete, userPut, } = require('../controllers/user_controllers');

// middleware de validacion del rol
const { validation } = require('../middlewares/validation');

// middleware de validacion
const { rolValidator, emailValidator, idValidator } = require('../helpers/db-validators');

const router = Router()

router.get('/', userGet)
  
router.post('/', [
   check('email', 'El correo debe ser valido').isEmail(), 
   check('email').custom(emailValidator),
   check('name', 'El nombre es obligatorio').not().isEmpty(), 
   check('password', 'La contraseña de ser mayor a 6 letras').isLength({min: 6}),
   check('role').custom(rolValidator),
   validation, 
], 
userPost)

router.put('/:id', [
   check('id', 'No es un ID válido').isMongoId(),
   check('id').custom(idValidator), 
   check('role').custom(rolValidator),
   validation,
], 
userPut);
 
router.patch('/', userPath)
  
router.delete('/:id', [
   check('id', 'No es un ID válido').isMongoId(), 
   check('id').custom(idValidator),
   validation,
], 
userDelete)

module.exports = router
