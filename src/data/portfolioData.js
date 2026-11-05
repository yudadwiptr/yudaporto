export const HERO_PRESETS = {
  personal: [
    {
      id: "kenji-classic",
      label: { en: "01 / kenji classic", id: "01 / klasik kenji" },
      en: {
        line1Start: "making",
        line1Accent: "things",
        line2Mid: "is the",
        line2Blue: "job.",
        line3Red: "loving",
        line3Mid: "it is the",
        line3Blue: "bonus.",
      },
      id: {
        line1Start: "merancang",
        line1Accent: "sistem",
        line2Mid: "adalah",
        line2Blue: "tugasnya.",
        line3Red: "mencintai",
        line3Mid: "prosesnya adalah",
        line3Blue: "bonusnya.",
      },
    },
    {
      id: "analyst-soul",
      label: { en: "02 / system & banking", id: "02 / analis & perbankan" },
      en: {
        line1Start: "shaping",
        line1Accent: "systems",
        line2Mid: "is the",
        line2Blue: "job.",
        line3Red: "proving",
        line3Mid: "they work is the",
        line3Blue: "bonus.",
      },
      id: {
        line1Start: "mengurai",
        line1Accent: "bisnis",
        line2Mid: "adalah",
        line2Blue: "pekerjaan.",
        line3Red: "menjaga",
        line3Mid: "akurasi adalah",
        line3Blue: "seninya.",
      },
    },
    {
      id: "defect-hunter",
      label: { en: "03 / precision & quality", id: "03 / presisi & kualitas" },
      en: {
        line1Start: "solving",
        line1Accent: "chaos",
        line2Mid: "is the",
        line2Blue: "job.",
        line3Red: "hunting",
        line3Mid: "bugs is the",
        line3Blue: "bonus.",
      },
      id: {
        line1Start: "merapikan",
        line1Accent: "logika",
        line2Mid: "adalah",
        line2Blue: "tugasnya.",
        line3Red: "memburu",
        line3Mid: "bug adalah",
        line3Blue: "bonusnya.",
      },
    },
  ],
  agency: [
    {
      id: "agency-story",
      label: { en: "creative dev / web", id: "web & produk kreatif" },
      en: {
        line1Start: "building",
        line1Accent: "products",
        line2Mid: "is the",
        line2Blue: "job.",
        line3Red: "making",
        line3Mid: "them feel alive is the",
        line3Blue: "bonus.",
      },
      id: {
        line1Start: "membangun",
        line1Accent: "produk",
        line2Mid: "adalah",
        line2Blue: "pekerjaan.",
        line3Red: "membuatnya",
        line3Mid: "terasa hidup adalah",
        line3Blue: "alasannya.",
      },
    },
  ],
};

export const SOFTWARE_MARQUEE = [
  { name: "Next.js", tag: "Frontend", id: "nextjs", color: "#ffffff" },
  { name: "React", tag: "UI Library", id: "react", color: "#00d8ff" },
  { name: "Jira", tag: "Defect Tracking", id: "jira", color: "#2684ff" },
  { name: "Postman", tag: "API Testing", id: "postman", color: "#ff6c37" },
  { name: "Azure DevOps", tag: "CI/CD & Sprints", id: "azuredevops", color: "#0078d4" },
  { name: "PostgreSQL", tag: "Database", id: "postgresql", color: "#336791" },
  { name: "Docker", tag: "Containers", id: "docker", color: "#2496ed" },
  { name: "Host / AS400", tag: "Core Banking", id: "hostas400", color: "#22c55e" },
  { name: "DBeaver", tag: "SQL Validation", id: "dbeaver", color: "#c69255" },
  { name: "Tailwind CSS", tag: "Design Tokens", id: "tailwindcss", color: "#38bdf8" },
  { name: "Figma", tag: "Specs & UI", id: "figma", color: "#a259ff" },
  { name: "GitHub", tag: "Version Control", id: "github", color: "#f1eec0" },
  { name: "SQL Developer", tag: "Oracle Database", id: "sqldeveloper", color: "#f87171" },
  { name: "Photoshop", tag: "Visual Craft", id: "photoshop", color: "#31a8ff" },
];

export const CLIENT_MARQUEE = SOFTWARE_MARQUEE;

