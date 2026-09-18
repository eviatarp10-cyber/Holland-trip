(function () {
  "use strict";

  var TRIP = window.TRIP || { title: "טיול", days: [] };
  var days = (TRIP.days || []).slice().sort(function (a, b) {
    return String(a.date).localeCompare(String(b.date));
  });

  var ICONS = {
    flight: "✈️", train: "🚆", car: "🚗", bike: "🚲", walk: "🚶",
    hotel: "🏨", food: "🍽️", sight: "🏛️", nature: "🌷", shop: "🛍️",
    note: "📝"
  };

  var WEEKDAYS = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
  var MONTHS = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני",
                "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"];

  // התאריכים נכתבים כ-YYYY-MM-DD ומפורשים כתאריך מקומי (לא UTC),
  // כדי שההשוואה ל"היום" לא תזוז ביום אחד בגלל אזור זמן.
  function parseDate(s) {
    var p = String(s || "").split("-");
    if (p.length !== 3) return null;
    var d = new Date(+p[0], +p[1] - 1, +p[2]);
    return isNaN(d) ? null : d;
  }

  function todayKey() {
    var n = new Date();
    return [n.getFullYear(),
            String(n.getMonth() + 1).padStart(2, "0"),
            String(n.getDate()).padStart(2, "0")].join("-");
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  /* ---------- כותרת עליונה ---------- */

  function renderHeader() {
    document.title = TRIP.title || document.title;
    document.getElementById("trip-title").textContent = TRIP.title || "";

    var meta = document.getElementById("trip-meta");
    if (!days.length) { meta.textContent = TRIP.subtitle || ""; return; }

    var first = parseDate(days[0].date);
    var last = parseDate(days[days.length - 1].date);
    var range = "";
    if (first && last) {
      range = first.getDate() + " ב" + MONTHS[first.getMonth()] +
              " – " + last.getDate() + " ב" + MONTHS[last.getMonth()] +
              " " + last.getFullYear();
    }

    var parts = [range, days.length + " ימים"];
    var left = daysUntilStart(first);
    if (left > 0) parts.push("עוד " + left + " ימים");
    meta.textContent = parts.filter(Boolean).join(" · ");
  }

  function daysUntilStart(first) {
    if (!first) return 0;
    var now = new Date();
    now.setHours(0, 0, 0, 0);
    return Math.round((first - now) / 86400000);
  }

  /* ---------- רצועת הימים ---------- */

  var activeIndex = 0;
  var showAll = false;

  function renderStrip() {
    var strip = document.getElementById("daystrip");
    strip.textContent = "";
    var today = todayKey();

    days.forEach(function (day, i) {
      var d = parseDate(day.date);
      var btn = el("button", "daychip");
      btn.type = "button";
      btn.appendChild(el("span", null, d ? WEEKDAYS[d.getDay()] : ""));
      btn.appendChild(el("b", null, d ? d.getDate() + "/" + (d.getMonth() + 1) : day.date));
      if (day.date === today) btn.classList.add("is-today");
      if (!showAll && i === activeIndex) {
        btn.classList.add("is-active");
        btn.setAttribute("aria-current", "true");
      }
      btn.addEventListener("click", function () {
        showAll = false;
        activeIndex = i;
        render();
        btn.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
      });
      strip.appendChild(btn);
    });
  }

  /* ---------- כרטיס יום ---------- */

  function renderDay(day, index) {
    var card = el("article", "day");
    var head = el("div", "day-head");

    var eyebrow = el("div", "day-eyebrow");
    eyebrow.appendChild(el("span", "pill", "יום " + (index + 1)));
    if (day.date === todayKey()) eyebrow.appendChild(el("span", "pill today", "היום"));

    var d = parseDate(day.date);
    if (d) {
      eyebrow.appendChild(el("span", null,
        "יום " + WEEKDAYS[d.getDay()] + ", " + d.getDate() + " ב" + MONTHS[d.getMonth()]));
    }
    if (day.city) eyebrow.appendChild(el("span", null, "· " + day.city));
    head.appendChild(eyebrow);

    head.appendChild(el("h2", "day-title", day.title || ""));
    if (day.summary) head.appendChild(el("p", "day-summary", day.summary));
    card.appendChild(head);

    if (day.stay) {
      var stay = el("div", "day-stay");
      stay.appendChild(el("strong", null, "לינה: "));
      stay.appendChild(document.createTextNode(day.stay));
      card.appendChild(stay);
    }

    var items = day.items || [];
    if (!items.length) {
      card.appendChild(el("p", "empty", "אין עדיין פרטים ליום הזה."));
      return card;
    }

    var list = el("ul", "timeline");
    items.forEach(function (item) {
      var li = el("li", "entry");
      li.appendChild(el("div", "entry-icon", ICONS[item.type] || ICONS.note));

      var body = el("div", "entry-body");
      if (item.time) body.appendChild(el("div", "entry-time", item.time));
      body.appendChild(el("div", "entry-title", item.title || ""));
      if (item.note) body.appendChild(el("p", "entry-note", item.note));
      if (item.link) {
        var a = el("a", "entry-link", item.linkText || "פרטים נוספים");
        a.href = item.link;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        body.appendChild(a);
      }
      li.appendChild(body);
      list.appendChild(li);
    });

    card.appendChild(list);
    return card;
  }

  function render() {
    renderStrip();
    var view = document.getElementById("day-view");
    view.textContent = "";

    if (!days.length) {
      view.appendChild(el("p", "empty", "עדיין לא הוזנה תוכנית."));
      return;
    }

    if (showAll) {
      days.forEach(function (day, i) { view.appendChild(renderDay(day, i)); });
    } else {
      view.appendChild(renderDay(days[activeIndex], activeIndex));
    }

    var btn = document.getElementById("btn-all");
    btn.textContent = showAll ? "חזרה לתצוגת יום בודד" : "הצגת כל הימים ברצף";
  }

  /* ---------- אתחול ---------- */

  // אם אנחנו בתוך הטיול – פותחים ביום הנוכחי; לפני הטיול – ביום הראשון.
  var today = todayKey();
  var found = days.findIndex(function (d) { return d.date === today; });
  if (found === -1) {
    found = days.findIndex(function (d) { return d.date > today; });
  }
  activeIndex = found === -1 ? Math.max(0, days.length - 1) : found;

  renderHeader();
  render();

  document.getElementById("btn-all").addEventListener("click", function () {
    showAll = !showAll;
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.addEventListener("keydown", function (e) {
    if (showAll || !days.length) return;
    // RTL: חץ שמאל מתקדם ביום, חץ ימין חוזר.
    if (e.key === "ArrowLeft" && activeIndex < days.length - 1) { activeIndex++; render(); }
    if (e.key === "ArrowRight" && activeIndex > 0) { activeIndex--; render(); }
  });
})();
