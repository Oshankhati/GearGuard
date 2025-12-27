/*
  Warnings:

  - You are about to drop the column `technicianId` on the `equipment` table. All the data in the column will be lost.
  - The values [REPAIRED] on the enum `MaintenanceRequest_status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `roleId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `role` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `employee` DROP FOREIGN KEY `Employee_departmentId_fkey`;

-- DropForeignKey
ALTER TABLE `equipment` DROP FOREIGN KEY `Equipment_technicianId_fkey`;

-- DropForeignKey
ALTER TABLE `technician` DROP FOREIGN KEY `Technician_teamId_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_roleId_fkey`;

-- AlterTable
ALTER TABLE `employee` MODIFY `departmentId` INTEGER NULL;

-- AlterTable
ALTER TABLE `equipment` DROP COLUMN `technicianId`;

-- AlterTable
ALTER TABLE `maintenancelog` MODIFY `action` ENUM('STATUS_CHANGED', 'ASSIGNED', 'SCRAPPED', 'COMPLETED') NOT NULL;

-- AlterTable
ALTER TABLE `maintenancerequest` MODIFY `status` ENUM('NEW', 'IN_PROGRESS', 'COMPLETED', 'SCRAP', 'CANCELLED') NOT NULL DEFAULT 'NEW';

-- AlterTable
ALTER TABLE `technician` MODIFY `teamId` INTEGER NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `roleId`,
    ADD COLUMN `role` ENUM('ADMIN', 'MANAGER', 'EMPLOYEE', 'TECHNICIAN') NOT NULL;

-- DropTable
DROP TABLE `role`;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Technician` ADD CONSTRAINT `Technician_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `MaintenanceTeam`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
