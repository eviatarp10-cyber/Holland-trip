/* ============================================================
   כל התוכן של הטיול נמצא בקובץ הזה בלבד.
   כדי לשנות משהו – עורכים כאן, שומרים, וזה עולה לאתר אוטומטית.

   סוגי פעילות (type) – קובעים את האייקון:
   flight ✈️  train 🚆  car 🚗  bike 🚲  walk 🚶  boat ⛵  hotel 🏨
   food 🍽️  sight 🏛️  nature 🌷  shop 🛍️  kids 🎡  note 📝

   שדות אופציונליים לפעילות שפותחים "מגירת פרטים" בלחיצה:
   highlight: true          – אטרקציה עיקרית, מודגשת ביום
   place: "שם מקום, עיר"     – יוצר כפתור ניווט ב-Google Maps
   details: "טקסט" / ["פסקה", "פסקה"]
   info: { hours, price, duration, address, booking, transport, phone }
   tips: ["טיפ", "טיפ"]
   links: [{ label: "אתר רשמי", url: "https://..." }]
   ============================================================ */

window.TRIP = {
  title: "הטיול שלנו להולנד",
  subtitle: "נתוני דוגמה – ממתינים לתוכנית האמיתית",

  days: [
    {
      date: "2026-10-04",
      title: "נחיתה באמסטרדם",
      city: "אמסטרדם",
      stay: "מלון לדוגמה, אמסטרדם",
      stayPlace: "Amsterdam Centraal",
      summary: "יום קצר של הגעה והתאקלמות.",
      items: [
        { time: "06:30", type: "flight", title: "טיסה תל אביב ← אמסטרדם", note: "נחיתה משוערת 10:15 בסכיפהול" },
        { time: "11:30", type: "train", title: "רכבת משדה התעופה למרכז העיר", note: "כ-17 דקות" },
        { time: "13:00", type: "hotel", title: "צ'ק-אין במלון" },
        { time: "15:00", type: "walk", title: "סיבוב ראשון בתעלות" },
        { time: "19:00", type: "food", title: "ארוחת ערב" }
      ]
    },
    {
      date: "2026-10-05",
      title: "מוזיאונים ותעלות",
      city: "אמסטרדם",
      stay: "מלון לדוגמה, אמסטרדם",
      items: [
        {
          time: "09:00", type: "sight", title: "מוזיאון ואן גוך", highlight: true,
          note: "כרטיסים מראש",
          place: "Van Gogh Museum, Amsterdam",
          details: [
            "האוסף הגדול בעולם של יצירות ואן גוך – מעל 200 ציורים ו-500 רישומים, מסודרים כרונולוגית לפי תקופות חייו.",
            "דוגמה לטקסט מורחב: כאן ייכנס תיאור, מה כדאי לראות, ולמה זה שווה."
          ],
          info: { hours: "09:00–18:00", duration: "כשעתיים", price: "דוגמה: €24 למבוגר, חינם עד גיל 18" },
          tips: ["הכניסה בשעה קבועה – להגיע 10 דקות לפני", "אין תיקים גדולים, יש לוקרים בכניסה"],
          links: [{ label: "אתר רשמי", url: "https://www.vangoghmuseum.nl/" }]
        },
        { time: "13:00", type: "food", title: "צהריים" },
        { time: "15:00", type: "nature", title: "פארק פונדל", place: "Vondelpark, Amsterdam" }
      ]
    },
    {
      date: "2026-10-06",
      title: "יום טיול מחוץ לעיר",
      city: "זאנסה סכאנס",
      stay: "מלון לדוגמה, אמסטרדם",
      items: [
        { time: "09:30", type: "train", title: "נסיעה לזאנסה סכאנס" },
        { time: "11:00", type: "sight", title: "טחנות הרוח", highlight: true, place: "Zaanse Schans" },
        { time: "17:00", type: "train", title: "חזרה לאמסטרדם" }
      ]
    }
  ],

  // עמוד "מידע כללי" – נגיש מרצועת הימים למעלה. אפשר למחוק סעיפים או להוסיף.
  info: [
    {
      type: "flight", title: "טיסות",
      items: [
        { label: "הלוך", value: "דוגמה: LY337, 06:30 → 10:15" },
        { label: "חזור", value: "דוגמה: LY338, 13:00 → 18:30" }
      ]
    },
    {
      type: "hotel", title: "לינה",
      items: [
        { label: "אמסטרדם", value: "מלון לדוגמה", place: "Amsterdam Centraal", url: "https://example.com", linkText: "הזמנה ↗" }
      ]
    },
    {
      type: "note", title: "שימושי",
      items: [
        { label: "חירום", value: "112" },
        { label: "מטבע", value: "אירו (€)" },
        { label: "שקע", value: "אירופאי, 230V – צריך מתאם" }
      ]
    }
  ]
};
