const WEDDING = new Date("2027-11-11T00:00:00");
const $ = id => document.getElementById(id);
const rng = s => () => (s = (s * 16807) % 2147483647) / 2147483647;
const R = rng(7);
const P = [["#efb0b9","#f7cdd1","#fdeced"],["#f0cf7a","#f7e19f","#fdf1c6"],["#d98494","#eaa6b1","#f6d0d6"],["#f9dfe0","#fdf0ee","#fffaf3"],["#f5dc93","#fae9b8","#fff6d8"]];
const LEAF = ["#7f9070","#6a7d5c","#94a27f","#5f7355"];
const rose = (x, y, r, c) => { const k = "#a24a5e", o = R()*6.283;
  let s = `<ellipse cx="${x}" cy="${y + r*.14}" rx="${r*1.05}" ry="${r}" fill="#8a3a4a" opacity=".2"/>`;
  [[5,.46,.54,c[0]],[4,.27,.44,c[1]],[3,.12,.34,c[2]]].forEach(([n, d, q, f], j) => { for (let i = 0; i < n; i++) {
    const a = o + j*1.1 + i*6.283/n, px = x + Math.cos(a)*r*d, py = y + Math.sin(a)*r*d, rx = r*q, ry = r*q*.82;
    s += `<g transform="translate(${px.toFixed(1)} ${py.toFixed(1)}) rotate(${(a*57.3).toFixed(0)})"><ellipse rx="${rx.toFixed(1)}" ry="${ry.toFixed(1)}" fill="${f}" stroke="${k}" stroke-opacity=".5" stroke-width="1"/><path d="M${(rx*.45).toFixed(1)} ${(-ry*.7).toFixed(1)}Q${(rx*1.05).toFixed(1)} 0 ${(rx*.45).toFixed(1)} ${(ry*.7).toFixed(1)}" fill="none" stroke="#fffaf0" stroke-opacity=".6" stroke-width="${Math.max(1, r*.05).toFixed(1)}" stroke-linecap="round"/></g>`; } });
  return s + `<path d="M${x} ${y}c${r*.1} ${-r*.12} ${r*.2} ${r*.02} ${r*.08} ${r*.12}c${-r*.1} ${r*.06} ${-r*.2} ${-r*.06} ${-r*.1} ${-r*.16}" fill="none" stroke="${k}" stroke-opacity=".6" stroke-width="1.2"/>`; };
const leaf = (x, y, r, a, c) => `<ellipse cx="${x}" cy="${y}" rx="${r*.4}" ry="${r}" transform="rotate(${a} ${x} ${y})" fill="${c}" opacity=".95"/>`;

/* distant misty blossom trees */
{ let f = ""; for (let i = 0; i < 16; i++) f += `<circle cx="${190 + R()*356}" cy="${420 + R()*620}" r="${30 + R()*44}" fill="${["#f7dc8e","#f2b6bf","#fbeab8","#e9a0ac"][i%4]}"/>`; $("far").innerHTML = f; }

/* enchanted light */
$("rays").innerHTML = [[190,300],[300,400],[440,520],[548,650]].map(([x,w],i) => `<polygon class="rz" style="animation-delay:${i*1.4}s" points="368,100 ${x-w/8},1200 ${x+w/3},1200"/>`).join("");

/* rose garden masses */
{ const mass = (cx, cy, rx, ry, n, big) => { let lv = "", rs = [];
    for (let i = 0; i < n; i++) { const a = R()*6.283, d = Math.sqrt(R()), x = cx + Math.cos(a)*rx*d, y = cy + Math.sin(a)*ry*d;
      lv += leaf(x + (R()-.5)*20, y + (R()-.5)*20, 24 + R()*18, R()*360, LEAF[Math.floor(R()*4)]);
      rs.push([x, y, big*(.55 + R()*.8), P[Math.floor(R()*P.length)]]); }
    return lv + rs.sort((a, b) => a[1] - b[1]).map(q => rose(...q)).join(""); };
  $("bush").innerHTML = mass(40,620,150,380,58,30) + mass(696,620,150,380,58,30) + mass(110,150,190,170,34,26) + mass(626,150,190,170,34,26) + mass(368,40,220,60,22,20); }

/* arch: gold beads, thorned rose vine */
{ const a = $("arch"), tot = a.getTotalLength(); let g = "", v = "", pts = [], n = 0;
  for (let l = 0; l < tot; l += 15) { const q = a.getPointAtLength(l); g += `<circle cx="${q.x}" cy="${q.y}" r="1.7" fill="#c79a4e" class="tw" style="animation-delay:${(n++ % 9)*.3}s"/>`; }
  $("beads").innerHTML = g;
  for (let l = 0, i = 0; l < tot; l += 8, i++) { const q = a.getPointAtLength(l), q2 = a.getPointAtLength(l + 1);
    if (q.y > 1170) continue; let tx = q2.x - q.x, ty = q2.y - q.y; const m = Math.hypot(tx, ty) || 1; tx /= m; ty /= m;
    const off = Math.sin(l / 17) * 12, x = q.x - ty*off, y = q.y + tx*off; pts.push([x, y]);
    const ang = Math.atan2(ty, tx) * 57.3;
    v += leaf(x, y, 9 + R()*7, ang + (i%2 ? 65 : -65), LEAF[Math.floor(R()*4)]);
    if (i % 4 === 0) v += `<path transform="translate(${x} ${y}) rotate(${ang + 90})" d="M0 0l-2-7 5 7z" fill="#7a6a4a"/>`;
    if (i % 5 === 0 && R() < (y < 560 ? .95 : .5)) v += rose(x + (R()-.5)*8, y + (R()-.5)*8, (y < 500 ? 16 : 11) + R()*11, P[Math.floor(R()*4)]); }
  $("vine").innerHTML = `<path d="M${pts.map(p => p.join(" ")).join("L")}" fill="none" stroke="#6a7d5c" stroke-width="3.2"/>` + v;
  /* hanging lanterns */
  $("lant").innerHTML = [128, 608].map(x => `<circle cx="${x}" cy="196" r="52" fill="url(#glow)" class="tw"/><path d="M${x} 0V150" stroke="#a67c3f" stroke-width="1.6"/><path d="M${x-13} 168l13-18 13 18v34l-13 10-13-10z" fill="#fff0bf" stroke="#b98f4f" stroke-width="2.4"/><path d="M${x} 150v62" stroke="#a67c3f" stroke-width="1"/>`).join(""); }

