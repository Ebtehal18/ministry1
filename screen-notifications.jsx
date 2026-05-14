/* global React, Icon */

/* =========================================================
   NOTIFICATIONS / ALERTS — التنبيهات
   Inbox-style center for system & committee notifications
   ========================================================= */

const NOTIFS = [
  {
    id: 1, kind: "urgent", read: false,
    icon: "Warning", tone: "burg",
    title: "اجتماع طارئ — اللجنة المالية العليا",
    body: "دُعيت لاجتماع طارئ غداً الساعة ٩:٠٠ ص بشأن مراجعة المخصصات المالية للربع الثاني.",
    meta: "اللجنة المالية العليا · من الأمين العام",
    time: "قبل ١٢ دقيقة",
    actions: ["عرض الدعوة", "تأكيد الحضور"],
  },
  {
    id: 2, kind: "decision", read: false,
    icon: "Decisions", tone: "blue",
    title: "توصية بانتظار توقيعك",
    body: "التوصية ١٢/٢٠٢٦ — اعتماد منصة الذكاء الاصطناعي للقطاع الحكومي. صدرت في اجتماع لجنة التحول الرقمي بتاريخ ٠٧ مايو.",
    meta: "لجنة التحول الرقمي · ينتهي أجل التوقيع خلال يومين",
    time: "قبل ٤٥ دقيقة",
    actions: ["مراجعة وتوقيع"],
  },
  {
    id: 3, kind: "agenda", read: false,
    icon: "Tasks", tone: "blue",
    title: "بند جديد على جدول الأعمال",
    body: "تمت إضافة بند «مراجعة استراتيجية الإسكان الوطني ٢٠٣٠» إلى اجتماع يوم الخميس.",
    meta: "لجنة الإسكان والمدن · أضافه م. ناصر الكواري",
    time: "قبل ساعتين",
    actions: ["عرض البند", "تعليق"],
  },
  {
    id: 4, kind: "system", read: false,
    icon: "Documents", tone: "neutral",
    title: "محضر اجتماع جاهز للاعتماد",
    body: "تم رفع محضر الاجتماع الـ ٤٢ للجنة الشؤون القانونية، يرجى مراجعته خلال ٤٨ ساعة.",
    meta: "لجنة الشؤون القانونية",
    time: "قبل ٣ ساعات",
    actions: ["مراجعة المحضر"],
  },
  {
    id: 5, kind: "decree", read: false,
    icon: "Documents", tone: "burg",
    title: "صدور قرار أميري جديد",
    body: "صدر القرار الأميري رقم ١٤ لسنة ٢٠٢٦ بإعادة تشكيل اللجنة المالية العليا.",
    meta: "السجل الرسمي · ١٢ يناير ٢٠٢٦",
    time: "اليوم · ٠٨:٣٠ ص",
    actions: ["عرض القرار"],
  },
  {
    id: 6, kind: "agenda", read: true,
    icon: "Calendar", tone: "neutral",
    title: "تذكير — اجتماع غداً",
    body: "اجتماع لجنة الموازنة الـ ٢٨ يبدأ غداً الساعة ١٠:٠٠ ص في القاعة الرئيسية.",
    meta: "لجنة الموازنة",
    time: "أمس · ٤:١٠ م",
    actions: ["عرض الاجتماع"],
  },
  {
    id: 7, kind: "system", read: true,
    icon: "Members", tone: "neutral",
    title: "تعيين عضو جديد",
    body: "تم تعيين د. ريم المرّي عضواً في لجنة المرأة والطفل بقرار وزاري.",
    meta: "السجل الرسمي",
    time: "أمس · ٢:٢٠ م",
    actions: [],
  },
  {
    id: 8, kind: "decision", read: true,
    icon: "Check", tone: "green",
    title: "تم اعتماد التوصية ٠٩/٢٠٢٦",
    body: "اعتماد خطة التحول الرقمي الموحدة بأغلبية ٩ من ١١.",
    meta: "لجنة التحول الرقمي",
    time: "قبل يومين",
    actions: ["عرض التوصية"],
  },
];

function NotifIcon({ name, tone }) {
  const Ic = Icon[name] || Icon.Bell;
  return (
    <div className={`nf-icon nf-icon-${tone}`}>
      <Ic width="18" height="18"/>
    </div>
  );
}

