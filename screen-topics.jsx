/* global React, Icon */

/* =========================================================
   TOPICS — referred / incoming / review (3 views, 1 component)
   ========================================================= */

const TOPICS_DATA = {
  referred: {
    eyebrow: "محالة من جهات الاختصاص",
    title: "الموضوعات المحالة إلى اللجان",
    sub: "الموضوعات التي أحيلت من مجلس الوزراء والديوان الأميري والجهات الحكومية للدراسة وإبداء الرأي.",
    primaryAction: "إحالة موضوع جديد",
    columns: [
      { id: "intake",   label: "حديث الإحالة", tone: "blue" },
      { id: "study",    label: "قيد الدراسة",  tone: "amber" },
      { id: "decision", label: "صدر فيه قرار", tone: "burg" },
    ],
    items: [
      { id: 1, col: "intake", priority: "high", from: "الديوان الأميري", to: "اللجنة المالية العليا",
        title: "مذكرة بشأن مراجعة سقف الإنفاق التشغيلي للربع الثالث ٢٠٢٦",
        ref: "م.ع/١٤٧/٢٠٢٦", date: "اليوم · ٠٨:٤٠ ص", deadline: "خلال ٧ أيام", attachments: 4 },
      { id: 2, col: "intake", priority: "med", from: "وزارة العدل", to: "لجنة الشؤون القانونية",
        title: "مشروع تعديل قانون حماية البيانات الشخصية",
        ref: "ع.ق/٠٩٢/٢٠٢٦", date: "أمس · ٢:١٠ م", deadline: "خلال ١٤ يوم", attachments: 8 },
      { id: 3, col: "study", priority: "high", from: "ديوان المحاسبة", to: "اللجنة المالية العليا",
        title: "تقرير ديوان المحاسبة السنوي — ملاحظات على الإيرادات السيادية",
        ref: "م.ح/٠٢١/٢٠٢٦", date: "قبل ٣ أيام", deadline: "متبقٍ ٤ أيام", attachments: 12, progress: 65 },
      { id: 4, col: "study", priority: "med", from: "وزارة التنمية الاجتماعية", to: "لجنة المرأة والطفل",
        title: "مقترح تعديل نظام الإجازات الوالدية بالقطاع الحكومي",
        ref: "ت.ج/٠٤٤/٢٠٢٦", date: "قبل ٥ أيام", deadline: "متبقٍ ١٠ أيام", attachments: 5, progress: 40 },
      { id: 5, col: "study", priority: "low", from: "وزارة المواصلات", to: "لجنة الإسكان والمدن",
        title: "خطة تطوير شبكة النقل العام لعام ٢٠٢٧",
        ref: "م.و/٠١٨/٢٠٢٦", date: "قبل أسبوع", deadline: "متبقٍ ٢١ يوم", attachments: 7, progress: 22 },
      { id: 6, col: "decision", priority: "med", from: "وزارة المالية", to: "اللجنة المالية العليا",
        title: "اعتماد إطار حوكمة المخاطر السيادية",
        ref: "م.ا/٠٧٧/٢٠٢٥", date: "قبل أسبوعين", outcome: "اعتماد بأغلبية ٨/٩", attachments: 3 },
      { id: 7, col: "decision", priority: "high", from: "الديوان الأميري", to: "لجنة الأمن الوطني",
        title: "تحديث بروتوكولات الاستجابة للأزمات الوطنية",
        ref: "د.أ/٠٠٢/٢٠٢٦", date: "قبل ٣ أسابيع", outcome: "اعتماد بالإجماع", attachments: 6 },
    ],
  },
  incoming: {
    eyebrow: "بريد الأمانة العامة",
    title: "الموضوعات الواردة من الوزارات والجهات",
    sub: "بريد المراسلات الرسمية الواردة بانتظار الفرز والتصنيف والإحالة إلى اللجنة المختصة.",
    primaryAction: "تسجيل وارد جديد",
    columns: [
      { id: "new",      label: "جديد — بانتظار الفرز", tone: "burg" },
      { id: "sorted",   label: "مُصنَّف",                  tone: "amber" },
      { id: "assigned", label: "أُحيل إلى لجنة",          tone: "blue" },
    ],
    items: [
      { id: 1, col: "new", priority: "high", from: "وزارة الخارجية", to: "بانتظار الفرز",
        title: "مذكرة بشأن استضافة المؤتمر الإقليمي للأمن السيبراني",
        ref: "خ.ج/١٢/٢٠٢٦", date: "قبل ٢٠ دقيقة", deadline: "بانتظار الفرز", attachments: 3 },
      { id: 2, col: "new", priority: "med", from: "وزارة الصحة", to: "بانتظار الفرز",
        title: "تقرير الاستعداد الصحي لموسم الحج",
        ref: "ص.ع/٠٦/٢٠٢٦", date: "قبل ساعتين", deadline: "بانتظار الفرز", attachments: 9 },
      { id: 3, col: "new", priority: "low", from: "هيئة الأشغال", to: "بانتظار الفرز",
        title: "مقترح تعديل مواصفات الطرق السريعة",
        ref: "ه.أ/٠١٤/٢٠٢٦", date: "قبل ٣ ساعات", deadline: "بانتظار الفرز", attachments: 5 },
      { id: 4, col: "sorted", priority: "high", from: "وزارة المالية", to: "تصنيف: مالي",
        title: "تقرير الإنفاق الفعلي مقارنة بالموازنة — الربع الثاني",
        ref: "م.ع/٠٢٢/٢٠٢٦", date: "أمس", deadline: "للإحالة خلال ٤٨ سا", attachments: 6, progress: 70 },
      { id: 5, col: "sorted", priority: "med", from: "وزارة العدل", to: "تصنيف: قانوني",
        title: "مراجعة لائحة العقوبات الإدارية",
        ref: "ع.ق/٠٤٧/٢٠٢٦", date: "قبل ٣ أيام", deadline: "للإحالة خلال ٤ أيام", attachments: 4, progress: 50 },
      { id: 6, col: "assigned", priority: "med", from: "وزارة التعليم", to: "لجنة الشؤون التعليمية",
        title: "خطة تطوير المناهج الوطنية ٢٠٢٦–٢٠٣٠",
        ref: "ت.ع/٠٣٣/٢٠٢٦", date: "قبل ٤ أيام", outcome: "أُحيل في ٧ مايو", attachments: 11 },
      { id: 7, col: "assigned", priority: "low", from: "وزارة البيئة", to: "لجنة التنمية المستدامة",
        title: "تقرير جودة الهواء السنوي ٢٠٢٥",
        ref: "ب.ج/٠١٩/٢٠٢٦", date: "قبل أسبوع", outcome: "أُحيل في ٣ مايو", attachments: 2 },
    ],
  },
  review: {
    eyebrow: "مراجعة فنية وقانونية",
    title: "الموضوعات قيد المراجعة قبل العرض",
    sub: "مرحلة الفحص الفني والقانوني والإجرائي قبل إدراج الموضوعات في جداول أعمال اللجان.",
    primaryAction: "بدء مراجعة جديدة",
    columns: [
      { id: "legal",    label: "مراجعة قانونية",     tone: "blue" },
      { id: "tech",     label: "مراجعة فنية",         tone: "amber" },
      { id: "approved", label: "جاهز للإدراج",        tone: "green" },
    ],
    items: [
      { id: 1, col: "legal", priority: "high", from: "اللجنة المالية العليا", to: "مكتب المستشار القانوني",
        title: "مراجعة قانونية لمقترح تعديل اللائحة المالية الموحدة",
        ref: "ق.ر/٠٤٤/٢٠٢٦", date: "قبل يومين", deadline: "متبقٍ ٢٤ سا", attachments: 7, progress: 80 },
      { id: 2, col: "legal", priority: "med", from: "لجنة الإسكان والمدن", to: "مكتب المستشار القانوني",
        title: "مراجعة عقد الشراكة لمشروع الإسكان الوطني",
        ref: "ق.ر/٠٥١/٢٠٢٦", date: "قبل ٣ أيام", deadline: "متبقٍ ٤ أيام", attachments: 5, progress: 45 },
      { id: 3, col: "tech", priority: "high", from: "لجنة التحول الرقمي", to: "اللجنة الفنية",
        title: "تقييم فني لمنصة الذكاء الاصطناعي للقطاع الحكومي",
        ref: "ف.ر/٠٢٣/٢٠٢٦", date: "قبل ٤ أيام", deadline: "متبقٍ يومان", attachments: 14, progress: 65 },
      { id: 4, col: "tech", priority: "med", from: "لجنة الأمن الوطني", to: "اللجنة الفنية",
        title: "تقييم بنية تحتية لشبكة الاتصالات السرية",
        ref: "ف.ر/٠٠٩/٢٠٢٦", date: "قبل أسبوع", deadline: "متبقٍ ٧ أيام", attachments: 9, progress: 30 },
      { id: 5, col: "approved", priority: "high", from: "اللجنة المالية العليا", to: "جاهز",
        title: "اعتماد سقف الإنفاق التشغيلي للربع الثاني",
        ref: "ج.ع/١٤٧/٢٠٢٦", date: "اليوم", outcome: "✓ مُجاز للعرض", attachments: 4 },
      { id: 6, col: "approved", priority: "med", from: "لجنة المرأة والطفل", to: "جاهز",
        title: "نظام الإجازات الوالدية الجديد",
        ref: "ج.ع/٠٤٤/٢٠٢٦", date: "أمس", outcome: "✓ مُجاز للعرض", attachments: 3 },
      { id: 7, col: "approved", priority: "low", from: "لجنة التنمية المستدامة", to: "جاهز",
        title: "خطة استبدال أساطيل المركبات الحكومية",
        ref: "ج.ع/٠١٢/٢٠٢٦", date: "قبل يومين", outcome: "✓ مُجاز للعرض", attachments: 5 },
    ],
  },
};