export const PROJECTS_PERSONAL = [
  {
    id: "tabplin-tni-al-modernization",
    featured: true,
    year: "2026",
    client: "PT Adi Data Informatika – TNI AL",
    category: "Business Analysis",
    tags: [
      { en: "Business Analysis (BRD)", id: "Analisis Bisnis (BRD)", tone: "cream" },
      { en: "Legacy Reverse-Engineering", id: "Reverse-Engineering Legacy", tone: "blue" },
      { en: "H2H API & Settlement", id: "Integrasi API & Settlement", tone: "red" },
    ],
    title: "TABPLIN: 1987 Navy Savings Ledger to Modern Web",
    summary: {
      en: "A core savings modernization program for TNI AL (Indonesian Navy) with PT Bank Mandiri as settlement bank, built around a single idea: migrating a 1987 text-based ledger into a modern web platform for ~80,000 members without losing a single cent of interest logic. Reverse-engineered original source code to document daily interest accrual, leap-year divisor handling, tax rules, and designed end-to-end payroll auto-debit, inquiry, registration, disbursement, and API integration flows.",
      id: "Program modernisasi Tabungan Disiplin (TABPLIN) bersama TNI AL dengan PT Bank Mandiri sebagai bank penyelesai, dibangun di atas satu ide tunggal: memigrasikan buku besar berbasis teks tahun 1987 ke platform web modern untuk ~80.000 anggota tanpa kehilangan presisi rumus bunga sedikit pun. Melakukan reverse-engineering source code asli untuk mendokumentasikan rumus akrual bunga harian, pembagi tahun kabisat, aturan pajak, serta merancang alur end-to-end auto-debit gaji, inquiry, registrasi, pencairan, dan integrasi API.",
    },
    singleIdea: {
      en: "Reverse-engineering a 1987 text-based ledger into a modern web banking platform for 80,000+ Navy personnel.",
      id: "Reverse-engineering buku besar berbasis teks tahun 1987 menjadi platform web perbankan modern untuk 80.000+ personel TNI AL.",
    },
    metrics: [
      { label: "Active Scale", value: "~80,000 Members" },
      { label: "Ledger Scope", value: "112 Navy Accounts" },
      { label: "Core Heritage", value: "1987 → 2026 Web" },
    ],
    liveUrl: "#work",
    themeColor: "#ea4530",
    secondaryColor: "#3aa1d8",
    slides: [
      {
        type: "poster-hero",
        kicker: "01 / THE SINGLE IDEA",
        headline: "1987 LEDGER → MODERN WEB",
        sub: "112 Settlement Accounts · ~80,000 TNI AL Members · PT Bank Mandiri Settlement",
        accent: "#ea4530",
      },
      {
        type: "ui-flow",
        kicker: "02 / SOURCE CODE REVERSE-ENGINEERING",
        headline: "DAILY ACCRUAL & LEAP DIVISOR",
        sub: "Extracted exact interest accrual formulas, tax rules & deposit/withdrawal posting logic",
        accent: "#3aa1d8",
      },
      {
        type: "type-specimen",
        kicker: "03 / END-TO-END FLOWS & BRD",
        headline: "AUTO-DEBIT → DISBURSEMENT",
        sub: "Payroll auto-debit collection, account inquiry, maintenance, refund & Mandiri API model",
        accent: "#f1eec0",
      },
      {
        type: "metrics-card",
        kicker: "04 / DATA MIGRATION & UAT",
        headline: "CLOSING BALANCE + HISTORY",
        sub: "BRD, as-is / to-be flows, user stories, acceptance criteria & stakeholder UAT sign-off",
        accent: "#ea4530",
      },
    ],
  },
  {
    id: "pt-smi-travel-operational-os",
    featured: true,
    year: "2025–2026",
    client: "PT Adi Data Informatika – PT SMI",
    category: "System Analysis",
    tags: [
      { en: "System Analysis", id: "Analisis Sistem", tone: "cream" },
      { en: "Sequence Diagramming", id: "Diagram Sekuens", tone: "blue" },
      { en: "Enterprise QA (13 Sprints)", id: "QA Enterprise (13 Sprint)", tone: "red" },
    ],
    title: "PT SMI: Integrated Operational & Travel Self-Service",
    summary: {
      en: "An enterprise Integrated Operational & Self-Service (Travel Agent / Perjalanan Dinas) platform for PT Sarana Multi Infrastruktur (PT SMI), built around a single idea: translating multi-tier institutional policy into one clear sequence from request to booking. Authored BRDs, user stories, acceptance criteria, and system interaction sequence diagrams, while leading QA across 13 sprints for the Employee Condition Monitoring System (ECMS).",
      id: "Sistem Integrated Operational & Self-Service (Perjalanan Dinas) untuk PT Sarana Multi Infrastruktur (PT SMI), dibangun di atas satu ide tunggal: menerjemahkan kebijakan korporat berlapis menjadi satu alur sekuens yang jernih dari pengajuan hingga pemesanan. Menyusun BRD, user stories, acceptance criteria, dan sequence diagram interaksi sistem, serta memimpin QA selama 13 sprint untuk Employee Condition Monitoring System (ECMS).",
    },
    singleIdea: {
      en: "Every business travel approval and booking mapped into one unambiguous system sequence.",
      id: "Setiap persetujuan dan pemesanan perjalanan dinas dipetakan dalam satu sekuens sistem tanpa celah.",
    },
    metrics: [
      { label: "Artifacts", value: "BRD + Sequence Flows" },
      { label: "ECMS Delivery", value: "13 Agile Sprints" },
      { label: "Traceability", value: "End-to-End UAT" },
    ],
    liveUrl: "#work",
    themeColor: "#3aa1d8",
    secondaryColor: "#f1eec0",
    slides: [
      {
        type: "grid-system",
        kicker: "01 / SYSTEM ARCHITECTURE",
        headline: "PERJALANAN DINAS WORKFLOW",
        sub: "End-to-end sequence diagramming from request submission through approval and booking",
        accent: "#3aa1d8",
      },
      {
        type: "token-matrix",
        kicker: "02 / SPECIFICATION ARTIFACTS",
        headline: "BRD · STORIES · AC",
        sub: "Actionable functional specifications bridging stakeholders, PM, UI/UX, and developers",
        accent: "#f1eec0",
      },
      {
        type: "ui-flow",
        kicker: "03 / CHANGE IMPACT & VALIDATION",
        headline: "REQUEST → APPROVAL → BOOK",
        sub: "Change request impact analysis, backlog refinement, sprint planning & UAT execution",
        accent: "#ea4530",
      },
      {
        type: "poster-hero",
        kicker: "04 / ECMS ENTERPRISE QA",
        headline: "13 SPRINTS DELIVERED",
        sub: "Comprehensive test strategies, functional/regression/performance testing via Azure & Jira",
        accent: "#3aa1d8",
      },
    ],
  },
  {
    id: "kopra-wholesale-core-banking",
    featured: true,
    year: "2022–2024",
    client: "PT Bank Mandiri – KOPRA",
    category: "Core Banking & QA",
    tags: [
      { en: "Core Banking (BDS/AS400)", id: "Core Banking (BDS/AS400)", tone: "cream" },
      { en: "QA Leadership", id: "QA Leadership", tone: "blue" },
      { en: "Wholesale Banking", id: "Wholesale Banking", tone: "red" },
    ],
    title: "KOPRA 3.0.1 × New BDS: Core Banking & Ledger Integrity",
    summary: {
      en: "Quality Assurance leadership for PT Bank Mandiri's flagship KOPRA wholesale banking platform across Cash Management, Trade Finance, Value Chain Financing (MFSCM), and Guarantees — built around a single idea: every digital transaction must reconcile with 100% integrity on the BDS / AS400 core banking host. Spearheaded KOPRA 3.0.1 Branch Transaction alignment to New BDS, Kopra Mobile stabilization, Single Sign-On (SSO), and corporate hierarchy approval matrices.",
      id: "Kepemimpinan Quality Assurance untuk platform wholesale banking KOPRA PT Bank Mandiri yang mencakup Cash Management, Trade Finance, Value Chain Financing (MFSCM), dan Garansi — dibangun di atas satu ide tunggal: setiap transaksi kanal digital harus terekonfirmasi 100% akurat hingga ke core ledger BDS / AS400. Mengawal penyelarasan Transaksi Cabang KOPRA 3.0.1 ke New BDS, stabilisasi Kopra Mobile, dan SSO.",
    },
    singleIdea: {
      en: "Confirming account, balance, and posting integrity across front-end, middleware, and the AS400 core ledger.",
      id: "Memastikan integritas akun, saldo, dan pembukuan dari front-end, middleware, hingga core ledger AS400.",
    },
    metrics: [
      { label: "Platform Tenure", value: "5 Years on KOPRA" },
      { label: "Host Validation", value: "BDS & AS400 Core" },
      { label: "Recognition", value: "5× 1st Place Winner" },
    ],
    liveUrl: "#work",
    themeColor: "#ea4530",
    secondaryColor: "#3aa1d8",
    slides: [
      {
        type: "poster-hero",
        kicker: "01 / WHOLESALE BANKING",
        headline: "KOPRA 3.0.1 × NEW BDS",
        sub: "Cash Management · Trade Finance · Value Chain (MFSCM) · Guarantees",
        accent: "#ea4530",
      },
      {
        type: "ui-flow",
        kicker: "02 / END-TO-END RECONCILIATION",
        headline: "CHANNEL → MIDDLEWARE → AS400",
        sub: "Validating corporate customer hierarchies, account structures & approval matrices",
        accent: "#3aa1d8",
      },
      {
        type: "metrics-card",
        kicker: "03 / HIGH-VISIBILITY RELEASES",
        headline: "SSO · LAJU · CASH PICKUP",
        sub: "Kopra Mobile stabilization, CBIC cross-selling, Livechat KOPRA 2.4 & BBO Jaminan Online",
        accent: "#f1eec0",
      },
      {
        type: "type-specimen",
        kicker: "04 / TEAM LEADERSHIP",
        headline: "CORE BANKING GO-TO",
        sub: "Led QA strategy, test data governance, automation advocacy & junior engineer mentoring",
        accent: "#ea4530",
      },
    ],
  },
  {
    id: "mandiri-treasury-efx-engine",
    featured: true,
    year: "2022–2024",
    client: "PT Bank Mandiri – Treasury",
    category: "Treasury & FX",
    tags: [
      { en: "Treasury & e-FX", id: "Treasury & e-FX", tone: "cream" },
      { en: "Multi-Currency & Non-IDR", id: "Multi-Currency & Non-IDR", tone: "blue" },
      { en: "Rate & Cut-Off Logic", id: "Logika Kurs & Cut-Off", tone: "red" },
    ],
    title: "Treasury Precision: Revamp e-FX, Non-IDR Giro & Forecasting",
    summary: {
      en: "End-to-end treasury release validation on KOPRA covering Revamp e-FX, Non-IDR Giro, Balance Forecasting, and QR Code Bank Garansi — built around a single idea: in wholesale foreign exchange and liquidity forecasting, rate handling, limit controls, and cut-off windows leave zero room for guesswork.",
      id: "Validasi rilis treasury end-to-end di KOPRA mencakup Revamp e-FX, Giro Non-IDR, Balance Forecasting, dan QR Code Bank Garansi — dibangun di atas satu ide tunggal: dalam transaksi valuta asing dan proyeksi likuiditas korporat, penanganan kurs, kontrol limit, dan waktu cut-off menuntut akurasi mutlak.",
    },
    singleIdea: {
      en: "Verifying rate handling, currency conversion, limit controls, and cut-off behavior across multi-currency ledgers.",
      id: "Memverifikasi penanganan kurs, konversi mata uang, kontrol limit, dan perilaku cut-off lintas rekening multi-valuta.",
    },
    metrics: [
      { label: "Treasury Scope", value: "e-FX & Non-IDR Giro" },
      { label: "Liquidity Tool", value: "Balance Forecasting" },
      { label: "Trade Security", value: "QR Bank Garansi" },
    ],
    liveUrl: "#work",
    themeColor: "#3aa1d8",
    secondaryColor: "#ea4530",
    slides: [
      {
        type: "type-specimen",
        kicker: "01 / FOREIGN EXCHANGE",
        headline: "REVAMP e-FX ENGINE",
        sub: "Real-time rate handling, multi-currency conversion & treasury limit controls",
        accent: "#3aa1d8",
      },
      {
        type: "ui-flow",
        kicker: "02 / CORPORATE LIQUIDITY",
        headline: "BALANCE FORECASTING",
        sub: "Non-IDR Giro, Financial Dashboard Enhancement & multi-currency account grouping",
        accent: "#ea4530",
      },
      {
        type: "poster-hero",
        kicker: "03 / TRADE GUARANTEES",
        headline: "QR CODE BANK GARANSI",
        sub: "Mandiri Global Trade & digital guarantee verification with strict cut-off validation",
        accent: "#f1eec0",
      },
    ],
  },
  {
    id: "bifast-escrow-h2h-integrations",
    featured: true,
    year: "2020–2022",
    client: "PT Bank Mandiri – Wholesale",
    category: "Payments & H2H",
    tags: [
      { en: "Functional Specs (FSD)", id: "Spesifikasi Fungsional", tone: "cream" },
      { en: "BI-FAST & Escrow", id: "BI-FAST & Escrow", tone: "blue" },
      { en: "H2H API & DB Migration", id: "H2H API & Migrasi DB", tone: "red" },
    ],
    title: "BI-FAST, Escrow Accounts & Host-to-Host (H2H) Gateways",
    summary: {
      en: "Requirements analysis, functional specifications, and host reconciliation for PT Bank Mandiri's wholesale payment infrastructure — built around a single idea: seamless Host-to-Host (H2H) and real-time payment rails require rock-solid specifications before a single line of test code is run. Covered BI-FAST payments, Escrow Accounts, Online Onboarding, OOB Value Chain approval matrices, 3rd-party integrations (Limas, SAMS), and SCM database migration from Single Node OVM to RAC OVM.",
      id: "Analisis kebutuhan, penyusunan spesifikasi fungsional, dan rekonsiliasi host untuk infrastruktur pembayaran wholesale PT Bank Mandiri — dibangun di atas satu ide tunggal: jalur pembayaran real-time dan Host-to-Host (H2H) membutuhkan spesifikasi yang presisi sebelum diuji ke core banking. Mencakup pembayaran BI-FAST, Rekening Escrow, Online Onboarding, matriks persetujuan Value Chain, integrasi Limas & SAMS, serta migrasi DB SCM dari Single Node OVM ke RAC OVM.",
    },
    singleIdea: {
      en: "From functional specifications to back-office host reconciliation across BI-FAST, Escrow, and H2H APIs.",
      id: "Dari spesifikasi fungsional hingga rekonsiliasi host back-office untuk BI-FAST, Escrow, dan H2H API.",
    },
    metrics: [
      { label: "Payment Rails", value: "BI-FAST & Remittance" },
      { label: "Enterprise B2B", value: "Escrow & H2H Codes" },
      { label: "Infra Migration", value: "Single → RAC OVM" },
    ],
    liveUrl: "#work",
    themeColor: "#ea4530",
    secondaryColor: "#f1eec0",
    slides: [
      {
        type: "poster-hero",
        kicker: "01 / REAL-TIME PAYMENTS",
        headline: "BI-FAST & REMITTANCE",
        sub: "Online remittance tracking, transaction history, balance history & Online Custody",
        accent: "#ea4530",
      },
      {
        type: "grid-system",
        kicker: "02 / HOST-TO-HOST & ESCROW",
        headline: "ESCROW × H2H CODES",
        sub: "KOPRA Anchor Client Community via H2H/API, Limas & SAMS 3rd-party integrations",
        accent: "#3aa1d8",
      },
      {
        type: "type-specimen",
        kicker: "03 / INFRASTRUCTURE & ONBOARDING",
        headline: "SINGLE OVM → RAC OVM",
        sub: "SCM database server migration, OOB Value Chain matrices & Hospital Reconciliation Portal",
        accent: "#f1eec0",
      },
    ],
  },
  // Additional archive projects
  {
    id: "yumashop-platform",
    featured: false,
    year: "2026",
    client: "YUMASHOP (Personal Build)",
    category: "Web App",
    tags: [
      { en: "UI/UX & Frontend", id: "UI/UX & Frontend", tone: "cream" },
      { en: "Product Flow", id: "Alur Produk", tone: "blue" },
      { en: "QRIS Payment Engine", id: "Mesin Pembayaran QRIS", tone: "red" },
    ],
    title: "YUMASHOP: 10-Second Gaming Top-Up Engine",
    summary: {
      en: "A high-velocity gaming top-up storefront built around a single idea: turning a 12-step voucher checkout into a 10-second muscle reflex. Engineered with a 128-game catalog architecture and real-time payment fee calculation.",
      id: "Ekosistem top-up game berkecepatan tinggi yang dibangun di atas satu ide tunggal: memangkas 12 langkah checkout menjadi refleks 10 detik dengan arsitektur katalog 128 game dan kalkulasi pembayaran real-time.",
    },
    singleIdea: {
      en: "A 12-step voucher checkout compressed into a 10-second reflex.",
      id: "Memangkas 12 langkah transaksi voucher menjadi refleks 10 detik.",
    },
    metrics: [
      { label: "Catalog Scale", value: "128+ Games" },
      { label: "Checkout Flow", value: "4 Instant Steps" },
      { label: "Payment Channels", value: "16 Live Gateways" },
    ],
    liveUrl: "https://github.com/yudadwiptr/yumashop",
    themeColor: "#ea4530",
    secondaryColor: "#3aa1d8",
    slides: [
      {
        type: "poster-hero",
        kicker: "01 / THE SINGLE IDEA",
        headline: "ZERO FRICTION TOP-UP",
        sub: "128 Games · 16 Payment Gateways · Pure Vector System",
        accent: "#ea4530",
      },
      {
        type: "ui-flow",
        kicker: "02 / 4-STEP ENGINE",
        headline: "ID → DENOM → PAY → QRIS",
        sub: "Real-time fee calculation & NMID instant QR simulator",
        accent: "#3aa1d8",
      },
    ],
  },
];

