/*
  Warnings:

  - A unique constraint covering the columns `[rollNo]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `user_name_key` ON `user`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `rollNo` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `user_rollNo_key` ON `user`(`rollNo`);
