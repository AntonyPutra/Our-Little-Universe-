<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Global Settings
        \App\Models\CoupleSetting::updateOrCreate(
            ['id' => 'global'],
            ['coupleData' => json_encode([
                'boyfriend' => 'Putra',
                'girlfriend' => 'Vell Vell',
                'tagline' => 'Every little moment brought us here',
                'firstDate' => '2026-06-28T00:00:00.000Z',
                'relationshipStart' => '2026-07-06T00:00:00.000Z'
            ])]
        );

        // Special Dates - Update or Create to fix existing dates
        \App\Models\SpecialDate::updateOrCreate(
            ['title' => 'Our First Date'],
            [
                'date' => '2026-06-28 00:00:00',
                'type' => 'Milestone',
                'description' => 'The day we first went out.',
                'icon' => 'Heart',
                'recurringYearly' => true,
            ]
        );

        \App\Models\SpecialDate::updateOrCreate(
            ['title' => 'The Day We Became Us'],
            [
                'date' => '2026-07-06 00:00:00',
                'type' => 'Anniversary',
                'description' => 'The start of our relationship.',
                'icon' => 'Heart',
                'recurringYearly' => true,
            ]
        );

        // Starter Memory
        if (\App\Models\Memory::count() === 0) {
            \App\Models\Memory::create([
                'title' => 'Hello Universe',
                'date' => now(),
                'caption' => 'The beginning of our digital scrapbook.',
                'story' => 'Welcome to our little universe. This is where we will keep all our memories safe.',
                'location' => 'Earth',
                'category' => 'Milestone',
                'isFavorite' => true,
            ]);
        }

        $letters = [
            [
                'title' => 'For Vell Vell 💜',
                'content' => "Vell,\n\nAku bikin tempat kecil ini karena aku suka ide kalau semua hal kecil tentang kita punya tempat untuk disimpan.\n\nFoto random, tanggal yang mungkin kelihatannya biasa buat orang lain, lagu yang kita suka, cerita kecil, sampai hal-hal receh yang mungkin nanti kita lupa.\n\nAku nggak tahu perjalanan kita bakal sepanjang apa, tapi selama kita jalanin ini, aku pengen punya tempat yang bisa bikin kita lihat ke belakang dan bilang:\n\n\"Oh, ternyata kita punya banyak cerita ya.\"\n\nTerima kasih sudah jadi bagian dari cerita favoritku.\n\n— Putra",
                'fromAuthor' => 'Putra',
                'toAuthor' => 'Vell Vell',
                'isFeatured' => false,
                'isPublished' => true,
            ],
            [
                'title' => 'Open When You Miss Me',
                'content' => "Kalau kamu buka ini karena lagi kangen, berarti anggap aja aku lagi duduk di sebelah kamu.\n\nMungkin aku nggak bisa selalu ada persis saat kamu pengen, tapi ada satu hal yang bisa kamu inget:\n\ndi suatu sudut kecil internet ini, ada tempat yang aku bikin khusus untuk kita.\n\nLihat foto kita.\nPutar lagu yang kamu suka.\nBaca cerita random kita.\n\nTerus nanti kalau ketemu aku lagi, bilang aja:\n\n\"Aku tadi buka universe kita.\"\n\nAku pasti ngerti.\n\n— Putra 💜",
                'fromAuthor' => 'Putra',
                'toAuthor' => 'Vell Vell',
                'isFeatured' => true,
                'isPublished' => true,
            ],
            [
                'title' => 'Open When You Had a Bad Day',
                'content' => "Vell,\n\nKalau hari ini capek, nggak semuanya harus selesai hari ini.\n\nMakan dulu kalau belum.\nMinum.\nIstirahat sebentar.\n\nKalau kamu pengen cerita, cerita ke aku.\nKalau kamu cuma pengen ditemenin tanpa banyak ngomong juga boleh.\n\nSemoga halaman kecil ini setidaknya bisa bikin hari kamu sedikit lebih ringan.\n\nBesok kita coba lagi.\n\n— Putra",
                'fromAuthor' => 'Putra',
                'toAuthor' => 'Vell Vell',
                'isFeatured' => false,
                'isPublished' => true,
            ],
            [
                'title' => 'For The Days We Don\'t Do Anything Special',
                'content' => "Vell,\n\nAku suka mikir kalau kenangan itu nggak harus selalu datang dari hari yang besar.\n\nKadang justru yang pengen aku simpan adalah hari-hari biasa.\n\nHari ketika kita cuma ngobrol random.\nHari ketika nggak ada rencana apa-apa.\nHari ketika mungkin nggak ada foto bagus yang bisa disimpan.\n\nKarena ternyata punya kamu di hari yang biasa aja sudah cukup bikin hari itu terasa beda.\n\nJadi kalau suatu saat kita lihat kembali universe ini dan isinya penuh dengan hal-hal kecil, mungkin justru itu bagian favoritku.\n\nKarena berarti kita benar-benar hidup di dalam ceritanya, bukan cuma menunggu momen besar.\n\n— Putra 💜",
                'fromAuthor' => 'Putra',
                'toAuthor' => 'Vell Vell',
                'isFeatured' => false,
                'isPublished' => true,
            ],
            [
                'title' => 'A Reminder For You',
                'content' => "Vell,\n\nIni cuma pengingat kecil.\n\nKamu nggak harus selalu baik-baik aja.\nNggak harus selalu punya jawaban.\nNggak harus menyelesaikan semuanya sekaligus.\n\nKalau hari ini berat, jalan pelan-pelan aja.\n\nKalau capek, istirahat.\nKalau pengen cerita, aku dengerin.\nKalau nggak pengen ngomong juga nggak apa-apa.\n\nSemoga kapan pun kamu menemukan surat ini, kamu ingat kalau ada seseorang yang selalu berharap hari-harimu terasa sedikit lebih ringan.\n\n— Putra",
                'fromAuthor' => 'Putra',
                'toAuthor' => 'Vell Vell',
                'isFeatured' => false,
                'isPublished' => true,
            ],
            [
                'title' => 'If We Read This Again Someday',
                'content' => "Vell,\n\nAku penasaran seperti apa rasanya kalau suatu hari nanti kita buka website ini lagi setelah isinya sudah jauh lebih banyak.\n\nMungkin ada foto yang bikin kita bilang,\n\"Ya ampun, dulu kita begini banget.\"\n\nAda lagu yang langsung bikin kita inget suatu masa.\n\nAda tulisan yang sekarang terdengar sederhana, tapi nanti mungkin jadi sesuatu yang berharga karena kita tahu kapan tulisan itu dibuat.\n\nKalau kita benar-benar membaca ini lagi suatu hari nanti, aku cuma berharap satu hal:\n\nsemoga kita tersenyum karena ternyata banyak sekali hal kecil yang berhasil kita simpan.\n\nOne little universe.\nA lot of little memories.\n\n— Putra 💜",
                'fromAuthor' => 'Putra',
                'toAuthor' => 'Vell Vell',
                'isFeatured' => true,
                'isPublished' => true,
            ],
            [
                'title' => 'Open When You Need A Little Smile',
                'content' => "Hai Vell,\n\nKalau kamu nemu surat ini, tugasnya simpel:\n\nsenyum dikit.\n\nNggak perlu banyak.\nSedikit aja cukup.\n\nTerus bayangin aku lagi bilang:\n\n\"Jangan serius-serius amat, sini cerita.\"\n\nKalau belum berhasil senyum, coba buka Memory Jar.\nKalau masih belum, putar salah satu lagu kita.\nKalau masih belum juga...\n\nyaudah, nanti aku yang coba bikin kamu ketawa langsung. 💜\n\n— Putra",
                'fromAuthor' => 'Putra',
                'toAuthor' => 'Vell Vell',
                'isFeatured' => false,
                'isPublished' => true,
            ],
            [
                'title' => 'Thank You For Being Here',
                'content' => "Vell,\n\nNggak ada pesan rumit di surat ini.\n\nAku cuma mau bilang terima kasih.\n\nTerima kasih untuk waktu yang kamu kasih.\nUntuk cerita-cerita kecil.\nUntuk obrolan random.\nUntuk momen yang mungkin terasa biasa sekarang tapi suatu hari bisa jadi kenangan.\n\nWebsite ini mungkin cuma kumpulan halaman, tulisan, foto, dan lagu.\n\nTapi semuanya ada karena ada \"kita\" yang bisa disimpan di dalamnya.\n\nSo, thank you for being here.\n\nIn this universe,\nand in my days.\n\n— Putra 💜",
                'fromAuthor' => 'Putra',
                'toAuthor' => 'Vell Vell',
                'isFeatured' => false,
                'isPublished' => true,
            ],
            [
                'title' => 'More Memories, Please',
                'content' => "Vell,\n\nKalau isi universe ini suatu hari terasa penuh, jangan berhenti nambahin cerita ya.\n\nMasih banyak ruang buat:\n\nfoto random,\ncerita receh,\nlagu baru,\ntempat yang pengen kita datengin,\nhal kecil yang bikin kita ketawa,\ndan momen yang bahkan belum terjadi.\n\nAku suka ide bahwa website ini nggak pernah benar-benar selesai.\n\nKarena selama kita masih punya cerita baru, selalu ada sesuatu yang bisa ditambahkan.\n\nSo...\n\none more photo.\none more song.\none more adventure.\none more memory.\n\nPlease. 💜\n\n— Putra",
                'fromAuthor' => 'Putra',
                'toAuthor' => 'Vell Vell',
                'isFeatured' => false,
                'isPublished' => true,
            ],
            [
                'title' => 'Open When You Can\'t Sleep',
                'content' => "Vell,\n\nKalau kamu baca ini karena belum bisa tidur, jangan terlalu maksa diri buat langsung terlelap.\n\nTarik napas pelan-pelan.\nTaruh HP sebentar kalau perlu.\nCari posisi paling nyaman.\n\nAnggap aja surat ini teman kecil yang nemenin kamu sampai rasa ngantuk datang.\n\nNggak perlu mikirin besok terlalu jauh malam ini. Besok punya waktunya sendiri.\n\nUntuk sekarang, cukup istirahat.\n\nGood night, Vell.\nSemoga tidurmu tenang dan besok bangun dengan hati yang sedikit lebih ringan. 💜\n\n— Putra",
                'fromAuthor' => 'Putra',
                'toAuthor' => 'Vell Vell',
                'isFeatured' => false,
                'isPublished' => true,
            ],
            [
                'title' => 'Open When You Are Overthinking',
                'content' => "Vell,\n\nKalau isi kepala kamu lagi ramai banget, kamu nggak harus menyelesaikan semuanya sekarang.\n\nKadang pikiran memang suka mengambil satu hal kecil lalu membawanya terlalu jauh.\n\nJadi coba berhenti sebentar.\n\nTanya ke diri sendiri:\n\"Apakah ini benar-benar harus aku selesaikan malam ini?\"\n\nKalau jawabannya nggak, simpan dulu.\n\nBesok kamu masih boleh memikirkannya lagi dengan kepala yang lebih tenang.\n\nDan kalau kamu butuh tempat buat cerita, aku lebih suka kamu cerita daripada harus berantem sendirian sama isi kepalamu.\n\nPelan-pelan aja ya. 💜\n\n— Putra",
                'fromAuthor' => 'Putra',
                'toAuthor' => 'Vell Vell',
                'isFeatured' => true,
                'isPublished' => true,
            ],
            [
                'title' => 'Open When You Need A Hug',
                'content' => "Vell,\n\nKalau surat ini punya tangan, mungkin sekarang dia lagi meluk kamu.\n\nSayangnya dia cuma kumpulan tulisan di layar.\n\nJadi untuk sementara, anggap aja setiap barisnya bilang:\n\nsini dulu.\nnggak apa-apa.\nistirahat sebentar.\n\nKamu nggak perlu menjelaskan semuanya.\nNggak perlu punya alasan yang sempurna buat merasa capek atau sedih.\n\nKadang manusia memang cuma butuh ditemenin.\n\nJadi anggap aja aku lagi di sebelah kamu, diam sebentar, terus bilang:\n\n\"Aku di sini.\" 💜\n\n— Putra",
                'fromAuthor' => 'Putra',
                'toAuthor' => 'Vell Vell',
                'isFeatured' => true,
                'isPublished' => true,
            ],
            [
                'title' => 'For A Completely Random Day',
                'content' => "Hai Vell,\n\nNggak ada alasan khusus kenapa surat ini ada.\n\nBukan ulang tahun.\nBukan anniversary.\nBukan hari besar.\n\nCuma hari random.\n\nDan mungkin justru itu alasannya.\n\nAku nggak mau semua tulisan di universe ini cuma muncul kalau ada sesuatu yang besar untuk dirayakan.\n\nHari biasa juga bagian dari cerita kita.\n\nJadi kalau kamu menemukan surat ini di hari yang benar-benar biasa, anggap aja ini satu tanda kecil bahwa bahkan hari random pun pantas punya sedikit warna ungu. 💜\n\n— Putra",
                'fromAuthor' => 'Putra',
                'toAuthor' => 'Vell Vell',
                'isFeatured' => false,
                'isPublished' => true,
            ],
            [
                'title' => 'When You Forget How Far You\'ve Come',
                'content' => "Vell,\n\nKadang kita terlalu sibuk melihat apa yang belum selesai sampai lupa melihat berapa banyak hal yang sudah berhasil kita lewati.\n\nJadi kalau suatu saat kamu merasa kurang, coba berhenti sebentar.\n\nLihat ke belakang.\n\nBukan untuk tinggal di masa lalu, tapi untuk mengingat bahwa kamu sudah melewati banyak hari yang dulu mungkin terasa sulit juga.\n\nKamu nggak harus selalu menjadi versi terbaik dari dirimu setiap hari.\n\nCukup terus berjalan.\n\nSedikit pun tetap maju.\n\nAnd for what it's worth, aku bangga sama kamu. 💜\n\n— Putra",
                'fromAuthor' => 'Putra',
                'toAuthor' => 'Vell Vell',
                'isFeatured' => false,
                'isPublished' => true,
            ],
            [
                'title' => 'Read This When You Miss Us',
                'content' => "Vell,\n\nKalau lagi kangen, coba jangan langsung tutup halaman ini.\n\nKeliling sebentar.\n\nBuka Gallery.\nBaca salah satu surat.\nAmbil note dari Memory Jar.\nPutar salah satu lagu di soundtrack kita.\n\nMungkin website kecil ini memang nggak bisa menggantikan keberadaan seseorang secara langsung.\n\nTapi setidaknya di sini ada potongan-potongan kecil yang bisa mengingatkan kalau kita punya cerita.\n\nDan nanti ketika kita punya lebih banyak foto, lebih banyak lagu, lebih banyak cerita, tempat ini bakal jadi semakin ramai.\n\nSampai saat itu...\n\nanggap aja universe kecil ini lagi nemenin kamu kangen. 💜\n\n— Putra",
                'fromAuthor' => 'Putra',
                'toAuthor' => 'Vell Vell',
                'isFeatured' => true,
                'isPublished' => true,
            ],
            [
                'title' => 'For Future Vell',
                'content' => "Hai Vell dari masa depan,\n\nAku nggak tahu kapan kamu membaca ini.\n\nMungkin universe kita saat itu sudah penuh foto.\nMungkin playlist-nya sudah panjang.\nMungkin Memory Jar sudah punya terlalu banyak note buat dihitung.\n\nAtau mungkin kamu cuma sedang scroll halaman lama secara random.\n\nApa pun alasannya, hai.\n\nSurat ini ditulis oleh versi masa lalu dari seseorang yang sedang berusaha menyimpan sedikit bagian dari cerita kita di internet.\n\nAku harap ketika kamu membaca ini, masih ada sesuatu di halaman ini yang bikin kamu tersenyum.\n\nTake care, future Vell. 💜\n\n— Putra dari masa lalu",
                'fromAuthor' => 'Putra',
                'toAuthor' => 'Vell Vell',
                'isFeatured' => false,
                'isPublished' => true,
            ],
            [
                'title' => 'When The Day Feels Too Loud',
                'content' => "Vell,\n\nKalau hari ini terasa terlalu ramai, terlalu banyak orang, terlalu banyak pikiran, atau terlalu banyak hal yang minta perhatian kamu...\n\nkamu boleh mengecilkan dunia sebentar.\n\nNggak semua notifikasi harus dibalas sekarang.\nNggak semua masalah harus selesai hari ini.\nNggak semua orang harus mendapatkan energi kamu sekaligus.\n\nCari tempat yang nyaman.\nMinum sesuatu.\nDengerin lagu.\nDiam sebentar kalau perlu.\n\nDunia masih bisa menunggu beberapa menit.\n\nTake your time.\nAku harap setelah ini semuanya terasa sedikit lebih pelan. 💜\n\n— Putra",
                'fromAuthor' => 'Putra',
                'toAuthor' => 'Vell Vell',
                'isFeatured' => false,
                'isPublished' => true,
            ],
            [
                'title' => 'No Special Reason',
                'content' => "Vell,\n\nAku cuma pengen ninggalin satu surat yang nggak punya konteks apa-apa.\n\nNo special occasion.\nNo dramatic story.\nNo particular reason.\n\nCuma mau bilang:\n\naku senang kamu ada.\n\nItu aja.\n\nKadang hal sederhana nggak perlu dibuat panjang supaya berarti.\n\nJadi kalau kamu buka surat ini secara random, anggap aja kamu baru menemukan satu pesan kecil yang sengaja aku taruh di antara semua halaman universe kita.\n\nHave a nice day, Vell. 💜\n\n— Putra",
                'fromAuthor' => 'Putra',
                'toAuthor' => 'Vell Vell',
                'isFeatured' => false,
                'isPublished' => true,
            ],
            [
                'title' => 'Open When You Need A Little Courage',
                'content' => "Vell,\n\nKalau ada sesuatu yang bikin kamu ragu, aku nggak akan bilang semuanya pasti gampang.\n\nKadang memang nggak gampang.\n\nTapi takut bukan berarti kamu nggak bisa melakukannya.\n\nKamu boleh takut sambil tetap mencoba.\nKamu boleh ragu sambil tetap jalan.\nKamu boleh pelan tanpa berarti mundur.\n\nNggak harus langsung sempurna.\n\nSatu langkah kecil dulu.\nSetelah itu satu lagi.\n\nDan kalau ternyata belum berhasil, setidaknya kamu sudah cukup berani untuk mencoba.\n\nI'm rooting for you. 💜\n\n— Putra",
                'fromAuthor' => 'Putra',
                'toAuthor' => 'Vell Vell',
                'isFeatured' => false,
                'isPublished' => true,
            ],
            [
                'title' => 'Things I Hope We Keep',
                'content' => "Vell,\n\nAda beberapa hal sederhana yang aku harap nggak hilang meskipun waktu terus jalan.\n\nObrolan random.\nCerita kecil yang sebenarnya nggak penting tapi tetap diceritain.\nLagu yang tiba-tiba jadi punya arti.\nFoto yang mungkin nggak sempurna tapi tetap disimpan.\nDan kemampuan buat ketawa karena hal-hal receh.\n\nAku nggak tahu seperti apa halaman-halaman berikutnya dari cerita kita.\n\nTapi aku suka kalau beberapa hal sederhana tetap ikut dibawa.\n\nMaybe that's what makes a story feel like ours. 💜\n\n— Putra",
                'fromAuthor' => 'Putra',
                'toAuthor' => 'Vell Vell',
                'isFeatured' => true,
                'isPublished' => true,
            ],
            [
                'title' => 'A Tiny Place To Come Back To',
                'content' => "Vell,\n\nAku suka satu hal dari website ini:\n\ndia nggak ke mana-mana.\n\nHari boleh sibuk.\nChat bisa tenggelam.\nFoto bisa makin banyak.\nWaktu terus jalan.\n\nTapi kita selalu bisa kembali ke sini dan menemukan potongan kecil dari apa yang pernah kita simpan.\n\nMungkin itu alasan aku suka menyebutnya universe kita.\n\nBukan karena tempatnya besar.\n\nJustru karena kecil.\nPrivate.\nDan isinya hal-hal yang berarti buat kita.\n\nKalau suatu saat kamu bingung mau buka apa, buka aja halaman random.\n\nMaybe you'll find something worth remembering. 💜\n\n— Putra",
                'fromAuthor' => 'Putra',
                'toAuthor' => 'Vell Vell',
                'isFeatured' => false,
                'isPublished' => true,
            ],
            [
                'title' => 'Open When You Need To Hear Something Soft',
                'content' => "Vell,\n\nNggak ada nasihat panjang di sini.\n\nCuma beberapa kalimat lembut buat kamu.\n\nKamu boleh pelan.\nKamu boleh istirahat.\nKamu boleh punya hari yang berantakan.\nKamu nggak harus selalu terlihat kuat.\n\nMakan kalau belum makan.\nMinum kalau lupa minum.\nTarik napas.\n\nDan jangan terlalu keras sama diri sendiri hari ini.\n\nSometimes surviving a difficult day is already enough.\n\nAku harap setelah membaca ini, setidaknya pundak kamu terasa sedikit lebih ringan. 💜\n\n— Putra",
                'fromAuthor' => 'Putra',
                'toAuthor' => 'Vell Vell',
                'isFeatured' => false,
                'isPublished' => true,
            ],
            [
                'title' => 'One More Page For You',
                'content' => "Vell,\n\nIni satu halaman lagi buat kamu.\n\nLucu juga kalau dipikir-pikir.\n\nAwalnya cuma sebuah website kecil.\nLalu mulai ada surat.\nAda note.\nAda lagu.\nNanti ada foto.\nAda cerita.\nDan pelan-pelan halaman kosong mulai punya isi.\n\nMungkin hubungan juga sedikit seperti itu.\n\nBukan satu momen besar yang langsung membuat semuanya lengkap.\n\nTapi banyak hal kecil yang terus ditambahkan.\n\nOne conversation.\nOne laugh.\nOne photo.\nOne memory at a time.\n\nJadi ini satu tambahan kecil lagi untuk universe kita.\n\nOne more page for you. 💜\n\n— Putra",
                'fromAuthor' => 'Putra',
                'toAuthor' => 'Vell Vell',
                'isFeatured' => true,
                'isPublished' => true,
            ]
        ];

        foreach ($letters as $letter) {
            \App\Models\Letter::firstOrCreate(
                ['title' => $letter['title']],
                $letter
            );
        }

        // Add Jar Notes Idempotently
        $jarNotes = [
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

        foreach ($jarNotes as $note) {
            \App\Models\JarNote::firstOrCreate(
                ['content' => $note],
                ['isPublished' => true]
            );
        }

        // Add Birthdays
        \App\Models\SpecialDate::updateOrCreate(
            ['title' => "Vell Vell's Birthday"],
            [
                'date' => '2006-02-17 00:00:00',
                'type' => 'Birthday',
                'description' => 'Happy Birthday to my pretty girl! 💜',
                'icon' => 'Cake',
                'recurringYearly' => true,
            ]
        );

        \App\Models\SpecialDate::updateOrCreate(
            ['title' => "Putra's Birthday"],
            [
                'date' => '2005-06-16 00:00:00',
                'type' => 'Birthday',
                'description' => 'My special day.',
                'icon' => 'Gift',
                'recurringYearly' => true,
            ]
        );

        // Add Adventures
        $adventures = [
            "Watch the sunset together",
            "Take a photobooth picture",
            "Cook something new",
            "Go somewhere without planning",
            "Recreate our first date",
            "Take matching photos"
        ];

        foreach ($adventures as $index => $adv) {
            \App\Models\Adventure::firstOrCreate(
                ['title' => $adv],
                ['isCompleted' => false, 'sortOrder' => $index]
            );
        }

        // Add Dreams
        $dreams = [
            [
                'title' => "Watch the sunset at the beach",
                'description' => "Just you, me, and the sound of the waves.",
                'status' => "Dreaming",
            ],
            [
                'title' => "Go on a late night food run",
                'description' => "",
                'status' => "Planned",
            ],
            [
                'title' => "Take a photobooth picture together",
                'description' => "",
                'status' => "Done 💜",
            ],
        ];

        foreach ($dreams as $index => $dream) {
            \App\Models\Dream::firstOrCreate(
                ['title' => $dream['title']],
                [
                    'description' => $dream['description'],
                    'status' => $dream['status'],
                    'sortOrder' => $index,
                ]
            );
        }
    }
}
