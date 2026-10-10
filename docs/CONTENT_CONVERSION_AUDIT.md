# Content, AI Search & Conversion Audit

**Tanggal:** 10 Oktober 2026  
**Repository:** `/home/kenzo/unisportbar/unisportbar_kuta-1`  
**Production:** <https://unisportbar.balisuksma.digital/>  
**Jenis pekerjaan:** audit saja. Tidak ada perubahan application code dan tidak ada deployment.

## 1. Executive Summary

Landing page menyampaikan kategori umum UNI Sport Bar Café, area Kuta/Benesari, food and drinks, sports atmosphere, kontak, dan WhatsApp. Konten utama ada pada initial HTML. Hambatan conversion terbesar: **“Explore the Menu” hanya scroll ke kartu kategori tanpa menu aktual**; **“Book a Table” membuka chat WhatsApp**, bukan booking/konfirmasi. Pengunjung tidak dapat melihat menu/harga atau tahu apakah permintaan meja diterima. Klaim live sports tidak menjelaskan olahraga/kompetisi; event dan jam buka belum diverifikasi.

Brand website dan JSON-LD tetap “UNI Sport Bar Café” / `Restaurant`. Pemilik mengonfirmasi UNI Sport Bar Café berbagi Google Business Profile dengan UNI Sushi Asian Fusion. Embed yang ada dipertahankan dan perbedaan label bukan error. Canonical domain website adalah `https://unisportbar.balisuksma.digital/`; `www.unicafebali.com` tidak digunakan sebagai canonical, `sameAs`, atau official website.

Homepage production merespons 200, tetapi masih menyajikan versi sebelum perubahan canonical dan title iframe lokal. `/sitemap.xml` dan `/menu` live merespons 404. Ini sesuai dengan working tree lokal yang belum dideploy. Screenshot/browser rendering, GA4 property settings, booking/contact delivery, hours, actual menu, sports schedule, dan Search Console **NOT VERIFIED**.

## 2. Scope and Evidence Limitations

- Membaca `docs/AI_SEARCH_AUDIT.md` sepenuhnya dan memeriksa Git status. Ada perubahan lokal terdahulu di `index.html`, `robots.txt`, `sitemap.xml`, dan `docs/`; tidak ditimpa.
- Inspeksi `index.html`, `styles.css`, `robots.txt`, `sitemap.xml`, `package.json`, `ASSET_MAPPING.md`, `LP_ASSET_MAP.csv`, dan inline Google Analytics.
- HTTP read-only ke production pada 10 Oktober 2026; homepage 200, robots 200, sitemap 404, `/menu` 404.
- Kualitatif search web untuk intent sports bar Benesari/Legian/Kuta dan football. Tidak memakai data keyword volume/ranking.
- Tidak ada browser screenshot, Lighthouse/CrUX, tes tap target, call/WhatsApp/email, atau GA4 Admin access. Source tidak membuktikan tampilan/rendering aktual.
- Hasil search hanya snapshot kualitatif; bukan bukti ranking, search volume, keyword difficulty, atau lokasi kompetitor terdekat.

## 3. Section-by-Section Content Audit

