import pg from 'pg';
import argon2 from 'argon2';
import crypto from 'crypto';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

async function main() {
  console.log("Seeding Our Little Universe... 💜");

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
  
  await pool.query(
    'INSERT INTO "Settings" (id, "coupleData", "updatedAt") VALUES ($1, $2, NOW()) ON CONFLICT (id) DO UPDATE SET "coupleData" = EXCLUDED."coupleData", "updatedAt" = NOW()',
    ['global', coupleData]
  );
  console.log("✅ Settings seeded");

  // 2. Admin User
  const email = process.env.ADMIN_EMAIL || 'admin@universe.love';
  const password = process.env.ADMIN_PASSWORD || 'change_me_super_secret_password';
  const passwordHash = await argon2.hash(password);
  
  await pool.query(
    'INSERT INTO "Admin" (id, email, "passwordHash", role, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, NOW(), NOW()) ON CONFLICT (email) DO NOTHING',
    [crypto.randomUUID(), email, passwordHash, 'admin']
  );
  console.log("✅ Admin seeded");

  // 3. Songs
  const songs = [
    { title: "Walking with you", artist: "Novelbright", note: "Putra can write why this song feels special here.", published: true },
    { title: "R U Broken 2?", artist: "510", note: "Putra can write why this song feels special here.", published: true }
  ];

  for (const s of songs) {
    await pool.query(
      'INSERT INTO "Song" (id, title, artist, note, "isPublished", "createdAt", "updatedAt") SELECT $1, $2, $3, $4, $5, NOW(), NOW() WHERE NOT EXISTS (SELECT 1 FROM "Song" WHERE title = $2)',
      [crypto.randomUUID(), s.title, s.artist, s.note, s.published]
    );
  }
  console.log("✅ Songs seeded");

  // 4. Letters
  const letters = [
    {
      title: "For Vell Vell 💜",
      featured: false,
      published: true,
      content: `Vell,

Aku bikin tempat kecil ini karena aku suka ide kalau semua hal kecil tentang kita punya tempat untuk disimpan.

Foto random, tanggal yang mungkin kelihatannya biasa buat orang lain, lagu yang kita suka, cerita kecil, sampai hal-hal receh yang mungkin nanti kita lupa.

Aku nggak tahu perjalanan kita bakal sepanjang apa, tapi selama kita jalanin ini, aku pengen punya tempat yang bisa bikin kita lihat ke belakang dan bilang:

"Oh, ternyata kita punya banyak cerita ya."

Terima kasih sudah jadi bagian dari cerita favoritku.

— Putra`
    },
    {
      title: "Open When You Miss Me",
      featured: true,
      published: true,
      content: `Kalau kamu buka ini karena lagi kangen, berarti anggap aja aku lagi duduk di sebelah kamu.

Mungkin aku nggak bisa selalu ada persis saat kamu pengen, tapi ada satu hal yang bisa kamu inget:

di suatu sudut kecil internet ini, ada tempat yang aku bikin khusus untuk kita.

Lihat foto kita.
Putar lagu yang kamu suka.
Baca cerita random kita.

Terus nanti kalau ketemu aku lagi, bilang aja:

"Aku tadi buka universe kita."

Aku pasti ngerti.

— Putra 💜`
    },
    {
      title: "Open When You Had a Bad Day",
      featured: false,
      published: true,
      content: `Vell,

Kalau hari ini capek, nggak semuanya harus selesai hari ini.

Makan dulu kalau belum.
Minum.
Istirahat sebentar.

Kalau kamu pengen cerita, cerita ke aku.
Kalau kamu cuma pengen ditemenin tanpa banyak ngomong juga boleh.

Semoga halaman kecil ini setidaknya bisa bikin hari kamu sedikit lebih ringan.

Besok kita coba lagi.

— Putra`
    }
  ];

  for (const l of letters) {
    await pool.query(
      'INSERT INTO "Letter" (id, title, content, "isFeatured", "isPublished", "createdAt", "updatedAt") SELECT $1, $2, $3, $4, $5, NOW(), NOW() WHERE NOT EXISTS (SELECT 1 FROM "Letter" WHERE title = $2)',
      [crypto.randomUUID(), l.title, l.content, l.featured, l.published]
    );
  }
  console.log("✅ Letters seeded");

  // 5. Memory Jar Notes
  const jarNotes = [
    "You make ordinary days feel special.",
    "I love your smile.",
    "One more adventure with you, please.",
    "Makasih udah hadir di hidup Putra. 💜",
    "Semoga hari Vell hari ini baik-baik aja.",
    "Kalau capek, istirahat dulu ya.",
    "Aku suka hal-hal random yang kita lakuin bareng.",
    "Another day with you added to my favorites.",
    "Some memories deserve their own universe.",
    "Still choosing you.",
    "Aku pengen punya lebih banyak cerita random sama kamu.",
    "Tiny moments. Big memories.",
    "One memory at a time. 💜",
    "Semoga nanti kita bisa lihat website ini dan ketawa karena kenangannya udah banyak banget.",
    "My favorite kind of history is ours."
  ];

  for (const note of jarNotes) {
    await pool.query(
      'INSERT INTO "JarNote" (id, content, "createdAt", "updatedAt") SELECT $1, $2, NOW(), NOW() WHERE NOT EXISTS (SELECT 1 FROM "JarNote" WHERE content = $2)',
      [crypto.randomUUID(), note]
    );
  }
  console.log("✅ Memory Jar Notes seeded");

  // 6. Special Dates
  const specialDates = [
    { title: "Vell Vell's Birthday", date: new Date("2006-02-17"), note: "A very important day in Putra's universe." },
    { title: "Putra's Birthday", date: new Date("2005-06-16"), note: "Another trip around the universe." },
    { title: "Our First Date", date: new Date("2026-06-28"), note: "" },
    { title: "Our Anniversary", date: new Date("2026-07-06"), note: "The beginning of Putra × Vell Vell. 💜" }
  ];

  for (const sd of specialDates) {
    await pool.query(
      'INSERT INTO "SpecialDate" (id, title, date, description, "createdAt", "updatedAt") SELECT $1, $2, $3, $4, NOW(), NOW() WHERE NOT EXISTS (SELECT 1 FROM "SpecialDate" WHERE title = $2)',
      [crypto.randomUUID(), sd.title, sd.date, sd.note]
    );
  }
  console.log("✅ Special Dates seeded");

  // 7. Love Reasons
  const reasons = [
    "Aku suka senyum kamu.",
    "Aku suka waktu kamu cerita hal random.",
    "You make normal days feel different.",
    "Aku suka punya cerita yang cuma kita yang ngerti.",
    "Karena sama kamu, hal kecil pun bisa jadi kenangan.",
    "Aku suka cara kamu jadi diri kamu sendiri.",
    "Because somehow, you became my favorite person to bother. 💜",
    "Aku suka ketika kita ketawa gara-gara hal receh.",
    "Karena aku selalu pengen punya cerita baru sama kamu.",
    "Because our little universe would not be the same without Vell Vell."
  ];

  for (const r of reasons) {
    await pool.query(
      'INSERT INTO "LoveReason" (id, content, "createdAt", "updatedAt") SELECT $1, $2, NOW(), NOW() WHERE NOT EXISTS (SELECT 1 FROM "LoveReason" WHERE content = $2)',
      [crypto.randomUUID(), r]
    );
  }
  console.log("✅ Love Reasons seeded");

  // 8. Daily Notes (Today's Little Note)
  const dailyNotes = [
    "Semoga hari Vell hari ini punya satu hal kecil yang bikin senyum. 💜",
    "Reminder kecil: makan ya.",
    "One random reminder from Putra: you're very loved.",
    "Semoga hari ini lebih ringan dari kemarin.",
    "Welcome back to our little universe, Vell Vell."
  ];

  for (const d of dailyNotes) {
    await pool.query(
      'INSERT INTO "DailyNote" (id, content, "createdAt", "updatedAt") SELECT $1, $2, NOW(), NOW() WHERE NOT EXISTS (SELECT 1 FROM "DailyNote" WHERE content = $2)',
      [crypto.randomUUID(), d]
    );
  }
  console.log("✅ Daily Notes seeded");

  // 9. Dreams (Future Things)
  const dreams = [
    "Watch a sunset together",
    "Take photobooth pictures",
    "Try a new place together",
    "Have a random unplanned date",
    "Take matching photos",
    "Watch movies together",
    "Try food we've never had before",
    "Go somewhere new together"
  ];

  for (const d of dreams) {
    await pool.query(
      'INSERT INTO "Dream" (id, title, status, "createdAt", "updatedAt") SELECT $1, $2, $3, NOW(), NOW() WHERE NOT EXISTS (SELECT 1 FROM "Dream" WHERE title = $2)',
      [crypto.randomUUID(), d, 'Dreaming']
    );
  }
  console.log("✅ Dreams seeded");

  // 10. Timeline Stories
  const stories = [
    {
      title: "Our First Date",
      date: new Date("2026-06-28"),
      description: "Putra can write the full story of our first date here...",
      featured: false
    },
    {
      title: "The Day We Became Us",
      date: new Date("2026-07-06"),
      description: "The beginning of Putra × Vell Vell. 💜",
      featured: true
    }
  ];

  for (const s of stories) {
    await pool.query(
      'INSERT INTO "Memory" (id, title, date, story, category, "isFavorite", "isPublished", "createdAt", "updatedAt") SELECT $1, $2, $3, $4, \'Story\', $5, true, NOW(), NOW() WHERE NOT EXISTS (SELECT 1 FROM "Memory" WHERE title = $2)',
      [crypto.randomUUID(), s.title, s.date, s.description, s.featured]
    );
  }
  // 11. Mini Adventures
  const adventures = [
    "Watch the sunset together",
    "Take a photobooth picture",
    "Cook something new",
    "Go somewhere without planning",
    "Take matching photos",
    "Try a new café or restaurant",
    "Watch a movie together",
    "Take a random late-night photo"
  ];

  for (const a of adventures) {
    await pool.query(
      'INSERT INTO "Adventure" (id, title, "isCompleted", "createdAt", "updatedAt") SELECT $1, $2, $3, NOW(), NOW() WHERE NOT EXISTS (SELECT 1 FROM "Adventure" WHERE title = $2)',
      [crypto.randomUUID(), a, false]
    );
  }
  console.log("✅ Adventures seeded");
}

main().catch(console.error).finally(() => pool.end());
