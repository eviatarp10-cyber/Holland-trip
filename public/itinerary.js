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

  days: [

    /* ---------------- יום 1 ---------------- */
    {
      date: "2026-09-18",
      title: "הגעה להולנד",
      city: "האג",
      stay: "בית משפחת מילנר + מלון Anna Paulowna (הוזמן)",
      summary: "יום נחיתה: מגיעים, אוכלים, ישנים 🙂",
      items: [
        {
          type: "flight", title: "נחיתה בסכיפהול",
          place: "Schiphol Airport",
          details: "שדה התעופה של אמסטרדם. תחנת הרכבת נמצאת ממש מתחת לטרמינל.",
          links: [{ label: "אתר סכיפהול", url: "https://www.schiphol.nl/en/" }]
        },
        {
          type: "car", title: "משדה התעופה להאג",
          note: "מונית או רכב – טרם סודר (ראו משימות בעמוד המידע)",
          details: [
            "אופציה נוחה: רכבת ישירה מסכיפהול לתחנת Den Haag Centraal, יוצאת כל 10–15 דקות ולוקחת כ-30–35 דקות. משלמים בצ'ק-אין/צ'ק-אאוט עם כרטיס אשראי (OVpay), בלי לקנות כרטיס.",
            "מונית: כ-40–50 דקות בהתאם לתנועה. בעמדת המוניות הרשמית מחוץ לטרמינל."
          ],
          links: [{ label: "תכנון נסיעה – NS", url: "https://www.ns.nl/en" }]
        },
        { time: "ערב", type: "food", title: "ארוחת ערב אצל משפחת מילנר" }
      ]
    },

    /* ---------------- יום 2 ---------------- */
    {
      date: "2026-09-19",
      title: "יום בליידן",
      city: "ליידן",
      stay: "בית משפחת מילנר + מלון Anna Paulowna (הוזמן)",
      summary: "עיר אוניברסיטאית קטנה ויפה, רבע שעה ברכבת מהאג. בשבת יש שוק גדול לאורך התעלה.",
      items: [
        {
          time: "בוקר", type: "train", title: "רכבת האג ← ליידן",
          note: "כ-12–15 דקות מ-Den Haag Centraal, יוצאת כל כמה דקות"
        },
        {
          type: "sight", title: "Naturalis – מוזיאון הטבע", highlight: true,
          note: "תצוגת הדינוזאורים",
          place: "Naturalis Biodiversity Center, Leiden",
          details: [
            "מוזיאון הטבע הלאומי של הולנד, בבניין חדש ומרשים. הכוכבת: טריקס (Trix) – שלד T. rex אמיתי וכמעט שלם, מהשמורים ביותר בעולם, באולם דינוזאורים שלם.",
            "מעבר לדינוזאורים יש אולמות על כדור הארץ, מאובנים, חיים בים, ו-LiveScience שבו רואים חוקרים בעבודה. מתאים מאוד לילדים."
          ],
          info: { hours: "בדרך כלל 10:00–17:00", duration: "2–3 שעות", transport: "כ-10 דקות הליכה מתחנת Leiden Centraal" },
          tips: ["כרטיסים אונליין חוסכים תור בכניסה", "חנות מוזיאון מצוינת לילדים ומסעדה בפנים"],
          links: [{ label: "אתר רשמי", url: "https://www.naturalis.nl/en" }]
        },
        {
          time: "צהריים", type: "shop", title: "שוק ליידן",
          place: "Nieuwe Rijn, Leiden",
          details: "שוק העיר של ליידן מתקיים בימי רביעי ושבת לאורך התעלה Nieuwe Rijn ובכיכר Botermarkt – מהיפים בהולנד. גבינות, פרחים, דגים, סטרופוואפל טרי, פירות, בגדים.",
          info: { hours: "שבת, בערך 9:00–17:00" },
          tips: ["סטרופוואפל חם מהדוכן – חובה", "קיבלינג (דג מטוגן) בדוכן הדגים – צהריים הולנדיים קלאסיים"]
        },
        {
          type: "boat", title: "שייט בתעלות ליידן",
          place: "Beestenmarkt, Leiden",
          details: "שייט של כשעה בתעלות העיר העתיקה עם הסבר. Rederij Rembrandt יוצאת מ-Beestenmarkt, קרוב לתחנת הרכבת. אופציה אחרת: להשכיר סירה חשמלית קטנה ולשוט לבד.",
          info: { duration: "כשעה" },
          links: [
            { label: "Rederij Rembrandt", url: "https://www.rederij-rembrandt.nl/" },
            { label: "Bootjes & Broodjes – השכרה עצמית", url: "https://www.bootjesenbroodjes.nl/" }
          ]
        },
        { time: "ערב", type: "food", title: "ארוחת ערב בליידן / אצל מילנר", note: "לבחירה" }
      ]
    },

    /* ---------------- יום 3 ---------------- */
    {
      date: "2026-09-20",
      title: "יום בהאג",
      city: "האג",
      stay: "בית משפחת מילנר + מלון Anna Paulowna (הוזמן)",
      items: [
        {
          time: "בוקר", type: "shop", title: "שוק תוצרת ביתית ב-Piet",
          note: "השוק הקטן ליד הבית"
        },
        { type: "nature", title: "טיול ביער שלנו", note: "היער הקרוב לבית של מילנר" },
        {
          type: "sight", title: "מוזיאון – לבחירה", highlight: true,
          note: "אחד מארבעה: Panorama Mesdag / Kunstmuseum / Escher / Mauritshuis",
          details: [
            "Panorama Mesdag – ציור פנורמי ענק (120 מטר היקף, 14 מטר גובה) של חוף סכפנינגן ב-1881. צופים ממרכז החדר ומרגישים בתוך הציור. ביקור קצר (30–45 דקות) ומרשים מאוד.",
            "Kunstmuseum Den Haag – מוזיאון האמנות הגדול של האג: אוסף מונדריאן הגדול בעולם, אר-דקו, אופנה ועיצוב, בבניין מפורסם של ברלאחה. יש בו גם Wonderkamers – אגף אינטראקטיבי לילדים.",
            "Escher in Het Paleis – יצירות אֶשר בארמון החורף לשעבר של המלכה אמה. מדרגות אינסופיות, ידיים שמציירות זו את זו, וקומה שלמה של אשליות אופטיות – הכי כיפי לילדים.",
            "Mauritshuis – אוסף קטן ומרוכז של תור הזהב ההולנדי: 'נערה עם עגיל פנינה' של ורמיר, 'שיעור האנטומיה' של רמברנדט, 'החוחית' של פבריציוס. ממש ליד הבינֶנהוף, שעה–שעה וחצי מספיקות."
          ],
          tips: ["עם ילדים: Escher או Wonderkamers ב-Kunstmuseum", "לזמן קצר: Panorama Mesdag או Mauritshuis"],
          links: [
            { label: "Panorama Mesdag", url: "https://www.panorama-mesdag.nl/en/" },
            { label: "Kunstmuseum", url: "https://www.kunstmuseum.nl/en" },
            { label: "Escher in Het Paleis", url: "https://www.escherinhetpaleis.nl/?lang=en" },
            { label: "Mauritshuis", url: "https://www.mauritshuis.nl/en" }
          ]
        },
        {
          time: "אחה״צ", type: "walk", title: "זמן חופשי במרכז העיר",
          place: "Binnenhof, Den Haag",
          details: "הבינֶנהוף (הפרלמנט ההיסטורי על האגם), כיכר Plein עם בתי הקפה, רחובות הקניות Spuistraat ו-Grote Marktstraat, וה-Passage – קניון מקורה מ-1885."
        }
      ]
    },

    /* ---------------- יום 4 ---------------- */
    {
      date: "2026-09-21",
      title: "בדרך ל-Beekse Bergen",
      city: "הילפרנבייק",
      stay: "Beekse Bergen – וילה (הוזמן)",
      stayPlace: "Vakantiepark Beekse Bergen, Hilvarenbeek",
      summary: "יום נסיעה דרומה עם עצירה בדרך, ואחר הצהריים ספארי ומים.",
      items: [
        { time: "בוקר", type: "car", title: "נסיעה מהאג ל-Beekse Bergen", note: "כשעה וחצי נסיעה ישירה" },
        {
          time: "בדרך", type: "sight", title: "עצירה בדרך – לבחירה",
          note: "Kinderdijk / טילבורג / רוטרדם",
          details: [
            "Kinderdijk – 19 טחנות רוח מהמאה ה-18 בשורה לאורך התעלות, אתר מורשת עולמית של אונסק״ו והתמונה הכי הולנדית שיש. הולכים לאורך הטחנות, נכנסים לטחנה-מוזיאון, ואפשר שייט קצר בין הטחנות. כ-45 דקות מהאג, ומשם עוד כשעה ורבע ל-Beekse Bergen.",
            "טילבורג – צהריים בעיר ומוזיאון הטקסטיל (מפעל ישן עם מכונות אריגה עובדות).",
            "רוטרדם – העיר המודרנית של הולנד: Markthal (שוק מקורה מרהיב עם אוכל מכל העולם – מושלם לצהריים), הבתים הקוביים ממול, ואיירומאסט לתצפית."
          ],
          tips: ["⚠️ מוזיאון הטקסטיל בטילבורג סגור בימי שני – אם רוצים אותו, מחר (שלישי) זה בתוכנית", "Kinderdijk ורוטרדם קרובים זה לזה – אפשר לשלב"],
          links: [
            { label: "Kinderdijk", url: "https://www.kinderdijk.com/" },
            { label: "Markthal רוטרדם", url: "https://www.markthal.nl/" },
            { label: "מוזיאון הטקסטיל", url: "https://www.textielmuseum.nl/en/" }
          ]
        },
        {
          time: "אחה״צ", type: "sight", title: "ספארי קצר ב-Beekse Bergen", highlight: true,
          place: "Safaripark Beekse Bergen",
          details: [
            "פארק הספארי הגדול בבנלוקס. עוברים אותו ברכב הפרטי (Autosafari), באוטובוס ספארי, בסירה, או ברגל – ובכל אחד רואים חיות אחרות. אריות, ג'ירפות, קרנפים, פילים, זברות ועוד.",
            "לאורחי פארק הנופש הכניסה לספארי בדרך כלל כלולה לאורך כל השהות – לוודא באישור ההזמנה."
          ],
          info: { duration: "ספארי ברכב: כשעה–שעה וחצי", transport: "צמוד לפארק הנופש" },
          tips: ["בספארי ברכב: חלונות סגורים באזור הבאבונים (הם מטפסים על הרכב)", "האכלות והצגות בשעות קבועות – לבדוק בלוח היומי בכניסה"],
          links: [{ label: "אתר רשמי", url: "https://www.beeksebergen.nl/en" }]
        },
        {
          type: "kids", title: "כיף במים ומשחקים",
          note: "Speelland / הבריכה של הפארק",
          details: "Speelland Beekse Bergen – פארק משחקים ענק עם אגם, חוף, מגלשות ומתקני מים, לרוב כלול לאורחי פארק הנופש. לוודא בפארק שעות של הבריכה המקורה, למקרה שקריר בחוץ."
        },
        { time: "ערב", type: "food", title: "ארוחת ערב בווילה" }
      ]
    },

    /* ---------------- יום 5 ---------------- */
    {
      date: "2026-09-22",
      title: "יום ספארי",
      city: "הילפרנבייק",
      stay: "Beekse Bergen – וילה (הוזמן)",
      stayPlace: "Vakantiepark Beekse Bergen, Hilvarenbeek",
      items: [
        {
          time: "יום שלם", type: "sight", title: "ספארי מלא", highlight: true,
          place: "Safaripark Beekse Bergen",
          details: "היום עושים את מה שלא הספקנו אתמול: ספארי בסירה (רואים את החיות מהמים), אוטובוס ספארי עם מדריך, והמסלול הרגלי בין המתחמים. בין לבין – מגרשי משחקים ומסעדות בתוך הפארק.",
          tips: ["להתחיל מוקדם – החיות פעילות יותר בבוקר", "לבדוק את לוח ההאכלות והמופעים בכניסה"],
          links: [{ label: "אתר רשמי", url: "https://www.beeksebergen.nl/en" }]
        },
        {
          time: "אופציה", type: "sight", title: "מוזיאון הטקסטיל בטילבורג",
          note: "אם לא הספקנו אתמול – כ-20 דקות נסיעה",
          place: "TextielMuseum, Tilburg",
          details: "מוזיאון במפעל טקסטיל ישן. הלב שלו הוא TextielLab – מעבדה פעילה שבה רואים מכונות אריגה וסריגה עובדות, ומעצבים בעבודה. יש גם תערוכות עיצוב ופינות יצירה לילדים.",
          info: { hours: "שלישי–ראשון (סגור בשני)", duration: "כשעתיים" },
          links: [{ label: "אתר רשמי", url: "https://www.textielmuseum.nl/en/" }]
        },
        { time: "ערב", type: "food", title: "ארוחת ערב בווילה / באחת ממסעדות הפארק" }
      ]
    },

    /* ---------------- יום 6 ---------------- */
    {
      date: "2026-09-23",
      title: "אפטלינג – יום ראשון",
      city: "קאטסהובל",
      stay: "Efteling Grand Hotel (הוזמן)",
      stayPlace: "Efteling Grand Hotel, Kaatsheuvel",
      summary: "צ'ק-אאוט מ-Beekse Bergen ונסיעה קצרה לאפטלינג. יום שלם בפארק – יהיה מדהים לכולם!",
      items: [
        { time: "בוקר", type: "hotel", title: "צ'ק-אאוט מ-Beekse Bergen" },
        { type: "car", title: "נסיעה לאפטלינג", note: "כ-20–25 דקות" },
        {
          type: "kids", title: "אפטלינג!", highlight: true,
          place: "Efteling, Kaatsheuvel",
          details: [
            "פארק השעשועים הגדול והאהוב בהולנד, מאז 1952 – עולם שלם של אגדות. לקטנים: Sprookjesbos (יער האגדות), Droomvlucht, Symbolica, Fata Morgana, Max & Moritz. לאמיצים: Baron 1898, Python, Joris en de Draak, ו-Danse Macabre החדשה.",
            "הפארק גדול – מתכננים לפי אזורים. אפליקציית Efteling מראה מפה, זמני המתנה בזמן אמת ושעות מופעים."
          ],
          info: { hours: "בדרך כלל 10:00–18:00 (לעיתים עד 20:00) – לבדוק באפליקציה", duration: "יומיים 🙂" },
          tips: [
            "להוריד את אפליקציית Efteling לפני שמגיעים",
            "אורחי המלון נכנסים לפארק לפני הפתיחה הרשמית – שווה לנצל מחר בבוקר",
            "לקראת הסגירה: מופע המזרקות Aquanura ליד הכניסה"
          ],
          links: [{ label: "אתר רשמי", url: "https://www.efteling.com/en" }]
        },
        { time: "15:00–16:00", type: "hotel", title: "קבלת החדרים במלון", note: "Efteling Grand Hotel – החדרים מוכנים מ-15:00/16:00" },
        { time: "19:30", type: "food", title: "ארוחת ערב במסעדת המלון", note: "הוזמן ל-19:30" }
      ]
    },

    /* ---------------- יום 7 ---------------- */
    {
      date: "2026-09-24",
      title: "אפטלינג – יום שני, וחזרה להאג",
      city: "קאטסהובל ← האג",
      stay: "בית משפחת מילנר (השאר טרם הוזמן)",
      summary: "כאורחי המלון אפשר להיכנס לפארק מוקדם. לא לשכוח לארוז את המזוודות לפני שיוצאים!",
      items: [
        { time: "בוקר", type: "note", title: "לארוז מזוודות וצ'ק-אאוט", note: "לפני היציאה לפארק" },
        {
          time: "בוקר מוקדם", type: "kids", title: "אפטלינג – יום שני", highlight: true,
          note: "כניסה מוקדמת לאורחי המלון",
          place: "Efteling, Kaatsheuvel",
          tips: ["להתחיל מהאטרקציות הפופולריות (Symbolica, Baron 1898, Danse Macabre) לפני שהתורים מתארכים", "מה שפספסנו אתמול – היום"],
          links: [{ label: "אתר רשמי", url: "https://www.efteling.com/en" }]
        },
        { time: "אחה״צ", type: "car", title: "נסיעה חזרה להאג", note: "כשעה וחצי" },
        { type: "shop", title: "שוק חמוד ליד הבית", note: "אם מגיעים מוקדם" },
        { time: "ערב", type: "food", title: "ארוחת ערב בדרך / אצל מילנר" }
      ]
    },

    /* ---------------- יום 8 ---------------- */
    {
      date: "2026-09-25",
      title: "יום רגוע: קניות, יער ו-Voorlinden",
      city: "האג / ואסנאר",
      stay: "בית משפחת מילנר (השאר טרם הוזמן)",
      items: [
        { time: "בוקר", type: "shop", title: "זמן לקניות", note: "לבחירה" },
        { type: "nature", title: "טיול ביער הפטריות היפה", note: "המקום המדהים!" },
        {
          type: "sight", title: "מוזיאון Voorlinden", highlight: true,
          place: "Museum Voorlinden, Wassenaar",
          details: [
            "מוזיאון לאמנות מודרנית ועכשווית באחוזה יפהפייה בוואסנאר, רבע שעה מהאג. הבניין, הגנים והדיונות מסביב הם חלק מהחוויה.",
            "הילדים יאהבו: 'הבריכה' של לאונדרו ארליך – נראה שאנשים מסתובבים מתחת למים; ו-'Couple under an Umbrella' הענקיים של רון מיוק."
          ],
          info: { hours: "בדרך כלל 11:00–17:00", duration: "2–3 שעות כולל הגנים" },
          tips: ["כרטיסים אונליין עם שעת כניסה", "אחרי המוזיאון: הליכה באחוזה ובדיונות של Meijendel ממש ליד"],
          links: [{ label: "אתר רשמי", url: "https://www.voorlinden.nl/en/" }]
        },
        { type: "walk", title: "הליכה בסביבה", note: "האחוזה והדיונות מסביב למוזיאון" },
        { time: "ערב", type: "food", title: "מסעדה נחמדה / אצל מילנר" }
      ]
    },

    /* ---------------- יום 9 ---------------- */
    {
      date: "2026-09-26",
      title: "יום חוף בסכפנינגן",
      city: "סכפנינגן, האג",
      stay: "מלון בצפון (טרם הוזמן)",
      summary: "יום שלם בחוף של האג: פסטיבל עפיפונים, לגולנד, הפיר והחוף. אחר הצהריים נסיעה למלון (?)",
      items: [
        {
          type: "nature", title: "פסטיבל העפיפונים", highlight: true,
          place: "Scheveningen Beach",
          details: "פסטיבל העפיפונים הבינלאומי של סכפנינגן – עפיפוני ענק בכל צורה וצבע מעל החוף, מופעי עפיפונים וסדנאות לילדים. חינם, על החוף."
        },
        {
          type: "kids", title: "LEGOLAND Discovery Centre",
          place: "LEGOLAND Discovery Centre Scheveningen",
          details: "מרכז לגו מקורה על הטיילת: מיניאלנד של הולנד מלגו, מתקנים, קולנוע 4D ואזורי בנייה. מיועד בעיקר לגילאי 3–10.",
          info: { duration: "כשעתיים" },
          tips: ["כרטיסים אונליין זולים יותר מבקופה", "מבוגרים נכנסים רק בליווי ילד"],
          links: [{ label: "אתר רשמי", url: "https://www.legolanddiscoverycentre.com/scheveningen/" }]
        },
        {
          type: "kids", title: "הפיר: אומגה, באנג'י וגלגל ענק",
          place: "De Pier, Scheveningen",
          details: "הפיר של סכפנינגן יוצא כ-380 מטר לתוך הים. בקצה: גלגל ענק מעל המים, אומגה (זיפליין) מהמגדל אל החוף, ובאנג'י. לכל מתקן הגבלות גיל, גובה ומשקל.",
          links: [{ label: "אתר הפיר", url: "https://www.pier.nl/en/" }]
        },
        { type: "nature", title: "לשבת על החוף" },
        {
          type: "sight", title: "הארמון",
          note: "כנראה ה-Kurhaus – המלון-ארמון על החוף",
          place: "Kurhaus, Scheveningen",
          details: "מלון היסטורי מפואר מ-1885 על החוף, בסגנון ארמון. שווה להיכנס להציץ באולם המרכזי (Kurzaal) המרהיב, אולי לקפה."
        },
        {
          type: "sight", title: "מוזיאון אמנות",
          note: "כנראה Beelden aan Zee – מוזיאון הפסלים ליד החוף",
          place: "Museum Beelden aan Zee",
          details: "מוזיאון פיסול מודרני חצי-שקוע בדיונה, ליד הקורהאוס. בחוץ, בחינם: 'סיפורי הים' – פסלי אגדות של Tom Otterness שהילדים אוהבים לטפס עליהם.",
          links: [{ label: "אתר רשמי", url: "https://www.beeldenaanzee.nl/en" }]
        },
        { time: "אחה״צ", type: "car", title: "נסיעה למלון בצפון (?)", note: "טרם הוחלט / הוזמן" }
      ]
    },

    /* ---------------- יום 10 ---------------- */
    {
      date: "2026-09-27",
      title: "יום באמסטרדם",
      city: "אמסטרדם",
      stay: "בית משפחת מילנר / לילה באמסטרדם (?)",
      summary: "אטרקציות פופולריות מתמלאות – להזמין מראש. להגיד למילנר אם רוצים שיזמינו משהו.",
      items: [
        {
          time: "בוקר", type: "train", title: "נסיעה לאמסטרדם",
          note: "ברכבת נוח יותר – כ-50 דקות מ-Den Haag Centraal. ברכב החניה יקרה."
        },
        {
          type: "kids", title: "This is Holland", highlight: true,
          place: "This is Holland, Amsterdam",
          details: "'טיסה' מדומה מעל הולנד: המושבים מתרוממים מול מסך ענק, עם רוח, ריח וערפל. כ-5 דקות של טיסה ועוד תצוגות מקדימות. נמצא באמסטרדם-צפון – 2 דקות במעבורת החינמית מאחורי תחנת Centraal.",
          info: { duration: "כ-45 דקות" },
          tips: ["יש הגבלת גובה מינימלית למתקן הטיסה (בערך 1.20 מ') – לבדוק לפני עם הקטנים", "להזמין שעה מראש אונליין"],
          links: [{ label: "אתר רשמי", url: "https://www.thisisholland.com/en/" }]
        },
        {
          type: "sight", title: "מוזיאון – לבחירה (?)",
          note: "Rijksmuseum / ואן גוך / NEMO לילדים",
          details: [
            "NEMO – מוזיאון המדע, בבניין הירוק בצורת ספינה ליד Centraal. הכל אינטראקטיבי, ניסויים, בועות סבון ענקיות – הבחירה הבטוחה עם ילדים. על הגג: מרפסת עם נוף.",
            "Rijksmuseum – המוזיאון הלאומי: 'משמר הלילה' של רמברנדט, ורמיר, ואגף שלם על ההיסטוריה ההולנדית. ענק – לבחור מראש מה רואים.",
            "מוזיאון ואן גוך – האוסף הגדול בעולם של יצירותיו, מסודר לפי תקופות חייו. כרטיסים בשעה קבועה, אונליין בלבד."
          ],
          links: [
            { label: "NEMO", url: "https://www.nemosciencemuseum.nl/en/" },
            { label: "Rijksmuseum", url: "https://www.rijksmuseum.nl/en" },
            { label: "מוזיאון ואן גוך", url: "https://www.vangoghmuseum.nl/en" }
          ]
        },
        {
          type: "sight", title: "בית אנה פרנק (?)",
          place: "Anne Frank House, Amsterdam",
          details: "הבית שבו הסתתרה אנה פרנק עם משפחתה. כרטיסים נמכרים אונליין בלבד, בשעה קבועה, ומשתחררים כ-6 שבועות מראש (בימי שלישי ב-10:00) – ואוזלים תוך דקות. בלי כרטיס שהוזמן מראש כמעט בטוח שלא נכנסים.",
          links: [{ label: "כרטיסים", url: "https://www.annefrank.org/en/museum/tickets/" }]
        },
        {
          type: "food", title: "אוכל טוב!",
          details: "רעיונות: Foodhallen (אולם אוכל עם דוכנים מכל העולם, באמסטרדם-מערב), שוק Albert Cuyp לסטרופוואפל טרי, או פנקייקים הולנדיים."
        },
        { time: "לילה", type: "hotel", title: "חזרה להאג / לילה באמסטרדם?", note: "לבחירה" }
      ]
    },

    /* ---------------- יום 11 ---------------- */
    {
      date: "2026-09-28",
      title: "היום האחרון",
      city: "האג",
      summary: "קניות, סטרופוואפל, הצ'יפס הכי טוב בעיר, ועוד פעם ביער המדהים – ולהתראות!",
      items: [
        { time: "בוקר", type: "shop", title: "קניות במרכז העיר" },
        { type: "food", title: "סטרופוואפל טרי", note: "חם מהדוכן" },
        { type: "food", title: "הצ'יפס הכי טוב בעיר" },
        { type: "nature", title: "טיול שני ביער הפטריות", note: "היער היפהפה עם הפטריות!!! מקום מדהים" },
        { type: "flight", title: "להתראות הולנד 👋" }
      ]
    }
  ],

  /* ---------------- עמוד מידע כללי ---------------- */
  info: [
    {
      type: "hotel", title: "לינה",
      items: [
        { label: "18–20/9", value: "בית משפחת מילנר + מלון Anna Paulowna (הוזמן)" },
        { label: "21–22/9", value: "Beekse Bergen – וילה (הוזמן)", place: "Vakantiepark Beekse Bergen, Hilvarenbeek" },
        { label: "23/9", value: "Efteling Grand Hotel (הוזמן)", place: "Efteling Grand Hotel, Kaatsheuvel" },
        { label: "24–25/9", value: "בית משפחת מילנר – השאר טרם הוזמן" },
        { label: "26/9", value: "מלון בצפון – טרם הוזמן" },
        { label: "27/9", value: "בית מילנר / לילה באמסטרדם – לבחירה" }
      ]
    },
    {
      type: "note", title: "משימות פתוחות",
      items: [
        { label: "לינה", value: "להחליט על סידורי הלינה אחרי אפטלינג" },
        { label: "רכבים", value: "להזמין רכבים. לפי הלוז צריך רכב רק בימים שני–שישי (21–25/9). לליידן ולאמסטרדם נוח יותר בתחבורה ציבורית; אם מעדיפים רכב לכל הביקור – יש חניון לא רחוק מהבית, או לשלם על חניה ברחוב." },
        { label: "הזמנות", value: "להזמין This is Holland ואטרקציות פופולריות (בית אנה פרנק, מוזיאון ואן גוך)" },
        { label: "שדה תעופה", value: "מונית / רכב משדה התעופה" }
      ]
    },
    {
      type: "nature", title: "רעיונות נוספים (לא בלוז)",
      text: "כולם דורשים רכב, חוץ ממדורודם.",
      items: [
        { label: "Giethoorn", value: "הכפר בלי כבישים – רק תעלות וסירות. כשעתיים מהאג. (יש כבר שני שייטים בלוז!)", place: "Giethoorn" },
        { label: "שוק גבינות", value: "אלקמאר – ימי שישי בבוקר עד סוף ספטמבר (לבדוק אם 25/9 עדיין בעונה); וורדן – שבתות.", url: "https://www.kaasmarkt.nl/en/", linkText: "אלקמאר ↗" },
        { label: "מוזיאון פתוח", value: "Openluchtmuseum בארנהם – כפר הולנדי היסטורי: טחנות, בתים, חשמליות עתיקות. כשעה וחצי מהאג.", url: "https://www.openluchtmuseum.nl/en", linkText: "אתר ↗" },
        { label: "Dinoland", value: "פארק דינוזאורים לילדים בזוולה. כשעה וחצי מהאג.", url: "https://www.dinoland.nl/", linkText: "אתר ↗" },
        { label: "קטיף תפוחים", value: "אחוזת Olmenhorst ליד ליסה (כ-40 דקות) – קטיף עצמי, פסטיבל קציר ושוק בסוף ספטמבר.", url: "https://www.olmenhorst.nl/", linkText: "אתר ↗" },
        { label: "מדורודם", value: "הולנד במיניאטורה – בהאג עצמה, בלי רכב. מצוין לילדים, 2–3 שעות.", url: "https://www.madurodam.nl/en", linkText: "אתר ↗", place: "Madurodam, Den Haag" }
      ]
    },
    {
      type: "info", title: "שימושי",
      items: [
        { label: "חירום", value: "112" },
        { label: "תחבורה ציבורית", value: "משלמים עם כרטיס אשראי או טלפון בצ'ק-אין וצ'ק-אאוט (OVpay) – לא צריך לקנות כרטיס. כל אחד עם הכרטיס שלו." },
        { label: "חניה", value: "בערים כמעט תמיד בתשלום. אפליקציות נוחות: EasyPark / Parkmobile." },
        { label: "מטבע", value: "אירו (€). כרטיס אשראי מתקבל כמעט בכל מקום, לפעמים רק Maestro/Debit." },
        { label: "שקע", value: "אירופאי, 230V – צריך מתאם" },
        { label: "מים", value: "מי ברז מצוינים לשתייה" }
      ]
    }
  ]
};
