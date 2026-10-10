# Audit AI Search Visibility & Technical SEO

**Tanggal pemeriksaan:** 10 Oktober 2026 (UTC; respons production bertanggal 10 Oktober 2026)  
**Target:** <https://unisportbar.balisuksma.digital/>  
**Metode:** inspeksi repository, pemeriksaan HTTP read-only ke production, uji user-agent dengan header crawler, serta pencarian publik terbatas. Tidak ada kode aplikasi yang diubah.

> Label **CONFIRMED** berarti terlihat langsung di repository atau respons production saat diperiksa. **NOT VERIFIED** berarti memerlukan browser/lab, Search Console/Bing Webmaster, akses konfigurasi hosting/WAF, akses Google Business Profile, atau konfirmasi pemilik.

## 1. Executive Summary

Website berupa landing page HTML statis yang memuat teks utama, alamat, kontak, dan JSON-LD langsung dalam initial HTML. Homepage production merespons HTTP 200; `robots.txt` mengizinkan semua user-agent, dan semua user-agent crawler yang diuji juga mendapat HTTP 200. Tidak terlihat sinyal `noindex` atau header `X-Robots-Tag` pada response homepage. Jadi bukti saat ini tidak menunjukkan pemblokiran crawl di level halaman.

Kesiapan technical SEO dasar **cukup**, tetapi kesiapan local/entity SEO dan citation-readiness **sedang**. Kekurangan utamanya bukan ketiadaan konten yang bisa dibaca crawler, melainkan beberapa sinyal fakta yang perlu diperjelas: jam buka 08:00–23:00 hanya ada di JSON-LD, tidak terlihat pada konten; halaman menegaskan live sports tetapi tidak menyebut liga/olahraga spesifik atau informasi siaran aktual. Canonical dan sitemap sebelumnya tidak tersedia; keduanya kini ditambahkan secara lokal.

### Klarifikasi identitas bisnis (dikonfirmasi pemilik)

UNI Sport Bar Café dan UNI Sushi Asian Fusion memakai **Google Business Profile yang sama**. Karena itu, Google Maps embed/listing yang ada tidak diklasifikasikan sebagai kesalahan teknis dan dipertahankan. Nama yang terlihat pada listing/embed adalah “UNI Sushi Asian Fusion”, sedangkan brand landing page dan nama di JSON-LD tetap “UNI Sport Bar Café”. Ini perbedaan label listing dan brand halaman pada shared profile/lokasi; halaman tidak menyiratkan adanya profil Google terpisah atau hubungan tambahan di luar shared profile yang dikonfirmasi. Title iframe kini menjelaskan perbedaan nama itu.

URL canonical situs ditetapkan ke `https://unisportbar.balisuksma.digital/`. `www.unicafebali.com` tidak terkait dengan landing page standalone ini dan tidak digunakan sebagai canonical, `sameAs`, atau official website. Nama bisnis dan schema yang sudah ada ditinjau: teks tampak menggunakan UNI Sport Bar Café dan JSON-LD memakai `Restaurant`; keduanya dipertahankan tanpa perubahan tipe/nama atau penambahan fakta bisnis.

Production berstatus HTTP 200. Pada baseline audit sebelum perubahan lokal, `/sitemap.xml`, `/sitemap_index.xml`, `/llms.txt`, serta route `/menu`, `/live-sports`, `/about`, `/contact`, dan `/location` merespons 404. Source kini menambahkan sitemap; status endpoint production setelah deploy belum diperiksa. Hal ini tidak membuktikan homepage tidak terindeks; status indeks **NOT VERIFIED** tanpa Search Console/Bing Webmaster.

Tidak ada skor Core Web Vitals/Lighthouse/CrUX yang dapat dipastikan dari pemeriksaan ini. Source menunjukkan beberapa optimasi gambar sudah dilakukan, sementara map pihak ketiga dan target interaksi menu mobile perlu verifikasi browser nyata.

## 2. Current Architecture