function PriorityDot({ p }) {
  const map = { high: "var(--c-burgundy)", med: "var(--c-amber)", low: "var(--c-ink-4)" };
  const label = { high: "أولوية عالية", med: "متوسطة", low: "روتيني" };
  return <span className="tp-prio" title={label[p]}><span className="dot" style={{ background: map[p] }}/> {label[p]}</span>;
}

function TopicCard({ item, columns }) {
  const isDone = item.col === "decision" || item.col === "assigned" || item.col === "approved";
  return (
    <article className={`tp-card ${item.priority === "high" ? "is-high" : ""}`}>
      <div className="tp-card-head">
        <span className="eyebrow">{item.ref}</span>
        <PriorityDot p={item.priority}/>
      </div>
      <h4 className="tp-card-title">{item.title}</h4>
      <div className="tp-card-route">
        <div className="tp-route-from">
          <span className="tp-route-label">من</span>
          <span>{item.from}</span>
        </div>
        <Icon.ChevronStart width="14" height="14"/>
        <div className="tp-route-to">
          <span className="tp-route-label">إلى</span>
          <span>{item.to}</span>
        </div>
      </div>

      {item.progress !== undefined && (
        <div className="tp-progress">
          <div className="tp-progress-track">
            <div className="tp-progress-fill" style={{ width: `${item.progress}%` }}/>
          </div>
          <span className="num">{item.progress}%</span>
        </div>
      )}

      {item.outcome && (
        <div className={`tp-outcome ${isDone ? "is-done" : ""}`}>
          <Icon.Check width="13" height="13"/> {item.outcome}
        </div>
      )}

      <div className="tp-card-foot">
        <span><Icon.Clock width="12" height="12"/> {item.date}</span>
        {item.deadline && <span className="tp-deadline">{item.deadline}</span>}
        <span className="tp-attach"><Icon.Documents width="12" height="12"/> {item.attachments}</span>
      </div>
    </article>
  );
}

