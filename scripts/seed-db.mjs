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
      content: `Vell,\n\nAku bikin tempat kecil ini karena aku suka ide kalau semua hal kecil tentang kita punya tempat untuk disimpan.\n\nFoto random, tanggal yang mungkin kelihatannya biasa buat orang lain, lagu yang kita suka, cerita kecil, sampai hal-hal receh yang mungkin nanti kita lupa.\n\nAku nggak tahu perjalanan kita bakal sepanjang apa, tapi selama kita jalanin ini, aku pengen punya tempat yang bisa bikin kita lihat ke belakang dan bilang:\n\n"Oh, ternyata kita punya banyak cerita ya."\n\nTerima kasih sudah jadi bagian dari cerita favoritku.\n\n— Putra`
    },
    {
      title: "Open When You Miss Me",
      featured: true,
      published: true,
      content: `Kalau kamu buka ini karena lagi kangen, berarti anggap aja aku lagi duduk di sebelah kamu.\n\nMungkin aku nggak bisa selalu ada persis saat kamu pengen, tapi ada satu hal yang bisa kamu inget:\n\ndi suatu sudut kecil internet ini, ada tempat yang aku bikin khusus untuk kita.\n\nLihat foto kita.\nPutar lagu yang kamu suka.\nBaca cerita random kita.\n\nTerus nanti kalau ketemu aku lagi, bilang aja:\n\n"Aku tadi buka universe kita."\n\nAku pasti ngerti.\n\n— Putra 💜`
    },
    {
      title: "Open When You Had a Bad Day",
      featured: false,
      published: true,
      content: `Vell,\n\nKalau hari ini capek, nggak semuanya harus selesai hari ini.\n\nMakan dulu kalau belum.\nMinum.\nIstirahat sebentar.\n\nKalau kamu pengen cerita, cerita ke aku.\nKalau kamu cuma pengen ditemenin tanpa banyak ngomong juga boleh.\n\nSemoga halaman kecil ini setidaknya bisa bikin hari kamu sedikit lebih ringan.\n\nBesok kita coba lagi.\n\n— Putra`
    },
    {
      title: "For The Days We Don't Do Anything Special",
      featured: false,
      published: true,
      content: `Vell,\n\nAku suka mikir kalau kenangan itu nggak harus selalu datang dari hari yang besar.\n\nKadang justru yang pengen aku simpan adalah hari-hari biasa.\n\nHari ketika kita cuma ngobrol random.\nHari ketika nggak ada rencana apa-apa.\nHari ketika mungkin nggak ada foto bagus yang bisa disimpan.\n\nKarena ternyata punya kamu di hari yang biasa aja sudah cukup bikin hari itu terasa beda.\n\nJadi kalau suatu saat kita lihat kembali universe ini dan isinya penuh dengan hal-hal kecil, mungkin justru itu bagian favoritku.\n\nKarena berarti kita benar-benar hidup di dalam ceritanya, bukan cuma menunggu momen besar.\n\n— Putra 💜`
    },
    {
      title: "A Reminder For You",
      featured: false,
      published: true,
      content: `Vell,\n\nIni cuma pengingat kecil.\n\nKamu nggak harus selalu baik-baik aja.\nNggak harus selalu punya jawaban.\nNggak harus menyelesaikan semuanya sekaligus.\n\nKalau hari ini berat, jalan pelan-pelan aja.\n\nKalau capek, istirahat.\nKalau pengen cerita, aku dengerin.\nKalau nggak pengen ngomong juga nggak apa-apa.\n\nSemoga kapan pun kamu menemukan surat ini, kamu ingat kalau ada seseorang yang selalu berharap hari-harimu terasa sedikit lebih ringan.\n\n— Putra`
    },
    {
      title: "If We Read This Again Someday",
      featured: true,
      published: true,
      content: `Vell,\n\nAku penasaran seperti apa rasanya kalau suatu hari nanti kita buka website ini lagi setelah isinya sudah jauh lebih banyak.\n\nMungkin ada foto yang bikin kita bilang,\n"Ya ampun, dulu kita begini banget."\n\nAda lagu yang langsung bikin kita inget suatu masa.\n\nAda tulisan yang sekarang terdengar sederhana, tapi nanti mungkin jadi sesuatu yang berharga karena kita tahu kapan tulisan itu dibuat.\n\nKalau kita benar-benar membaca ini lagi suatu hari nanti, aku cuma berharap satu hal:\n\nsemoga kita tersenyum karena ternyata banyak sekali hal kecil yang berhasil kita simpan.\n\nOne little universe.\nA lot of little memories.\n\n— Putra 💜`
    },
    {
      title: "Open When You Need A Little Smile",
      featured: false,
      published: true,
      content: `Hai Vell,\n\nKalau kamu nemu surat ini, tugasnya simpel:\n\nsenyum dikit.\n\nNggak perlu banyak.\nSedikit aja cukup.\n\nTerus bayangin aku lagi bilang:\n\n"Jangan serius-serius amat, sini cerita."\n\nKalau belum berhasil senyum, coba buka Memory Jar.\nKalau masih belum, putar salah satu lagu kita.\nKalau masih belum juga...\n\nyaudah, nanti aku yang coba bikin kamu ketawa langsung. 💜\n\n— Putra`
    },
    {
      title: "Thank You For Being Here",
      featured: false,
      published: true,
      content: `Vell,\n\nNggak ada pesan rumit di surat ini.\n\nAku cuma mau bilang terima kasih.\n\nTerima kasih untuk waktu yang kamu kasih.\nUntuk cerita-cerita kecil.\nUntuk obrolan random.\nUntuk momen yang mungkin terasa biasa sekarang tapi suatu hari bisa jadi kenangan.\n\nWebsite ini mungkin cuma kumpulan halaman, tulisan, foto, dan lagu.\n\nTapi semuanya ada karena ada "kita" yang bisa disimpan di dalamnya.\n\nSo, thank you for being here.\n\nIn this universe,\nand in my days.\n\n— Putra 💜`
    },
    {
      title: "More Memories, Please",
      featured: false,
      published: true,
      content: `Vell,\n\nKalau isi universe ini suatu hari terasa penuh, jangan berhenti nambahin cerita ya.\n\nMasih banyak ruang buat:\n\nfoto random,\ncerita receh,\nlagu baru,\ntempat yang pengen kita datengin,\nhal kecil yang bikin kita ketawa,\ndan momen yang bahkan belum terjadi.\n\nAku suka ide bahwa website ini nggak pernah benar-benar selesai.\n\nKarena selama kita masih punya cerita baru, selalu ada sesuatu yang bisa ditambahkan.\n\nSo...\n\none more photo.\none more song.\none more adventure.\none more memory.\n\nPlease. 💜\n\n— Putra`
    },
    {
        title: "Open When You Can't Sleep",
        featured: false,
        published: true,
        content: `Vell,\n\nKalau kamu baca ini karena belum bisa tidur, jangan terlalu maksa diri buat langsung terlelap.\n\nTarik napas pelan-pelan.\nTaruh HP sebentar kalau perlu.\nCari posisi paling nyaman.\n\nAnggap aja surat ini teman kecil yang nemenin kamu sampai rasa ngantuk datang.\n\nNggak perlu mikirin besok terlalu jauh malam ini. Besok punya waktunya sendiri.\n\nUntuk sekarang, cukup istirahat.\n\nGood night, Vell.\nSemoga tidurmu tenang dan besok bangun dengan hati yang sedikit lebih ringan. 💜\n\n— Putra`
    },
    {
        title: "Open When You Are Overthinking",
        featured: true,
        published: true,
        content: `Vell,\n\nKalau isi kepala kamu lagi ramai banget, kamu nggak harus menyelesaikan semuanya sekarang.\n\nKadang pikiran memang suka mengambil satu hal kecil lalu membawanya terlalu jauh.\n\nJadi coba berhenti sebentar.\n\nTanya ke diri sendiri:\n"Apakah ini benar-benar harus aku selesaikan malam ini?"\n\nKalau jawabannya nggak, simpan dulu.\n\nBesok kamu masih boleh memikirkannya lagi dengan kepala yang lebih tenang.\n\nDan kalau kamu butuh tempat buat cerita, aku lebih suka kamu cerita daripada harus berantem sendirian sama isi kepalamu.\n\nPelan-pelan aja ya. 💜\n\n— Putra`
    },
    {
        title: "Open When You Need A Hug",
        featured: true,
        published: true,
        content: `Vell,\n\nKalau surat ini punya tangan, mungkin sekarang dia lagi meluk kamu.\n\nSayangnya dia cuma kumpulan tulisan di layar.\n\nJadi untuk sementara, anggap aja setiap barisnya bilang:\n\nsini dulu.\nnggak apa-apa.\nistirahat sebentar.\n\nKamu nggak perlu menjelaskan semuanya.\nNggak perlu punya alasan yang sempurna buat merasa capek atau sedih.\n\nKadang manusia memang cuma butuh ditemenin.\n\nJadi anggap aja aku lagi di sebelah kamu, diam sebentar, terus bilang:\n\n"Aku di sini." 💜\n\n— Putra`
    },
    {
        title: "For A Completely Random Day",
        featured: false,
        published: true,
        content: `Hai Vell,\n\nNggak ada alasan khusus kenapa surat ini ada.\n\nBukan ulang tahun.\nBukan anniversary.\nBukan hari besar.\n\nCuma hari random.\n\nDan mungkin justru itu alasannya.\n\nAku nggak mau semua tulisan di universe ini cuma muncul kalau ada sesuatu yang besar untuk dirayakan.\n\nHari biasa juga bagian dari cerita kita.\n\nJadi kalau kamu menemukan surat ini di hari yang benar-benar biasa, anggap aja ini satu tanda kecil bahwa bahkan hari random pun pantas punya sedikit warna ungu. 💜\n\n— Putra`
    },
    {
        title: "When You Forget How Far You've Come",
        featured: false,
        published: true,
        content: `Vell,\n\nKadang kita terlalu sibuk melihat apa yang belum selesai sampai lupa melihat berapa banyak hal yang sudah berhasil kita lewati.\n\nJadi kalau suatu saat kamu merasa kurang, coba berhenti sebentar.\n\nLihat ke belakang.\n\nBukan untuk tinggal di masa lalu, tapi untuk mengingat bahwa kamu sudah melewati banyak hari yang dulu mungkin terasa sulit juga.\n\nKamu nggak harus selalu menjadi versi terbaik dari dirimu setiap hari.\n\nCukup terus berjalan.\n\nSedikit pun tetap maju.\n\nAnd for what it's worth, aku bangga sama kamu. 💜\n\n— Putra`
    },
    {
        title: "Read This When You Miss Us",
        featured: true,
        published: true,
        content: `Vell,\n\nKalau lagi kangen, coba jangan langsung tutup halaman ini.\n\nKeliling sebentar.\n\nBuka Gallery.\nBaca salah satu surat.\nAmbil note dari Memory Jar.\nPutar salah satu lagu di soundtrack kita.\n\nMungkin website kecil ini memang nggak bisa menggantikan keberadaan seseorang secara langsung.\n\nTapi setidaknya di sini ada potongan-potongan kecil yang bisa mengingatkan kalau kita punya cerita.\n\nDan nanti ketika kita punya lebih banyak foto, lebih banyak lagu, lebih banyak cerita, tempat ini bakal jadi semakin ramai.\n\nSampai saat itu...\n\nanggap aja universe kecil ini lagi nemenin kamu kangen. 💜\n\n— Putra`
    },
    {
        title: "For Future Vell",
        featured: false,
        published: true,
        content: `Hai Vell dari masa depan,\n\nAku nggak tahu kapan kamu membaca ini.\n\nMungkin universe kita saat itu sudah penuh foto.\nMungkin playlist-nya sudah panjang.\nMungkin Memory Jar sudah punya terlalu banyak note buat dihitung.\n\nAtau mungkin kamu cuma sedang scroll halaman lama secara random.\n\nApa pun alasannya, hai.\n\nSurat ini ditulis oleh versi masa lalu dari seseorang yang sedang berusaha menyimpan sedikit bagian dari cerita kita di internet.\n\nAku harap ketika kamu membaca ini, masih ada sesuatu di halaman ini yang bikin kamu tersenyum.\n\nTake care, future Vell. 💜\n\n— Putra dari masa lalu`
    },
    {
        title: "When The Day Feels Too Loud",
        featured: false,
        published: true,
        content: `Vell,\n\nKalau hari ini terasa terlalu ramai, terlalu banyak orang, terlalu banyak pikiran, atau terlalu banyak hal yang minta perhatian kamu...\n\nkamu boleh mengecilkan dunia sebentar.\n\nNggak semua notifikasi harus dibalas sekarang.\nNggak semua masalah harus selesai hari ini.\nNggak semua orang harus mendapatkan energi kamu sekaligus.\n\nCari tempat yang nyaman.\nMinum sesuatu.\nDengerin lagu.\nDiam sebentar kalau perlu.\n\nDunia masih bisa menunggu beberapa menit.\n\nTake your time.\nAku harap setelah ini semuanya terasa sedikit lebih pelan. 💜\n\n— Putra`
    },
    {
        title: "No Special Reason",
        featured: false,
        published: true,
        content: `Vell,\n\nAku cuma pengen ninggalin satu surat yang nggak punya konteks apa-apa.\n\nNo special occasion.\nNo dramatic story.\nNo particular reason.\n\nCuma mau bilang:\n\naku senang kamu ada.\n\nItu aja.\n\nKadang hal sederhana nggak perlu dibuat panjang supaya berarti.\n\nJadi kalau kamu buka surat ini secara random, anggap aja kamu baru menemukan satu pesan kecil yang sengaja aku taruh di antara semua halaman universe kita.\n\nHave a nice day, Vell. 💜\n\n— Putra`
    },
    {
        title: "Open When You Need A Little Courage",
        featured: false,
        published: true,
        content: `Vell,\n\nKalau ada sesuatu yang bikin kamu ragu, aku nggak akan bilang semuanya pasti gampang.\n\nKadang memang nggak gampang.\n\nTapi takut bukan berarti kamu nggak bisa melakukannya.\n\nKamu boleh takut sambil tetap mencoba.\nKamu boleh ragu sambil tetap jalan.\nKamu boleh pelan tanpa berarti mundur.\n\nNggak harus langsung sempurna.\n\nSatu langkah kecil dulu.\nSetelah itu satu lagi.\n\nDan kalau ternyata belum berhasil, setidaknya kamu sudah cukup berani untuk mencoba.\n\nI'm rooting for you. 💜\n\n— Putra`
    },
    {
        title: "Things I Hope We Keep",
        featured: true,
        published: true,
        content: `Vell,\n\nAda beberapa hal sederhana yang aku harap nggak hilang meskipun waktu terus jalan.\n\nObrolan random.\nCerita kecil yang sebenarnya nggak penting tapi tetap diceritain.\nLagu yang tiba-tiba jadi punya arti.\nFoto yang mungkin nggak sempurna tapi tetap disimpan.\nDan kemampuan buat ketawa karena hal-hal receh.\n\nAku nggak tahu seperti apa halaman-halaman berikutnya dari cerita kita.\n\nTapi aku suka kalau beberapa hal sederhana tetap ikut dibawa.\n\nMaybe that's what makes a story feel like ours. 💜\n\n— Putra`
    },
    {
        title: "A Tiny Place To Come Back To",
        featured: false,
        published: true,
        content: `Vell,\n\nAku suka satu hal dari website ini:\n\ndia nggak ke mana-mana.\n\nHari boleh sibuk.\nChat bisa tenggelam.\nFoto bisa makin banyak.\nWaktu terus jalan.\n\nTapi kita selalu bisa kembali ke sini dan menemukan potongan kecil dari apa yang pernah kita simpan.\n\nMungkin itu alasan aku suka menyebutnya universe kita.\n\nBukan karena tempatnya besar.\n\nJustru karena kecil.\nPrivate.\nDan isinya hal-hal yang berarti buat kita.\n\nKalau suatu saat kamu bingung mau buka apa, buka aja halaman random.\n\nMaybe you'll find something worth remembering. 💜\n\n— Putra`
    },
    {
        title: "Open When You Need To Hear Something Soft",
        featured: false,
        published: true,
        content: `Vell,\n\nNggak ada nasihat panjang di sini.\n\nCuma beberapa kalimat lembut buat kamu.\n\nKamu boleh pelan.\nKamu boleh istirahat.\nKamu boleh punya hari yang berantakan.\nKamu nggak harus selalu terlihat kuat.\n\nMakan kalau belum makan.\nMinum kalau lupa minum.\nTarik napas.\n\nDan jangan terlalu keras sama diri sendiri hari ini.\n\nSometimes surviving a difficult day is already enough.\n\nAku harap setelah membaca ini, setidaknya pundak kamu terasa sedikit lebih ringan. 💜\n\n— Putra`
    },
    {
        title: "One More Page For You",
        featured: true,
        published: true,
        content: `Vell,\n\nIni satu halaman lagi buat kamu.\n\nLucu juga kalau dipikir-pikir.\n\nAwalnya cuma sebuah website kecil.\nLalu mulai ada surat.\nAda note.\nAda lagu.\nNanti ada foto.\nAda cerita.\nDan pelan-pelan halaman kosong mulai punya isi.\n\nMungkin hubungan juga sedikit seperti itu.\n\nBukan satu momen besar yang langsung membuat semuanya lengkap.\n\nTapi banyak hal kecil yang terus ditambahkan.\n\nOne conversation.\nOne laugh.\nOne photo.\nOne memory at a time.\n\nJadi ini satu tambahan kecil lagi untuk universe kita.\n\nOne more page for you. 💜\n\n— Putra`
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
    "My favorite kind of history is ours.",
    "Kalau hari ini biasa aja, semoga ada satu hal kecil yang bikin Vell senyum. 💜",
    "Reminder: kamu boleh istirahat.",
    "Semoga kita selalu punya cerita baru buat dimasukin ke sini.",
    "Aku suka saat sesuatu yang random akhirnya jadi kenangan.",
    "One tiny note from our tiny universe. 💜",
    "Kalau kamu baca ini sambil senyum, berarti note ini berhasil.",
    "Save the little moments.",
    "Masih banyak foto yang belum kita ambil.",
    "Masih banyak lagu yang belum jadi bagian dari soundtrack kita.",
    "Masih banyak tempat yang belum kita datengin.",
    "Masih banyak cerita random yang belum terjadi.",
    "Future us is going to have a lot to scroll through.",
    "Today deserves a tiny purple heart. 💜",
    "Aku harap hari ini memperlakukan kamu dengan baik.",
    "Kalau hari ini nggak berjalan sesuai rencana, besok masih ada.",
    "Random reminder: makan dan minum yang cukup.",
    "Somewhere between ordinary days, memories happen.",
    "Aku suka ide kalau suatu hari kita lupa sesuatu lalu website ini yang ngingetin.",
    "Another tiny piece of us saved here.",
    "Semoga kita nggak pernah kehabisan hal random untuk diceritain.",
    "Pick another note. Maybe the next one is your favorite.",
    "One ordinary day can become a favorite memory.",
    "Take care of yourself today, okay?",
    "Sedikit demi sedikit, universe ini makin penuh.",
    "Kalau sedang kangen, keliling universe kita sebentar.",
    "No special occasion. Just a little note for you.",
    "More laughs, more photos, more stories.",
    "Aku harap ada banyak versi bahagia dari kita di masa depan.",
    "You found a tiny piece of affection. 💜",
    "Still adding you to my favorite days.",
    "Semoga apa pun yang lagi kamu pikirin sekarang pelan-pelan jadi lebih ringan.",
    "One more day, one more little memory.",
    "Aku suka kalau hal sederhana punya tempat untuk disimpan.",
    "Our universe still has plenty of empty space. Let's fill it.",
    "Hello from one random little purple note. 💜",
    "Kalau hari ini capek, universe ini nggak akan ke mana-mana. Istirahat dulu.",
    "Memories don't always know they're memories yet.",
    "Semoga nanti kita ketawa baca note-note random ini.",
    "Today is another page.",
    "Keep this one: you matter to me. 💜"
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
