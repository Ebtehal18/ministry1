/* global React, Icon */

/* =========================================================
   EXECUTION TRACKING — متابعة تنفيذ التوصيات
   Visual progress dashboard with ministry ownership
   ========================================================= */

const TRACKED = [
  {
    id: "T-2026/14", title: "إنشاء منصة موحدة للهوية الرقمية",
    committee: "لجنة التحول الرقمي",
    ministry: "وزارة الاتصالات وتقنية المعلومات",
    owner: "م. علياء العمادي",
    issued: "12 فبراير 2026",
    due: "30 يونيو 2026",
    progress: 78, status: "ontrack",
    milestones: [
      { t: "الموافقة على المتطلبات",     done: true,  date: "20 فبر" },
      { t: "اختيار المزود التقني",        done: true,  date: "08 مار" },
      { t: "تطوير المرحلة الأولى",        done: true,  date: "22 أبر" },
      { t: "اختبار الأمان والامتثال",     done: false, date: "10 يون" },
      { t: "الإطلاق التشغيلي",            done: false, date: "30 يون" },
    ],
  },
  {
    id: "T-2026/12", title: "اعتماد الإطار الموحد للذكاء الاصطناعي الحكومي",
    committee: "لجنة التحول الرقمي",
    ministry: "وزارة الاتصالات وتقنية المعلومات",
    owner: "م. علياء العمادي",
    issued: "07 مايو 2026",
    due: "15 يوليو 2026",
    progress: 22, status: "atrisk",
    milestones: [
      { t: "اعتماد المعايير الأخلاقية",   done: true,  date: "12 ماي" },
      { t: "صياغة السياسة الموحدة",       done: false, date: "01 يون" },
      { t: "مشاورات الجهات الحكومية",     done: false, date: "20 يون" },
      { t: "اعتماد مجلس الوزراء",         done: false, date: "15 يول" },
    ],
  },
  {
    id: "T-2026/09", title: "تحديث لائحة المشتريات الحكومية",
    committee: "لجنة الشؤون القانونية",
    ministry: "وزارة العدل",
    owner: "د. فاطمة الجابر",
    issued: "20 مارس 2026",
    due: "10 يونيو 2026",
    progress: 55, status: "ontrack",
    milestones: [
      { t: "مراجعة اللائحة الحالية",      done: true,  date: "30 مار" },
      { t: "مشاورات الجهات المعنية",      done: true,  date: "15 أبر" },
      { t: "صياغة المسودة المعدلة",       done: false, date: "20 ماي" },
      { t: "إحالة لمجلس الوزراء",          done: false, date: "10 يون" },
    ],
  },
  {
    id: "T-2026/06", title: "خطة الاستثمار في الإسكان الوطني ٢٠٢٦–٢٠٢٨",
    committee: "لجنة الإسكان والمدن",
    ministry: "وزارة البلدية",
    owner: "م. ناصر الكواري",
    issued: "15 يناير 2026",
    due: "31 ديسمبر 2026",
    progress: 42, status: "ontrack",
    milestones: [
      { t: "دراسة جدوى المشاريع",         done: true,  date: "25 ينا" },
      { t: "اختيار المواقع",              done: true,  date: "18 فبر" },
      { t: "اعتماد التمويل",              done: false, date: "10 ماي" },
      { t: "بدء التنفيذ",                 done: false, date: "01 سبت" },
      { t: "التسليم النهائي",             done: false, date: "31 ديس" },
    ],
  },
  {
    id: "T-2025/47", title: "تعزيز خطة الاستجابة للطوارئ الوطنية",
    committee: "لجنة الأمن الوطني",
    ministry: "وزارة الداخلية",
    owner: "اللواء عبدالله السويدي",
    issued: "10 ديسمبر 2025",
    due: "15 أبريل 2026",
    progress: 95, status: "complete",
    milestones: [
      { t: "تحديث بروتوكولات الاستجابة", done: true,  date: "20 ديس" },
      { t: "تدريب الفرق المعنية",         done: true,  date: "15 ينا" },
      { t: "محاكاة شاملة",                done: true,  date: "10 مار" },
      { t: "اعتماد الخطة النهائية",       done: true,  date: "15 أبر" },
    ],
  },
  {
    id: "T-2025/33", title: "تطوير برامج تمكين المرأة في القطاعات القيادية",
    committee: "لجنة المرأة والطفل",
    ministry: "وزارة التنمية الاجتماعية",
    owner: "د. ريم المرّي",
    issued: "05 سبتمبر 2025",
    due: "30 أبريل 2026",
    progress: 28, status: "delayed",
    milestones: [
      { t: "دراسة الوضع الراهن",          done: true,  date: "20 سبت" },
      { t: "تصميم البرامج",               done: true,  date: "10 ديس" },
      { t: "اعتماد التمويل",              done: false, date: "20 فبر — متأخر" },
      { t: "إطلاق البرنامج التجريبي",     done: false, date: "30 أبر" },
    ],
  },
];