export const PROJECTS_AGENCY = [
  PROJECTS_PERSONAL[5],
  PROJECTS_PERSONAL[0],
  PROJECTS_PERSONAL[1],
];

export const EXPERIENCE_LIST = [
  {
    role: {
      en: "Business Analyst",
      id: "Business Analyst",
    },
    company: "PT Adi Data Informatika – TNI AL (TABPLIN)",
    period: { en: "Aug 2026 - Present", id: "Agu 2026 - Sekarang" },
    highlight: "#ea4530",
    bullets: {
      en: "Reverse-engineered 1987 legacy savings ledger (daily interest accrual, leap-year divisor, tax rules); designed end-to-end payroll auto-debit, inquiry, registration, disbursement & PT Bank Mandiri API integration for 112 accounts (~80,000 members).",
      id: "Reverse-engineering buku besar tabungan tahun 1987 (rumus bunga harian, tahun kabisat, pajak); merancang alur end-to-end auto-debit gaji, inquiry, registrasi, pencairan & integrasi API PT Bank Mandiri untuk 112 akun (~80.000 anggota).",
    },
  },
  {
    role: {
      en: "System Analyst",
      id: "System Analyst",
    },
    company: "PT Adi Data Informatika – PT SMI (Sarana Multi Infrastruktur)",
    period: { en: "Aug 2025 - Aug 2026", id: "Agu 2025 - Agu 2026" },
    highlight: "#3aa1d8",
    bullets: {
      en: "Produced BRD, user stories, acceptance criteria, and Travel Request Workflow sequence diagrams for the Integrated Operational & Self-Service (Perjalanan Dinas) system; facilitated impact analysis & UAT.",
      id: "Menyusun BRD, user stories, acceptance criteria, dan sequence diagram alur Perjalanan Dinas untuk sistem Integrated Operational & Self-Service PT SMI; memfasilitasi impact analysis & UAT.",
    },
  },
  {
    role: {
      en: "Senior Quality Assurance",
      id: "Senior Quality Assurance",
    },
    company: "PT Adi Data Informatika – PT SMI (Sarana Multi Infrastruktur)",
    period: { en: "Jan 2025 - Jul 2025", id: "Jan 2025 - Jul 2025" },
    highlight: "#f1eec0",
    bullets: {
      en: "Led QA across 13 sprints for Employee Condition Monitoring System (ECMS); designed test strategies, executed functional/integration/regression/UAT/performance testing, and mentored junior QA engineers.",
      id: "Memimpin QA selama 13 sprint untuk sistem ECMS; merancang strategi uji, mengeksekusi pengujian fungsional/integrasi/regresi/UAT/performa dengan Azure & Jira, serta membimbing QA junior.",
    },
  },
  {
    role: {
      en: "Quality Assurance Leader",
      id: "Quality Assurance Leader",
    },
    company: "PT Bank Mandiri (Persero) Tbk. – Wholesale Banking (KOPRA)",
    period: { en: "May 2022 - Dec 2024", id: "Mei 2022 - Des 2024" },
    highlight: "#ea4530",
    bullets: {
      en: "Led QA for KOPRA wholesale banking (cash management, trade finance, value chain, guarantees, e-FX); validated end-to-end flows to BDS / AS400 host including KOPRA 3.0.1 New BDS alignment, Non-IDR Giro & Balance Forecasting.",
      id: "Memimpin tim QA KOPRA wholesale banking (cash management, trade finance, value chain, garansi, e-FX); memvalidasi alur end-to-end ke host BDS / AS400 termasuk KOPRA 3.0.1 New BDS, Giro Non-IDR & Balance Forecasting.",
    },
  },
  {
    role: {
      en: "Quality Assurance Coordinator",
      id: "Quality Assurance Coordinator",
    },
    company: "PT Bank Mandiri (Persero) Tbk.",
    period: { en: "Apr 2021 - Apr 2022", id: "Apr 2021 - Apr 2022" },
    highlight: "#3aa1d8",
    bullets: {
      en: "Analyzed requirements and authored functional specifications for escrow accounts, H2H integration codes, online onboarding, OOB value chain approval matrices, and BI-FAST payments.",
      id: "Menganalisis kebutuhan dan menyusun spesifikasi fungsional untuk rekening escrow, kode integrasi H2H, online onboarding, matriks persetujuan OOB value chain, dan pembayaran BI-FAST.",
    },
  },
  {
    role: {
      en: "Quality Assurance Tester",
      id: "Quality Assurance Tester",
    },
    company: "PT Bank Mandiri (Persero) Tbk.",
    period: { en: "Feb 2020 - Mar 2021", id: "Feb 2020 - Mar 2021" },
    highlight: "#f1eec0",
    bullets: {
      en: "Tested core banking features (transaction/balance history, multi-currency grouping, online custody, SSO e-FX, remittance tracking), H2H/API integrations (Limas, SAMS) & SCM DB migration (Single Node to RAC OVM).",
      id: "Menguji fitur core banking (riwayat transaksi/saldo, multi-currency, online custody, SSO e-FX, pelacakan remitansi), integrasi H2H/API (Limas, SAMS) & migrasi DB SCM (Single Node ke RAC OVM).",
    },
  },
];

