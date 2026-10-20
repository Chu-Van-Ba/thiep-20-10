const $ = id => document.getElementById(id);
const rand = (min, max) => min + Math.random() * (max - min);
const pick = list => list[Math.floor(Math.random() * list.length)];

let counter = 0;
const uid = () => `g${counter++}`;

const grad = (id, base, tip) =>
  `<linearGradient id="${id}" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${base}"/><stop offset="1" stop-color="${tip}"/></linearGradient>`;

const radial = (id, inner, outer) =>
  `<radialGradient id="${id}"><stop offset="0" stop-color="${inner}"/><stop offset="1" stop-color="${outer}"/></radialGradient>`;

const ring = (n, offset, shape) =>
  Array.from({ length: n }, (_, i) => `<g transform="rotate(${offset + (360 / n) * i})">${shape}</g>`).join("");

const dots = (n, r, size, color) =>
  Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    return `<circle cx="${(Math.cos(a) * r).toFixed(1)}" cy="${(Math.sin(a) * r).toFixed(1)}" r="${size}" fill="${color}"/>`;
  }).join("");

const SHAPES = {
  round: (l, w) =>
    `M0 0 C${-w * 1.3} ${-l * 0.25} ${-w * 1.1} ${-l * 0.8} ${-w * 0.5} ${-l * 0.97} Q0 ${-l * 1.06} ${w * 0.5} ${-l * 0.97} C${w * 1.1} ${-l * 0.8} ${w * 1.3} ${-l * 0.25} 0 0Z`,
  pointed: (l, w) =>
    `M0 0 C${-w} ${-l * 0.3} ${-w * 0.8} ${-l * 0.8} 0 ${-l} C${w * 0.8} ${-l * 0.8} ${w} ${-l * 0.3} 0 0Z`,
  notched: (l, w) =>
    `M0 0 C${-w * 1.2} ${-l * 0.2} ${-w * 1.2} ${-l * 0.85} ${-w * 0.9} ${-l} Q${-w * 0.45} ${-l * 0.88} 0 ${-l * 0.94} Q${w * 0.45} ${-l * 0.88} ${w * 0.9} ${-l} C${w * 1.2} ${-l * 0.85} ${w * 1.2} ${-l * 0.2} 0 0Z`,
};

const petal = (shape, l, w, fill) =>
  `<path d="${SHAPES[shape](l, w)}" fill="${fill}" stroke="rgba(0,0,0,.14)" stroke-width=".6"/>` +
  `<path d="M0 ${-l * 0.12} L0 ${-l * 0.72}" stroke="rgba(255,255,255,.35)" stroke-width=".7" fill="none"/>`;