- **Framework:** static HTML/CSS; tidak ditemukan FastAPI, Jinja, server application, router, atau build framework. `package.json` hanya menyediakan `optimize:images` dengan dependency `sharp`.
- **Entrypoint / public page:** root `index.html`. Semua navigasi adalah anchor ke section satu halaman (`#experience`, `#food`, `#sports`, `#events`, `#gallery`, `#location`). Tidak ada halaman lain terkonfigurasi dalam repository.
- **Server rendering:** konten bisnis dirender langsung dalam HTML. Request production mengembalikan HTML berisi konten dan JSON-LD; JavaScript tidak dibutuhkan untuk membaca teks utama. Google Analytics dimuat belakangan melalui inline script.
- **Metadata:** title, meta description, robots, Open Graph, Twitter Card ditulis langsung pada `<head>` (`index.html:7–21`). Metadata tidak punya mekanisme shared/template.
- **Canonical:** sebelumnya tidak ada. Kini source menetapkan `https://unisportbar.balisuksma.digital/` sebagai canonical homepage.
- **Robots:** `robots.txt` mengizinkan semua user-agent dan kini menyatakan `Sitemap: https://unisportbar.balisuksma.digital/sitemap.xml`.
- **Sitemap:** sebelumnya tidak tersedia dan `/sitemap.xml` 404 di production. Kini repository memiliki sitemap XML statis dengan satu URL canonical homepage. Production belum dideploy, sehingga endpoint live setelah perubahan **NOT VERIFIED**.
- **Structured data:** satu blok JSON-LD `Restaurant` di bagian akhir `index.html:327–355`.
- **Internal linking:** navigasi internal mengarah ke section pada homepage. CTA utama WhatsApp, tombol peta Google, dan iframe Maps merupakan outbound links/embeds. Tidak ada internal link antar halaman karena situs satu halaman.
- **Response behavior:** root HTTPS menghasilkan HTTP 200 melalui Vercel. HTTP non-TLS mengalihkan satu kali ke HTTPS. URL dengan dan tanpa trailing slash keduanya merespons 200, tanpa redirect di antara kedua bentuk; canonical source kini menetapkan homepage HTTPS tanpa `www` sebagai URL pilihan. `www` **NOT VERIFIED** karena DNS gagal resolve saat dites.
- **Mobile:** CSS memiliki breakpoint 900px dan 620px (`styles.css:98–134`), layout satu kolom pada layar kecil, dan navigation toggle CSS. Semantik dan ukuran target toggle perlu ditingkatkan/diuji.

## 3. Technical Findings