| Section | Severity | Bukti dan penilaian | Dampak | Rekomendasi / verifikasi |
|---|---|---|---|---|
| Header/navigation | **Medium** | `index.html:55–78`; anchor nav relevan dan ada CTA “Book a Table”. Checkbox toggle disembunyikan (`styles.css:24`); label hanya tiga garis tanpa button semantics/focusability/ukuran sentuh yang ditetapkan (`index.html:68–69`, `styles.css:98–103`). | Keyboard users mungkin tidak bisa membuka nav; target sentuh source hanya sekitar 24×14 CSS px, belum diukur setelah render. | Jadikan toggle accessible/focusable dengan target sentuh nyaman, tanpa redesign. Tes browser mobile, keyboard, screen reader. |
| Hero | **Medium** | `index.html:83–103`. H1 “Sports. Food. Good Times.” emosional namun tidak menyebut nama usaha/kategori/lokasi. Supporting copy baru menyebut sport bar di Kuta, cold drinks, great food, live atmosphere. CTA “Book a Table” dan “Explore the Menu” langsung terlihat di markup. | Visitor paham vibe tetapi harus membaca lebih jauh untuk memahami bisnis. “matches worth staying up for” dapat menyiratkan jam larut/availability yang belum terverifikasi. | Pertahankan H1 visual; tambahkan satu kalimat answer-first nama/kategori/alamat area, dan cara bertanya tentang game. Verifikasi wording dengan pemilik. |
| Experience | **Low** | `index.html:106–125`; intro “eat, watch & stay” dan paragraf atmosfer; stats mengulang good food/cold drinks/live sports. | Tone ramah dan foto mendukung kepercayaan, tetapi sedikit fakta baru untuk memilih venue. | Ringkas repetisi; gunakan hanya ruang yang perlu untuk informasi faktual terkonfirmasi. |
| Food & drinks | **High** | `index.html:127–173`; copy menyebut Asian-inspired favourites, sushi, snacks, drinks; kartu hanya FOOD/SUSHI/DRINKS. Foto sushi/sharing plate/cocktail tercatat di asset maps, tetapi bukan menu atau harga. | Tidak bisa mengecek item, harga, dietary options sebelum berkunjung/menghubungi venue. CTA menu tidak sesuai isi. | Link ke menu aktual yang dirawat, atau ubah CTA menjadi “See Food & Drinks” menuju `#food`. Konfirmasi menu/harga/currency/update owner; jangan mengarang. |
| Sports | **High** | `index.html:175–193`; live sports dan “the game” bersifat umum. CTA WhatsApp menanyakan “what’s showing tonight?”. Foto menunjukkan sports-screen atmosphere menurut asset map, bukan jadwal atau kompetisi. | Tidak menjawab olahraga apa yang ditayangkan atau apakah game yang dicari tersedia. | Sebutkan olahraga/kompetisi hanya setelah dikonfirmasi. Pertahankan CTA tanya jadwal jika availability berubah; jangan menjanjikan pertandingan. |
| Events | **High** | `index.html:195–220` mengklaim happy hour daily 6–8 PM, live music weekends, trivia Tuesdays, game-day specials. Tidak ada tanggal update, kondisi promo, atau event CTA. | Informasi mingguan bisa basi; “Every week” menyiratkan rutin dan berlaku sekarang. | Konfirmasi item yang masih berlaku. Tambah proses update atau gunakan “Ask about current events”. |
| Gallery | **Low** | `index.html:223–282`; interior, sushi, cocktail, entrance, event board. Alt beberapa deskriptif, beberapa generik (“UNI food”, “UNI interior”); event board muncul dua kali (`index.html:217, 279`). | Visual mendukung suasana; repetisi/generic alt mengurangi konteks nonvisual. | Pertahankan foto relevan, perjelas alt sesuai isi gambar tanpa keyword stuffing; cek gambar aktual. |
| Location/contact | **High** | `index.html:285–300`; alamat Jl. Benesari, Kuta, Badung, Bali 80361; phone/email dan peta. Tombol Maps memakai query umum (`index.html:293`), iframe memakai shared GBP yang sama menurut pemilik (`index.html:298`). Alamat tidak menyebut Legian. | Info dasar ada. Search query tidak terbukti membuka listing yang sama dengan embed; Kuta/Legian intent belum dijelaskan. | Pertahankan embed. Uji Maps button dan cocokkan dengan URL share resmi shared GBP jika diberikan pemilik. Konfirmasi wording area/alamat. |
| Final CTA | **High** | `index.html:303–308`; CTA “Book a Table” ke WhatsApp prefilled “I'd like to book a table.” | Ini permintaan booking lewat chat, bukan konfirmasi booking. Tujuan setelah klik tidak dijelaskan. | Bila staf menangani booking via WhatsApp, jelaskan alurnya; jika belum dikonfirmasi gunakan label “Ask about a table on WhatsApp”. Konfirmasi proses. |
| Footer | **Low** | `index.html:312–326`; ulang nama/alamat, `tel:`, `mailto:`, copyright. Phone dapat di-tap di footer, tetapi bukan di blok contact utama. | Kontak mudah dicari setelah scroll; call shortcut tidak ada dekat address. | Pertimbangkan `tel:` pada phone utama memakai nomor yang sudah tercantum. Tes link pada perangkat; konfirmasi kontak aktif. |
| JSON-LD / FAQ | **Medium** | `index.html:328–355`; satu `Restaurant`, brand UNI Sport Bar Café, address, contacts, shared Maps `sameAs`, hours 08:00–23:00. Hours tidak ada di copy. FAQ tidak ada. | Hours structured data tidak didukung visible page dan belum diverifikasi. Shared GBP bukan error; nama/type cocok dengan brand halaman. | Jangan ubah business name/type/Maps berdasarkan asumsi. Konfirmasi hours dahulu dan sinkronkan hanya fakta resmi. FAQ tidak perlu kecuali ada jawaban factual yang dijaga mutakhir. |

