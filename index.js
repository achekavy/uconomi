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
