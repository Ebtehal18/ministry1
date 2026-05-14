/* global React, Icon */

/* =========================================================
   REPORTS & ARCHIVE — التقارير والأرشفة
   Document library with classification, search, periods
   ========================================================= */

const REPORTS = [
  { id: 1, t: "محضر اجتماع اللجنة المالية العليا — الجلسة ٢٤", kind: "minutes", committee: "اللجنة المالية العليا", date: "08 مايو 2026", pages: 18, size: "2.4 MB", classification: "مقيد", featured: true },
  { id: 2, t: "تقرير الأداء الربعي — الربع الأول ٢٠٢٦",        kind: "report",  committee: "لجنة التحول الرقمي",     date: "30 أبريل 2026", pages: 42, size: "5.1 MB", classification: "عام" },
  { id: 3, t: "محضر اجتماع لجنة الشؤون القانونية — الجلسة ٤٢", kind: "minutes", committee: "لجنة الشؤون القانونية",  date: "02 مايو 2026", pages: 24, size: "3.2 MB", classification: "مقيد" },
  { id: 4, t: "تقرير حصاد القرارات والتوصيات — يناير–أبريل ٢٠٢٦", kind: "report", committee: "الأمانة العامة",         date: "30 أبريل 2026", pages: 68, size: "8.4 MB", classification: "عام", featured: true },
  { id: 5, t: "محضر اجتماع لجنة الإسكان والمدن — الجلسة ١٧",   kind: "minutes", committee: "لجنة الإسكان والمدن",    date: "29 أبريل 2026", pages: 14, size: "1.8 MB", classification: "عام" },
  { id: 6, t: "دراسة مقارنة — أنظمة الذكاء الاصطناعي الحكومية", kind: "study",  committee: "لجنة التحول الرقمي",     date: "20 أبريل 2026", pages: 96, size: "12.7 MB", classification: "مقيد" },
  { id: 7, t: "تقرير الحضور والمشاركة في اللجان — الربع الأول", kind: "report", committee: "الأمانة العامة",         date: "15 أبريل 2026", pages: 32, size: "4.6 MB", classification: "عام" },
  { id: 8, t: "محضر اجتماع لجنة المرأة والطفل — الجلسة ١١",   kind: "minutes", committee: "لجنة المرأة والطفل",      date: "10 أبريل 2026", pages: 16, size: "2.1 MB", classification: "عام" },
  { id: 9, t: "تقرير المخاطر الأمنية الفصلي",                  kind: "classified", committee: "لجنة الأمن الوطني",   date: "08 أبريل 2026", pages: 56, size: "6.8 MB", classification: "سري" },
  { id: 10, t: "دراسة جدوى — مشاريع الطاقة المتجددة",          kind: "study",  committee: "اللجنة المالية العليا",   date: "01 أبريل 2026", pages: 124, size: "18.2 MB", classification: "مقيد" },
];

const REPORT_KIND_META = {
  minutes:    { label: "محضر اجتماع",   icon: "Documents", c: "var(--c-blue)" },
  report:     { label: "تقرير",         icon: "Reports",   c: "var(--c-blue-700)" },
  study:      { label: "دراسة",         icon: "Eye",       c: "var(--c-amber)" },
  classified: { label: "تقرير سري",     icon: "Lock",      c: "var(--c-burgundy)" },
};

const CLASS_META = {
  "عام":    { c: "var(--c-green)", bg: "rgba(46,138,99,0.10)" },
  "مقيد":   { c: "var(--c-amber)", bg: "rgba(189,127,33,0.10)" },
  "سري":    { c: "var(--c-burgundy)", bg: "var(--c-burgundy-50)" },
};

function ReportRow({ r }) {
  const k = REPORT_KIND_META[r.kind];
  const cls = CLASS_META[r.classification];
  const Ic = Icon[k.icon];
  return (
    <li className={`rp-row ${r.featured ? "is-featured" : ""}`}>
      <div className="rp-row-icon" style={{ color: k.c, background: `color-mix(in oklch, ${k.c} 12%, white)` }}>
        <Ic width="18" height="18"/>
      </div>
      <div className="rp-row-main">
        <div className="rp-row-meta">
          <span className="rp-kind-tag" style={{ color: k.c }}>{k.label}</span>
          <span className="rp-row-classification" style={{ color: cls.c, background: cls.bg }}>
            {r.classification === "سري" && <Icon.Lock width="10" height="10"/>}
            {r.classification}
          </span>
          {r.featured && <span className="rp-featured-tag">⭐ مهم</span>}
        </div>
        <h4 className="rp-row-title">{r.t}</h4>
        <div className="rp-row-sub">
          <span><Icon.Committees width="11" height="11"/> {r.committee}</span>
          <span><Icon.Calendar width="11" height="11"/> {r.date}</span>
          <span className="num">{r.pages} صفحة</span>
          <span className="num">{r.size}</span>
        </div>
      </div>
      <div className="rp-row-actions">
        <button className="iconbtn iconbtn-sm" title="معاينة"><Icon.Eye width="14" height="14"/></button>
        <button className="iconbtn iconbtn-sm" title="تنزيل"><Icon.Download width="14" height="14"/></button>
        <button className="iconbtn iconbtn-sm" title="المزيد"><Icon.More width="14" height="14"/></button>
      </div>
    </li>
  );
}

