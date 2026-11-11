const CERTS = [
  { img: "hack4gov-2025", cat: "tech", date: "Oct 2025",
    title: "Hack4Gov 2025 Regionals",
    org: "DICT – Cordillera Administrative Region",
    desc: "Participant in the regional capture-the-flag cybersecurity competition." },
  { img: "codefest-2026", cat: "tech", date: "Mar 2026",
    title: "CodeFest: Tagisan ng Talino 2025-26",
    org: "STI College Baguio",
    desc: "Participant in the local-level programming competition." },
  { img: "ccnav7-2023", cat: "tech", date: "May 2023",
    title: "CCNAv7: Introduction to Networks",
    org: "Cisco Networking Academy · University of Baguio",
    desc: "Student-level credential covering switching, routing, IPv4/IPv6 addressing and network security basics." },
  { img: "edge-ai-2026", cat: "tech", date: "Feb 2026",
    title: "Maintaining a Competitive EDGE in this AI Landscape",
    org: "Edge Computer Technologies with Acer, Microsoft & partners",
    desc: "Participant in an industry event on AI adoption." },
  { img: "deans-list-2025", cat: "academic", date: "Jul 2025",
    title: "Dean's List Award",
    org: "STI College Baguio",
    desc: "Recognized for academic excellence." },
  { img: "easter-college-2022", cat: "academic", date: "May 2022",
    title: "Special Academic Award, TVL-ICT",
    org: "Easter College, Senior High School",
    desc: "Awarded for a general average within the top-ten range." },
  { img: "service-excellence-2025", cat: "service", date: "Nov 2025",
    title: "Filipino Brand of Service Excellence",
    org: "Department of Tourism – CAR",
    desc: "Completed an eight-hour face-to-face service excellence training." },
  { img: "eapdats-2026", cat: "service", date: "Jun 2026",
    title: "2nd EAPDATS Capacity Building",
    org: "Municipality of La Trinidad",
    desc: "“Growing Together, Building Networks, Celebrating Wins.”" },
  { img: "tabulation-2025", cat: "service", date: "Mar 2025",
    title: "Certificate of Appreciation: Tabulation",
    org: "Mister & Miss La Trinidad 2025",
    desc: "Assisted with score tabulation, helping maintain the integrity of the competition." },
];

const grid = document.getElementById("certGrid");
grid.innerHTML = CERTS.map(c => `
  <article class="cert reveal" data-cat="${c.cat}">
    <button class="zoom" data-full="assets/certs/${c.img}.jpg" data-caption="${c.title} | ${c.org}">
      <img src="assets/certs/${c.img}-thumb.jpg" alt="Certificate: ${c.title}" loading="lazy" />
    </button>
    <div class="cert-body">
      <span class="date">${c.date}</span>
      <h3>${c.title}</h3>
      <p><strong>${c.org}</strong></p>
      <p>${c.desc}</p>
    </div>
  </article>`).join("");

document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.toggle("active", b === btn));
    const f = btn.dataset.filter;
    document.querySelectorAll(".cert").forEach(card => {
      card.classList.toggle("hide", f !== "all" && card.dataset.cat !== f);
    });
  });
});

const lb = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbCap = document.getElementById("lbCap");
let lastFocus = null;

document.addEventListener("click", e => {
  const z = e.target.closest(".zoom");
  if (!z) return;
  lastFocus = z;
  lbImg.src = z.dataset.full;
  lbImg.alt = z.dataset.caption || "";
  lbCap.textContent = z.dataset.caption || "";
  lb.hidden = false;
  document.body.style.overflow = "hidden";
  document.getElementById("lbClose").focus();
});
function closeLb() {
  lb.hidden = true;
  lbImg.src = "";
  document.body.style.overflow = "";
  if (lastFocus) lastFocus.focus();
}
lb.addEventListener("click", e => { if (e.target === lb || e.target.closest(".lb-close")) closeLb(); });
document.addEventListener("keydown", e => { if (e.key === "Escape" && !lb.hidden) closeLb(); });

const sidebar = document.getElementById("sidebar");
const scrim = document.getElementById("scrim");
const menuBtn = document.getElementById("menuBtn");
function setMenu(open) {
  sidebar.classList.toggle("open", open);
  scrim.classList.toggle("show", open);
  menuBtn.setAttribute("aria-expanded", String(open));
}
menuBtn.addEventListener("click", () => setMenu(!sidebar.classList.contains("open")));
scrim.addEventListener("click", () => setMenu(false));
document.querySelectorAll(".nav a").forEach(a => a.addEventListener("click", () => setMenu(false)));

const links = [...document.querySelectorAll(".nav a")];
const sections = links.map(a => document.querySelector(a.getAttribute("href")));
function updateActive() {
  const y = window.scrollY + window.innerHeight * 0.3;
  let current = sections[0];
  sections.forEach(s => { if (s.offsetTop <= y) current = s; });
  if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) current = sections[sections.length - 1];
  links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + current.id));
}
window.addEventListener("scroll", updateActive, { passive: true });
updateActive();

document.querySelectorAll(".card, .project, .fact").forEach(el => el.classList.add("reveal"));
const io = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
}, { threshold: 0.08 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();
