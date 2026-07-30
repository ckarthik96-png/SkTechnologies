import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, "../public/downloads");
mkdirSync(OUTPUT_DIR, { recursive: true });

// ---------- COLOUR PALETTE ----------
const DARK_BG  = rgb(0.02, 0.03, 0.09);   // #050816
const PRIMARY  = rgb(0.145, 0.38, 0.92);   // #2563eb
const ACCENT   = rgb(0.024, 0.714, 0.831); // #06b6d4
const WHITE    = rgb(1, 1, 1);
const SLATE    = rgb(0.56, 0.62, 0.71);
const SLATE_DK = rgb(0.11, 0.14, 0.21);

function clamp(v) { return Math.min(1, Math.max(0, v)); }

// ---------- HELPERS ----------
async function baseDoc() {
  const doc = await PDFDocument.create();
  doc.setAuthor("SkyEagle Technologies");
  doc.setCreator("SkyEagle Technologies -- skyeagletechno.shawanreddy.com");
  return doc;
}

function addPage(doc, title) {
  const page = doc.addPage([595.28, 841.89]); // A4
  const { width, height } = page.getSize();
  // Dark background
  page.drawRectangle({ x: 0, y: 0, width, height, color: DARK_BG });
  // Top accent bar
  page.drawRectangle({ x: 0, y: height - 6, width, height: 6, color: PRIMARY });
  return page;
}

function drawHRule(page, y, { width = 595, color = SLATE_DK, thickness = 1 } = {}) {
  page.drawLine({ start: { x: 40, y }, end: { x: width - 40, y }, thickness, color });
}

function drawPill(page, x, y, label, font, { bg = PRIMARY, fg = WHITE, fontSize = 8 } = {}) {
  const pad = 8;
  const tw = font.widthOfTextAtSize(label, fontSize);
  const pillW = tw + pad * 2;
  const pillH = fontSize + pad;
  page.drawRectangle({ x, y: y - 3, width: pillW, height: pillH, color: bg, borderRadius: 4 });
  page.drawText(label, { x: x + pad, y: y + 2, size: fontSize, font, color: fg });
  return pillW;
}

function drawFooter(page, font, pageNum, total) {
  const { width } = page.getSize();
  drawHRule(page, 50, { color: SLATE_DK });
  page.drawText("SkyEagle Technologies  |  Konanakunte, Bengaluru 560062  |  +91 93534 27314  |  sales@skyeagletechno.com", {
    x: 40, y: 34, size: 7, font, color: SLATE,
  });
  page.drawText(`Page ${pageNum} / ${total}`, {
    x: width - 90, y: 34, size: 7, font, color: SLATE,
  });
}

function drawSection(page, title, font, boldFont, y) {
  page.drawRectangle({ x: 40, y: y - 4, width: 515, height: 22, color: SLATE_DK, borderRadius: 3 });
  page.drawText(title.toUpperCase(), { x: 48, y: y + 4, size: 9, font: boldFont, color: PRIMARY });
  return y - 30;
}

function drawBullet(page, text, font, y, { indent = 48, fontSize = 9, color = SLATE } = {}) {
  page.drawText("*", { x: indent - 8, y, size: fontSize, font, color: PRIMARY });
  page.drawText(text, { x: indent, y, size: fontSize, font, color });
  return y - 15;
}

function drawKeyValue(page, key, value, fontR, fontB, y) {
  page.drawText(key + ":", { x: 48, y, size: 9, font: fontB, color: WHITE });
  page.drawText(value, { x: 180, y, size: 9, font: fontR, color: SLATE });
  return y - 15;
}