| ID | Severity | Status dan bukti | Dampak | Rekomendasi |
|---|---|---|---|---|
| T1 | **Informational** | **CONFIRMED BY OWNER:** Google Maps listing yang dipakai embed adalah Google Business Profile bersama UNI Sport Bar Café dan UNI Sushi Asian Fusion. `index.html:296–298` mempertahankan listing yang sama; nama tampilan map adalah “UNI Sushi Asian Fusion”, sementara brand landing page adalah “UNI Sport Bar Café”. `title` iframe kini menjelaskan dua label tersebut. | Tanpa penjelasan label, pengguna assistive technology bisa bingung mengapa map menyebut nama berbeda. Ini bukan masalah teknis listing setelah shared profile dikonfirmasi. | Pertahankan Google Maps listing yang sama. Jangan buat profil kedua atau mengubah nama/schema hanya demi menyamakan display name. |
| T2 | **High** | **CONFIRMED:** `index.html:338–344` mengklaim buka setiap hari 08:00–23:00 melalui JSON-LD. Jam ini tidak tampil di halaman dan kebenarannya **NOT VERIFIED**. | Structured data bisa memberi fakta lokal yang tidak didukung konten terlihat atau sudah kedaluwarsa. | Konfirmasi jam aktif dan zona waktu dengan pemilik/GBP. Tampilkan jam faktual pada halaman lalu sinkronkan schema dan profil; jika belum bisa dikonfirmasi, hapus properti jam sampai terverifikasi. |
| T3 | **High** | **CONFIRMED:** homepage menargetkan “Kuta” di title, H1 hero bersifat generik, dan menyebut “live sports” secara umum (`index.html:19–20, 94–96, 188–191`). Tidak ada liga, cabang olahraga yang rutin ditayangkan, daftar pertandingan, atau jadwal siaran. | Tidak menjawab pertanyaan “where to watch football/Premier League” secara spesifik; klaim pertandingan yang tersedia tidak dapat dinilai sebelum kunjungan. | Tambahkan jawaban faktual ringkas mengenai olahraga/liga dan cara mengecek pertandingan hanya setelah dikonfirmasi oleh venue. Jangan mempublikasikan jadwal live yang tak ada pemilik/pemelihara. |
| T4 | **Low** | **CONFIRMED:** source tidak menautkan profil sosial; `sameAs` hanya berisi shared Maps profile (`index.html:336–337`). Tidak ada tautan `www.unicafebali.com` di schema. | Entity disambiguation dari profil sosial resmi tidak tersedia pada halaman. | Tambahkan `sameAs` hanya untuk akun resmi yang dikonfirmasi pemilik. `www.unicafebali.com` tidak terkait dengan landing page standalone ini dan tidak boleh digunakan sebagai canonical, `sameAs`, atau official website. |
| T5 | **Medium** | **CONFIRMED BEFORE LOCAL CHANGE:** tidak ada canonical di source; URL `/` dan URL tanpa slash merespons 200. Kini canonical source ditetapkan ke `https://unisportbar.balisuksma.digital/`; deployment/response production setelah perubahan **NOT VERIFIED**. HTTP sebelumnya dialihkan ke HTTPS. `www` **NOT VERIFIED**. | Sebelum perubahan, mesin pencari harus memilih versi URL sendiri. | Pertahankan canonical homepage di domain landing page ini dan pastikan deployment menyajikan tag yang sama serta host/protokol konsisten. |
| T6 | **Medium** | **CONFIRMED BEFORE LOCAL CHANGE:** `robots.txt` tidak mencantumkan sitemap dan `/sitemap.xml` merespons 404. Kini sitemap XML statis berisi URL canonical homepage dan `robots.txt` menunjuk padanya. Endpoint production setelah perubahan **NOT VERIFIED** karena tidak deploy. | Sebelum perubahan, discovery URL tidak dibantu sitemap; untuk satu halaman dampak langsung terbatas. | Pertahankan sitemap satu URL selama homepage satu-satunya halaman indexable; validasi live sesudah deploy dan submit ke Search Console/Bing Webmaster. |
| T7 | **Medium** | **CONFIRMED:** meta description/title membahas Kuta, Bali dan Jl. Benesari (`index.html:19–20`), tetapi tidak menyebut Legian atau konteks “near Kuta Beach”. Lokasi terlihat rinci di section location (`index.html:287–290`). Tidak ada bukti query rank/volume. | Relevansi untuk intent Legian dan wisatawan dekat Kuta Beach kurang dijelaskan; ini peluang konten, bukan bukti kehilangan ranking. | Gunakan deskripsi alami yang menyatakan lokasi administratif dengan akurat (Kuta/Legian sesuai konfirmasi) dan landmark/rute hanya bila diverifikasi. Hindari menyatakan jarak berjalan tanpa pengukuran. |
| T8 | **Medium** | **CONFIRMED:** “Explore the Menu” hanya menuju `#food` (`index.html:99`); section menampilkan kategori umum, bukan item menu, harga, atau halaman menu (`index.html:127–173`). Route `/menu` merespons 404. | Pengguna dan answer engine tidak dapat menjawab hidangan, harga, atau opsi aktual dari situs target. | Buat halaman menu hanya bila ada menu aktual, harga yang dijaga tetap mutakhir, dan detail bermanfaat. Jika tidak, ganti label CTA agar sesuai konten section dan tautkan ke menu resmi yang terverifikasi. |
| T9 | **Medium** | **CONFIRMED:** pada breakpoint mobile toggle input disembunyikan secara global (`styles.css:24`) sementara label `.nav-button` ditampilkan (`styles.css:98–103`); label tidak memiliki ukuran minimum yang ditetapkan. Perilaku keyboard/screen reader belum diuji di browser. | Menu mungkin sulit ditemukan/dioperasikan bagi pengguna keyboard atau layar sentuh; temuan aksesibilitas dapat menghambat usability dan konversi mobile. | Uji dengan keyboard, TalkBack/VoiceOver, dan viewport ponsel. Jadikan kontrol menu button yang fokusable dengan state accessible dan target sentuh memadai tanpa mengubah visual yang disetujui. |
| T10 | **Low** | **CONFIRMED:** production memberi HTTP 200 untuk homepage saat diuji dengan User-Agent string Googlebot, bingbot, OAI-SearchBot, ChatGPT-User, GPTBot, PerplexityBot, dan ClaudeBot. Robots wildcard mengizinkan semuanya. Homepage response tidak memiliki `X-Robots-Tag`; meta robots menyatakan `index, follow`. Server header menunjukkan Vercel, bukan Cloudflare. Tes ini bukan koneksi crawler terautentikasi dan tidak melihat WAF rules internal. | Tidak ada bukti pemblokiran bot pada jalur yang diuji; masih mungkin ada aturan CDN/WAF atau blok resource yang tidak terlihat dari spoofed User-Agent. | Pertahankan akses crawler yang memang diinginkan dan cek log hosting/Search Console/Bing serta konfigurasi WAF. Tentukan kebijakan training terpisah dari search/user-fetch sesuai preferensi bisnis. |