export const RECOGNITION_LIST = [
  {
    tier: "1st Place",
    category: { en: "Defect Hunter Winner", id: "Juara 1 Defect Hunter" },
    work: "Enterprise Banking & QA",
    org: "PT Adi Data Informatika",
    year: "2025",
  },
  {
    tier: "1st Place",
    category: { en: "Performance Tester Award", id: "Juara 1 Performance Tester" },
    work: "KOPRA Wholesale Banking",
    org: "PT Bank Mandiri",
    year: "Dec 2024",
  },
  {
    tier: "1st Place",
    category: { en: "Defect Hunter Champion", id: "Juara 1 Defect Hunter" },
    work: "KOPRA Super Apps",
    org: "PT Bank Mandiri",
    year: "Oct 2024",
  },
  {
    tier: "1st Place (3×)",
    category: {
      en: "Monthly Assessment Winner (Jun, Sep, Oct)",
      id: "Juara 1 Monthly Assessment (Jun, Sep, Okt)",
    },
    work: "Core Banking & Treasury QA",
    org: "PT Bank Mandiri",
    year: "2023",
  },
  {
    tier: "Winner",
    category: { en: "Exploratory Testing Winner", id: "Pemenang Exploratory Testing" },
    work: "KOPRA Wholesale Platform",
    org: "PT Bank Mandiri",
    year: "Aug 2023",
  },
];

