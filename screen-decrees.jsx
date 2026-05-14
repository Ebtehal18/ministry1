/* global React, Icon */

/* =========================================================
   FORMATION DECREES — قرارات تشكيل اللجان
   ========================================================= */

function StatusDot({ kind }) {
  const m = {
    active:    { c: "var(--c-green)",     t: "ساري" },
    pending:   { c: "var(--c-amber)",     t: "بانتظار التوقيع" },
    expired:   { c: "var(--c-ink-4)",     t: "منتهٍ" },
    amended:   { c: "var(--c-burgundy)",  t: "معدّل" },
  };
  const s = m[kind];
  return (
    <span className="fd-status">
      <span className="dot" style={{ background: s.c }}/> {s.t}
    </span>
  );
}

function DecreeCard({ decree, year, no, title, committee, signedBy, signedRole, signedDate, validUntil, members, scope, status, amendments, isOpen, onToggle }) {
  return (
    <article className={`fd-card ${isOpen ? "is-open" : ""}`}>
      {/* Ribbon */}
      <div className="fd-ribbon">
        <div className="fd-ribbon-stripe"/>
        <div className="fd-ribbon-num">
          <span className="eyebrow">قرار رقم</span>
          <div className="fd-ribbon-no num">{no}</div>
          <div className="fd-ribbon-year num">لسنة {year}</div>
        </div>
      </div>

      {/* Body */}
      <div className="fd-body">
        <div className="fd-top">
          <span className="eyebrow">{decree}</span>
          <StatusDot kind={status}/>
        </div>
        <h3 className="fd-title">{title}</h3>
        <div className="fd-committee">
          <Icon.Committees width="14" height="14"/>
          <span>{committee}</span>
        </div>

        <div className="fd-grid">
          <div className="fd-fact">
            <div className="fd-fact-lab">جهة الإصدار</div>
            <div className="fd-fact-val">{signedBy}</div>
            <div className="fd-fact-sub">{signedRole}</div>
          </div>
          <div className="fd-fact">
            <div className="fd-fact-lab">تاريخ التوقيع</div>
            <div className="fd-fact-val num">{signedDate}</div>
          </div>
          <div className="fd-fact">
            <div className="fd-fact-lab">سريان المفعول حتى</div>
            <div className="fd-fact-val num">{validUntil}</div>
          </div>
          <div className="fd-fact">
            <div className="fd-fact-lab">عدد الأعضاء</div>
            <div className="fd-fact-val num">{members}</div>
          </div>
        </div>

        <div className="fd-foot">
          <div className="fd-tags">
            {scope.map((s, i) => <span key={i} className="pill pill-blue" style={{ fontSize: 11 }}>{s}</span>)}
          </div>
          <div className="fd-actions">
            {amendments > 0 && (
              <span className="pill pill-burg"><Icon.Documents width="11" height="11"/> {amendments} تعديل</span>
            )}
            <button className="btn btn-ghost btn-sm" onClick={onToggle}>
              {isOpen ? "إخفاء التفاصيل" : "عرض التفاصيل"}
            </button>
            <button className="btn btn-soft btn-sm">
              <Icon.Download width="13" height="13"/> PDF
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="fd-expand">
            <div className="fd-clauses">
              <h4>أحكام أساسية</h4>
              <ol>
                <li>تشكّل بقرار من {signedBy} لجنة وزارية يطلق عليها "{committee}".</li>
                <li>تختص اللجنة بـ{scope.join("، ")}.</li>
                <li>يبلغ النصاب {Math.ceil(members * 2/3)} أعضاء على الأقل.</li>
                <li>تجتمع اللجنة بدعوة من رئيسها مرتين شهرياً على الأقل.</li>
                <li>يعمل بهذا القرار من تاريخ صدوره وينشر في الجريدة الرسمية.</li>
              </ol>
            </div>
            <div className="fd-history">
              <h4>سجل التعديلات</h4>
              <ul className="fd-timeline">
                <li>
                  <span className="fd-tl-dot is-now"/>
                  <div>
                    <div className="fd-tl-title">إصدار القرار الأصلي</div>
                    <div className="fd-tl-meta num">{signedDate}</div>
                  </div>
                </li>
                {amendments > 0 && Array.from({ length: amendments }).map((_, i) => (
                  <li key={i}>
                    <span className="fd-tl-dot"/>
                    <div>
                      <div className="fd-tl-title">تعديل رقم ({i + 1}) — تحديث الاختصاصات</div>
                      <div className="fd-tl-meta num">{15 + i * 4} مارس 202{5 + i % 2}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

function FormationDecrees() {
  const [open, setOpen] = React.useState(0);
  const decrees = [
    {
      decree: "قرار أميري", year: "2026", no: "14",
      title: "بإعادة تشكيل اللجنة المالية العليا وتحديد اختصاصاتها",
      committee: "اللجنة المالية العليا",
      signedBy: "صاحب السمو", signedRole: "أمير دولة قطر",
      signedDate: "12 يناير 2026", validUntil: "11 يناير 2029",
      members: 9, status: "active", amendments: 0,
      scope: ["السياسة المالية", "الموازنة العامة", "حوكمة المخاطر", "الاستثمار السيادي"],
    },
    {
      decree: "قرار مجلس الوزراء", year: "2026", no: "08",
      title: "بتشكيل لجنة التحول الرقمي للقطاع الحكومي",
      committee: "لجنة التحول الرقمي",
      signedBy: "معالي رئيس مجلس الوزراء", signedRole: "رئيس مجلس الوزراء",
      signedDate: "03 فبراير 2026", validUntil: "02 فبراير 2028",
      members: 11, status: "amended", amendments: 2,
      scope: ["الحكومة الإلكترونية", "الهوية الرقمية", "الذكاء الاصطناعي"],
    },
    {
      decree: "قرار أميري", year: "2025", no: "62",
      title: "بإعادة تشكيل لجنة الشؤون القانونية ومراجعة التشريعات",
      committee: "لجنة الشؤون القانونية",
      signedBy: "صاحب السمو", signedRole: "أمير دولة قطر",
      signedDate: "20 نوفمبر 2025", validUntil: "19 نوفمبر 2027",
      members: 7, status: "active", amendments: 1,
      scope: ["مراجعة التشريعات", "حماية البيانات", "صياغة القوانين"],
    },
    {
      decree: "قرار مجلس الوزراء", year: "2025", no: "47",
      title: "بتشكيل لجنة الأمن الوطني العليا — مغلق",
      committee: "لجنة الأمن الوطني",
      signedBy: "معالي رئيس مجلس الوزراء", signedRole: "رئيس مجلس الوزراء",
      signedDate: "08 سبتمبر 2025", validUntil: "—",
      members: 8, status: "active", amendments: 0,
      scope: ["الأمن القومي", "إدارة الأزمات", "الطوارئ"],
    },
    {
      decree: "قرار وزاري", year: "2025", no: "31",
      title: "بإعادة تشكيل لجنة المرأة والطفل",
      committee: "لجنة المرأة والطفل",
      signedBy: "معالي وزير التنمية الاجتماعية", signedRole: "وزير التنمية الاجتماعية",
      signedDate: "15 يونيو 2025", validUntil: "14 يونيو 2026",
      members: 9, status: "pending", amendments: 0,
      scope: ["تمكين المرأة", "حماية الطفل", "السياسات الأسرية"],
    },
  ];

  return (
    <>
      <div className="crumbs">
        <a>الرئيسية</a>
        <span className="sep">›</span>
        <span className="here">قرارات تشكيل اللجان</span>
      </div>

      {/* Stats banner */}
      <div className="fd-banner">
        <div className="fd-banner-info">
          <span className="eyebrow eyebrow-secondary">السجل الرسمي</span>
          <h2 className="fd-banner-title">قرارات تشكيل اللجان الوزارية</h2>
          <p className="fd-banner-sub">السجل الموثّق للقرارات الأميرية والوزارية المنظِّمة لأعمال اللجان الوزارية الدائمة والمؤقتة.</p>
        </div>
        <div className="fd-banner-stats">
          <div><div className="num">٣٤</div><span>قرار ساري</span></div>
          <div className="sep"/>
          <div><div className="num">٧</div><span>تعديلات هذا العام</span></div>
          <div className="sep"/>
          <div><div className="num">٢</div><span>بانتظار التوقيع</span></div>
        </div>
      </div>

      {/* Filters */}
      <div className="fd-toolbar">
        <div className="fd-tabs">
          {[
            { id: "all", label: "كل القرارات", n: 41, active: true },
            { id: "amiri", label: "قرارات أميرية", n: 14 },
            { id: "council", label: "قرارات مجلس الوزراء", n: 19 },
            { id: "ministerial", label: "قرارات وزارية", n: 8 },
          ].map(t => (
            <button key={t.id} className={`fd-tab ${t.active ? "is-active" : ""}`}>
              {t.label} <span className="num">{t.n}</span>
            </button>
          ))}
        </div>
        <div className="fd-tools">
          <button className="filter-chip"><Icon.Calendar width="13" height="13"/> الفترة الزمنية</button>
          <button className="filter-chip"><Icon.Filter width="13" height="13"/> الحالة</button>
          <button className="btn btn-primary btn-sm"><Icon.Plus width="14" height="14"/> رفع قرار جديد</button>
        </div>
      </div>

      {/* Decree cards */}
      <div className="fd-list">
        {decrees.map((d, i) => (
          <DecreeCard key={i} {...d} isOpen={open === i} onToggle={() => setOpen(open === i ? -1 : i)}/>
        ))}
      </div>
    </>
  );
}

window.FormationDecrees = FormationDecrees;