const STATUS_META = {
  ontrack:  { label: "في المسار",     c: "var(--c-green)",     bg: "rgba(46,138,99,0.10)" },
  atrisk:   { label: "مخاطر",         c: "var(--c-amber)",     bg: "rgba(189,127,33,0.12)" },
  delayed:  { label: "متأخر",         c: "var(--c-burgundy)",  bg: "var(--c-burgundy-50)" },
  complete: { label: "مكتمل",         c: "var(--c-blue)",      bg: "var(--c-blue-50)" },
};

function ProgressRing({ pct, status }) {
  const r = 24;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  const meta = STATUS_META[status];
  return (
    <div className="tr-ring">
      <svg width="60" height="60" viewBox="0 0 60 60">
        <circle cx="30" cy="30" r={r} fill="none"
          stroke="var(--c-bg-2)" strokeWidth="5"/>
        <circle cx="30" cy="30" r={r} fill="none"
          stroke={meta.c} strokeWidth="5"
          strokeDasharray={c} strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 30 30)"/>
      </svg>
      <span className="tr-ring-pct num" style={{ color: meta.c }}>{pct}%</span>
    </div>
  );
}

function ExecutionTracking() {
  const [filter, setFilter] = React.useState("all");

  const filtered = filter === "all" ? TRACKED : TRACKED.filter(t => t.status === filter);

  const overall = {
    total: TRACKED.length,
    ontrack: TRACKED.filter(t => t.status === "ontrack").length,
    atrisk: TRACKED.filter(t => t.status === "atrisk").length,
    delayed: TRACKED.filter(t => t.status === "delayed").length,
    complete: TRACKED.filter(t => t.status === "complete").length,
    avg: Math.round(TRACKED.reduce((s, t) => s + t.progress, 0) / TRACKED.length),
  };

  return (
    <>
      <div className="crumbs">
        <a>الرئيسية</a>
        <span className="sep">›</span>
        <a>التوصيات</a>
        <span className="sep">›</span>
        <span className="here">متابعة التنفيذ</span>
      </div>

      {/* Top KPI strip */}
      <div className="tr-kpis">
        <div className="tr-kpi tr-kpi-hero">
          <div className="tr-kpi-label">معدل الإنجاز العام</div>
          <div className="tr-kpi-big num">{overall.avg}<span>%</span></div>
          <div className="tr-kpi-bar">
            <div className="tr-kpi-bar-fill" style={{ width: `${overall.avg}%` }}/>
          </div>
          <div className="tr-kpi-sub">من إجمالي {overall.total} توصية قيد المتابعة</div>
        </div>
        <button className={`tr-kpi tr-kpi-btn ${filter === "ontrack" ? "is-active" : ""}`} onClick={() => setFilter(filter === "ontrack" ? "all" : "ontrack")}>
          <span className="tr-kpi-dot" style={{ background: STATUS_META.ontrack.c }}/>
          <div className="tr-kpi-label">في المسار</div>
          <div className="tr-kpi-num num">{overall.ontrack}</div>
        </button>
        <button className={`tr-kpi tr-kpi-btn ${filter === "atrisk" ? "is-active" : ""}`} onClick={() => setFilter(filter === "atrisk" ? "all" : "atrisk")}>
          <span className="tr-kpi-dot" style={{ background: STATUS_META.atrisk.c }}/>
          <div className="tr-kpi-label">في خطر</div>
          <div className="tr-kpi-num num">{overall.atrisk}</div>
        </button>
        <button className={`tr-kpi tr-kpi-btn ${filter === "delayed" ? "is-active" : ""}`} onClick={() => setFilter(filter === "delayed" ? "all" : "delayed")}>
          <span className="tr-kpi-dot" style={{ background: STATUS_META.delayed.c }}/>
          <div className="tr-kpi-label">متأخر</div>
          <div className="tr-kpi-num num">{overall.delayed}</div>
        </button>
        <button className={`tr-kpi tr-kpi-btn ${filter === "complete" ? "is-active" : ""}`} onClick={() => setFilter(filter === "complete" ? "all" : "complete")}>
          <span className="tr-kpi-dot" style={{ background: STATUS_META.complete.c }}/>
          <div className="tr-kpi-label">مكتمل</div>
          <div className="tr-kpi-num num">{overall.complete}</div>
        </button>
      </div>

      {/* Filter strip */}
      <div className="tr-toolbar">
        <div className="tr-tabs">
          <button className={`tr-tab ${filter === "all" ? "is-active" : ""}`} onClick={() => setFilter("all")}>
            كل التوصيات <span className="num">{overall.total}</span>
          </button>
          <button className="tr-tab">حسب اللجنة</button>
          <button className="tr-tab">حسب الوزارة</button>
        </div>
        <div className="tr-tools">
          <button className="filter-chip"><Icon.Calendar width="13" height="13"/> الفترة</button>
          <button className="filter-chip"><Icon.Filter width="13" height="13"/> فلاتر متقدمة</button>
          <button className="btn btn-soft btn-sm"><Icon.Download width="13" height="13"/> تصدير</button>
        </div>
      </div>

      {/* Tracking cards */}
      <div className="tr-list">
        {filtered.map(rec => {
          const meta = STATUS_META[rec.status];
          return (
            <article key={rec.id} className="tr-card">
              <div className="tr-card-head">
                <div className="tr-card-id">
                  <ProgressRing pct={rec.progress} status={rec.status}/>
                </div>
                <div className="tr-card-title-block">
                  <div className="tr-card-meta">
                    <span className="tr-card-num num">{rec.id}</span>
                    <span className="tr-card-status" style={{ color: meta.c, background: meta.bg }}>
                      {meta.label}
                    </span>
                  </div>
                  <h3 className="tr-card-title">{rec.title}</h3>
                  <div className="tr-card-sub">
                    <span><Icon.Committees width="12" height="12"/> {rec.committee}</span>
                    <span><Icon.Building width="12" height="12"/> {rec.ministry}</span>
                  </div>
                </div>
                <div className="tr-card-side">
                  <div className="tr-side-block">
                    <div className="tr-side-label">المسؤول</div>
                    <div className="tr-side-val">{rec.owner}</div>
                  </div>
                  <div className="tr-side-block">
                    <div className="tr-side-label">الموعد النهائي</div>
                    <div className="tr-side-val num">{rec.due}</div>
                  </div>
                </div>
              </div>

              {/* Milestones timeline */}
              <div className="tr-timeline">
                {rec.milestones.map((m, i) => {
                  const isCurrent = !m.done && rec.milestones.slice(0, i).every(x => x.done);
                  return (
                    <div key={i} className={`tr-step ${m.done ? "is-done" : ""} ${isCurrent ? "is-current" : ""}`}>
                      <div className="tr-step-dot">
                        {m.done ? <Icon.Check width="12" height="12"/> : <span className="num">{i + 1}</span>}
                      </div>
                      <div className="tr-step-label">
                        <div className="tr-step-title">{m.t}</div>
                        <div className="tr-step-date num">{m.date}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="tr-card-foot">
                <div className="tr-card-foot-info">
                  <Icon.Clock width="13" height="13"/>
                  <span>صدر في {rec.issued}</span>
                </div>
                <div className="tr-card-foot-actions">
                  <button className="btn btn-ghost btn-sm">عرض التوصية</button>
                  <button className="btn btn-soft btn-sm">تحديث الحالة</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}

window.ExecutionTracking = ExecutionTracking;