### Respons production yang dikonfirmasi

- `GET https://unisportbar.balisuksma.digital/`: **200**, `text/html`, Vercel. Header termasuk `cache-control: public, max-age=0, must-revalidate` dan HSTS; tidak ada `X-Robots-Tag` dalam header yang diterima.
- `GET http://unisportbar.balisuksma.digital/`: **200 final**, 1 redirect ke HTTPS.
- `GET https://unisportbar.balisuksma.digital/robots.txt`: **200**, isi wildcard allow-all.
- `GET /sitemap.xml`, `/sitemap_index.xml`, `/llms.txt`: **404**.
- `GET /menu`, `/live-sports`, `/about`, `/contact`, `/location`: **404**; halaman yang ada adalah homepage ber-section.
- `www.unisportbar.balisuksma.digital`: **NOT VERIFIED**, DNS gagal resolve dari lingkungan pemeriksaan.

## 4. Structured Data Findings

JSON-LD `Restaurant` ada satu kali dan sintaksnya terlihat well-formed saat inspeksi source (`index.html:327–355`). Teks halaman dan schema menggunakan nama “UNI Sport Bar Café”; tipe `Restaurant` dipertahankan setelah inspeksi karena konten menampilkan makanan/kafe bersama layanan sports bar. Jangan mengubah nama atau tipe tanpa fakta baru yang terkonfirmasi; `BarOrPub`/`Restaurant` tidak perlu ditumpuk hanya untuk memperbanyak schema.

**Yang sudah ada:** `@context`, `@type`, `name`, `telephone`, `image`, `priceRange`, `servesCuisine`, `hasMap`, `sameAs`, `openingHoursSpecification`, dan `address`.

**Perlu diperbaiki atau diverifikasi:**

- Tidak ada `@id`, `url`, `mainEntityOfPage`, maupun hubungan eksplisit dengan WebSite/WebPage.
- `sameAs` dan `hasMap` menunjuk ke Google Maps shared profile yang dikonfirmasi pemilik untuk lokasi UNI Sport Bar Café / UNI Sushi Asian Fusion. Pertahankan link ini; nama tampilan listing berbeda dari brand halaman dan kini dijelaskan di title iframe. Jangan menambahkan `www.unicafebali.com` sebagai `sameAs` atau official URL.
- Jam buka harian di JSON-LD tidak tampil di konten halaman dan belum dikonfirmasi.
- Schema tidak memiliki `geo`; jangan menambahkan koordinat sebelum titik lokasi diverifikasi dengan place resmi. Koordinat yang tertanam di URL iframe saja bukan bukti cukup bahwa pin mewakili venue yang benar.
- `image` memakai URL hero 1200w; pastikan URL dapat diakses dan merepresentasikan bisnis/brand dengan tepat. Tidak ada bukti `logo` di schema.
- Tidak ada `hasMenu`; homepage belum menyajikan daftar hidangan/harga yang dapat menjadi menu faktual.
- Hanya satu entitas schema. `WebSite`, `WebPage`, `BreadcrumbList`, atau `FAQPage` bukan kebutuhan otomatis. Breadcrumb tidak relevan untuk satu URL; FAQ hanya bila pertanyaan dan jawaban nyata dipublikasikan. `Menu`/`hasMenu` baru berguna jika menu canonical dan aktual tersedia.
- Tidak ditemukan `aggregateRating`/review schema pada blok JSON-LD (baik; jangan menambahkan review buatan).

Schema.org valid secara struktur tidak menjamin Google rich result. Schema LocalBusiness/Restaurant yang kaya juga tidak menggantikan konsistensi Google Business Profile, konten terlihat, dan crawl/index eligibility.

## 5. Local SEO Findings

