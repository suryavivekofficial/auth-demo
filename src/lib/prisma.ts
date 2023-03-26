// import Prisma, * as PrismaAll from '@prisma/client';

// const PrismaClient = Prisma?.PrismaClient || PrismaAll?.PrismaClient;
// export default PrismaClient;

import type { PrismaClient } from '@prisma/client';
import Prisma from '@prisma/client';

export let prisma: PrismaClient;

if (Prisma === undefined) {
	import('@prisma/client').then(({ PrismaClient }) => {
		prisma = new PrismaClient();
	});
} else {
	prisma = new Prisma.PrismaClient();
}
