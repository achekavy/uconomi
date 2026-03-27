window.startBanner = function () {
  lottie.loadAnimation({
    container: document.getElementById("bm"),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "data.json",
  });
};

(function () {
  var industryBlock = document.getElementById("industry-block");
  var metricTags = document.querySelectorAll(".metric-tag");
  var industryTags = document.querySelectorAll(".industry-tag");

  function selectOnlyOne(buttons, selectedClass) {
    return function (ev) {
      var target = ev.currentTarget;
      buttons.forEach(function (btn) {
        btn.classList.remove(selectedClass);
      });
      target.classList.add(selectedClass);
    };
  }

  metricTags.forEach(function (btn) {
    btn.addEventListener("click", function (ev) {
      selectOnlyOne(metricTags, "tag-selected")(ev);
      if (industryBlock) industryBlock.classList.remove("hidden");
    });
  });

  industryTags.forEach(function (btn) {
    btn.addEventListener("click", selectOnlyOne(industryTags, "tag-selected"));
  });
})();

(function () {
  var STORAGE_KEY = "presentation-unit-votes";
  var tags = document.querySelectorAll(".presentation-unit__tag");

  function loadState() {
    try {
      var raw = sessionStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function saveState(state) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}
  }

  function applyState() {
    var state = loadState();
    tags.forEach(function (btn) {
      var id = btn.getAttribute("data-id");
      if (!id) return;
      var saved = state[id];
      if (saved) {
        btn.setAttribute("data-count", saved.count);
        btn.textContent = btn.getAttribute("data-label") + " " + saved.count;
        if (saved.voted) btn.classList.add("presentation-unit__tag--voted");
      }
    });
  }

  applyState();

  tags.forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (btn.classList.contains("presentation-unit__tag--voted")) return;
      var id = btn.getAttribute("data-id");
      var label = btn.getAttribute("data-label");
      var count = parseInt(btn.getAttribute("data-count"), 10) || 0;
      count += 1;
      btn.setAttribute("data-count", count);
      btn.textContent = label + " " + count;
      btn.classList.add("presentation-unit__tag--voted");

      var state = loadState();
      state[id] = { count: count, voted: true };
      saveState(state);
    });
  });
})();

(function () {
  var emailUser = "achekavy";
  var emailDomain = "gmail.com";
  var email = emailUser + "\x40" + emailDomain;

  var link = document.getElementById("footer-email-link");
  var copyBtn = document.getElementById("footer-email-copy");
  var tooltip = document.getElementById("footer-email-tooltip");
  var tooltipHideTimer = null;

  if (link) {
    link.href = "mailto:" + email;
    link.textContent = email;
  }

  if (copyBtn && tooltip) {
    copyBtn.addEventListener("click", function () {
      if (typeof navigator.clipboard !== "undefined" && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(
          function () {
            if (tooltipHideTimer) clearTimeout(tooltipHideTimer);
            tooltip.classList.add("is-visible");
            tooltipHideTimer = setTimeout(function () {
              tooltip.classList.remove("is-visible");
              tooltipHideTimer = null;
            }, 2500);
          },
          function () {}
        );
      }
    });
  }
})();