function ReportsArchive() {
  const [kind, setKind] = React.useState("all");
  const [period, setPeriod] = React.useState("all");

  const filtered = REPORTS.filter(r => {
    if (kind !== "all" && r.kind !== kind) return false;
    return true;
  });

  const counts = {
    total:       REPORTS.length,
    minutes:     REPORTS.filter(r => r.kind === "minutes").length,
    reports:     REPORTS.filter(r => r.kind === "report").length,
    studies:     REPORTS.filter(r => r.kind === "study").length,
    classified:  REPORTS.filter(r => r.kind === "classified").length,
  };

  return (
    <>
      <div className="crumbs">
        <a>الرئيسية</a>
        <span className="sep">›</span>
        <span className="here">التقارير والأرشفة</span>
      </div>

      {/* Stats banner */}
      <div className="rp-banner">
        <div className="rp-banner-left">
          <div className="rp-banner-icon"><Icon.Documents width="22" height="22"/></div>
          <div>
            <span className="eyebrow eyebrow-secondary">المكتبة الرسمية</span>
            <h2 className="rp-banner-title">التقارير ومحاضر الاجتماعات</h2>
            <p className="rp-banner-sub">المرجع الموثّق لجميع التقارير والمحاضر والدراسات الصادرة عن اللجان الوزارية.</p>
          </div>
        </div>
        <div className="rp-banner-stats">
          <div>
            <div className="num">{counts.total}</div>
            <span>وثيقة</span>
          </div>
          <div className="sep"/>
          <div>
            <div className="num">{counts.minutes}</div>
            <span>محضر</span>
          </div>
          <div className="sep"/>
          <div>
            <div className="num">{counts.reports + counts.studies}</div>
            <span>تقرير ودراسة</span>
          </div>
          <div className="sep"/>
          <div>
            <div className="num" style={{ color: "var(--c-burgundy)" }}>{counts.classified}</div>
            <span>سري</span>
          </div>
        </div>
      </div>

      {/* Search + filter strip */}
      <div className="rp-toolbar">
        <div className="rp-search">
          <Icon.Search width="14" height="14"/>
          <input placeholder="ابحث في عنوان أو محتوى الوثائق…"/>
        </div>
        <div className="rp-tabs">
          {[
            { id: "all",        label: "الكل",         n: counts.total },
            { id: "minutes",    label: "محاضر",         n: counts.minutes },
            { id: "report",     label: "تقارير",        n: counts.reports },
            { id: "study",      label: "دراسات",        n: counts.studies },
            { id: "classified", label: "سري",          n: counts.classified, tone: "burg" },
          ].map(t => (
            <button key={t.id}
              className={`rp-tab ${kind === t.id ? "is-active" : ""} ${t.tone ? "tone-" + t.tone : ""}`}
              onClick={() => setKind(t.id)}>
              {t.label} <span className="num">{t.n}</span>
            </button>
          ))}
        </div>
        <div className="rp-tools">
          <select className="filter-chip" value={period} onChange={e => setPeriod(e.target.value)}>
            <option value="all">كل الفترات</option>
            <option value="month">آخر شهر</option>
            <option value="quarter">آخر ربع</option>
            <option value="year">عام ٢٠٢٦</option>
            <option value="custom">فترة مخصصة</option>
          </select>
          <button className="filter-chip"><Icon.Filter width="12" height="12"/> فلاتر</button>
        </div>
      </div>

      {/* Document list */}
      <div className="rp-list-card">
        <div className="rp-list-head">
          <div>
            <span className="eyebrow">{filtered.length} وثيقة</span>
            <h3 className="rp-list-title">نتائج البحث</h3>
          </div>
          <div className="rp-list-actions">
            <button className="btn btn-ghost btn-sm">ترتيب: الأحدث</button>
            <button className="btn btn-soft btn-sm"><Icon.Download width="13" height="13"/> تصدير القائمة</button>
          </div>
        </div>
        <ul className="rp-list">
          {filtered.map(r => <ReportRow key={r.id} r={r}/>)}
        </ul>
      </div>
    </>
  );
}

window.ReportsArchive = ReportsArchive;