// ======================================================
//  1. COMPANY PROFILE
// ======================================================
async function buildCompanyProfile() {
  const doc = await baseDoc();
  doc.setTitle("SkyEagle Technologies -- Company Profile 2025");
  doc.setSubject("Company Overview and Service Portfolio");

  const fontR = await doc.embedFont(StandardFonts.Helvetica);
  const fontB = await doc.embedFont(StandardFonts.HelveticaBold);

  // ---- PAGE 1: COVER ----
  const cover = addPage(doc, "Cover");
  const { width, height } = cover.getSize();

  // Gradient-like overlay
  cover.drawRectangle({ x: 0, y: 0, width, height: height * 0.55, color: rgb(0.04, 0.06, 0.16) });

  // Hexagon decorative shapes (top-right cluster)
  [[480, 790], [510, 760], [450, 755]].forEach(([cx, cy]) => {
    cover.drawCircle({ x: cx, y: cy, size: 22, color: rgb(0.1, 0.22, 0.55), opacity: 0.4, borderColor: PRIMARY, borderWidth: 1 });
  });

  // Logo hex outline
  cover.drawCircle({ x: 100, y: height - 90, size: 30, borderColor: PRIMARY, borderWidth: 2, color: DARK_BG });
  cover.drawCircle({ x: 100, y: height - 90, size: 10, color: PRIMARY });
  cover.drawText("SET", { x: 80, y: height - 86, size: 9, font: fontB, color: WHITE });

  cover.drawText("COMPANY PROFILE", { x: 40, y: height - 160, size: 10, font: fontB, color: PRIMARY });
  cover.drawText("SkyEagle", { x: 40, y: height - 200, size: 42, font: fontB, color: WHITE });
  cover.drawText("Technologies", { x: 40, y: height - 248, size: 36, font: fontR, color: rgb(0.7, 0.8, 0.95) });

  cover.drawText("Enterprise IT Infrastructure, Networking,", { x: 40, y: height - 288, size: 12, font: fontR, color: SLATE });
  cover.drawText("Cyber Security & Cloud Solutions", { x: 40, y: height - 305, size: 12, font: fontR, color: SLATE });

  drawHRule(cover, height - 330, { color: PRIMARY, thickness: 2 });

  const pills = ["ISO Certified", "24/7 Support", "AMC Services", "Bengaluru Based"];
  let px = 40;
  pills.forEach(p => { px += drawPill(cover, px, height - 360, p, fontB) + 10; });

  // Stats row
  const stats = [["120+", "Projects"], ["80+", "Clients"], ["6+", "Years"], ["24x7", "Uptime"]];
  stats.forEach(([num, lbl], i) => {
    const sx = 40 + i * 130;
    cover.drawText(num, { x: sx, y: height - 430, size: 22, font: fontB, color: PRIMARY });
    cover.drawText(lbl, { x: sx, y: height - 450, size: 9, font: fontR, color: SLATE });
  });

  cover.drawText("Empowering Bengaluru businesses with certified IT solutions,", { x: 40, y: height - 510, size: 11, font: fontR, color: rgb(0.8, 0.85, 0.95) });
  cover.drawText("enterprise-grade hardware, and round-the-clock managed services.", { x: 40, y: height - 526, size: 11, font: fontR, color: rgb(0.8, 0.85, 0.95) });

  // Address block bottom
  cover.drawRectangle({ x: 0, y: 0, width, height: 90, color: SLATE_DK });
  cover.drawText("SkyEagle Technologies", { x: 40, y: 65, size: 11, font: fontB, color: WHITE });
  cover.drawText("Srinidhi Layout, Konanakunte, Bengaluru, Karnataka -- 560062", { x: 40, y: 50, size: 9, font: fontR, color: SLATE });
  cover.drawText("+91 93534 27314  |  sales@skyeagletechno.com  |  skyeagletechno.shawanreddy.com", { x: 40, y: 35, size: 9, font: fontR, color: SLATE });
  cover.drawText("Confidential -- 2025", { x: width - 120, y: 20, size: 8, font: fontR, color: SLATE });

  // ---- PAGE 2: ABOUT + SERVICES ----
  const p2 = addPage(doc, "About");
  let y = height - 60;

  p2.drawText("About SkyEagle Technologies", { x: 40, y, size: 18, font: fontB, color: WHITE });
  y -= 30;
  drawHRule(p2, y, { color: PRIMARY, thickness: 1 });
  y -= 20;

  const aboutText = [
    "SkyEagle Technologies is a Bengaluru-based IT infrastructure and managed services",
    "company serving commercial enterprises across Karnataka. Founded with a mission to",
    "deliver enterprise-quality technology solutions at transparent, accessible prices,",
    "we operate as a full-service IT department for growing businesses.",
    "",
    "Under the coordination of Saarika (+91 93534 27314), our certified team delivers",
    "responsive on-site and remote support, rapid hardware procurement, structured",
    "cabling installations, cloud migrations, and annual maintenance services.",
  ];
  aboutText.forEach(line => {
    p2.drawText(line, { x: 48, y, size: 9.5, font: fontR, color: SLATE });
    y -= 14;
  });

  y -= 10;
  y = drawSection(p2, "Core Service Portfolio", fontR, fontB, y);

  const services = [
    "IT Infrastructure Design -- Office network layouts, server rack installations, cable management",
    "Networking & Wi-Fi -- WAN/LAN routing, VLAN configuration, Cisco/Ubiquiti AP deployments",
    "Cyber Security & Firewall -- Sophos & Fortinet NGFW, VPN tunnels, Zero Trust policy mapping",
    "Cloud & Microsoft 365 -- Azure migrations, Exchange Online, SharePoint, OneDrive setups",
    "CCTV & Surveillance -- IP camera installations, NVR/DVR configuration, remote monitoring",
    "Server Management -- Windows Server, Active Directory, Group Policy, patch management",
    "Data Recovery Services -- HDD, SSD, RAID, NAS data extraction and recovery",
    "Refurbished IT Hardware -- Dell, HP, Lenovo, Apple certified business laptops and desktops",
    "Printer Rentals -- HP, Canon, Epson, Brother laser and inkjet office printer rentals",
    "Annual Maintenance Contracts (AMC) -- Preventive maintenance, priority SLA support",
    "IT Procurement -- Genuine OEM hardware sourcing and vendor-certified components",
    "Structured Cabling -- CAT6/CAT6A copper and fiber optic LAN infrastructure",
    "Remote Support -- Dedicated helpdesk with fast ticket resolution workflows",
    "Website & Digital Setup -- Business hosting, domain, email, and cloud tools",
  ];
  services.forEach(svc => { y = drawBullet(p2, svc, fontR, y); });

  drawFooter(p2, fontR, 2, 3);

  // ---- PAGE 3: WHY US + CONTACT ----
  const p3 = addPage(doc, "Why Us");
  y = height - 60;

  p3.drawText("Why Businesses Choose SkyEagle", { x: 40, y, size: 18, font: fontB, color: WHITE });
  y -= 30;
  drawHRule(p3, y, { color: PRIMARY, thickness: 1 });
  y -= 20;

  y = drawSection(p3, "Key Differentiators", fontR, fontB, y);
  const diff = [
    "Certified OEM-trained engineers with hands-on enterprise experience",
    "Transparent, flexible pricing -- no hidden service charges or lock-in costs",
    "2-4 hour rapid on-site SLA response for Bengaluru commercial clients",
    "Genuine hardware components sourced directly from manufacturer channels",
    "End-to-end project ownership from design through deployment and maintenance",
    "Strong OEM partnerships: Cisco, Sophos, Fortinet, Microsoft, Google, AWS",
    "Dedicated WhatsApp support channel for immediate emergency escalation",
  ];
  diff.forEach(d => { y = drawBullet(p3, d, fontR, y); });

  y -= 10;
  y = drawSection(p3, "Industries Served", fontR, fontB, y);
  const industries = [
    "Information Technology (IT / ITES)", "Healthcare & Diagnostics", "Education & Coaching Institutes",
    "Banking, Finance & Insurance (BFSI)", "Manufacturing & Warehousing", "Retail & E-Commerce",
    "Hospitality & Real Estate", "Government & Public Sector",
  ];
  industries.forEach(ind => { y = drawBullet(p3, ind, fontR, y); });

  y -= 10;
  y = drawSection(p3, "Technology Partners", fontR, fontB, y);
  p3.drawText("Cisco  *  Microsoft 365  *  AWS  *  Google Cloud  *  Sophos  *  Fortinet  *  Zoho  *  Jio Fiber  *  Adobe  *  Salesforce", {
    x: 48, y, size: 9, font: fontR, color: SLATE,
  });
  y -= 20;

  y -= 10;
  y = drawSection(p3, "Contact Information", fontR, fontB, y);
  y = drawKeyValue(p3, "Company", "SkyEagle Technologies", fontR, fontB, y);
  y = drawKeyValue(p3, "Address", "Srinidhi Layout, Konanakunte, Bengaluru 560062", fontR, fontB, y);
  y = drawKeyValue(p3, "Phone / WhatsApp", "+91 93534 27314 (Saarika)", fontR, fontB, y);
  y = drawKeyValue(p3, "Email", "sales@skyeagletechno.com", fontR, fontB, y);
  y = drawKeyValue(p3, "Website", "https://skyeagletechno.shawanreddy.com", fontR, fontB, y);
  y = drawKeyValue(p3, "Working Hours", "Monday - Saturday, 9:00 AM - 7:00 PM IST", fontR, fontB, y);

  drawFooter(p3, fontR, 3, 3);

  const bytes = await doc.save();
  writeFileSync(join(OUTPUT_DIR, "SkyEagle-Company-Profile-2025.pdf"), bytes);
  console.log("✅  Company Profile PDF generated.");
}

