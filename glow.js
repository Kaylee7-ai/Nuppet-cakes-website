/* glow.js: sweet interactions for Nupet Cakes
   1) warm light follows your cursor over cards
   2) a burst of sprinkles on key button clicks
   3) the cake preview gives a little "pop" when you change an option */
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(pointer: fine)").matches;

  /* 1) Cursor spotlight (mouse devices only) */
  if (fine) {
    document.addEventListener("pointermove", function (e) {
      var card = e.target.closest && e.target.closest(".card, .step, .visit > div");
      if (!card) return;
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", (e.clientX - r.left) + "px");
      card.style.setProperty("--my", (e.clientY - r.top) + "px");
    }, { passive: true });
  }

  /* 2) Sprinkle burst on main buttons */
  var colours = ["#e0245e", "#ff7a59", "#d9a441", "#6c63ff", "#1faa59", "#ff9fb8", "#ffd23f"];
  function burst(x, y) {
    for (var i = 0; i < 16; i++) {
      var s = document.createElement("span");
      var angle = Math.random() * Math.PI * 2, dist = 50 + Math.random() * 70;
      s.className = "sprinkle";
      s.style.left = x + "px";
      s.style.top = y + "px";
      s.style.background = colours[i % colours.length];
      s.style.setProperty("--dx", Math.cos(angle) * dist + "px");
      s.style.setProperty("--dy", Math.sin(angle) * dist + 20 + "px");
      s.style.setProperty("--rot", Math.round(Math.random() * 360) + "deg");
      s.addEventListener("animationend", function () { this.remove(); });
      document.body.appendChild(s);
    }
  }
  if (!reduce) {
    document.addEventListener("click", function (e) {
      var b = e.target.closest && e.target.closest(".btn-primary, .btn-wa, .link-btn[data-use]");
      if (b) burst(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2);
    });
  }

  /* 3) Preview pop when the cake changes */
  var preview = document.getElementById("preview");
  if (preview && !reduce && "MutationObserver" in window) {
    new MutationObserver(function () {
      preview.classList.remove("pop");
      void preview.offsetWidth;
      preview.classList.add("pop");
    }).observe(preview, { childList: true });
  }
})();