export const ISTQB_CREDENTIAL = {
  title: "ISTQB® Certified Tester, Foundation Level (2018)",
  badge: "ISTQB® CTFL",
  certNo: "23-CTFL-227561-12",
  datePassed: "22/05/2023",
  recipient: "Yuda Dwi Putra",
  issuer: "iSQI GmbH (International Software Quality Institute)",
  cityCountry: "Potsdam, Germany",
  ceo: "Stephan Goericke",
  standards: "DIN EN ISO 9001:2015 & DIN EN ISO 17024:2012",
  certImage: "/istqb-certificate.jpg",
  syllabus: [
    {
      num: "01",
      en: "Fundamentals of Testing",
      id: "Prinsip Dasar Pengujian Perangkat Lunak",
      desc: {
        en: "What is testing, 7 testing principles, test process, psychology of testing, and code of ethics.",
        id: "Hakikat pengujian, 7 prinsip testing, proses pengujian, psikologi pengujian, dan etika profesi.",
      },
    },
    {
      num: "02",
      en: "Testing Throughout the Software Development Lifecycle",
      id: "Pengujian Sepanjang Siklus Hidup Pengembangan (SDLC)",
      desc: {
        en: "SDLC models (Agile, Waterfall), test levels (Component, Integration, System, Acceptance), and test types.",
        id: "Model SDLC (Agile, Waterfall), level pengujian (Komponen, Integrasi, Sistem, UAT), dan tipe pengujian.",
      },
    },
    {
      num: "03",
      en: "Static Testing",
      id: "Pengujian Statis (Static Testing)",
      desc: {
        en: "Review work products (BRD, user stories, specs) and defect detection before dynamic execution.",
        id: "Review artefak kerja (BRD, user story, spesifikasi) untuk mendeteksi cacat sebelum dieksekusi.",
      },
    },
    {
      num: "04",
      en: "Test Techniques",
      id: "Teknik Pengujian (Black-box, White-box, Experience)",
      desc: {
        en: "Equivalence partitioning, boundary value analysis, decision table, state transition, and error guessing.",
        id: "Equivalence partitioning, boundary value analysis, decision table, state transition, dan error guessing.",
      },
    },
    {
      num: "05",
      en: "Test Management & Defect Lifecycle",
      id: "Manajemen Pengujian & Siklus Hidup Defect",
      desc: {
        en: "Test planning & estimation, monitoring & control, risk-based testing, and defect logging & triage.",
        id: "Perencanaan & estimasi pengujian, monitoring & kontrol, risk-based testing, dan manajemen defect.",
      },
    },
    {
      num: "06",
      en: "Tool Support for Testing",
      id: "Dukungan Tools untuk Pengujian",
      desc: {
        en: "Test management tools, defect trackers, API/DB test tools, benefits and risks of test tooling.",
        id: "Manajemen tools pengujian, pelacak bug, tools API/DB, serta analisis risiko implementasi tools.",
      },
    },
  ],
};

