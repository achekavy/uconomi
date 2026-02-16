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
