import { Prisma, PrismaClient } from '@prisma/client';
import Exercises from './seeds/exercises.json' assert { type: 'json' };

const prisma = new PrismaClient();

async function main() {
  const exercises = await prisma.catalogExercise.findMany();

  if (!exercises.length) {
    await prisma.catalogExercise.createMany({
      data: Exercises as Prisma.CatalogExerciseCreateManyInput[]
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
  });
