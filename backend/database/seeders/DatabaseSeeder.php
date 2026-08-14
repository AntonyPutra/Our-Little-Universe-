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
        \App\Models\CoupleSetting::firstOrCreate(
            ['id' => 'global'],
            ['coupleData' => json_encode([
                'names' => 'Putra & Vell Vell',
                'theme' => 'dark',
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

        // Add Letters Idempotently
        $letters = [
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
    }
}