(function () {
  var statements = [
    "Pause acquisition for 2 months — the base will be fine",
    "Pause acquisition for 2 months — the base will collapse soon",
    "Summer/fall signups retain better than winter/spring — product improved",
    "Summer/fall signups are actually worse — masked by long-time users",
    "Of 8,000 December signups, ~2,000 remain after a year",
    "Of 8,000 December signups, ~300 remain after a year",
    "All new users come from healthy sources — marketing pays off",
    "Half of new users come from a bad channel — a good channel masks it",
    "Retention rises because the product really got better",
    "Retention rises because the \"weak\" left — more loyal remain",
  ];

  var pairs = [
    [0, 1],
    [2, 3],
    [4, 5],
    [6, 7],
    [8, 9],
  ];

  /* One explanation per pair: why both sides can match the same blended table (cohort / composition effects). */
  var pairRevealMessages = [
    "A flat stream of new users can hide churn in older cohorts: the headline “Retention” row is a mix of ages and vintages. If the core is sticky and you still have organic/word-of-mouth inflow, a short pause in paid acquisition might feel survivable. If you rely on acquisition mainly to replace churn, the same aggregate can look fine until the tap turns off. You need retention by signup month, not one row for the whole base.",
    "Seasonality changes who signs up (holidays, vacations, B2B budget cycles). Blended retention can rise because newer cohorts are genuinely better—or because the share of long-tenure, loyal users grew and newer, weaker cohorts are buried in the average. The table doesn’t show curves by first signup month, so both narratives stay plausible.",
    "“December signups” is one calendar bucket: it can mix promo-driven buyers, trials, and high-intent users. Year-1 survival can span a wide range across those segments while the monthly “New” count stays at 8,000. Without splitting December into cohorts or campaigns, ~2,000 and ~300 can both be realistic for different slices of the same headline number.",
    "When channels differ in both volume and retention, a blended average can look healthy while one channel subsidizes another (a form of Simpson’s paradox in mixes). “All healthy” and “half bad but masked” can both fit the same top-line report if you never break retention out by acquisition source.",
    "Aggregate retention can climb because the product truly improved—or because the least engaged users churned earlier, so the remaining base is more loyal (composition / survivorship), or because acquisition shifted toward stickier segments. A single blended retention series doesn’t identify which mechanism is driving the trend.",
  ];

  var pairBtnClass =
    "blended-quiz__btn blended-quiz__btn--pair blended-quiz__btn--pairclean w-full min-h-0 min-w-0 text-left inline-flex items-start justify-between gap-3 rounded-md px-2 py-3 sm:px-3 text-sm md:text-base leading-snug text-page-text transition-[background-color] duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-page-accent focus-visible:ring-offset-2";

  function escapeHtml(s) {
    var div = document.createElement("div");
    div.textContent = s;
    return div.innerHTML;
  }

  function createCheckSpan() {
    var span = document.createElement("span");
    span.className = "blended-quiz__check";
    span.setAttribute("aria-hidden", "true");
    span.textContent = "\u2713";
    return span;
  }

  function initBlendedPairsVs(container) {
    pairs.forEach(function (pairIndices, pairIndex) {
      var wrap = document.createElement("div");
      wrap.className = "blended-quiz__pair blended-quiz__pair--vs-block";

      var reveal = document.createElement("p");
      reveal.className =
        "blended-quiz__pairReveal mt-3 text-sm leading-relaxed text-page-text hidden";
      reveal.setAttribute("aria-live", "polite");
      reveal.textContent = pairRevealMessages[pairIndex] || "";

      var row = document.createElement("div");
      row.className = "blended-quiz__vs-grid";

      var btnA = document.createElement("button");
      btnA.type = "button";
      btnA.className = pairBtnClass;
      btnA.innerHTML =
        '<span class="flex-1 min-w-0 text-balance">' + escapeHtml(statements[pairIndices[0]]) + "</span>";

      var vs = document.createElement("span");
      vs.className = "blended-quiz__vs-label";
      vs.setAttribute("aria-hidden", "true");
      vs.textContent = "vs";

      var btnB = document.createElement("button");
      btnB.type = "button";
      btnB.className = pairBtnClass;
      btnB.innerHTML =
        '<span class="flex-1 min-w-0 text-balance">' + escapeHtml(statements[pairIndices[1]]) + "</span>";

      var buttons = [btnA, btnB];
      function wire(btn) {
        btn.appendChild(createCheckSpan());
        btn.addEventListener("click", function () {
          btn.classList.add("blended-quiz__btn--ok");
          btn.setAttribute("aria-pressed", "true");
          var allOk = buttons.every(function (b) {
            return b.classList.contains("blended-quiz__btn--ok");
          });
          if (allOk) reveal.classList.remove("hidden");
        });
      }
      wire(btnA);
      wire(btnB);

      row.appendChild(btnA);
      row.appendChild(vs);
      row.appendChild(btnB);
      wrap.appendChild(row);
      wrap.appendChild(reveal);
      container.appendChild(wrap);
    });
  }

  var pairsEl = document.querySelector(".blended-quiz-demo .blended-quiz__pairs");
  if (pairsEl) initBlendedPairsVs(pairsEl);
})();