- **Nama:** “UNI Sport Bar Café” konsisten di title, footer, copy, dan JSON-LD. Nama listing Maps/embed “UNI Sushi Asian Fusion” adalah shared Google Business Profile yang sama menurut konfirmasi pemilik, bukan bukti adanya profil/lokasi berbeda. Page brand dan schema tetap menggunakan UNI Sport Bar Café; title iframe menjelaskan label Maps.
- **Kategori:** halaman secara jelas menyebut sport bar/café, food, drinks, dan live sports; namun olahraga/kompetisi spesifik belum dijelaskan.
- **Alamat:** halaman menampilkan “Jl. Benesari, Kuta, Badung, Bali 80361, Indonesia” dan footer menampilkan versi ringkas (`index.html:289, 322`). Alamat lokal tersebut belum dicocokkan langsung dengan Google Business Profile.
- **Telepon:** `+62 895-4216-45000` muncul di halaman, link `tel:`, WhatsApp, dan schema (`index.html:290, 293, 323, 332`). Email `contact@unicafebali.com` tampil di halaman (`index.html:290, 323`). Validitas operasional belum diuji.
- **Peta:** link pencarian Maps berquery generik brand/lokasi; embed menampilkan nama listing “UNI Sushi Asian Fusion” (`index.html:292, 297`), yang telah dikonfirmasi sebagai shared Google Business Profile. Jangan mengganti listing atau membuat GBP kedua. Koordinat resmi **NOT VERIFIED**.
- **Domain:** canonical landing page tetap `https://unisportbar.balisuksma.digital/`. `www.unicafebali.com` tidak terkait dengan standalone landing page ini dan tidak boleh dicantumkan sebagai canonical, `sameAs`, atau official website.
- **Jam:** tidak ada jam operasional yang tampak di halaman; schema menyatakan 08:00–23:00. Events mengklaim happy hour 18:00–20:00, live music akhir pekan, dan trivia Selasa (`index.html:195–205`). Kebenaran/kemutakhiran jadwal **NOT VERIFIED**.
- **Menu/layanan:** halaman menyebut Asian-inspired food, sushi, snacks, drinks, table booking WhatsApp, dan live sports; tidak ada menu item aktual, harga, fasilitas siaran, atau detail booking selain WhatsApp.
- **Social profiles:** tidak ada tautan profil sosial di source. Apakah akun resmi tersedia **NOT VERIFIED**; jangan mengisi `sameAs` dengan akun hasil tebakan.
- **Query lokal:** copy saat ini menyebut Kuta dan Benesari, tetapi tidak secara natural menghubungkan lokasi dengan Legian atau Kuta Beach. Tidak ada data ranking/volume untuk keyword kandidat.

## 6. AI Search Readiness

**Crawler policy dan tujuan:** robots allow-all berlaku untuk crawler tanpa group khusus. Search/index crawlers seperti Googlebot dan bingbot mendapat respons 200 ketika diuji. OAI-SearchBot adalah crawler pencarian untuk pengalaman pencarian ChatGPT; ChatGPT-User dapat mengambil halaman atas permintaan pengguna. GPTBot adalah crawler untuk pengumpulan data/model improvement dan bukan prasyarat untuk search visibility. PerplexityBot dan ClaudeBot terkait discovery/fetching layanan masing-masing; kebijakan akses dan penggunaan konten perlu diputuskan bisnis. User-Agent spoofing hanya menguji respons dasar, bukan membuktikan request berasal dari bot resmi atau mengesampingkan firewall/CDN.

**Jawaban yang didukung halaman saat ini:**

- “Di mana lokasinya?” Alamat yang ditulis: Jl. Benesari, Kuta, Badung, Bali 80361, Indonesia. Pin yang benar tetap perlu verifikasi.
- “Kuta atau Legian?” Halaman mengklaim Kuta. Hubungan administratif/area pemasaran dengan Legian belum dijelaskan; jangan menyebut keduanya sebagai alamat yang sama tanpa verifikasi.
- “Apakah ada live football / pertandingan tertentu?” Halaman mempromosikan live sports dan mengajak bertanya via WhatsApp, tetapi tidak menjawab olahraga/liga atau jadwal tertentu.
- “Jam berapa buka?” Tidak terjawab oleh konten terlihat. Jam schema saja tidak cukup menjadi jawaban terpercaya.
- “Bagaimana kontak?” Nomor WhatsApp/telepon dan email tertulis; deliverability belum diuji.
- “Bagaimana menuju dari Kuta Beach?” Halaman menyediakan tombol Google Maps tetapi tidak memberi rute/jarak. Shared GBP telah dikonfirmasi mewakili lokasi yang sama; rute/jarak tetap belum dijelaskan.
- “Ada menu?” Ada section Food & Drinks dan klaim kategori makanan, tetapi daftar item/harga tidak ada.

