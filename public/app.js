(function () {
  "use strict";

  var TRIP = window.TRIP || { title: "טיול", days: [] };
  var days = (TRIP.days || []).slice().sort(function (a, b) {
    return String(a.date).localeCompare(String(b.date));
  });
  var INFO = TRIP.info || [];

  var ICONS = {
    flight: "✈️", train: "🚆", car: "🚗", bike: "🚲", walk: "🚶", boat: "⛵",
    hotel: "🏨", food: "🍽️", sight: "🏛️", nature: "🌷", shop: "🛍️",
    kids: "🎡", note: "📝", info: "ℹ️"
  };

  var WEEKDAYS = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
  var MONTHS = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני",
                "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"];

  var INFO_LABELS = {
    hours: "שעות", price: "מחיר", duration: "משך", address: "כתובת",
    booking: "הזמנה", transport: "הגעה", phone: "טלפון"
  };

  /* ---------- כלי עזר ---------- */

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

  function longDate(d) {
    return "יום " + WEEKDAYS[d.getDay()] + ", " + d.getDate() + " ב" + MONTHS[d.getMonth()];
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function link(href, text, cls) {
    var a = el("a", cls || null, text);
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    return a;
  }

  function mapsUrl(place) {
    return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(place);
  }

  // "HH:MM" -> דקות מתחילת היום, או null
  function toMinutes(t) {
    var m = /^(\d{1,2}):(\d{2})/.exec(String(t || ""));
    return m ? (+m[1]) * 60 + (+m[2]) : null;
  }

  function hasDetails(item) {
    return !!(item.details || item.place || item.info ||
              (item.tips && item.tips.length) || (item.links && item.links.length));
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
    if (left === 1) parts.push("מחר יוצאים!");
    else if (left > 0) parts.push("עוד " + left + " ימים");
    meta.textContent = parts.filter(Boolean).join(" · ");
  }

  function daysUntilStart(first) {
    if (!first) return 0;
    var now = new Date();
    now.setHours(0, 0, 0, 0);
    return Math.round((first - now) / 86400000);
  }

  /* ---------- מצב תצוגה ---------- */

  // view: "day" | "all" | "info"
  var state = { view: "day", index: 0 };

  function setView(view, index) {
    state.view = view;
    if (typeof index === "number") state.index = index;
    render();
  }

  /* ---------- רצועת הימים ---------- */

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
      if (state.view === "day" && i === state.index) {
        btn.classList.add("is-active");
        btn.setAttribute("aria-current", "true");
      }
      btn.addEventListener("click", function () {
        setView("day", i);
        btn.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
      });
      strip.appendChild(btn);
    });

    if (INFO.length) {
      var info = el("button", "daychip daychip-info");
      info.type = "button";
      info.appendChild(el("span", null, ICONS.info));
      info.appendChild(el("b", null, "מידע"));
      if (state.view === "info") info.classList.add("is-active");
      info.addEventListener("click", function () {
        setView("info");
        info.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
      });
      strip.appendChild(info);
    }
  }

  /* ---------- כרטיס יום ---------- */

  // מזהה איזו פעילות מתרחשת "עכשיו" – רק ביום הנוכחי ורק לפעילויות עם שעה.
  function currentItemIndex(day) {
    if (day.date !== todayKey()) return -1;
    var now = new Date();
    var nowMin = now.getHours() * 60 + now.getMinutes();
    var best = -1;
    (day.items || []).forEach(function (item, i) {
      var m = toMinutes(item.time);
      if (m != null && m <= nowMin) best = i;
    });
    return best;
  }

  function renderDay(day, index) {
    var card = el("article", "day");
    var head = el("div", "day-head");

    var eyebrow = el("div", "day-eyebrow");
    eyebrow.appendChild(el("span", "pill", "יום " + (index + 1)));
    if (day.date === todayKey()) eyebrow.appendChild(el("span", "pill today", "היום"));

    var d = parseDate(day.date);
    if (d) eyebrow.appendChild(el("span", null, longDate(d)));
    if (day.city) eyebrow.appendChild(el("span", null, "· " + day.city));
    head.appendChild(eyebrow);

    head.appendChild(el("h2", "day-title", day.title || ""));
    if (day.summary) head.appendChild(el("p", "day-summary", day.summary));
    card.appendChild(head);

    if (day.stay) {
      var stay = el("div", "day-stay");
      stay.appendChild(el("span", "day-stay-icon", ICONS.hotel));
      var stayBody = el("div");
      stayBody.appendChild(el("strong", null, "לינה: "));
      stayBody.appendChild(document.createTextNode(day.stay));
      if (day.stayPlace) {
        stayBody.appendChild(document.createTextNode(" "));
        stayBody.appendChild(link(mapsUrl(day.stayPlace), "ניווט ↗", "inline-link"));
      }
      stay.appendChild(stayBody);
      card.appendChild(stay);
    }

    var items = day.items || [];
    if (!items.length) {
      card.appendChild(el("p", "empty", "אין עדיין פרטים ליום הזה."));
      return card;
    }

    var nowIdx = currentItemIndex(day);
    var list = el("ul", "timeline");
    items.forEach(function (item, i) {
      var li = el("li", "entry");
      if (item.highlight) li.classList.add("is-highlight");
      if (i === nowIdx) li.classList.add("is-now");

      li.appendChild(el("div", "entry-icon", ICONS[item.type] || ICONS.note));

      var body = el("div", "entry-body");
      var top = el("div", "entry-top");
      if (item.time) top.appendChild(el("span", "entry-time", item.time));
      if (i === nowIdx) top.appendChild(el("span", "pill now", "עכשיו"));
      if (top.childNodes.length) body.appendChild(top);
      body.appendChild(el("div", "entry-title", item.title || ""));
      if (item.note) body.appendChild(el("p", "entry-note", item.note));

      if (hasDetails(item)) {
        li.classList.add("is-tappable");
        var more = el("span", "entry-more", "פרטים נוספים");
        body.appendChild(more);
        li.setAttribute("role", "button");
        li.tabIndex = 0;
        li.addEventListener("click", function () { openSheet(item, day); });
        li.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openSheet(item, day); }
        });
      }

      li.appendChild(body);
      list.appendChild(li);
    });

    card.appendChild(list);
    return card;
  }

  /* ---------- מגירת פרטים ---------- */

  var sheet = document.getElementById("sheet");
  var sheetBody = document.getElementById("sheet-body");

  function openSheet(item, day) {
    sheetBody.textContent = "";

    var head = el("div", "sheet-head");
    head.appendChild(el("div", "sheet-icon", ICONS[item.type] || ICONS.note));
    var ht = el("div");
    var sub = [];
    if (item.time) sub.push(item.time);
    if (day && day.city) sub.push(day.city);
    if (sub.length) ht.appendChild(el("div", "sheet-sub", sub.join(" · ")));
    ht.appendChild(el("h3", "sheet-title", item.title || ""));
    head.appendChild(ht);
    sheetBody.appendChild(head);

    if (item.note && !item.details) sheetBody.appendChild(el("p", "sheet-text", item.note));

    var paras = Array.isArray(item.details) ? item.details : (item.details ? [item.details] : []);
    paras.forEach(function (p) { sheetBody.appendChild(el("p", "sheet-text", p)); });

    if (item.info) {
      var dl = el("dl", "sheet-facts");
      Object.keys(item.info).forEach(function (k) {
        if (!item.info[k]) return;
        dl.appendChild(el("dt", null, INFO_LABELS[k] || k));
        dl.appendChild(el("dd", null, item.info[k]));
      });
      sheetBody.appendChild(dl);
    }

    if (item.tips && item.tips.length) {
      sheetBody.appendChild(el("h4", "sheet-h4", "שווה לדעת"));
      var ul = el("ul", "sheet-tips");
      item.tips.forEach(function (t) { ul.appendChild(el("li", null, t)); });
      sheetBody.appendChild(ul);
    }

    var links = (item.links || []).slice();
    if (item.place) links.unshift({ label: "ניווט ב-Google Maps", url: mapsUrl(item.place), primary: true });
    if (links.length) {
      var row = el("div", "sheet-links");
      links.forEach(function (l) {
        row.appendChild(link(l.url, l.label, "btn" + (l.primary ? " btn-primary" : "")));
      });
      sheetBody.appendChild(row);
    }

    if (typeof sheet.showModal === "function") sheet.showModal();
    else sheet.setAttribute("open", "");
    sheet.scrollTop = 0;
  }

  function closeSheet() {
    if (sheet.open) sheet.close();
  }

  document.getElementById("sheet-close").addEventListener("click", closeSheet);
  // לחיצה על הרקע האפור סוגרת
  sheet.addEventListener("click", function (e) {
    if (e.target === sheet) closeSheet();
  });

  /* ---------- מידע כללי ---------- */

  function renderInfo() {
    var wrap = el("div", "info-view");
    INFO.forEach(function (section) {
      var card = el("section", "day");
      var h = el("h2", "day-title info-title");
      h.appendChild(el("span", "info-title-icon", ICONS[section.type] || ICONS.info));
      h.appendChild(document.createTextNode(section.title || ""));
      card.appendChild(h);
      if (section.text) card.appendChild(el("p", "day-summary", section.text));

      var rows = el("dl", "info-rows");
      (section.items || []).forEach(function (row) {
        rows.appendChild(el("dt", null, row.label || ""));
        var dd = el("dd");
        if (row.value) dd.appendChild(document.createTextNode(row.value));
        if (row.url) {
          if (row.value) dd.appendChild(document.createTextNode(" "));
          dd.appendChild(link(row.url, row.linkText || "פתיחה ↗", "inline-link"));
        }
        if (row.place) {
          dd.appendChild(document.createTextNode(" "));
          dd.appendChild(link(mapsUrl(row.place), "ניווט ↗", "inline-link"));
        }
        rows.appendChild(dd);
      });
      card.appendChild(rows);
      wrap.appendChild(card);
    });
    return wrap;
  }

  /* ---------- רינדור ראשי ---------- */

  function render() {
    renderStrip();
    var view = document.getElementById("day-view");
    view.textContent = "";
    var btn = document.getElementById("btn-all");

    if (state.view === "info") {
      view.appendChild(renderInfo());
      btn.textContent = "חזרה ללוז";
      return;
    }

    if (!days.length) {
      view.appendChild(el("p", "empty", "עדיין לא הוזנה תוכנית."));
      btn.hidden = true;
      return;
    }

    if (state.view === "all") {
      days.forEach(function (day, i) { view.appendChild(renderDay(day, i)); });
      btn.textContent = "חזרה לתצוגת יום בודד";
    } else {
      view.appendChild(renderDay(days[state.index], state.index));
      btn.textContent = "הצגת כל הימים ברצף";
    }
  }

  /* ---------- אתחול ---------- */

  // אם אנחנו בתוך הטיול – פותחים ביום הנוכחי; לפני הטיול – ביום הראשון.
  var today = todayKey();
  var found = days.findIndex(function (d) { return d.date === today; });
  if (found === -1) found = days.findIndex(function (d) { return d.date > today; });
  state.index = found === -1 ? Math.max(0, days.length - 1) : found;

  renderHeader();
  render();

  document.getElementById("btn-all").addEventListener("click", function () {
    if (state.view === "day") setView("all");
    else setView("day");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.addEventListener("keydown", function (e) {
    if (state.view !== "day" || !days.length || sheet.open) return;
    // RTL: חץ שמאל מתקדם ביום, חץ ימין חוזר.
    if (e.key === "ArrowLeft" && state.index < days.length - 1) setView("day", state.index + 1);
    if (e.key === "ArrowRight" && state.index > 0) setView("day", state.index - 1);
  });

  // רענון סימון "עכשיו" כל דקה, בלי לגעת בשאר
  setInterval(function () {
    if (state.view === "day" && !sheet.open) render();
  }, 60000);
})();
