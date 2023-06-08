-- CreateTable
CREATE TABLE `Usuarios` (
    `idUsuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `telefono` INTEGER NOT NULL,
    `correo` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `Rol` ENUM('ADMIN', 'Vendedor', 'Cliente') NOT NULL DEFAULT 'Cliente',

    UNIQUE INDEX `Usuarios_telefono_key`(`telefono`),
    UNIQUE INDEX `Usuarios_correo_key`(`correo`),
    PRIMARY KEY (`idUsuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pagos` (
    `idPago` INTEGER NOT NULL AUTO_INCREMENT,
    `numTarjeta` INTEGER NULL,
    `proveedor` VARCHAR(191) NULL,
    `numCuenta` INTEGER NULL,
    `fechaExpiracion` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `nombre` VARCHAR(191) NOT NULL,
    `idUsuario` INTEGER NOT NULL,
    `idTipoPago` INTEGER NOT NULL,

    UNIQUE INDEX `Pagos_numTarjeta_key`(`numTarjeta`),
    UNIQUE INDEX `Pagos_numCuenta_key`(`numCuenta`),
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
    `idUsuario` INTEGER NOT NULL,

    PRIMARY KEY (`idDireccion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Productos` (
    `idProducto` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `precio` DECIMAL(65, 30) NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `foto` LONGBLOB NULL,
    `idCategoria` INTEGER NOT NULL,
    `idEstadoProducto` INTEGER NOT NULL,
    `idUsuario` INTEGER NOT NULL,

    PRIMARY KEY (`idProducto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CategoriaProducto` (
    `idCategoria` INTEGER NOT NULL AUTO_INCREMENT,
    `categoria` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idCategoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Estado_Producto` (
    `idEstado` INTEGER NOT NULL AUTO_INCREMENT,
    `estado` BOOLEAN NOT NULL,

    PRIMARY KEY (`idEstado`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Preguntas` (
    `idPregunta` INTEGER NOT NULL AUTO_INCREMENT,
    `pregunta` VARCHAR(191) NOT NULL,
    `idProducto` INTEGER NOT NULL,

    PRIMARY KEY (`idPregunta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Respuestas` (
    `idRespuesta` INTEGER NOT NULL AUTO_INCREMENT,
    `respuesta` VARCHAR(191) NOT NULL,
    `idPregunta` INTEGER NOT NULL,

    PRIMARY KEY (`idRespuesta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pedidos` (
    `idPedido` INTEGER NOT NULL AUTO_INCREMENT,
    `estadoPedido` ENUM('Recibido', 'Enviado', 'Entregado') NOT NULL DEFAULT 'Recibido',
    `total` DECIMAL(65, 30) NOT NULL,
    `idUsuario` INTEGER NOT NULL,

    PRIMARY KEY (`idPedido`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pedidos_Productos` (
    `idPedido` INTEGER NOT NULL,
    `idProducto` INTEGER NOT NULL,

    PRIMARY KEY (`idPedido`, `idProducto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Evaluacion` (
    `idEvaluacion` INTEGER NOT NULL AUTO_INCREMENT,
    `calificacion` DECIMAL(65, 30) NULL,
    `comentario` VARCHAR(191) NULL,
    `idUsuario` INTEGER NOT NULL,
    `idPedido` INTEGER NOT NULL,

    PRIMARY KEY (`idEvaluacion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pagos` ADD CONSTRAINT `Pagos_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuarios`(`idUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pagos` ADD CONSTRAINT `Pagos_idTipoPago_fkey` FOREIGN KEY (`idTipoPago`) REFERENCES `TipoPago`(`idTipoPago`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Direccion` ADD CONSTRAINT `Direccion_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuarios`(`idUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Productos` ADD CONSTRAINT `Productos_idCategoria_fkey` FOREIGN KEY (`idCategoria`) REFERENCES `CategoriaProducto`(`idCategoria`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Productos` ADD CONSTRAINT `Productos_idEstadoProducto_fkey` FOREIGN KEY (`idEstadoProducto`) REFERENCES `Estado_Producto`(`idEstado`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Productos` ADD CONSTRAINT `Productos_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuarios`(`idUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Preguntas` ADD CONSTRAINT `Preguntas_idProducto_fkey` FOREIGN KEY (`idProducto`) REFERENCES `Productos`(`idProducto`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Respuestas` ADD CONSTRAINT `Respuestas_idPregunta_fkey` FOREIGN KEY (`idPregunta`) REFERENCES `Preguntas`(`idPregunta`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedidos` ADD CONSTRAINT `Pedidos_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuarios`(`idUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedidos_Productos` ADD CONSTRAINT `Pedidos_Productos_idPedido_fkey` FOREIGN KEY (`idPedido`) REFERENCES `Pedidos`(`idPedido`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedidos_Productos` ADD CONSTRAINT `Pedidos_Productos_idProducto_fkey` FOREIGN KEY (`idProducto`) REFERENCES `Productos`(`idProducto`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Evaluacion` ADD CONSTRAINT `Evaluacion_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuarios`(`idUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Evaluacion` ADD CONSTRAINT `Evaluacion_idPedido_fkey` FOREIGN KEY (`idPedido`) REFERENCES `Pedidos`(`idPedido`) ON DELETE RESTRICT ON UPDATE CASCADE;
