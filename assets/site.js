/* Matrix site shared JS — header/footer injection + interactions */
(function () {
  const page = document.body.dataset.page || "";

  /* ---------- header ---------- */
  const header = `
  <div class="banner">Matrix limited release — 100 seats. <a href="limited-release.html">Claim yours →</a></div>
  <header class="site">
    <div class="wrap nav" id="nav">
      <a class="brand" href="index.html"><span class="mark" aria-hidden="true"></span>Matrix</a>
      <nav class="nav-links" aria-label="Main">
        <a href="product.html" data-p="product">Product</a>
        <a href="deus.html" data-p="deus">Deus</a>
        <a href="network.html" data-p="network">Network</a>
        <a href="developers.html" data-p="developers">Developers</a>
        <a href="pricing.html" data-p="pricing">Pricing</a>
      </nav>
      <div class="nav-right">
        <a class="signin" href="#">Sign in</a>
        <a class="btn" href="limited-release.html">Launch Matrix</a>
      </div>
      <button class="menu-btn" aria-label="Menu" onclick="document.getElementById('nav').classList.toggle('open')">≡</button>
    </div>
  </header>`;

  /* ---------- footer ---------- */
  const footer = `
  <footer class="site">
    <div class="wrap">
      <div class="foot-grid">
        <div><h6>Product</h6>
          <a href="product.html">Matrix overview</a>
          <a href="intent-engine.html">Intent Engine</a>
          <a href="agents.html">Agents</a>
          <a href="deus.html">Deus registry</a>
          <a href="security.html">Security</a>
        </div>
        <div><h6>Developers</h6>
          <a href="developers.html">Docs</a>
          <a href="developers.html#sdk">@paxeer/sdk</a>
          <a href="developers.html#templates">Templates</a>
          <a href="skill.md">skill.md</a>
          <a href="developers.html#changelog">Changelog</a>
        </div>
        <div><h6>Network</h6>
          <a href="network.html">Paxeer chain</a>
          <a href="https://paxscan.paxeer.app">PaxScan</a>
          <a href="#">Status</a>
          <a href="network.html#precompiles">Precompiles</a>
          <a href="#">Paxport wallet</a>
        </div>
        <div><h6>Company</h6>
          <a href="#">About PaxLabs</a>
          <a href="#">Blog</a>
          <a href="#">Careers</a>
          <a href="#">Press</a>
          <a href="#">Brand kit</a>
        </div>
        <div><h6>Legal</h6>
          <a href="#">Terms of service</a>
          <a href="#">Privacy policy</a>
          <a href="#">Acceptable use</a>
          <a href="#">Cookie policy</a>
          <a href="#">Trust center</a>
        </div>
      </div>
      <div class="foot-bottom">
        <span>© 2026 PaxLabs Inc.</span>
        <span class="status-dot"><i></i>All systems operational</span>
        <span>Independently audited</span>
        <div class="right">
          <a href="#">X</a><a href="#">GitHub</a><a href="#">Discord</a>
        </div>
      </div>
    </div>
  </footer>`;

  document.getElementById("hdr") && (document.getElementById("hdr").outerHTML = header);
  document.getElementById("ftr") && (document.getElementById("ftr").outerHTML = footer);

  /* active nav link */
  document.querySelectorAll(".nav-links a").forEach(a => {
    if (a.dataset.p === page) a.classList.add("active");
  });

  /* ---------- reveal on scroll ---------- */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: 0.08 });
  document.querySelectorAll(".rv").forEach(el => io.observe(el));

  /* ---------- copy-to-clipboard ---------- */
  document.querySelectorAll("[data-copy]").forEach(btn => {
    btn.addEventListener("click", () => {
      navigator.clipboard.writeText(btn.dataset.copy).then(() => {
        const t = btn.textContent; btn.textContent = "copied";
        setTimeout(() => (btn.textContent = t), 1400);
      });
    });
  });

  /* ---------- hero intent trace animation (homepage) ---------- */
  const trace = document.getElementById("trace");
  if (trace) {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const promptEl = document.getElementById("t-prompt");
    const irEl = document.getElementById("t-ir");
    const planEl = document.getElementById("t-plan");
    const promptText = "Swap 250 USDC to PAX, then stream 50 PAX/week to dev-payroll for a month.";
    const irLines = [
      '<span class="c">// intent ir · v3 · planner: kimi-k2.6</span>',
      '{ <span class="k">"verbs"</span>: [<span class="s">"swap"</span>, <span class="s">"stream.open"</span>],',
      '  <span class="k">"swap"</span>: { <span class="k">"in"</span>: <span class="s">"USDC"</span>, <span class="k">"amt"</span>: <span class="n">250</span>, <span class="k">"out"</span>: <span class="s">"PAX"</span> },',
      '  <span class="k">"stream"</span>: { <span class="k">"rate"</span>: <span class="s">"50 PAX/wk"</span>, <span class="k">"to"</span>: <span class="s">"dev-payroll.pax"</span>,',
      '              <span class="k">"dur"</span>: <span class="s">"4w"</span>, <span class="k">"via"</span>: <span class="s">"0x0906"</span> } }'
    ];
    const planSteps = [
      ["Parse intent → typed IR", 600],
      ["Resolve tools · version-pinned URIs", 700],
      ["Simulate plan · guardrails pass", 900],
      ["Sign via Paxport · EIP-712", 700],
      ["Settled on Paxeer · 400 ms", 600]
    ];
    const finish = () => {
      promptEl.textContent = promptText;
      irEl.innerHTML = irLines.join("\n");
      planEl.innerHTML = planSteps.map(s => `<div class="row done"><span class="ic">✓</span><span>${s[0]}</span></div>`).join("") +
        `<div class="row done"><span class="ic">↗</span><span class="txlink">tx 0x7f3a…c41e · paxscan.paxeer.app</span></div>`;
    };
    if (reduced) { finish(); }
    else {
      const sleep = ms => new Promise(r => setTimeout(r, ms));
      (async function run() {
        promptEl.innerHTML = ""; irEl.innerHTML = ""; planEl.innerHTML = "";
        // type prompt
        for (let i = 0; i <= promptText.length; i++) {
          promptEl.innerHTML = promptText.slice(0, i) + '<span class="caret"></span>';
          await sleep(22);
        }
        promptEl.textContent = promptText;
        await sleep(350);
        // print IR
        for (const line of irLines) {
          irEl.innerHTML += line + "\n"; await sleep(190);
        }
        await sleep(300);
        // plan steps
        for (const [label, ms] of planSteps) {
          const row = document.createElement("div");
          row.className = "row live"; row.innerHTML = `<span class="ic">●</span><span>${label}</span>`;
          planEl.appendChild(row); await sleep(ms);
          row.className = "row done"; row.querySelector(".ic").textContent = "✓";
        }
        const tx = document.createElement("div");
        tx.className = "row done";
        tx.innerHTML = `<span class="ic">↗</span><span class="txlink">tx 0x7f3a…c41e · paxscan.paxeer.app</span>`;
        planEl.appendChild(tx);
        await sleep(5200);
        run();
      })();
    }
  }

  /* ---------- pricing calculator ---------- */
  const r1 = document.getElementById("c-intents");
  if (r1) {
    const r2 = document.getElementById("c-paxcost");
    const update = () => {
      const intents = +r1.value, paxPer = +r2.value / 100;
      const daily = intents * paxPer;
      const free = Math.min(daily, 10);
      const billable = Math.max(0, daily - 10) * 30;
      document.getElementById("o-intents").textContent = intents;
      document.getElementById("o-pax").textContent = daily.toFixed(1) + " PAX";
      document.getElementById("o-free").textContent = free.toFixed(1) + " PAX";
      document.getElementById("o-usd").textContent = "$" + (billable * 11.43).toLocaleString(undefined, { maximumFractionDigits: 0 });
    };
    r1.addEventListener("input", update); r2.addEventListener("input", update); update();
  }
})();
