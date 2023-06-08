import { Rol } from "@prisma/client";
export const usuarios = [
    //1
    {
        nombre: "ADMIN",
        telefono: 11111111,
        correo: "ADMIN1@GMAIL.COM",
        password: "123456",
        Rol: Rol.ADMIN
    },
    //2
    {
        nombre: "Luis Solera",
        telefono: 22222222,
        correo: "vendedor1@gmail.com",
        password: "123456",
        Rol: Rol.Vendedor
    },
    //3
    {
        nombre: "Israel Calvo",
        telefono: 33333333,
        correo: "cliente1@gmail.com",
        password: "123456",
        Rol: Rol.Cliente
    }
];