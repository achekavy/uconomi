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