function Notifications() {
  const [filter, setFilter] = React.useState("all");
  const [items, setItems] = React.useState(NOTIFS);

  const counts = {
    all:       items.length,
    unread:    items.filter(n => !n.read).length,
    urgent:    items.filter(n => n.kind === "urgent").length,
    decision:  items.filter(n => n.kind === "decision").length,
    agenda:    items.filter(n => n.kind === "agenda").length,
    system:    items.filter(n => n.kind === "system" || n.kind === "decree").length,
  };

  const visible = items.filter(n => {
    if (filter === "all")      return true;
    if (filter === "unread")   return !n.read;
    if (filter === "system")   return n.kind === "system" || n.kind === "decree";
    return n.kind === filter;
  });

  const markAllRead = () => setItems(items.map(n => ({ ...n, read: true })));
  const markRead    = (id) => setItems(items.map(n => n.id === id ? { ...n, read: true } : n));

  // Group by day
  const groups = {};
  visible.forEach(n => {
    const day = n.time.includes("اليوم") || n.time.includes("قبل") && !n.time.includes("يوم") && !n.time.includes("أمس")
      ? "اليوم" : n.time.includes("أمس") ? "أمس" : "في وقت سابق";
    (groups[day] ||= []).push(n);
  });

  return (
    <>
      <div className="crumbs">
        <a>الرئيسية</a>
        <span className="sep">›</span>
        <span className="here">التنبيهات</span>
      </div>

      <div className="nf-banner">
        <div className="nf-banner-left">
          <div className="nf-banner-icon"><Icon.Bell width="22" height="22"/></div>
          <div>
            <span className="eyebrow">مركز التنبيهات</span>
            <h2 className="nf-banner-title">لديك {counts.unread} تنبيهات جديدة</h2>
            <p className="nf-banner-sub">{counts.urgent} عاجل · {counts.decision} توصية بانتظار التوقيع · {counts.agenda} تحديث على جداول الأعمال</p>
          </div>
        </div>
        <div className="nf-banner-actions">
          <button className="btn btn-ghost btn-sm" onClick={markAllRead}>
            <Icon.Check width="14" height="14"/> تعليم الكل كمقروء
          </button>
          <button className="btn btn-soft btn-sm">
            <Icon.Settings width="14" height="14"/> إعدادات التنبيهات
          </button>
        </div>
      </div>

      <div className="nf-layout">
        {/* Filter rail */}
        <aside className="nf-rail">
          <div className="nf-rail-title">تصفية حسب النوع</div>
          {[
            { id: "all",      label: "كل التنبيهات",       icon: "Bell",      count: counts.all },
            { id: "unread",   label: "غير المقروءة",       icon: "Eye",       count: counts.unread },
            { id: "urgent",   label: "عاجل",                icon: "Warning",   count: counts.urgent,   tone: "burg" },
            { id: "decision", label: "توصيات وقرارات",     icon: "Decisions", count: counts.decision, tone: "blue" },
            { id: "agenda",   label: "جداول الأعمال",      icon: "Tasks",     count: counts.agenda,   tone: "blue" },
            { id: "system",   label: "إشعارات النظام",     icon: "Documents", count: counts.system },
          ].map(f => {
            const Ic = Icon[f.icon];
            return (
              <button key={f.id}
                className={`nf-filter ${filter === f.id ? "is-active" : ""} ${f.tone ? "tone-" + f.tone : ""}`}
                onClick={() => setFilter(f.id)}>
                <Ic width="15" height="15"/>
                <span className="nf-filter-label">{f.label}</span>
                <span className="nf-filter-count num">{f.count}</span>
              </button>
            );
          })}

          <div className="nf-rail-spacer"/>
          <div className="nf-rail-title">قنوات التسليم</div>
          <div className="nf-channels">
            <label><input type="checkbox" defaultChecked/> داخل النظام</label>
            <label><input type="checkbox" defaultChecked/> بريد إلكتروني</label>
            <label><input type="checkbox" defaultChecked/> رسائل قصيرة</label>
            <label><input type="checkbox"/> تطبيق الجوال</label>
          </div>
        </aside>

        {/* Inbox */}
        <div className="nf-inbox">
          {Object.keys(groups).length === 0 && (
            <div className="nf-empty">
              <Icon.Check width="36" height="36"/>
              <h3>لا توجد تنبيهات</h3>
              <p>أحسنت! لا تنبيهات في هذا التصنيف.</p>
            </div>
          )}
          {Object.entries(groups).map(([day, list]) => (
            <section key={day} className="nf-group">
              <div className="nf-group-title">
                <span>{day}</span>
                <span className="nf-group-count num">{list.length}</span>
              </div>
              <ul className="nf-list">
                {list.map(n => (
                  <li key={n.id} className={`nf-item ${n.read ? "" : "is-unread"}`}>
                    <NotifIcon name={n.icon} tone={n.tone}/>
                    <div className="nf-content">
                      <div className="nf-row">
                        <h4 className="nf-title">{n.title}</h4>
                        <span className="nf-time">{n.time}</span>
                      </div>
                      <p className="nf-body">{n.body}</p>
                      <div className="nf-meta">
                        <span>{n.meta}</span>
                        {!n.read && <span className="nf-unread-pill">جديد</span>}
                      </div>
                      {(n.actions.length > 0 || !n.read) && (
                        <div className="nf-actions">
                          {n.actions.map((a, i) => (
                            <button key={i} className={`btn btn-sm ${i === 0 ? "btn-primary" : "btn-ghost"}`}>{a}</button>
                          ))}
                          {!n.read && (
                            <button className="nf-link" onClick={() => markRead(n.id)}>تعليم كمقروء</button>
                          )}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}

/* =========================================================
   PLACEHOLDER — for sidebar items not yet built out
   ========================================================= */
function ScreenPlaceholder({ icon = "Settings", title = "قيد التطوير", body = "هذه الشاشة قيد التطوير في المرحلة المقبلة من المشروع." }) {
  const Ic = Icon[icon] || Icon.Settings;
  return (
    <div className="placeholder-screen">
      <div className="placeholder-card">
        <div className="placeholder-icon"><Ic width="44" height="44"/></div>
        <span className="eyebrow">قيد التطوير</span>
        <h2 className="placeholder-title">{title}</h2>
        <p className="placeholder-body">{body}</p>
        <div className="placeholder-meta">
          <span className="dot" style={{ background: "var(--c-amber)" }}/>
          <span>سيتم إصدار هذه الشاشة في المرحلة الثالثة من تسليم النظام.</span>
        </div>
      </div>
    </div>
  );
}

window.Notifications = Notifications;
window.ScreenPlaceholder = ScreenPlaceholder;
