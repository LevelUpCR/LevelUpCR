/*
  Warnings:

  - You are about to drop the column `precio` on the `pedidos` table. All the data in the column will be lost.
  - Added the required column `total` to the `Pedidos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pedidos` DROP COLUMN `precio`,
    ADD COLUMN `total` DECIMAL(65, 30) NOT NULL;
