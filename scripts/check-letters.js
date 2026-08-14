const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function main() {
  const letters = await prisma.letter.findMany();
  console.log('Prisma sees:', letters.length, 'letters');
  console.log(letters.map(l => ({ title: l.title, isPublished: l.isPublished })));
}

main().finally(() => prisma.$disconnect());