## 4. AI Search and Answer Readiness Matrix

| Pertanyaan | Status | Bukti / batasan |
|---|---|---|
| What is UNI Sport Bar Café? | **Clearly answered** | Intro menyebut café/sport bar, food, drinks, sports (`index.html:97, 110–115`), walau cukup generik. |
| Where is it located? | **Clearly answered** | Jl. Benesari, Kuta, Badung, Bali 80361 tertulis (`index.html:290, 323`); rute/jarak belum ada. |
| Is it in Benesari, Legian, or Kuta? | **Partially answered** | Benesari dan Kuta tertulis, Legian tidak. Jangan sebut alamat Legian sebelum konfirmasi. |
| What food and drinks are available? | **Partially answered** | Asian-inspired food, sushi, snacks, drinks; tidak ada item/harga (`index.html:135, 148–170`). |
| Can visitors watch live sports? | **Partially answered** | Page mengklaim live sports dan menyediakan CTA bertanya (`index.html:114, 190–192`); layanan aktual belum diverifikasi. |
| Which sports/competitions are shown? | **Requires business verification** | Tidak disebut di page. Jangan menebak football, Premier League, AFL, UFC, dll. |
| What are verified opening hours? | **Requires business verification** | Visible hours tidak ada; JSON-LD mengklaim 08:00–23:00 belum diverifikasi (`index.html:339–345`). |
| How can visitors contact the venue? | **Clearly answered (reachability unverified)** | Phone, email, WhatsApp ada (`index.html:77, 192, 291–294, 324`); audit tidak menghubungi. |
| How can visitors navigate there? | **Partially answered** | Maps button dan iframe ada; iframe menuju shared GBP. Tujuan tombol query belum diuji click-through. |

Initial HTML sudah berisi teks utama, alamat, kontak, CTA, dan JSON-LD. JavaScript tidak dibutuhkan untuk memahami konten. Konten yang jelas mendukung retrieval, tetapi tidak menjamin sitasi/rekomendasi AI.

## 5. Conversion Funnel and CTA Audit

| Tahap | Kondisi | Friction |
|---|---|---|
| Discovery | Hero “Sports. Food. Good Times.”, eyebrow “KUTA · BALI”. | H1 tidak menyebut nama atau jenis venue. |
| Understand | Intro, food, sports, events. | Food dan sport detail tidak cukup untuk keputusan spesifik. |
| Evaluate | Foto, alamat, kontak, map. | Tidak ada menu/harga, verified hours, sports schedule, atau booking process yang jelas. |
| Action | WhatsApp booking/sports inquiry, Maps, email/phone. | “Explore the Menu” bukan menu; “Book a Table” merupakan chat request; Maps search belum pasti direct ke shared listing. |

### CTA inventory

- **Book a Table** (`index.html:77, 99, 307`): tiga penempatan konsisten; WhatsApp prefilled meminta booking. Sistem booking/konfirmasi tidak ada di source dan tidak diverifikasi.
- **Explore the Menu** (`index.html:100`): menuju `#food`, bukan menu; anchor bekerja tetapi label membentuk ekspektasi berlebihan.
- **Ask what's on** (`index.html:192`): WhatsApp bertanya jadwal malam itu; cocok untuk informasi yang berubah, tetapi respons tidak dijamin.
- **Open in Google Maps** (`index.html:293`): generic Maps Search URL. Destination result **NOT VERIFIED**; verifikasi terhadap shared GBP sebelum mengganti.
- **WhatsApp UNI** (`index.html:294`): inquiry chat, bukan booking confirmation.
- **Phone/email** (`index.html:324`): `tel:` dan `mailto:` footer; validitas aktif belum dites.

Primary intended conversion ialah **WhatsApp table inquiry**. Secondary: tanya jadwal olahraga, buka peta, telepon, email. Click tidak membuktikan booking berhasil, kunjungan, atau penjualan.

## 6. Menu, Contact, and Directions Findings

### Menu — High

