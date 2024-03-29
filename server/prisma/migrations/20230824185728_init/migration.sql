-- CreateTable
CREATE TABLE `Usuarios` (
    `idUsuario` INTEGER NOT NULL AUTO_INCREMENT,
    `cedula` INTEGER NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `telefono` INTEGER NOT NULL,
    `correo` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `compania` VARCHAR(191) NULL,
    `habilitado` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Usuarios_correo_key`(`correo`),
    PRIMARY KEY (`idUsuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `idRol` INTEGER NOT NULL AUTO_INCREMENT,
    `tipoRol` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idRol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pagos` (
    `idPago` INTEGER NOT NULL AUTO_INCREMENT,
    `numTarjeta` INTEGER NULL,
    `proveedor` VARCHAR(191) NULL,
    `numCuenta` INTEGER NULL,
    `fechaExpiracion` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `nombre` VARCHAR(191) NOT NULL,
    `usuarioId` INTEGER NOT NULL,
    `tipoPagoId` INTEGER NOT NULL,

    PRIMARY KEY (`idPago`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TipoPago` (
    `idTipoPago` INTEGER NOT NULL AUTO_INCREMENT,
    `TipoPago` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idTipoPago`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Direccion` (
    `idDireccion` INTEGER NOT NULL AUTO_INCREMENT,
    `provincia` VARCHAR(191) NOT NULL,
    `canton` VARCHAR(191) NOT NULL,
    `distrito` VARCHAR(191) NOT NULL,
    `direccionExacta` VARCHAR(191) NOT NULL,
    `codigoPostal` INTEGER NOT NULL,
    `telefono` INTEGER NOT NULL,
    `usuarioId` INTEGER NOT NULL,

    PRIMARY KEY (`idDireccion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Productos` (
    `idProducto` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `precio` DECIMAL(65, 30) NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `categoriaId` INTEGER NOT NULL,
    `estadoProductoId` INTEGER NOT NULL,
    `usuarioId` INTEGER NOT NULL,

    PRIMARY KEY (`idProducto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fotos_Productos` (
    `idFoto` INTEGER NOT NULL AUTO_INCREMENT,
    `Foto` LONGTEXT NOT NULL,
    `idProducto` INTEGER NOT NULL,

    PRIMARY KEY (`idFoto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CategoriaProducto` (
    `idCategoria` INTEGER NOT NULL AUTO_INCREMENT,
    `categoria` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idCategoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EstadoProducto` (
    `idEstado` INTEGER NOT NULL AUTO_INCREMENT,
    `estado` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idEstado`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Preguntas` (
    `idPregunta` INTEGER NOT NULL AUTO_INCREMENT,
    `pregunta` VARCHAR(191) NOT NULL,
    `productoId` INTEGER NOT NULL,
    `usuarioId` INTEGER NOT NULL,

    PRIMARY KEY (`idPregunta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Respuestas` (
    `idRespuesta` INTEGER NOT NULL AUTO_INCREMENT,
    `respuesta` VARCHAR(191) NOT NULL,
    `preguntaId` INTEGER NOT NULL,

    PRIMARY KEY (`idRespuesta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Estado_Pedido` (
    `idEstadoPedido` INTEGER NOT NULL AUTO_INCREMENT,
    `estado` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idEstadoPedido`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pedidos` (
    `idPedido` INTEGER NOT NULL AUTO_INCREMENT,
    `direccionId` INTEGER NOT NULL,
    `usuarioId` INTEGER NOT NULL,
    `estadoPedidoId` INTEGER NOT NULL,
    `pagoId` INTEGER NOT NULL,
    `total` DECIMAL(65, 30) NOT NULL,
    `fechaCompra` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`idPedido`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pedidos_Productos` (
    `pedidoId` INTEGER NOT NULL,
    `estadoPedidoId` INTEGER NOT NULL,
    `productoId` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,

    PRIMARY KEY (`pedidoId`, `productoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Evaluacion` (
    `idEvaluacion` INTEGER NOT NULL AUTO_INCREMENT,
    `calificacion` DECIMAL(65, 30) NULL,
    `comentario` VARCHAR(191) NULL,
    `calificadorId` INTEGER NOT NULL,
    `calificadoId` INTEGER NOT NULL,
    `pedidoId` INTEGER NOT NULL,

    PRIMARY KEY (`idEvaluacion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_RoleToUsuarios` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_RoleToUsuarios_AB_unique`(`A`, `B`),
    INDEX `_RoleToUsuarios_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pagos` ADD CONSTRAINT `Pagos_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuarios`(`idUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pagos` ADD CONSTRAINT `Pagos_tipoPagoId_fkey` FOREIGN KEY (`tipoPagoId`) REFERENCES `TipoPago`(`idTipoPago`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Direccion` ADD CONSTRAINT `Direccion_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuarios`(`idUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Productos` ADD CONSTRAINT `Productos_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `CategoriaProducto`(`idCategoria`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Productos` ADD CONSTRAINT `Productos_estadoProductoId_fkey` FOREIGN KEY (`estadoProductoId`) REFERENCES `EstadoProducto`(`idEstado`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Productos` ADD CONSTRAINT `Productos_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuarios`(`idUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fotos_Productos` ADD CONSTRAINT `Fotos_Productos_idProducto_fkey` FOREIGN KEY (`idProducto`) REFERENCES `Productos`(`idProducto`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Preguntas` ADD CONSTRAINT `Preguntas_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `Productos`(`idProducto`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Preguntas` ADD CONSTRAINT `Preguntas_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuarios`(`idUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Respuestas` ADD CONSTRAINT `Respuestas_preguntaId_fkey` FOREIGN KEY (`preguntaId`) REFERENCES `Preguntas`(`idPregunta`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedidos` ADD CONSTRAINT `Pedidos_direccionId_fkey` FOREIGN KEY (`direccionId`) REFERENCES `Direccion`(`idDireccion`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedidos` ADD CONSTRAINT `Pedidos_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuarios`(`idUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedidos` ADD CONSTRAINT `Pedidos_estadoPedidoId_fkey` FOREIGN KEY (`estadoPedidoId`) REFERENCES `Estado_Pedido`(`idEstadoPedido`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedidos` ADD CONSTRAINT `Pedidos_pagoId_fkey` FOREIGN KEY (`pagoId`) REFERENCES `Pagos`(`idPago`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedidos_Productos` ADD CONSTRAINT `Pedidos_Productos_pedidoId_fkey` FOREIGN KEY (`pedidoId`) REFERENCES `Pedidos`(`idPedido`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedidos_Productos` ADD CONSTRAINT `Pedidos_Productos_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `Productos`(`idProducto`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedidos_Productos` ADD CONSTRAINT `Pedidos_Productos_estadoPedidoId_fkey` FOREIGN KEY (`estadoPedidoId`) REFERENCES `Estado_Pedido`(`idEstadoPedido`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Evaluacion` ADD CONSTRAINT `Evaluacion_calificadorId_fkey` FOREIGN KEY (`calificadorId`) REFERENCES `Usuarios`(`idUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Evaluacion` ADD CONSTRAINT `Evaluacion_calificadoId_fkey` FOREIGN KEY (`calificadoId`) REFERENCES `Usuarios`(`idUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Evaluacion` ADD CONSTRAINT `Evaluacion_pedidoId_fkey` FOREIGN KEY (`pedidoId`) REFERENCES `Pedidos`(`idPedido`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RoleToUsuarios` ADD CONSTRAINT `_RoleToUsuarios_A_fkey` FOREIGN KEY (`A`) REFERENCES `Role`(`idRol`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RoleToUsuarios` ADD CONSTRAINT `_RoleToUsuarios_B_fkey` FOREIGN KEY (`B`) REFERENCES `Usuarios`(`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;