export const CERTIFICATIONS_LIST = [
  {
    title: "ISTQB® Certified Tester, Foundation Level (2018)",
    issuer: "iSQI GmbH / ISTQB® International (Germany)",
    year: "2023",
    certNo: "23-CTFL-227561-12",
    featured: true,
    category: "Software Quality Engineering",
    link: "/istqb-certificate.jpg",
  },
  {
    title: "Kuliah Professional Quality Assurance",
    issuer: "PT Ace Konsultan Indonesia",
    year: "2023",
    featured: false,
    category: "QA Professional Program",
  },
  {
    title: "Professional Certificate in Agile & SCRUM",
    issuer: "Agile & Scrum Institute",
    year: "2023",
    featured: false,
    category: "Agile Frameworks",
  },
  {
    title: "Agile Project Management (Agile, Scrum, Kanban & XP)",
    issuer: "Project Management Academy",
    year: "2023",
    featured: false,
    category: "Project Delivery & Agility",
  },
  {
    title: "Master in Product Management (IT)",
    issuer: "Product Management Institute",
    year: "2024",
    featured: false,
    category: "Product & Business Strategy",
  },
  {
    title: "PMO 2.0: Project Management Office Blueprint",
    issuer: "Enterprise PMO Academy",
    year: "2024",
    featured: false,
    category: "Governance & Enterprise PMO",
  },
  {
    title: "The Ultimate SQL Bootcamp: PostgreSQL & Oracle SQL",
    issuer: "Database Engineering Academy",
    year: "2023",
    featured: false,
    category: "Database & Ledger Verification",
  },
  {
    title: "QA Metrics & KPIs: Measuring Test Effectiveness",
    issuer: "Software Quality Institute",
    year: "2023",
    featured: false,
    category: "Metrics & Test Leadership",
  },
  {
    title: "Defect Management & QA Reporting",
    issuer: "Software Quality Institute",
    year: "2023",
    featured: false,
    category: "Defect Triage & Release Governance",
  },
  {
    title: "MCP for Leaders: Architecting Context-Driven AI",
    issuer: "Modern AI Engineering",
    year: "2025",
    featured: false,
    category: "AI & Modern Architecture",
  },
  {
    title: "Cybersecurity 101 & CyberSecurity Bootcamp",
    issuer: "Udemy Certified",
    year: "2025",
    featured: false,
    category: "System Security & Compliance",
  },
];