`index.html:99–100, 127–173`; `/menu` production 404 pada audit. Solusi minimum jika belum ada menu: ubah CTA menjadi “See Food & Drinks” menuju `#food`. Jika menu resmi ada, link langsung ke daftar terpelihara dengan item/harga/currency terkonfirmasi. Jangan buat item/harga/diet labels.

### Contact — Medium

Nomor `+62 895-4216-45000`, email `contact@unicafebali.com`, dan WhatsApp dengan nomor yang sama tampak di source. `tel:`/`mailto:` ada di footer. Booking prefill menunjukkan request, bukan reservasi tuntas. Tes call/message/email dan konfirmasi siapa yang menjawab; jangan menambah metode kontak baru.

### Directions — Medium

Embed shared GBP dikonfirmasi pemilik dan tidak diganti. Tombol memakai search query `UNI Sport Bar Cafe Kuta Bali`, bukan place URL eksplisit. Uji pada Android/iOS/desktop; gunakan URL share/directions resmi shared profile hanya setelah pemilik memberikannya. Canonical tetap domain landing page ini; jangan gunakan `www.unicafebali.com` sebagai official website/`sameAs`.

## 7. Mobile UX and Conversion Friction

**Source inspection saja; visual rendering tidak diverifikasi.**

- Hero memiliki min-height 680px juga di mobile (`styles.css:25, 112–120`); h1/copy/dua CTA bisa menempatkan tombol di bawah fold pada layar pendek. Perlu screenshot nyata.
- Nav checkbox `display:none`; label hamburger tiga garis 24×2px dan gap 4px (`styles.css:24, 98–103`). Label bukan button/focus target; potensi keyboard issue. Ukuran target final belum diukur browser.
- Breakpoints 900/620px menumpuk section dan footer (`styles.css:98–134`); tanpa browser tidak bisa klaim overflow/readability aktual.
- Gambar menggunakan responsive AVIF/WebP, hero `fetchpriority="high"`, gambar lain lazy, dan alt tersedia. Network transfer tidak diukur. Sebagian alt generik dan event board berulang.
- Map iframe lazy-loaded; map tingginya 360px pada mobile (`styles.css:125`), bisa memakan scroll area namun memberi fungsi navigasi.

Prioritaskan semantics/focus/tap target nav, satu primary action dengan label akurat, lalu ukur hero first-screen pada viewport nyata. Pertahankan desain visual.

## 8. Local Trust and Business Identity

- Nama halaman dan schema: UNI Sport Bar Café. Google Maps listing “UNI Sushi Asian Fusion” adalah shared GBP yang dikonfirmasi pemilik; pertahankan iframe/listing, jangan buat profil kedua.
- Alamat halaman: Jl. Benesari, Kuta, Badung, Bali 80361. Copy tidak menyebut Legian; konfirmasi wording target area, jangan memasukkan keyword sebagai alamat.
- Phone/email konsisten antar lokasi/footer/WhatsApp dari sisi markup; deliverability tidak diperiksa.
- Hours 08:00–23:00 hanya JSON-LD dan belum diverifikasi.
- Page mengatakan Asian-inspired food, sushi, snacks, drinks; item/harga tidak tersedia.
- Live sports/events adalah klaim page; program olahraga, channel, jadwal, hours, promo validity belum diverifikasi.
- Canonical domain landing page: `https://unisportbar.balisuksma.digital/`. `www.unicafebali.com` tidak dianggap website resmi/related site, canonical, atau `sameAs`.

## 9. Analytics and Conversion Measurement

**Terpasang di source (`index.html:23–50`):** GA4 measurement ID `G-S0TY5E7ZP6`, `dataLayer`, `gtag('config', ...)`; library dimuat setelah `load` + 3 detik/idle. Ini menunjukkan konfigurasi pageview diniatkan bila script/properti berjalan; data receipt belum diverifikasi.

**Tidak ditemukan:** `gtag('event', ...)`, GTM, listeners atau explicit custom events untuk menu, Maps/directions, phone, WhatsApp, booking inquiry. GA4 Enhanced Measurement mungkin merekam outbound clicks jika diaktifkan pada property; setting itu tidak dapat dilihat dari repository.

