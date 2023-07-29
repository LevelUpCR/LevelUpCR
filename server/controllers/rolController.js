const { PrismaClient, Role } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  let listRoles = [];
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

  response.json(listRoles);
};
module.exports.getById = async (request, response, next) => {
  let id = request.params.id;
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
  response.json(rol);
};