export const SKILLS_GROUPS = [
  {
    category: { en: "Banking & Treasury Domain", id: "Domain Perbankan & Treasury" },
    accent: "#ea4530",
    items: [
      "Core Banking (BDS, Host/AS400)",
      "Account & Ledger Posting",
      "Interest Accrual & Tax Logic",
      "Treasury & FX (e-FX, Non-IDR)",
      "Balance Forecasting",
      "Cash Management & Escrow",
      "BI-FAST & H2H/API Payments",
      "Trade Finance & Bank Garansi",
      "Supply Chain Financing (MFSCM)",
      "Online Custody & Remittance",
    ],
  },
  {
    category: { en: "System & Business Analysis", id: "Analisis Sistem & Bisnis" },
    accent: "#3aa1d8",
    items: [
      "Requirements Gathering & Workshops",
      "Business Requirement Document (BRD)",
      "As-Is / To-Be Process Flows",
      "User Stories & Acceptance Criteria",
      "System Design & Functional Specs",
      "Sequence & Workflow Diagramming",
      "Legacy Code Reverse-Engineering",
      "Change Request Impact Analysis",
    ],
  },
  {
    category: { en: "Quality Engineering & Tools", id: "Quality Engineering & Tools" },
    accent: "#f1eec0",
    items: [
      "ISTQB® CTFL Certified",
      "Functional, SIT, UAT & Regression",
      "API Testing (Postman)",
      "SQL & DB Validation (DBeaver, SQL Developer)",
      "Host/AS400 & Cleopatra",
      "Jira, Azure DevOps & Git",
      "FileZilla / SFTP",
      "BDD Test Design & Defect Triage",
    ],
  },
];