**Usulan setelah approval:** click events bernama `menu_cta_click`, `maps_directions_click`, `phone_click`, `email_click`, `whatsapp_click`; bedakan CTA location/intent via parameter aman seperti `cta_location`, jangan kirim teks pesan/PII. Validasi GA4 DebugView/Realtime. Event click tetap bukan bukti booking/visit/sale.

## 10. Prioritized Recommendations

| Urutan / Severity | Rekomendasi dan bukti | Impact | Complexity | Verification |
|---|---|---|---|---|
| 1 — **High** | Perbaiki “Explore the Menu” ke menu aktual atau rename agar sesuai section (`index.html:99–100, 127–173`). | Hilangkan dead-end ekspektasi; bantu visitor evaluasi food. | Rendah untuk rename; sedang untuk menu berkelanjutan. | Cek destination ada item terkini atau section benar; mobile test. |
| 2 — **High** | Label table CTA harus jelas bahwa tindakan membuka WhatsApp inquiry (`index.html:77, 99, 293–307`). | Ekspektasi booking tepat; mengurangi kebingungan. | Rendah. | Pemilik konfirmasi proses; tes pesan/response. |
| 3 — **High** | Konfirmasi food/menu, sports availability, jam dan event sebelum copy/schema menyatakannya (`index.html:127–205, 339–345`). | Keputusan pengunjung dan trust lokal. | Rendah plus maintenance owner. | Persetujuan tertulis dan proses update. |
| 4 — **Medium** | Verifikasi Maps Search button terhadap shared GBP; gunakan official share URL bila disetujui (`index.html:292–298`). | Directions satu langkah konsisten. | Rendah setelah URL diterima. | Klik di iOS/Android/desktop; cocokkan listing. |
| 5 — **Medium** | Tambahkan lead sentence factual tentang nama, kategori, Benesari/Kuta wording (`index.html:94–111, 287–290`). | Visitor lokal lebih cepat memahami usaha. | Rendah. | Pemilik setujui alamat/area; cek initial HTML. |
| 6 — **Medium** | Tingkatkan semantic/focus/touch mobile nav tanpa mengubah desain (`index.html:68–70`, `styles.css:24, 98–103`). | Kurangi friction/accessibility. | Rendah–sedang. | Keyboard, screen reader, viewport/tap test. |
| 7 — **Medium** | Verifikasi recurring events/hours dan tampilkan last-updated policy atau hilangkan klaim tidak aktif (`index.html:195–205, 339–345`). | Cegah kunjungan atas informasi basi. | Rendah plus ongoing process. | Owner confirmation, page/schema/GBP consistency. |
| 8 — **Low** | Perjelas alt generik dan pertimbangkan pengulangan event image (`index.html:236, 245, 261, 270, 279`). | Informasi gambar lebih berguna untuk nonvisual. | Rendah. | Cocokkan alt dengan foto asli, bukan keyword. |
| 9 — **Low** | Tambah GA4 CTA click events setelah taxonomy disetujui. | Pahami tindakan visitor, bukan hasil booking. | Sedang. | GA4 DebugView/Realtime. |

Belum ditemukan P0 yang mencegah seluruh visitor menggunakan situs. Production homepage 200. Canonical/sitemap/title iframe lokal belum live; jangan menganggap perubahan lokal sudah diluncurkan.

## 11. Proposed Content Improvements

Copy Inggris berikut adalah **draft yang memerlukan konfirmasi bisnis**. Tidak menambah jam, harga, cabang olahraga, jadwal, atau jaminan booking.

**Answer-first hero draft:**

> UNI Sport Bar Café is a café and sports bar on Jl. Benesari in Kuta, Bali. Join us for food, drinks and a game-day atmosphere.

Confirm wording Kuta/Legian dan frasa game-day sebelum publish. Current H1 boleh dipertahankan sebagai headline visual.

**Sports CTA draft:** `Ask us on WhatsApp what's showing`  
Supporting text: “Looking for a particular game? Message us before you visit to ask what’s showing.”

**Menu CTA draft if no menu is ready:** `See Food & Drinks` (tetap target `#food`; jangan sebut menu).

**Table inquiry draft:** `Ask about a table on WhatsApp` (konfirmasi bahwa inquiry meja ditangani via WA).

**Optional map explanation draft:** “Google Maps may display this shared business profile as UNI Sushi Asian Fusion.” Pemilik telah mengonfirmasi shared profile; tampilkan copy ini hanya bila bisnis setuju bahwa penjelasan visual berguna. Jangan ubah embed listing.

