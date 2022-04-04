/*
  Warnings:

  - You are about to alter the column `role` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum("user_role")`.
  - A unique constraint covering the columns `[name]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('teacher', 'student') NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `user_name_key` ON `user`(`name`);