Konten awal HTML yang konkret adalah fondasi bagus untuk retrieval/citation. Tambahkan fakta answer-first hanya setelah pemilik memverifikasi. Tidak ada implementasi yang dapat menjamin AI memilih atau mengutip sebuah situs; pemilihan bergantung pada sistem, query, sumber pembanding, trust, freshness, dan ketersediaan informasi.

## 7. Content Recommendations

- **Homepage:** pertahankan sebagai halaman utama yang ringkas, dengan satu kalimat awal yang faktual tentang nama, kategori, dan lokasi. Tambahkan jam, arah, fasilitas, atau kompetisi hanya setelah verifikasi bisnis.
- **`/menu`:** bernilai bila ada menu resmi yang cukup lengkap, kategori, harga, mata uang, dan mekanisme pembaruan. Saat ini CTA menyebut menu tetapi konten hanya kategori umum; route tersebut belum ada.
- **`/live-sports`:** jangan buat halaman tipis berisi kata “live sports”. Buat hanya jika venue dapat menjaga daftar cabang/kompetisi yang benar dan cara cek jadwal. Jangan menerbitkan fixtures statis atau jadwal berlisensi yang cepat kedaluwarsa.
- **`/location` atau `/contact`:** belum perlu sebagai halaman terpisah selama satu section berisi alamat/kontak yang akurat dan mudah ditemukan. Prioritaskan pembetulan Maps embed.
- **`/about`:** hanya bila ada cerita, nilai, fasilitas, atau bukti bisnis yang berbeda dari homepage dan memberi informasi nyata.
- **Event schedule:** konten menyebut happy hour, trivia Selasa, dan musik akhir pekan tetapi tidak mencantumkan tahun, update date, atau sumber. Pastikan aktivitas tersebut memang rutin dan dapat dipelihara; jika tidak, tampilkan CTA “ask what's on” tanpa menjanjikan jadwal tetap.

## 8. Performance Findings

**Pengukuran lapangan:** tidak ada Lighthouse run, CrUX data, browser trace, atau Core Web Vitals field data dalam audit ini. LCP, CLS, INP, TTFB percentile, dan mobile score **NOT VERIFIED**.

**Temuan source / risiko yang dapat diamati:**

- Hero image memakai preload responsive AVIF (`index.html:16–18`), `<picture>` AVIF/WebP, `fetchpriority="high"` (`index.html:83–91`); gambar berikutnya memakai `loading="lazy"` dan sebagian `width`/`height`. Ini praktik resource prioritization yang terlihat di source, bukan pengukuran LCP.
- Banyak konten fotografi masih di-render di HTML awal; ukuran unduhan total/network transfer belum diukur. Repository juga menyimpan original dan optimized assets.
- CSS satu file kecil tanpa framework eksternal/font download; font stack system UI. Mengurangi ketergantungan render-blocking font pihak ketiga.
- Inline Google Analytics menjadwalkan script eksternal setelah load + 3 detik / idle (`index.html:22–51`); pengaruh nyata ke INP/main-thread tidak diukur.
- Google Maps iframe di-lazy-load (`index.html:297`), tetapi tetap memuat third-party ketika section terlihat. Ukuran dan dampak koneksi tidak diukur.
- CSS menetapkan tinggi/row pada hero, kartu, gallery, dan map, yang membantu reserve ruang; tidak ada CLS trace untuk memastikan.
- Mobile layout memiliki breakpoint, namun tombol menu hit area kecil/tidak terukur dengan browser; ini lebih dulu perlu uji usability nyata.

## 9. Prioritized Implementation Roadmap

Tidak ada P0 crawl blocker yang berhasil dibuktikan. Shared Google Business Profile yang dikonfirmasi pemilik dipertahankan; roadmap memprioritaskan crawl/index technical SEO dan fakta yang belum terverifikasi.