## 12. Business Questions Requiring Confirmation

1. Apakah jam usaha memang 08:00–23:00 setiap hari, termasuk hari libur dan match larut?
2. Apa menu/item/harga/currency yang berlaku dan siapa yang update?
3. Olahraga/kompetisi/channel apa yang biasanya tersedia? Apakah request game bisa dilakukan, tanpa jaminan tayang?
4. Apakah booking ditangani lewat WhatsApp dan bagaimana staff mengonfirmasi meja?
5. Wording alamat promosi yang benar: Kuta, Legian area, atau Kuta/Legian area? Konfirmasi alamat fisik.
6. Apakah Maps search button membuka shared GBP yang sama di berbagai perangkat? Adakah official share/directions URL?
7. Apakah daily happy hour, weekend music, Tuesday trivia, game-day specials masih berjalan dan dengan syarat apa?
8. Apakah nomor dan email yang tampil dimonitor untuk visitor inquiry?
9. Profil sosial mana yang resmi dan ingin ditautkan? Jangan menebak.
10. Apakah GA4 Enhanced Measurement/consent configuration merekam outbound clicks? Tidak bisa dilihat dari repo.

## 13. Validation Checklist

- [ ] Business menyetujui setiap draft Inggris/fakta mutable.
- [ ] Menu CTA menuju menu current atau label cocok dengan food section.
- [ ] WhatsApp buka nomor benar; staff menjelaskan inquiry/confirmation.
- [ ] Maps button diuji lintas device dan diarahkan ke shared GBP terkonfirmasi; embed tidak diganti.
- [ ] Wording Benesari/Kuta/Legian dan full address disetujui.
- [ ] Jam/events/sports claims visible copy, JSON-LD, GBP konsisten.
- [ ] Mobile nav keyboard, screen reader, touch target, first-screen CTA dites di browser.
- [ ] Semua `tel:`, `mailto:`, WhatsApp dan CTA destinations berfungsi.
- [ ] Alt text cocok dengan foto; hindari repetisi/keyword stuffing.
- [ ] GA4 event DebugView setelah implementasi disetujui; clicks dibedakan dari booking outcome.
- [ ] Search Console/Bing data diperiksa sebelum kesimpulan demand/ranking.
- [ ] Production dibandingkan ulang setelah deploy terpisah yang disetujui; canonical/sitemap lokal saat ini belum live.

## 14. Recommended Phase 2 Implementation Plan

1. **Konfirmasi bisnis:** hours, menu, sports, booking via WA, alamat wording, event validity dan official Maps share URL. Pertahankan shared GBP/embed dan canonical domain.
2. **Quick content/UI copy:** bila disetujui, rename menu CTA ke “See Food & Drinks”, perjelas WhatsApp sebagai inquiry, tambah one-sentence answer-first summary. Pertahankan visual system.
3. **Konten nyata:** halaman/menu hanya jika ada item/harga dan pemilik maintenance; sports schedule hanya jika bisa dirawat, jika tidak gunakan ask-us CTA.
4. **Trust consistency:** tampilkan only verified hours, promo, sports and location wording; sinkronkan visible copy/schema tanpa mengubah business name/type tanpa fakta baru.
5. **Mobile access:** betulkan semantics/focus/target nav dan uji perangkat nyata.
6. **Measurement:** setelah definisi metric disetujui, tambahkan CTA click events dan validasi GA4; jangan klaim booking completion dari click.
7. **Validation/release:** cek links/copy/mobile/performance/analytics; bedakan local files dari live. Deploy hanya dengan persetujuan terpisah.

### Qualitative search intent observations

Search sample 10 Oktober 2026 menampilkan official pages untuk [Pavilion Surf Club](https://pavilionsurfclub.com/), [Winx Sports Bar](https://www.winxsportsbar.com/), dan [Y Sport Bar Legian](https://www.ysportsbarbali.com/legian). Halaman Pavilion/Winx/Y menyebut olahraga lebih spesifik; Pavilion juga menampilkan schedule, lokasi/kontak, menu dan booking actions. Ini observasi isi competitor pages untuk intent terkait, **bukan ranking/volume/difficulty** atau rekomendasi pesaing. Implikasi: informasi spesifik yang selalu dipelihara membantu keputusan, tetapi UNI hanya sebaiknya publish fakta yang benar dan sanggup diperbarui.