// ======================================================
//  2. AMC SERVICE SHEET
// ======================================================
async function buildAMCSheet() {
  const doc = await baseDoc();
  doc.setTitle("SkyEagle Technologies -- AMC Service Sheet 2025");
  doc.setSubject("Annual Maintenance Contract Plans & Terms");

  const fontR = await doc.embedFont(StandardFonts.Helvetica);
  const fontB = await doc.embedFont(StandardFonts.HelveticaBold);

  // ---- PAGE 1 ----
  const p1 = addPage(doc, "AMC");
  const { width, height } = p1.getSize();
  let y = height - 60;

  // Header
  p1.drawText("SkyEagle Technologies", { x: 40, y, size: 14, font: fontB, color: PRIMARY });
  y -= 20;
  p1.drawText("Annual Maintenance Contract (AMC) -- Service Sheet 2025", { x: 40, y, size: 18, font: fontB, color: WHITE });
  y -= 10;
  drawHRule(p1, y, { color: PRIMARY, thickness: 2 });
  y -= 20;

  p1.drawText("Protect your IT investment with a structured maintenance agreement that keeps your hardware,", { x: 40, y, size: 9.5, font: fontR, color: SLATE });
  y -= 14;
  p1.drawText("network, and software running at peak efficiency -- without unexpected repair costs.", { x: 40, y, size: 9.5, font: fontR, color: SLATE });
  y -= 25;

  // Plans table
  y = drawSection(p1, "AMC Plans & Pricing", fontR, fontB, y);

  const plans = [
    { name: "BASIC", price: "INR1,999/mo", devices: "Up to 10", visits: "2 / quarter", remote: "Yes", sla: "48 hrs", cloud: "No", color: SLATE_DK },
    { name: "STANDARD", price: "INR4,999/mo", devices: "Up to 25", visits: "Monthly", remote: "Yes", sla: "24 hrs", cloud: "Basic", color: rgb(0.1, 0.2, 0.4) },
    { name: "ENTERPRISE", price: "INR9,999/mo", devices: "Unlimited", visits: "Weekly", remote: "Yes", sla: "4 hrs", cloud: "Full", color: rgb(0.05, 0.15, 0.35) },
  ];

  const cols = [48, 140, 235, 300, 365, 430, 490];
  const headers = ["PLAN", "PRICE", "DEVICES", "ON-SITE VISITS", "REMOTE SUPPORT", "SLA", "CLOUD"];

  // Header row
  p1.drawRectangle({ x: 40, y: y - 4, width: 515, height: 20, color: PRIMARY });
  headers.forEach((h, i) => {
    p1.drawText(h, { x: cols[i], y: y + 2, size: 8, font: fontB, color: WHITE });
  });
  y -= 22;

  plans.forEach(plan => {
    p1.drawRectangle({ x: 40, y: y - 4, width: 515, height: 20, color: plan.color });
    const vals = [plan.name, plan.price, plan.devices, plan.visits, plan.remote, plan.sla, plan.cloud];
    vals.forEach((v, i) => {
      p1.drawText(v, { x: cols[i], y: y + 2, size: 8.5, font: i === 0 ? fontB : fontR, color: i === 0 ? ACCENT : WHITE });
    });
    y -= 22;
  });

  y -= 15;
  y = drawSection(p1, "What's Included in All Plans", fontR, fontB, y);
  const included = [
    "Preventive hardware inspection and dust cleaning every quarter",
    "Software and OS patch management for all covered workstations",
    "Antivirus and endpoint security monitoring and renewal reminders",
    "Network switch, router, and firewall health audits",
    "Printer and peripheral device maintenance",
    "UPS battery health checks and load testing",
    "Priority ticket routing with dedicated coordinator contact",
  ];
  included.forEach(item => { y = drawBullet(p1, item, fontR, y); });

  y -= 10;
  y = drawSection(p1, "On-Site Response Time Commitment", fontR, fontB, y);
  const slas = [
    { tier: "Critical (Server Down / Network Outage)", time: "2-4 hours", plan: "Enterprise" },
    { tier: "High (Multiple workstations affected)", time: "Same day", plan: "Standard & Enterprise" },
    { tier: "Medium (Single device, non-blocking)", time: "Within 24 hours", plan: "All Plans" },
    { tier: "Low (Routine / Scheduled tasks)", time: "Within 48 hours", plan: "All Plans" },
  ];
  slas.forEach(sla => {
    p1.drawText(`* ${sla.tier}`, { x: 48, y, size: 9, font: fontR, color: SLATE });
    p1.drawText(`-> ${sla.time}`, { x: 330, y, size: 9, font: fontB, color: WHITE });
    p1.drawText(`(${sla.plan})`, { x: 420, y, size: 8, font: fontR, color: PRIMARY });
    y -= 15;
  });

  drawFooter(p1, fontR, 1, 2);

  // ---- PAGE 2 ----
  const p2 = addPage(doc, "AMC Terms");
  y = height - 60;

  p2.drawText("AMC Terms, Scope & Exclusions", { x: 40, y, size: 18, font: fontB, color: WHITE });
  y -= 10;
  drawHRule(p2, y, { color: PRIMARY, thickness: 1 });
  y -= 25;

  y = drawSection(p2, "Scope of Coverage", fontR, fontB, y);
  const scope = [
    "Desktop and laptop computers (Windows and macOS)",
    "Networking equipment: switches, routers, access points, firewalls",
    "Printers, scanners, and multi-function devices",
    "Servers and NAS storage units",
    "UPS systems and power conditioning equipment",
    "CCTV systems (hardware check, DVR/NVR configuration)",
    "Structured cabling inspection and termination testing",
  ];
  scope.forEach(s => { y = drawBullet(p2, s, fontR, y); });

  y -= 10;
  y = drawSection(p2, "Add-On Services (Charged Separately)", fontR, fontB, y);
  const addons = [
    "Hardware part replacements (motherboard, PSU, screens, hard drives)",
    "Spares and consumables procurement (toner, ink, cables, RAM, SSD)",
    "New equipment procurement and deployment",
    "Cloud subscription licenses (Microsoft 365, Google Workspace)",
    "Software licensing renewals",
    "Out-of-scope on-site visits beyond the agreed plan visit quota",
  ];
  addons.forEach(a => { y = drawBullet(p2, a, fontR, y, { color: rgb(0.9, 0.5, 0.3) }); });

  y -= 10;
  y = drawSection(p2, "Contract Terms", fontR, fontB, y);
  const terms = [
    ["Contract Duration", "1 Year (12 months) -- renewable annually"],
    ["Payment Terms", "Monthly advance or annual upfront (5% discount on annual)"],
    ["Notice Period", "30 days written notice required for cancellation"],
    ["Escalation", "Direct escalation to senior engineer within 2 hours of priority ticket"],
    ["Coverage Hours", "Monday-Saturday, 9:00 AM-7:00 PM IST (Emergency 24x7 for Enterprise)"],
    ["Geographic Coverage", "Bengaluru city and suburbs (outstation on additional travel cost)"],
  ];
  terms.forEach(([k, v]) => { y = drawKeyValue(p2, k, v, fontR, fontB, y); });

  y -= 10;
  y = drawSection(p2, "How to Get Started", fontR, fontB, y);
  const steps = [
    "Step 1: Contact Saarika at +91 93534 27314 or sales@skyeagletechno.com",
    "Step 2: We schedule a free site audit and inventory of your existing equipment",
    "Step 3: We recommend the right AMC plan based on your fleet size and needs",
    "Step 4: Agreement signing and first preventive maintenance visit within 7 days",
  ];
  steps.forEach(s => { y = drawBullet(p2, s, fontR, y, { color: WHITE }); });

  drawFooter(p2, fontR, 2, 2);

  const bytes = await doc.save();
  writeFileSync(join(OUTPUT_DIR, "SkyEagle-AMC-Service-Sheet-2025.pdf"), bytes);
  console.log("✅  AMC Service Sheet PDF generated.");
}