function TopicsColumn({ col, items }) {
  return (
    <section className={`tp-col tp-col-${col.tone}`}>
      <header className="tp-col-head">
        <div>
          <span className="tp-col-label">{col.label}</span>
          <span className="tp-col-count num">{items.length}</span>
        </div>
        <button className="iconbtn iconbtn-sm"><Icon.More width="14" height="14"/></button>
      </header>
      <div className="tp-col-body">
        {items.map(it => <TopicCard key={it.id} item={it}/>)}
        <button className="tp-add-btn">
          <Icon.Plus width="13" height="13"/> إضافة موضوع
        </button>
      </div>
    </section>
  );
}

function Topics({ view = "referred" }) {
  const data = TOPICS_DATA[view];
  const [search, setSearch] = React.useState("");

  const filtered = data.items.filter(it =>
    !search || it.title.includes(search) || it.ref.includes(search) || it.from.includes(search)
  );

  const total = data.items.length;
  const high = data.items.filter(i => i.priority === "high").length;
  const overdue = data.items.filter(i => i.deadline && (i.deadline.includes("سا") || i.deadline.includes("متبقٍ ٤ أيام") || i.deadline.includes("متبقٍ ٢٤"))).length;

  return (
    <>
      <div className="crumbs">
        <a>الرئيسية</a>
        <span className="sep">›</span>
        <span className="here">{data.title}</span>
      </div>

      {/* Banner */}
      <div className="tp-banner">
        <div className="tp-banner-left">
          <span className="eyebrow eyebrow-secondary">{data.eyebrow}</span>
          <h2 className="tp-banner-title">{data.title}</h2>
          <p className="tp-banner-sub">{data.sub}</p>
        </div>
        <div className="tp-banner-stats">
          <div><div className="tp-stat-num num">{total}</div><span>إجمالي</span></div>
          <div className="sep"/>
          <div><div className="tp-stat-num num" style={{ color: "var(--c-burgundy)" }}>{high}</div><span>أولوية عالية</span></div>
          <div className="sep"/>
          <div><div className="tp-stat-num num" style={{ color: "var(--c-amber)" }}>{overdue}</div><span>قارب الانتهاء</span></div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="tp-toolbar">
        <div className="tp-search">
          <Icon.Search width="14" height="14"/>
          <input placeholder="ابحث بالعنوان أو الرقم المرجعي أو الجهة…"
            value={search} onChange={e => setSearch(e.target.value)}/>
        </div>
        <div className="tp-filters">
          <button className="filter-chip"><Icon.Filter width="13" height="13"/> الجهة المُرسِلة</button>
          <button className="filter-chip"><Icon.Calendar width="13" height="13"/> الفترة</button>
          <button className="filter-chip"><Icon.Warning width="13" height="13"/> الأولوية</button>
        </div>
        <button className="btn btn-primary btn-sm">
          <Icon.Plus width="13" height="13"/> {data.primaryAction}
        </button>
      </div>

      {/* Kanban-style columns */}
      <div className="tp-board">
        {data.columns.map(c => (
          <TopicsColumn key={c.id} col={c}
            items={filtered.filter(i => i.col === c.id)}/>
        ))}
      </div>
    </>
  );
}

window.Topics = Topics;
