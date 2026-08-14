import { PrismaClient } from '../generated/prisma/client/index.js';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import * as argon2 from 'argon2';
import * as readline from 'readline';

const connectionString = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function main() {
  console.log("=========================================");
  console.log(" Create Admin for Our Little Universe 💜");
  console.log("=========================================");
  
  const email = process.env.ADMIN_EMAIL || await question('Enter Admin Email: ');
  const password = process.env.ADMIN_PASSWORD || await question('Enter Admin Password: ');

  if (!email || !password) {
    console.error("Error: Email and password are required.");
    process.exit(1);
  }

  const existingAdmin = await prisma.admin.findUnique({
    where: { email }
  });

  if (existingAdmin) {
    console.log(`Admin with email ${email} already exists.`);
    process.exit(0);
  }

  const passwordHash = await argon2.hash(password);

  await prisma.admin.create({
    data: {
      email,
      passwordHash,
      role: 'admin'
    }
  });

  console.log(`✅ Admin created successfully: ${email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    rl.close();
  });