export const EDUCATION_LIST = [
  {
    degree: {
      en: "Bachelor's Degree in Information Systems",
      id: "Sarjana Sistem Informasi (S1)",
    },
    school: "Universitas Nusa Mandiri",
    period: "2020 - 2021",
  },
  {
    degree: {
      en: "Diploma in Information Systems",
      id: "Diploma Sistem Informasi (D3)",
    },
    school: "Universitas Bina Sarana Informatika",
    period: "2016 - 2019",
  },
];

export const KENJI_FRAMEWORK_PILLARS = [
  {
    num: "01",
    title: { en: "The Humble Master Paradox", id: "Paradoks sang Empu yang Rendah Hati" },
    formula: "making ( ) things is the job. loving it is the ( ) bonus.",
    desc: {
      en: "Never call yourself a 'visionary'. Call the work what it plainly is ('making things', 'shaping systems', 'solving chaos'), then immediately contrast it with the emotional truth ('loving it is the bonus').",
      id: "Jangan pernah klaim diri sebagai 'visioner'. Sebut pekerjaan secara jujur ('merancang sistem', 'mengurai bisnis'), lalu tabrakkan langsung dengan alasan emosional di baris kedua.",
    },
  },
  {
    num: "02",
    title: { en: "The (  ) Parenthesis Frame", id: "Bingkai Tanda Kurung (  )" },
    formula: "verb ( [visual artifact] ) noun.",
    desc: {
      en: "Punctuation becomes exhibition space. By placing an interactive visual object inside light parentheses ( ), the viewer reads both the copy and the craft simultaneously.",
      id: "Tanda baca berubah menjadi ruang pamer. Dengan menaruh objek visual interaktif di dalam tanda kurung ( ), pengunjung membaca teks sekaligus merasakan karyamu.",
    },
  },
  {
    num: "03",
    title: { en: "Kinetic Verbs + Em-Dash Philosophy", id: "Verba Gerak + Filosofi Em-Dash (—)" },
    formula: "...who moves between [A], [B], and [C] — always [core obsession].",
    desc: {
      en: "Instead of static lists ('skilled in BRD, SQL, QA'), use movement ('who moves between core banking, treasury systems, and end-to-end specifications — always translating complexity into clarity').",
      id: "Alih-alih daftar kaku ('mahir BRD, SQL, QA'), gunakan kata kerja gerak ('yang bergerak di antara core banking, sistem treasury, dan spesifikasi sistem — selalu menerjemahkan kerumitan menjadi kejelasan').",
    },
  },
  {
    num: "04",
    title: { en: "'Built Around a Single Idea'", id: "'Dibangun di Atas Satu Ide Tunggal'" },
    formula: "[Deliverable] for [Client], built around a single idea: [The 6-word tension].",
    desc: {
      en: "Busy hiring managers and directors don't read 5-paragraph essays on a homepage. Give them the exact system scope and the single sharp idea that holds the whole project together.",
      id: "Rekruter dan klien sibuk tidak membaca esai panjang di beranda. Berikan skala sistemnya dan satu ide tajam yang menjadi nyawa dari keseluruhan proyek tersebut.",
    },
  },
];
