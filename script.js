(function ($) {
  "use strict";

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Custom cursor (mouse devices only) ---------- */
  var cursor  = document.getElementById("cursor");
  var cursor2 = document.getElementById("cursor2");
  var cursor3 = document.getElementById("cursor3");
  var hasMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (hasMouse && cursor && cursor2 && cursor3) {
    document.body.addEventListener("mousemove", function (ev) {
      var x = ev.clientX + "px", y = ev.clientY + "px";
      [cursor, cursor2, cursor3].forEach(function (el) {
        el.style.left = x;
        el.style.top = y;
      });
    });

    // one delegated listener instead of one per element
    $(document)
      .on("mouseover", ".hover-target", function () {
        cursor2.classList.add("hover");
        cursor3.classList.add("hover");
      })
      .on("mouseout", ".hover-target", function () {
        cursor2.classList.remove("hover");
        cursor3.classList.remove("hover");
      });
  }

  /* ---------- Panels: about, contact and the three galleries ---------- */
  // trigger selector -> [body class, panel selector, close selector]
  var panels = {
    about:   { trigger: ".about-text",    panel: ".about-section",   close: ".about-close" },
    contact: { trigger: ".contact-text",  panel: ".contact-section", close: ".contact-close" },
    Wedding: { trigger: ".hero-section .Wedding", panel: ".Wedding-section", close: ".Wedding-close" },
    Model:   { trigger: ".hero-section .Model",   panel: ".Model-section",   close: ".Model-close" },
    nature:  { trigger: ".hero-section .nature",  panel: ".nature-section",  close: ".nature-close" }
  };

  var $body = $("body");
  var lastTrigger = null;

  function openPanel(name) {
    var p = panels[name];
    $body.addClass(name + "-on");
    $(p.panel).attr("aria-hidden", "false").find(".section-scroll").scrollTop(0);
    // move focus to the close button once the slide-in has started
    // preventScroll: otherwise the browser scrolls the page sideways to reach
    // the still-off-screen button while the panel is sliding in
    setTimeout(function () {
      var btn = document.querySelector(p.close);
      if (btn) btn.focus({ preventScroll: true });
    }, 450);
  }

  function closePanel(name) {
    var p = panels[name];
    $body.removeClass(name + "-on");
    $(p.panel).attr("aria-hidden", "true");
    if (lastTrigger) { lastTrigger.focus({ preventScroll: true }); lastTrigger = null; }
    window.scrollTo(0, 0);
  }

  function closeAll() {
    Object.keys(panels).forEach(function (name) {
      if ($body.hasClass(name + "-on")) closePanel(name);
    });
  }

  Object.keys(panels).forEach(function (name) {
    var p = panels[name];
    $(p.trigger).on("click", function () {
      lastTrigger = this;
      openPanel(name);
    });
    $(p.close).on("click", function () { closePanel(name); });
  });

  // keyboard: Enter / Space on the triggers, Escape to close
  $(document).on("keydown", function (ev) {
    if (ev.key === "Escape") {
      closeAll();
    } else if ((ev.key === "Enter" || ev.key === " ") && $(ev.target).is("[role='button']")) {
      ev.preventDefault();
      $(ev.target).trigger("click");
    }
  });

})(jQuery);