| Prioritas | Rekomendasi | File yang kemungkinan berubah | Manfaat | Kompleksitas | Verifikasi |
|---|---|---|---|---|---|
| **P0** | Belum ada item P0 terkonfirmasi. Robots tidak memblokir dan homepage 200; cek GSC untuk mengetahui status index aktual. | — | — | — | URL Inspection/Search Console; inspeksi log dan coverage. |
| **P1** | Pertahankan shared Maps profile yang dikonfirmasi pemilik; title iframe menjelaskan brand halaman dan nama tampilan listing. | `index.html` | Mencegah pergantian listing yang salah dan menjelaskan label berbeda bagi assistive technology. | Rendah; perubahan title sudah lokal. | Inspeksi iframe `src`/`title`, lalu konfirmasi tampilan listing pada browser. |
| **P1** | Verifikasi jam operasional dan tampilkan jam terlihat; sinkronkan atau hapus jam schema yang belum terbukti. | `index.html` | Konsistensi jawaban lokal dan mengurangi structured data yang salah. | Rendah. | Konfirmasi pemilik, visual content check, Rich Results Test/schema validator. |
| **P1** | Gunakan canonical `https://unisportbar.balisuksma.digital/` untuk homepage. `www.unicafebali.com` tidak terkait dan tidak boleh dipakai sebagai canonical/`sameAs`/official website. Canonical sudah ditambahkan secara lokal. | `index.html` | Mengonsolidasikan URL landing page ke domain yang ditetapkan. | Rendah; perubahan sudah lokal. | Parse canonical HTML, pastikan satu tag, cek response production setelah deploy. |
| **P1** | Buat sitemap XML canonical dan referensikan dari `robots.txt`. Sudah ditambahkan secara lokal dengan homepage sebagai satu-satunya URL. | `sitemap.xml`, `robots.txt` | Membantu discovery dan monitoring URL yang diinginkan. | Rendah untuk situs satu halaman; perubahan sudah lokal. | XML parse, cocokkan `<loc>` dan canonical, cek HTTP 200 setelah deploy, submit GSC/Bing Webmaster. |
| **P1** | Perjelas copy hero dan section sports berdasarkan layanan yang benar: cabang/kompetisi, cara memeriksa pertandingan, dan batas kepastian jadwal. | `index.html` | Menjawab intent lokal dan pertanyaan visitor tanpa klaim spekulatif. | Rendah jika fakta sudah tersedia. | Review pemilik, cek fakta di rendered HTML. |
| **P2** | Publikasikan menu terverifikasi dengan harga/update process, atau ubah label “Explore the Menu” agar tidak menjanjikan menu yang tidak ada. | `index.html`; opsional `menu/index.html` | Membantu keputusan pengunjung dan jawaban tentang hidangan/harga. | Rendah untuk section; sedang untuk halaman baru. | Cek menu live dengan venue, canonical, links, sitemap. |
| **P2** | Evaluasi copy lokasi Kuta/Legian/Kuta Beach menggunakan alamat dan landmark yang dikonfirmasi; hindari klaim jarak tanpa ukur. | `index.html` | Memperkuat relevansi wisatawan lokal dan menurunkan ambiguitas area. | Rendah. | Cocokkan alamat/route dan uji navigasi peta. |
| **P2** | Perbaiki semantik dan tap/keyboard behavior navigation toggle tanpa mengubah tampilan. | `index.html`, `styles.css` | Meningkatkan penggunaan mobile dan akses keyboard/screen reader. | Rendah–sedang. | Uji keyboard, TalkBack/VoiceOver, viewport mobile dan target sentuh. |
| **P2** | Buat `/live-sports`, `/about`, `/contact`, atau `/location` hanya jika tersedia informasi unik dan terawat yang melebihi section homepage. | route HTML baru, `index.html`, sitemap | Menambah landing pages berguna alih-alih halaman tipis/duplikat. | Sedang–tinggi sesuai konten. | Review substansi unik, status HTTP, internal links/canonical/sitemap. |
| **P3** | Tambahkan `llms.txt` hanya sebagai indeks dokumentasi opsional setelah URL dan fakta resmi stabil. | `llms.txt` | Kemudahan navigasi untuk sebagian AI consumers; dampak ranking tidak mapan. | Rendah. | HTTP 200, link valid, cocok dengan HTML/robots/sitemap. |
| **P3** | Pantau CrUX/Search Console dan ukur Lighthouse mobile pada perubahan. | Tidak harus ada perubahan source; opsional CI/docs | Memberi baseline CWV dan masalah crawl aktual. | Rendah–sedang. | Field data bila tersedia plus lab run berulang pada URL production. |

## 10. Validation Checklist