/* garden floor: stone path, grass, roses, petals */
{ let s = "", g = "";
  for (let i = 0; i < 7; i++) { const rx = 78 - i*9, y = 1296 - i*26; s += `<ellipse cx="${368 + Math.sin(i*2)*8}" cy="${y}" rx="${rx}" ry="${rx*.26}" fill="#f6e2b0" stroke="#b98f5a" stroke-width="1.5" opacity="${.95 - i*.08}"/>`; }
  $("stones").innerHTML = s;
  for (let i = 0; i < 100; i++) { const x = R()*736, h = 60 + R()*110, bend = (R()-.5)*50;
    g += `<path d="M${x} 1318Q${x + bend/2} ${1318 - h*.6} ${x + bend} ${1318 - h}" fill="none" stroke="${i%3 ? "#6a7d5c" : "#7f9070"}" stroke-width="${2 + R()*2}" stroke-linecap="round"/>`;
    if (i % 5 === 0) g += rose(x + bend, 1318 - h, 7 + R()*5, P[Math.floor(R()*4)]); }
  for (let i = 0; i < 20; i++) { const x = i < 10 ? R()*230 : 506 + R()*230, y = 1190 + R()*110; g += leaf(x - 16, y, 22, -50, "#6a7d5c") + leaf(x + 16, y, 22, 50, "#7f9070") + rose(x, y, 14 + R()*12, P[Math.floor(R()*4)]); }
  for (let i = 0; i < 40; i++) g += `<ellipse cx="${200 + R()*336}" cy="${1140 + R()*150}" rx="${3 + R()*4}" ry="${1.6 + R()*2}" transform="rotate(${R()*180} 368 1200)" fill="${["#f4c4cc","#fbe4e6","#e08fa2"][i%3]}" opacity=".8"/>`;
  $("ground").innerHTML = g; }

/* shimmer: glitter on a canvas, with a light wave sweeping across */
const cv = $("glitter"), cx = cv.getContext("2d"), still = matchMedia("(prefers-reduced-motion: reduce)").matches;
let W, H; const G = [], rr = rng(21);
const size = () => { const d = Math.min(devicePixelRatio || 1, 2); W = cv.clientWidth; H = cv.clientHeight; cv.width = W*d; cv.height = H*d; cx.setTransform(d, 0, 0, d, 0, 0); };
const GC = ["208,152,60","255,252,238","230,120,150","224,178,88"];
for (let i = 0; i < 170; i++) G.push({x: rr(), y: rr(), s: .8 + rr()*2.6, p: rr()*6.28, v: .6 + rr()*1.6, c: GC[i % 4]});
try { const a = $("arch"), tot = a.getTotalLength();
  for (let l = 0; l < tot; l += 16) { const q = a.getPointAtLength(l); G.push({x: q.x/736, y: q.y/1312, s: 1.8 + rr()*1.8, p: rr()*6.28, v: 1 + rr(), c: "224,178,88"}); } } catch (e) {}
function frame(ms) { const t = ms/1000; cx.clearRect(0, 0, W, H);
  const sw = ((t*.11) % 1.7) - .3;
  G.forEach(g => { const wave = Math.max(0, 1 - Math.abs((g.x + g.y*.5)/1.5 - sw)*5);
    const a = Math.min(1, Math.pow((Math.sin(t*g.v + g.p) + 1)/2, 4)*.85 + wave);
    if (a < .04) return;
    const x = g.x*W, y = g.y*H, s = g.s*(W/390)*(1 + wave*.8);
    cx.fillStyle = `rgba(${g.c},${a})`; cx.beginPath(); cx.arc(x, y, s*.55, 0, 6.283); cx.fill();
    if (g.s > 1.8) { cx.strokeStyle = `rgba(${g.c},${a*.75})`; cx.lineWidth = .9; cx.beginPath();
      cx.moveTo(x - s*3, y); cx.lineTo(x + s*3, y); cx.moveTo(x, y - s*3); cx.lineTo(x, y + s*3); cx.stroke(); } });
  if (!still) requestAnimationFrame(frame); }
size(); addEventListener("resize", size); requestAnimationFrame(frame);

/* optional: drop your own painting at assets/backdrop.jpg and it replaces the drawn garden */
{ const im = new Image(); im.onload = () => { document.body.classList.add("has-backdrop"); document.querySelector(".stage").style.backgroundImage = "url(assets/backdrop.jpg)"; }; im.src = "assets/backdrop.jpg"; }

/* countdown */
const pad = (v, n) => String(v).padStart(n, "0");
function tick() {
  const t = Math.max(0, Math.floor((WEDDING - new Date()) / 1000));
  $("d").textContent = pad(Math.floor(t / 86400), 3);
  $("h").textContent = pad(Math.floor(t % 86400 / 3600), 2);
  $("m").textContent = pad(Math.floor(t % 3600 / 60), 2);
  $("s").textContent = pad(t % 60, 2);
}
tick(); setInterval(tick, 1000);
