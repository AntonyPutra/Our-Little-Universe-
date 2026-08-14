import prisma from '../src/lib/prisma';

async function main() {
  console.log('Start seeding...');

  // 1. Settings (Couple Config)
  const coupleData = JSON.stringify({
    boyfriend: "Putra",
    girlfriend: "Vell Vell",
    boyfriendBirthday: "2005-06-16",
    girlfriendBirthday: "2006-02-17",
    firstDate: "2026-06-28",
    relationshipStart: "2026-07-06",
    timezone: "Asia/Jakarta",
    passcode: "06072026",
    tagline: "A tiny universe made only for us.",
  });

  await prisma.settings.upsert({
    where: { id: "global" },
    update: { coupleData },
    create: {
      id: "global",
      coupleData,
    },
  });

  // 2. Initial Special Dates
  const initialDates = [
    { title: "Vell Vell's Birthday", date: new Date("2006-02-17"), type: "birthday", icon: "Cake", recurringYearly: true },
    { title: "Putra's Birthday", date: new Date("2005-06-16"), type: "birthday", icon: "Gift", recurringYearly: true },
    { title: "Our First Date", date: new Date("2026-06-28"), type: "milestone", icon: "CalendarHeart", recurringYearly: true },
    { title: "Our Anniversary", date: new Date("2026-07-06"), type: "anniversary", icon: "Heart", recurringYearly: true },
  ];

  for (const date of initialDates) {
    const exists = await prisma.specialDate.findFirst({ where: { title: date.title } });
    if (!exists) {
      await prisma.specialDate.create({ data: date });
    }
  }

  // 3. Jar Notes
  const jarNotes = [
    "You make ordinary days feel special.",
    "I love your smile so much.",
    "One more adventure with you, please.",
    "I love how we can talk about absolutely nothing for hours.",
    "You're my favorite notification.",
  ];

  for (const note of jarNotes) {
    const exists = await prisma.jarNote.findFirst({ where: { content: note } });
    if (!exists) {
      await prisma.jarNote.create({ data: { content: note } });
    }
  }

  // 4. Love Reasons
  const reasons = [
    "Because you always know how to make me smile.",
    "Because your eyes are my favorite color.",
    "Because of the way you say my name.",
    "Because you understand me like no one else.",
    "Because every day with you is my new favorite day."
  ];

  for (const reason of reasons) {
    const exists = await prisma.loveReason.findFirst({ where: { content: reason } });
    if (!exists) {
      await prisma.loveReason.create({ data: { content: reason } });
    }
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