- [ ] `robots.txt` mengizinkan crawler yang dipilih dan menunjuk sitemap yang tersedia.
- [ ] Homepage dan URL canonical merespons 200; http/www/non-www/trailing slash diarahkan ke host/protokol pilihan.
- [ ] Tidak ada `noindex` atau `X-Robots-Tag` tak disengaja; cek source meta dan response header.
- [ ] Sitemap XML valid, hanya menyertakan `https://unisportbar.balisuksma.digital/`, dan merespons 200 setelah deploy.
- [ ] Canonical absolut tunggal sama dengan `https://unisportbar.balisuksma.digital/`; `www.unicafebali.com` bukan canonical, `sameAs`, atau official website.
- [ ] JSON-LD parse dan tervalidasi; fakta yang sama terlihat pada halaman. Uji schema.org dan Google Rich Results Test tanpa menganggap validitas menjamin rich result.
- [ ] Initial HTML berisi title, H1, alamat, kontak, menu/layanan yang terverifikasi; cek tanpa menjalankan JavaScript.
- [ ] Seluruh internal anchor/URL memberi target valid; tidak ada route CTA yang menyesatkan ke 404.
- [ ] Tes mobile browser untuk layout, nav keyboard/touch, tap target, map, overflow, accessibility labels.
- [ ] Jalankan Lighthouse mobile dan simpan LCP/CLS/INP serta network transfer; bandingkan dengan CrUX bila URL memiliki data.
- [ ] Google Search Console: verify domain property, submit sitemap, URL Inspection/canonical/index coverage, crawl errors, enhancement reports.
- [ ] Bing Webmaster Tools: verify site, submit sitemap, inspect crawl/index diagnostics.
- [x] Pemilik mengonfirmasi UNI Sport Bar Café dan UNI Sushi Asian Fusion menggunakan Google Business Profile yang sama; pertahankan listing dan jangan buat profil kedua.
- [ ] Konfirmasi jam, menu, jadwal acara/olahraga, profil sosial, dan kontak dengan pemilik/Google Business Profile sebelum menerbitkan fakta.

## Ringkasan Top 10 Isu Terkonfirmasi

1. Nama listing Google Maps UNI Sushi Asian Fusion berbeda dari brand landing page; pemilik mengonfirmasi shared GBP yang sama dan title iframe kini menjelaskan perbedaan label. Ini catatan identitas, bukan error teknis.
2. Jam buka harian hanya ada di JSON-LD dan belum terlihat/terkonfirmasi pada halaman.
3. Klaim live sports tidak menyebut olahraga/kompetisi atau cara mengetahui tayangan yang tersedia.
4. Profil sosial resmi tidak ditautkan; akun resminya belum diverifikasi. `www.unicafebali.com` tidak terkait dengan standalone landing page ini dan tidak dipakai sebagai sinyal identitas.
5. URL `/` dan tanpa slash sama-sama 200; canonical domain landing page kini ditambahkan secara lokal.
6. Sitemap sebelumnya tidak tersedia/404; sitemap XML satu URL dan referensi robots kini ditambahkan secara lokal.
7. Copy menargetkan Kuta/Benesari, namun tidak menjelaskan relevansi Legian/Kuta Beach.
8. CTA mengarah ke “menu” tetapi halaman tidak berisi hidangan/harga aktual dan `/menu` 404.
9. Mobile nav toggle memiliki isu semantik/focus/tap target yang perlu verifikasi browser.
10. Semua bot yang diuji mendapat 200 dan robots allow-all, tetapi tes User-Agent spoof tidak memverifikasi crawler asli atau aturan WAF.

## Prompt Implementasi Codex Berikutnya (setelah fakta bisnis dikonfirmasi)

> Pertahankan brand halaman dan JSON-LD sebagai UNI Sport Bar Café / `Restaurant` kecuali pemilik memberi fakta baru yang membenarkan perubahan. UNI Sport Bar Café dan UNI Sushi Asian Fusion memakai Google Business Profile yang sama; jangan mengganti Maps listing atau membuat profil kedua. Pertahankan canonical `https://unisportbar.balisuksma.digital/`; `www.unicafebali.com` tidak terkait dan jangan gunakan sebagai canonical, `sameAs`, atau official website. Implementasikan rekomendasi P1 lain hanya dengan fakta terkonfirmasi. Jangan mengarang jam, menu, olahraga, atau jadwal. Jangan deploy atau membuat halaman baru/llms.txt tanpa persetujuan terpisah. Validasi HTML awal, robots/sitemap, canonical, JSON-LD, dan tautan internal; laporkan hasil dan perubahan file.