const HEADS = {
  hero() {
    const ids = Array.from({ length: 6 }, uid);
    const glow = uid();
    const tones = [
      ["#ff7fa8", "#ffdce8"], ["#ff5c93", "#ffb8d0"], ["#f0437f", "#ff92ba"],
      ["#e12d6d", "#ff7ca8"], ["#c91f5d", "#f2588c"], ["#a8164b", "#da3a72"],
    ];
    const rings = [[12, 0, 47, 17], [10, 15, 41, 17], [8, 5, 34, 16], [7, 20, 27, 14], [6, 0, 20, 11], [5, 30, 13, 8]];
    return `<defs>${ids.map((id, i) => grad(id, ...tones[i])).join("")}
      <radialGradient id="${glow}"><stop offset="0" stop-color="#ffffff" stop-opacity=".85"/><stop offset="1" stop-color="#ffc9dc" stop-opacity="0"/></radialGradient></defs>
      <circle r="78" fill="url(#${glow})"/>
      ${rings.map(([n, o, l, w], i) => ring(n, o, petal("round", l, w, `url(#${ids[i]})`))).join("")}
      <circle r="5" fill="#ffd54a"/>${dots(8, 6, 1.4, "#f59e0b")}`;
  },

  rose([light, mid, deep]) {
    const [a, b, c] = [uid(), uid(), uid()];
    return `<defs>${grad(a, mid, light)}${grad(b, deep, mid)}${grad(c, deep, deep)}</defs>
      ${ring(7, 0, petal("round", 42, 22, `url(#${a})`))}
      ${ring(6, 25, petal("round", 34, 19, `url(#${b})`))}
      ${ring(5, 10, petal("round", 26, 15, `url(#${b})`))}
      ${ring(4, 40, petal("round", 17, 11, `url(#${c})`))}
      <circle r="5" fill="${deep}" opacity=".85"/>
      <path d="M0 0 C3 -2 4 2 0 4 C-5 5 -6 -3 0 -6" fill="none" stroke="${light}" stroke-width=".9" opacity=".7"/>`;
  },

  tulip([light, mid, deep]) {
    const [a, b] = [uid(), uid()];
    return `<defs>${grad(a, mid, deep)}${grad(b, deep, mid)}</defs>
      <g transform="translate(0 6)">
        <path d="M-3 22 C-24 16 -26 -10 -17 -32 C-8 -22 -3 -6 -3 22Z" fill="url(#${b})" stroke="rgba(0,0,0,.12)" stroke-width=".6"/>
        <path d="M3 22 C24 16 26 -10 17 -32 C8 -22 3 -6 3 22Z" fill="url(#${b})" stroke="rgba(0,0,0,.12)" stroke-width=".6"/>
        <path d="M-16 20 C-26 -6 -12 -30 0 -40 C12 -30 26 -6 16 20 C9 28 -9 28 -16 20Z" fill="url(#${a})" stroke="rgba(0,0,0,.14)" stroke-width=".6"/>
        <path d="M0 -34 C-4 -12 -4 6 0 24" fill="none" stroke="${light}" stroke-width="1" opacity=".5"/>
        <path d="M-9 -22 C-14 -6 -12 8 -8 18" fill="none" stroke="${light}" stroke-width=".9" opacity=".4"/>
      </g>`;
  },

  daisy([light, mid]) {
    const [a, c] = [uid(), uid()];
    return `<defs>${grad(a, mid, light)}${radial(c, "#ffe873", "#f2a100")}</defs>
      ${ring(18, 0, petal("round", 44, 5.5, `url(#${a})`))}
      ${ring(18, 10, petal("round", 40, 5.5, `url(#${a})`))}
      <circle r="11" fill="url(#${c})" stroke="#d98900" stroke-width=".6"/>
      ${dots(9, 6, 0.9, "#b86e00")}${dots(4, 2.5, 0.8, "#b86e00")}`;
  },

  sunflower([light, mid, deep]) {
    const [a, b, c] = [uid(), uid(), uid()];
    const seeds = Array.from({ length: 46 }, (_, i) => {
      const r = 2.3 * Math.sqrt(i + 1);
      const angle = i * 2.39996;
      return `<circle cx="${(Math.cos(angle) * r).toFixed(1)}" cy="${(Math.sin(angle) * r).toFixed(1)}" r="1.15" fill="#d9a24a" opacity=".6"/>`;
    }).join("");
    return `<defs>${grad(a, deep, mid)}${grad(b, mid, light)}${radial(c, "#7a4a1a", "#2b1505")}</defs>
      ${ring(22, 0, petal("pointed", 46, 8.5, `url(#${a})`))}
      ${ring(22, 8, petal("pointed", 41, 8, `url(#${b})`))}
      <circle r="18" fill="url(#${c})" stroke="#6b3f12" stroke-width="1"/>${seeds}`;
  },

  cosmos([light, mid, deep]) {
    const [a, c] = [uid(), uid()];
    return `<defs>${grad(a, deep, light)}${radial(c, "#ffe873", "#f2a100")}</defs>
      ${ring(8, 0, petal("notched", 44, 15, `url(#${a})`))}
      <circle r="7" fill="url(#${c})" stroke="#d98900" stroke-width=".5"/>${dots(6, 3.2, 0.8, "#b86e00")}`;
  },

  poppy([light, mid, deep]) {
    const [a, b] = [uid(), uid()];
    return `<defs>${grad(a, deep, mid)}${grad(b, deep, light)}</defs>
      ${ring(5, 0, petal("round", 42, 26, `url(#${a})`))}
      ${ring(5, 36, petal("round", 34, 22, `url(#${b})`))}
      <circle r="7" fill="#2a1a18"/>${dots(14, 11, 1.5, "#3b2523")}<circle r="3" fill="#6b3b2a"/>`;
  },

  forgetmenot([light, mid]) {
    const a = uid();
    const small = (x, y, s) =>
      `<g transform="translate(${x} ${y}) scale(${s})">${ring(5, 0, petal("round", 15, 8, `url(#${a})`))}<circle r="3" fill="#ffd54a"/></g>`;
    return `<defs>${grad(a, mid, light)}</defs>
      ${small(-17, 8, 1)}${small(17, 8, 1)}${small(0, -14, 1.1)}${small(-24, -14, 0.65)}${small(24, -14, 0.65)}`;
  },

  lavender([light, mid, deep]) {
    const a = uid();
    const floret = (x, y, s, rot) =>
      `<ellipse cx="${x}" cy="${y}" rx="${3.6 * s}" ry="${5.4 * s}" transform="rotate(${rot} ${x} ${y})" fill="url(#${a})" stroke="rgba(0,0,0,.12)" stroke-width=".4"/>`;
    const rows = Array.from({ length: 11 }, (_, i) => {
      const y = -42 + i * 5.2;
      const s = 0.65 + i * 0.045;
      return floret(-3.6 * s, y, s, -22) + floret(3.6 * s, y, s, 22);
    }).join("");
    return `<defs>${grad(a, deep, light)}</defs>
      <path d="M0 -44 L0 16" stroke="#3f9a52" stroke-width="1.6"/>${rows}${floret(0, -47, 0.6, 0)}`;
  },

  bud([light, mid, deep]) {
    const [a, b] = [uid(), uid()];
    return `<defs>${grad(a, deep, light)}${grad(b, mid, light)}</defs>
      <g transform="translate(0 4)">
        <path d="M0 18 C-15 10 -15 -14 0 -30 C15 -14 15 10 0 18Z" fill="url(#${a})" stroke="rgba(0,0,0,.12)" stroke-width=".6"/>
        <path d="M-1 17 C-14 12 -17 -6 -8 -20 C-6 -8 -4 4 -1 17Z" fill="url(#${b})" opacity=".9"/>
        <path d="M1 17 C14 12 17 -6 8 -20 C6 -8 4 4 1 17Z" fill="url(#${b})" opacity=".75"/>
        <path d="M0 -28 C-3 -10 -3 6 0 18" stroke="rgba(255,255,255,.4)" stroke-width=".9" fill="none"/>
        <path d="M0 24 C-13 24 -18 12 -16 4 C-10 10 -4 14 0 24Z" fill="#3fa65c"/>
        <path d="M0 24 C13 24 18 12 16 4 C10 10 4 14 0 24Z" fill="#35934f"/>
        <path d="M0 26 C-5 18 -4 10 0 6 C4 10 5 18 0 26Z" fill="#4cbf6e"/>
      </g>`;
  },
};

const PALETTES = {
  rose: [["#ffd9e3", "#ff7b9f", "#d93a67"], ["#ffe3c9", "#ff9a6b", "#e0573a"], ["#ffffff", "#ffd3dc", "#f08aa5"], ["#ffe0f0", "#ff6fb1", "#c42a7a"]],
  tulip: [["#ffd0d0", "#ff5a5f", "#c81d3a"], ["#fff3b0", "#ffd23f", "#e8a100"], ["#e8d2ff", "#b084f0", "#7a3fd0"], ["#ffe0c2", "#ff9150", "#e0561a"], ["#ffd6ec", "#ff7fbd", "#d83d86"]],
  daisy: [["#ffffff", "#ffe9a8"], ["#ffd9e8", "#ff9fc2"], ["#efe2ff", "#b99bf2"]],
  sunflower: [["#ffe45e", "#ffb703", "#f08400"]],
  cosmos: [["#ffe3f0", "#ff8fc1", "#e04a93"], ["#ffffff", "#ffc9de", "#f184ab"], ["#ffd6ff", "#e47bff", "#a93fd1"]],
  poppy: [["#ffb199", "#ff5a3d", "#d62b1f"], ["#ffd2a8", "#ff9a3d", "#e66a00"], ["#ffc4d6", "#ff6f9c", "#d8386b"]],
  forgetmenot: [["#e6f3ff", "#7ab8ff", "#3d7fe0"], ["#f0e6ff", "#b89cff", "#7b57e0"]],
  lavender: [["#d9c4ff", "#a77df0", "#6f3fd0"], ["#e8d0ff", "#c18cf5", "#8a4fd0"]],
  bud: [["#ffd6e3", "#ff8fb1", "#e04a7c"], ["#ece0ff", "#b79af5", "#7b4fd0"], ["#fff0d0", "#ffc060", "#e08a00"], ["#ffe3ec", "#ffa6c1", "#e0527e"]],
};

const TYPES = {
  rose: { w: 76, h: [120, 190] },
  tulip: { w: 66, h: [130, 200] },
  daisy: { w: 72, h: [100, 160] },
  sunflower: { w: 96, h: [170, 250] },
  cosmos: { w: 74, h: [140, 210] },
  poppy: { w: 70, h: [130, 190] },
  forgetmenot: { w: 62, h: [80, 130] },
  lavender: { w: 100, h: [110, 170] },
  bud: { w: 66, h: [90, 170] },
};

const TYPE_POOL = [
  "rose", "rose", "tulip", "tulip", "daisy", "daisy", "sunflower", "cosmos", "cosmos",
  "poppy", "forgetmenot", "lavender", "lavender", "bud", "bud", "bud", "bud",
];

function plantHTML(c) {
  const style = `--x:${c.x}%;--b:${c.b}%;--h:${c.h}px;--w:${c.w}px;--s:${c.s};--z:${c.z};--a:${c.a}deg;--d:${c.d}s;--dl:${c.dl}s;--gd:${c.gd}s;--t:${c.tilt}deg`;
  const leaves =
    `<i class="leaf" style="--p:${c.leafA}%;--f:1"></i>` +
    `<i class="leaf" style="--p:${c.leafB}%;--f:-1"></i>`;
  return `<div class="plant ${c.cls}" style="${style}">
    <div class="sway">
      <div class="stem">${leaves}</div>
      <div class="bloom"><div class="pop"><div class="nod"><svg viewBox="-50 -50 100 100">${c.head}</svg></div></div></div>
    </div>
  </div>`;
}

function buildGarden() {
  const unit = Math.min(1.1, Math.max(0.8, innerWidth / 1300));
  const count = Math.round(Math.min(60, Math.max(26, innerWidth / 24)));

  const hero = plantHTML({
    head: HEADS.hero(), cls: "hero",
    x: 50, b: 3, h: Math.round(innerHeight * 0.4), w: Math.round(Math.min(innerWidth * 0.55, 260)),
    s: 1.5, z: 300, a: 2, d: 6.5, dl: 0, gd: 0.2, tilt: 0, leafA: 28, leafB: 52,
  });

  const others = Array.from({ length: count }, (_, i) => {
    const type = pick(TYPE_POOL);
    const conf = TYPES[type];
    const x = ((i + rand(0.1, 0.9)) / count) * 100;
    const depth = Math.random();
    const s = (0.6 + depth * 0.65) * unit;
    return plantHTML({
      head: HEADS[type](pick(PALETTES[type])),
      cls: type === "bud" ? "is-bud" : "",
      x: x.toFixed(1),
      b: (3 + (1 - depth) * 21).toFixed(1),
      h: (rand(...conf.h) * s * rand(0.75, 1.25)).toFixed(0),
      w: (conf.w * s * rand(0.9, 1.15)).toFixed(0),
      s: s.toFixed(2),
      z: Math.round(depth * 100) + 10,
      a: rand(2.2, 4.2).toFixed(1),
      d: rand(5.2, 6.6).toFixed(1),
      dl: (-(x / 100) * 3.5 - rand(0, 0.5)).toFixed(2),
      gd: ((Math.abs(x - 50) / 50) * 2.2 + rand(0, 0.7)).toFixed(2),
      tilt: rand(-5, 5).toFixed(1),
      leafA: rand(18, 38).toFixed(0),
      leafB: rand(45, 65).toFixed(0),
    });
  });

  $("garden").innerHTML = [hero, ...others].join("");
}

function buildGrass(el, count, minH, maxH) {
  el.innerHTML = Array.from({ length: count }, () =>
    `<i style="left:${rand(-1, 100).toFixed(1)}%;--bw:${rand(7, 13).toFixed(0)};--bh:${rand(minH, maxH).toFixed(0)};--d:${rand(2.6, 4.2).toFixed(1)}s;--dl:-${rand(0, 3).toFixed(1)}s"></i>`
  ).join("");
}

function buildPetals(count = 16) {
  $("petals").innerHTML = Array.from({ length: count }, () =>
    `<i class="fly" style="--sz:${rand(9, 16).toFixed(0)}px;--y:${rand(0, 45).toFixed(0)}vh;--du:${rand(14, 24).toFixed(1)}s;--de:-${rand(0, 20).toFixed(1)}s"></i>`
  ).join("");
}

const scene = $("scene");
const garden = $("garden");
const card = $("card");
const controls = $("controls");
const hint = $("hint");
const title = $("title");

const setBloom = on =>
  garden.querySelectorAll(".plant:not(.hero)").forEach(p => p.classList.toggle("on", on));

function wake() {
  if (scene.classList.contains("awake")) return;
  scene.classList.add("awake");
  hint.classList.remove("show");
  title.classList.add("show");
  setBloom(true);
  setTimeout(showCard, 5600);
}

function showCard() {
  title.classList.remove("show");
  controls.classList.remove("show");
  card.classList.add("show");
}

function showGarden() {
  card.classList.remove("show");
  controls.classList.add("show");
}

function rebloom() {
  setBloom(false);
  void garden.offsetWidth;
  setBloom(true);
  title.classList.add("show");
  setTimeout(() => title.classList.remove("show"), 4200);
}

function init() {
  buildGarden();
  buildGrass($("grass-back"), Math.round(innerWidth / 9), 30, 62);
  buildGrass($("grass-front"), Math.round(innerWidth / 8), 18, 46);
  buildPetals();

  const hero = garden.querySelector(".hero");
  setTimeout(() => hero.classList.add("on"), 200);
  setTimeout(() => hero.classList.add("ready"), 2800);
  setTimeout(() => hint.classList.add("show"), 3000);

  hero.querySelector(".bloom").addEventListener("click", wake);
  $("btn-view").addEventListener("click", showGarden);
  $("btn-read").addEventListener("click", showCard);
  $("btn-again").addEventListener("click", rebloom);
}

init();