const { PrismaClient, Role } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  /* let listRoles = [];
  for (let element in Role) {
    switch (element) {
      case Role.ADMIN:
        listRoles.unshift({
          ["id"]: element,
          ["nombre"]: "Administrador",
        });
        break;
      case Role.Cliente:
        listRoles.unshift({
          ["id"]: element,
          ["nombre"]: "Cliente",
        });
        break;
        case Role.Vendedor:
        listRoles.unshift({
          ["id"]: element,
          ["nombre"]: "Vendedor",
        });
        break;
      default:
        listRoles.unshift({ ["id"]: Role.USER, ["nombre"]: "Cliente" });
        break;
    }
  }

  response.json(listRoles); */

  const roles = await prisma.role.findMany({
    orderBy: {
        tipoRol: 'asc'
    },
    include:{
      usuarios:true
    }
});
response.json(roles);
};
module.exports.getById = async (request, response, next) => {
  /* let id = request.params.id;
  let nombre = "";
  switch (Role[id]) {
    case Role.ADMIN:
      nombre = "Administrador";
      break;
    case Role.Cliente:
      nombre = "Cliente";
      break;
      case Role.Vendedor:
      nombre = "Vendedor";
      break;
    default:
      nombre = "Cliente";
      break;
  }
  let rol = { ["id"]: Role[id], ["nombre"]: nombre };
  response.json(rol); */

  let id = parseInt(request.params.id);
    const rol = await prisma.role.findUnique({
        where: { idRol: id },
        include:{
          usuarios:true
        }
    });
    response.json(rol);
};