// ======================================================
//  3. PRODUCT CATALOG
// ======================================================
async function buildProductCatalog() {
  const doc = await baseDoc();
  doc.setTitle("SkyEagle Technologies -- Product & Service Catalog 2025");
  doc.setSubject("Complete IT Hardware and Services Catalog");

  const fontR = await doc.embedFont(StandardFonts.Helvetica);
  const fontB = await doc.embedFont(StandardFonts.HelveticaBold);

  // ---- PAGE 1: LAPTOPS ----
  const p1 = addPage(doc, "Laptops");
  const { width, height } = p1.getSize();
  let y = height - 60;

  p1.drawText("SkyEagle Technologies", { x: 40, y, size: 12, font: fontB, color: PRIMARY });
  y -= 18;
  p1.drawText("Refurbished IT Hardware & Services -- Product Catalog 2025", { x: 40, y, size: 16, font: fontB, color: WHITE });
  y -= 8;
  drawHRule(p1, y, { color: PRIMARY, thickness: 2 });
  y -= 18;
  p1.drawText("All hardware items undergo a strict 25-point diagnostic test. Certified, tested, and backed by SkyEagle warranty support.", {
    x: 40, y, size: 9, font: fontR, color: SLATE,
  });
  y -= 25;

  y = drawSection(p1, "Business Laptops (Refurbished -- Grade A / A+)", fontR, fontB, y);

  const laptops = [
    ["Dell Latitude 7490", "Core i5 8th Gen | 16GB RAM | 256GB SSD | 14\" FHD", "Grade A++", "INR18,500"],
    ["Lenovo ThinkPad T480s", "Core i7 8th Gen | 16GB RAM | 512GB SSD | 14\" FHD", "Grade A+", "INR22,000"],
    ["HP EliteBook 840 G5", "Core i5 8th Gen | 16GB RAM | 512GB SSD | 14\" Touch", "Grade A", "INR19,800"],
    ["Apple MacBook Pro 2019", "Core i7 | 16GB RAM | 512GB SSD | 15.4\" Retina | Touch Bar", "Grade A++", "INR38,000"],
  ];

  // Table header
  const lCols = [48, 215, 380, 465, 525];
  const lHeaders = ["MODEL", "SPECIFICATIONS", "CONDITION", "PRICE"];
  p1.drawRectangle({ x: 40, y: y - 4, width: 515, height: 18, color: PRIMARY });
  lHeaders.forEach((h, i) => {
    p1.drawText(h, { x: lCols[i], y: y + 1, size: 8, font: fontB, color: WHITE });
  });
  y -= 20;

  laptops.forEach((row, idx) => {
    p1.drawRectangle({ x: 40, y: y - 5, width: 515, height: 20, color: idx % 2 === 0 ? SLATE_DK : DARK_BG });
    p1.drawText(row[0], { x: lCols[0], y: y + 1, size: 8.5, font: fontB, color: WHITE });
    p1.drawText(row[1], { x: lCols[1], y: y + 1, size: 7.5, font: fontR, color: SLATE });
    p1.drawText(row[2], { x: lCols[2], y: y + 1, size: 8, font: fontR, color: rgb(0.2, 0.9, 0.5) });
    p1.drawText(row[3], { x: lCols[3], y: y + 1, size: 8.5, font: fontB, color: ACCENT });
    y -= 22;
  });

  y -= 10;
  y = drawSection(p1, "Desktop Computers & Workstations", fontR, fontB, y);

  const desktops = [
    ["Dell OptiPlex 7050 SFF", "Core i7 7th Gen | 16GB RAM | 512GB SSD | Win 10 Pro", "Grade A+", "INR14,500"],
    ["Lenovo ThinkCentre M710q Tiny", "Core i5 7th Gen | 8GB RAM | 256GB SSD | Micro Form", "Grade A", "INR11,000"],
    ["HP Z240 Workstation", "Xeon E3-1225 v5 | 32GB RAM | 512GB SSD + 1TB HDD | NVIDIA Quadro", "Grade A+", "INR26,000"],
  ];

  p1.drawRectangle({ x: 40, y: y - 4, width: 515, height: 18, color: PRIMARY });
  lHeaders.forEach((h, i) => {
    p1.drawText(h, { x: lCols[i], y: y + 1, size: 8, font: fontB, color: WHITE });
  });
  y -= 20;

  desktops.forEach((row, idx) => {
    p1.drawRectangle({ x: 40, y: y - 5, width: 515, height: 20, color: idx % 2 === 0 ? SLATE_DK : DARK_BG });
    p1.drawText(row[0], { x: lCols[0], y: y + 1, size: 8.5, font: fontB, color: WHITE });
    p1.drawText(row[1], { x: lCols[1], y: y + 1, size: 7.5, font: fontR, color: SLATE });
    p1.drawText(row[2], { x: lCols[2], y: y + 1, size: 8, font: fontR, color: rgb(0.2, 0.9, 0.5) });
    p1.drawText(row[3], { x: lCols[3], y: y + 1, size: 8.5, font: fontB, color: ACCENT });
    y -= 22;
  });

  y -= 10;
  y = drawSection(p1, "Monitors & Display Units", fontR, fontB, y);
  p1.drawText("Dell 24\" P2419H Professional Monitor -- IPS FHD | HDMI, DisplayPort, VGA -- INR6,500 approx.", { x: 48, y, size: 9, font: fontR, color: SLATE });
  y -= 15;
  p1.drawText("All monitors grade A++ (scratchless). 3-month support warranty included.", { x: 48, y, size: 9, font: fontR, color: SLATE });

  drawFooter(p1, fontR, 1, 3);

  // ---- PAGE 2: PRINTERS & NETWORKING ----
  const p2 = addPage(doc, "Printers");
  y = height - 60;

  p2.drawText("Printer Rentals & Networking Gear", { x: 40, y, size: 18, font: fontB, color: WHITE });
  y -= 10;
  drawHRule(p2, y, { color: PRIMARY, thickness: 1 });
  y -= 25;

  y = drawSection(p2, "Printer Rentals (Monthly Rates -- All Inclusive)", fontR, fontB, y);

  const printers = [
    ["Brother HL-L2321D", "Mono Laser | Auto Duplex | 30ppm | USB", "INR899 / mo"],
    ["Epson EcoTank L3250 Color MFP", "Color InkTank | Print/Scan/Copy | Wireless", "INR999 / mo"],
    ["Brother MFC-L2715DW", "Mono Laser MFP | Print/Scan/Copy/Fax | Wi-Fi | 34ppm", "INR1,199 / mo"],
    ["Canon imageCLASS MF244dw", "Mono Laser MFP | Print/Scan/Copy | 27ppm | Auto Duplex", "INR1,299 / mo"],
    ["HP LaserJet Pro MFP M428fdw", "Mono Laser | Print/Scan/Copy/Fax | 40ppm | Wi-Fi", "INR1,499 / mo"],
    ["Brother DCP-L3551CDW Color MFP", "Color Laser | Print/Scan/Copy | Wi-Fi | 22ppm | Touchscreen", "INR1,799 / mo"],
    ["HP LaserJet Enterprise M507dn", "Enterprise Mono | 45ppm | Auto Duplex | 550-sheet Tray", "INR2,499 / mo"],
  ];

  const pCols = [48, 195, 390, 490];
  const pHeaders = ["MODEL", "SPECIFICATIONS", "MONTHLY RATE"];
  p2.drawRectangle({ x: 40, y: y - 4, width: 515, height: 18, color: PRIMARY });
  pHeaders.forEach((h, i) => { p2.drawText(h, { x: pCols[i], y: y + 1, size: 8, font: fontB, color: WHITE }); });
  y -= 20;

  printers.forEach((row, idx) => {
    p2.drawRectangle({ x: 40, y: y - 5, width: 515, height: 20, color: idx % 2 === 0 ? SLATE_DK : DARK_BG });
    p2.drawText(row[0], { x: pCols[0], y: y + 1, size: 8, font: fontB, color: WHITE });
    p2.drawText(row[1], { x: pCols[1], y: y + 1, size: 7.5, font: fontR, color: SLATE });
    p2.drawText(row[2], { x: pCols[2], y: y + 1, size: 8.5, font: fontB, color: ACCENT });
    y -= 22;
  });

  y -= 15;
  p2.drawText("* All rental plans include: Toner/Ink consumables, Network configuration, Maintenance & repair coverage.", { x: 48, y, size: 8, font: fontR, color: PRIMARY });
  y -= 25;

  y = drawSection(p2, "Networking Hardware", fontR, fontB, y);
  const networking = [
    ["Cisco Catalyst 2960X", "24-Port Gigabit Switch | 4x1G SFP | Managed -- Refurbished Grade A", "Inquire"],
    ["D-Link DGS-1024D", "24-Port Gigabit Unmanaged Switch -- Brand New", "Inquire"],
    ["Fortinet FortiGate 60E", "Next-Gen Firewall | 10 GE RJ45 Ports | IPS/UTM -- Refurbished", "Inquire"],
    ["Ubiquiti UniFi AP AC Pro", "Dual Band 802.11ac Access Point | 3x3 MIMO -- Brand New", "Inquire"],
  ];

  p2.drawRectangle({ x: 40, y: y - 4, width: 515, height: 18, color: PRIMARY });
  ["DEVICE", "SPECIFICATIONS", "PRICE"].forEach((h, i) => {
    p2.drawText(h, { x: pCols[i], y: y + 1, size: 8, font: fontB, color: WHITE });
  });
  y -= 20;

  networking.forEach((row, idx) => {
    p2.drawRectangle({ x: 40, y: y - 5, width: 515, height: 20, color: idx % 2 === 0 ? SLATE_DK : DARK_BG });
    p2.drawText(row[0], { x: pCols[0], y: y + 1, size: 8, font: fontB, color: WHITE });
    p2.drawText(row[1], { x: pCols[1], y: y + 1, size: 7.5, font: fontR, color: SLATE });
    p2.drawText(row[2], { x: pCols[2], y: y + 1, size: 8.5, font: fontB, color: ACCENT });
    y -= 22;
  });

  y -= 10;
  y = drawSection(p2, "Genuine Spare Parts", fontR, fontB, y);
  const spares = [
    "Samsung 870 EVO 500GB SSD -- 2.5\" SATA III | Read 560MB/s -- Brand New Box Pack",
    "Kingston 8GB DDR4 2666MHz SODIMM -- Brand New | Laptop Memory",
    "WD Blue 1TB HDD -- 2.5\" SATA | 5400RPM -- Brand New Box Pack",
    "Crucial 16GB DDR4 3200MHz Desktop DIMM -- Brand New",
    "Dell/HP/Lenovo OEM Charger Adapters -- Model-specific, genuine sourcing",
  ];
  spares.forEach(s => { y = drawBullet(p2, s, fontR, y); });

  drawFooter(p2, fontR, 2, 3);

  // ---- PAGE 3: SERVICES SUMMARY ----
  const p3 = addPage(doc, "Services");
  y = height - 60;

  p3.drawText("IT Services & Solutions Summary", { x: 40, y, size: 18, font: fontB, color: WHITE });
  y -= 10;
  drawHRule(p3, y, { color: PRIMARY, thickness: 1 });
  y -= 25;

  const serviceGroups = [
    {
      title: "Infrastructure & Networking",
      items: [
        "Structured cabling -- CAT6/CAT6A copper and fiber optic backbone",
        "VLAN design, routing table configuration, WAN failover setup",
        "Wireless mesh AP deployments -- Cisco, Ubiquiti, TP-Link",
        "Network rack installation, patch panel termination, cable management",
      ],
    },
    {
      title: "Cyber Security",
      items: [
        "Sophos and Fortinet Next-Gen Firewall installation and policy configuration",
        "SSL VPN / IPSec site-to-site tunnel setup",
        "Endpoint antivirus and EDR deployment -- Sophos Intercept X",
        "Vulnerability Assessment & Penetration Testing (VAPT) reports",
      ],
    },
    {
      title: "Cloud & Microsoft 365",
      items: [
        "Microsoft 365 Business setup -- Exchange Online, Teams, SharePoint, OneDrive",
        "Azure AD / Entra ID and Conditional Access Policies",
        "AWS EC2/S3 cloud provisioning and cost optimization",
        "Google Workspace (Drive, Gmail, Meet) enterprise setup",
      ],
    },
    {
      title: "Server & Virtualization",
      items: [
        "Windows Server 2019/2022 -- AD DS, DNS, DHCP, File Sharing, WSUS",
        "VMware vSphere / Hyper-V virtual machine setup and migration",
        "NAS / SAN storage configuration and RAID management",
        "Automated cloud backup solutions using Azure Backup or Veeam",
      ],
    },
  ];

  serviceGroups.forEach(group => {
    y = drawSection(p3, group.title, fontR, fontB, y);
    group.items.forEach(item => { y = drawBullet(p3, item, fontR, y); });
    y -= 8;
  });

  y -= 5;
  p3.drawRectangle({ x: 40, y: y - 35, width: 515, height: 55, color: rgb(0.08, 0.17, 0.4), borderRadius: 4 });
  p3.drawText("Request a Quote or Free Site Assessment", { x: 60, y: y + 8, size: 12, font: fontB, color: WHITE });
  p3.drawText("Call / WhatsApp:  +91 93534 27314  |  Email:  sales@skyeagletechno.com", { x: 60, y: y - 10, size: 9.5, font: fontR, color: SLATE });
  p3.drawText("Website:  https://skyeagletechno.shawanreddy.com", { x: 60, y: y - 25, size: 9.5, font: fontR, color: ACCENT });

  drawFooter(p3, fontR, 3, 3);

  const bytes = await doc.save();
  writeFileSync(join(OUTPUT_DIR, "SkyEagle-Product-Catalog-2025.pdf"), bytes);
  console.log("✅  Product Catalog PDF generated.");
}

// ---- MAIN ----
(async () => {
  try {
    await buildCompanyProfile();
    await buildAMCSheet();
    await buildProductCatalog();
    console.log("\n🎉  All 3 PDFs generated successfully in public/downloads/");
  } catch (err) {
    console.error("❌  Error generating PDFs:", err);
    process.exit(1);
  }
})();
