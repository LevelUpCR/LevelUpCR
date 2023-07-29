const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { Role } = require("@prisma/client");
const jwt = require("jsonwebtoken");
//--npm install bcrypt
const bcrypt = require("bcrypt");

//Obtener listado
module.exports.get = async (request, response, next) => {
    const usuarios = await prisma.usuarios.findMany({
        orderBy: {
            nombre: 'asc'
        }
    });
    response.json(usuarios);
};
//Obtener por Id
module.exports.getById = async (request, response, next) => {
    let id = parseInt(request.params.id);
    const usuario = await prisma.usuarios.findUnique({
        where: { idUsuario: id }
    });
    response.json(usuario);
};

//Crear nuevo usuario
module.exports.register = async (request, response, next) => {
    let usuario = request.body;
    // Parse cedula to integer
    usuario.cedula = parseInt(usuario.cedula, 10);
    usuario.telefono = parseInt(usuario.telefono, 10);
    //Salt es una cadena aleatoria.
    //"salt round" factor de costo controla cuánto tiempo se necesita para calcular un solo hash de BCrypt
    // salt es un valor aleatorio y debe ser diferente para cada cálculo, por lo que el resultado casi nunca debe ser el mismo, incluso para contraseñas iguales
    let salt= bcrypt.genSaltSync(10)
    // Hash password
    let hash=bcrypt.hashSync(usuario.password,salt)
    const newUsuario = await prisma.usuarios.create({
        data: {
            cedula: usuario.cedula,
            nombre: usuario.nombre,
            telefono: usuario.telefono,
            correo: usuario.correo,
            password: hash,
            role: Role[usuario.role]
        },
    });
    response.status(200).json({
        status: true,
        message: "Usuario creado",
        data: newUsuario,
      });
};
//Actualizar un usuario
module.exports.update = async (request, response, next) => {
    let usuario = request.body;
    let idUsuario = parseInt(request.params.id);

    const usuarioViejo = await prisma.usuarios.findUnique({
        where: { id: idUsuario },
    });

    const newUsuario = await prisma.usuarios.update({
        where: {
            id: idUsuario
        },
        data: {
            cedula: usuario.cedula,
            nombre: usuario.nombre,
            telefono: usuario.telefono,
            correo: usuario.correo,
            password: usuario.password
        },
    });
    response.json(newUsuario);
};





module.exports.login = async (request, response, next) => {
  let userReq = request.body;
  //Buscar el usuario según el email dado
  const user = await prisma.usuarios.findUnique({
    where: {
      correo: userReq.email,
    },
  });
  //Sino lo encuentra según su email
  if (!user) {
    response.status(401).send({
      success: false,
      message: "Usuario no registrado",
    });
  }
  //Verifica la contraseña
  const checkPassword=await bcrypt.compare(userReq.password, user.password)
  if(checkPassword===false){
    response.status(401).send({
      success: false,
      message: "Credenciales no validas",
    });
  }else{
    //Usuario Correcto

    //Crear Payload
    const payload={
      email: user.correo,
      role: user.role
    }
    //Crear Token
    const token= jwt.sign(payload,process.env.SECRET_KEY,{
      expiresIn: process.env.JWT_EXPIRE
    });
    response.json({
      success: true,
      message: "Usuario registrado",
      data:{
        user,
        token,
      }
    })
    //Probar en Postman
  }
};


