/*
  Warnings:

  - The primary key for the `passwords` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `passwords` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `passwords` DROP PRIMARY KEY,
    DROP COLUMN `id`;
