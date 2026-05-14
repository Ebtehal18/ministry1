/* global React, Icon */

/* =========================================================
   RECOMMENDATION DETAILS — single recommendation profile
   Flat surfaces · no gradients
   ========================================================= */

const { useState: useStateRD } = React;

function RecommendationDetails() {
  const [tab, setTab] = useStateRD("overview");

  // Demo data: the urgent, delayed Digital Identity recommendation
  const rec = {
    num: "2026/14/01",
    title: "إنشاء الهوية الرقمية الموحدة لموظفي القطاع الحكومي",
    status: "delayed",             // new | progress | review | done | delayed
    priority: "urgent",            // urgent | high | normal
    progress: 88,
    issued: { d: "12", m: "فبراير 2026", w: "الأربعاء" },
    due:    { d: "15", m: "أبريل 2026", w: "تأخّر ٢٥ يوماً" },
    daysOverdue: 25,
    committee: "لجنة التحول الرقمي",
    committeeMark: "ت.ر",
    source: { meeting: "اجتماع رقم (٠٨) — مراجعة استراتيجية الهوية الرقمية", date: "10 فبراير 2026", decision: "ق-٢٦/٠٤" },
    body:
      "اعتماد منظومة موحّدة للهوية الرقمية لجميع موظفي القطاع الحكومي بحيث تربط بطاقة الموظف الإلكترونية بمنظومات الحضور، الخدمات الإلكترونية، والتوقيع الرقمي المعتمد. تشمل الهوية مفاتيح تشفير لاتمركزية ومصادقة بيومترية، وتُربط بسجل النفاذ الموحّد للأمانة العامة.",
    rationale:
      "تقليل الكلفة التشغيلية لأكثر من ١٤ منظومة مصادقة متفرقة، رفع مستوى الأمان السيبراني، وتوحيد تجربة الموظف الحكومي عبر الجهات.",
    impact: [
      { label: "موظفون مستهدفون", val: "٤٢٬٠٠٠" },
      { label: "جهات حكومية",     val: "٢٨" },
      { label: "وفر متوقع سنوياً", val: "١٨ مليون ر.ق" },
      { label: "أنظمة مدمجة",     val: "١٤" },
    ],
    owner: {
      name: "م. علياء بنت محمد العمادي",
      role: "رئيس قسم الهوية الرقمية",
      org: "وزارة الاتصالات وتقنية المعلومات",
      initials: "ع.ع",
      phone: "+974 4406 ••••",
      email: "a.alemadi@mcit.gov.qa",
    },
  };

  const milestones = [
    { d: "20 فبراير", title: "اعتماد المواصفات الفنية والبنية المرجعية", status: "done", owner: "اللجنة الفنية" },
    { d: "08 مارس",   title: "اختيار مزوّد منظومة المصادقة وإبرام العقد", status: "done", owner: "إدارة المشتريات" },
    { d: "22 مارس",   title: "تنفيذ المرحلة التجريبية في ثلاث جهات", status: "done", owner: "وزارة الداخلية + الصحة + المالية" },
    { d: "05 أبريل",  title: "إصدار البطاقات الرقمية للدفعة الأولى (٥٬٠٠٠ موظف)", status: "done", owner: "م. علياء العمادي" },
    { d: "15 أبريل",  title: "ربط المنظومة بنظام الحضور المركزي", status: "blocked", owner: "وحدة التكامل التقني", note: "تأخر بسبب اشتراط مراجعة أمنية إضافية من اللجنة الفنية للأمن السيبراني" },
    { d: "30 أبريل",  title: "التعميم على جميع الجهات الحكومية", status: "pending", owner: "الأمانة العامة" },
    { d: "15 مايو",   title: "الإغلاق وتقديم تقرير الإنجاز النهائي", status: "pending", owner: "م. علياء العمادي" },
  ];

  const updates = [
    { d: "أمس ١٧:٠٤", actor: "م. علياء العمادي", action: "أضافت تحديثاً", body: "أنهت اللجنة الفنية للأمن السيبراني المراجعة الأمنية، ومن المتوقع رفع المعلّق غداً. المنظومة جاهزة من الناحية التقنية." },
    { d: "٠٩ مايو ١١:٢٠", actor: "م. سارة العذبة", action: "أضافت تعليقاً", body: "تم تأكيد جاهزية بيئة الاختبار الموازية. يُرجى تحديد موعد التشغيل الفعلي." },
    { d: "٠٥ مايو ٠٩:٤٠", actor: "النظام", action: "رفع تقرير المخاطر", body: "تجاوز الموعد النهائي بـ٢٠ يوماً — تم رفع التنبيه إلى رئيس اللجنة." },
    { d: "٢٨ أبريل",    actor: "اللواء عبدالله السويدي", action: "علّق على التقدّم", body: "أتفهّم تأخر المراجعة الأمنية، لكن أوصي بتسريع التنسيق مع وزارة الداخلية." },
    { d: "١٥ أبريل",    actor: "م. علياء العمادي", action: "حدّثت الحالة إلى «متأخرة»", body: "اشتراط مراجعة أمنية إضافية أثّر على الجدول الزمني الأصلي." },
    { d: "٠٥ أبريل",    actor: "م. علياء العمادي", action: "أنجزت المرحلة الرابعة", body: "تم إصدار البطاقات الرقمية للدفعة الأولى — ٥٬٠٠٠ موظف." },
  ];

  const dependencies = {
    blocks: [
      { num: "2026/14/05", title: "اعتماد نظام التوقيع الرقمي للوزارات", status: "new" },
      { num: "2026/14/07", title: "ربط منصة الخدمات الحكومية بالهوية الموحدة", status: "new" },
    ],
    blockedBy: [
      { num: "2026/13/22", title: "اعتماد سياسة الأمن السيبراني للهوية الموحدة", status: "review" },
    ],
  };

  const docs = [
    { name: "ملف المتطلبات الفنية — الإصدار النهائي", type: "PDF", size: "12.4 ميغابايت", pages: 86, tag: "مرجع" },
    { name: "عقد مزوّد منظومة المصادقة",                type: "PDF", size: "4.1 ميغابايت", pages: 42, tag: "تعاقد" },
    { name: "تقرير المرحلة التجريبية — ٣ جهات",         type: "PDF", size: "6.8 ميغابايت", pages: 54, tag: "نتائج" },
    { name: "ملاحظات المراجعة الأمنية",                 type: "DOC", size: "320 كيلوبايت", pages: 8,  tag: "حالي" },
  ];

  const stakeholders = [
    { name: "م. علياء العمادي", role: "صاحبة التوصية", initials: "ع.ع", tone: "tone-blue", isOwner: true },
    { name: "وزارة الاتصالات وتقنية المعلومات", role: "الجهة المنفّذة الرئيسية", initials: "ا.ت", org: true },
    { name: "وزارة الداخلية", role: "جهة شريكة", initials: "د.خ", org: true },
    { name: "ديوان الموظفين", role: "جهة شريكة", initials: "د.م", org: true },
    { name: "اللجنة الفنية للأمن السيبراني", role: "مراجعة الامتثال", initials: "أ.س", org: true },
  ];

  const sTab = (id, label, n) => (
    <a className={`tab ${tab === id ? "is-active" : ""}`} onClick={() => setTab(id)}>
      {label}{n != null && <span className="rd-tab-n num">{n}</span>}
    </a>
  );

  const statusMap = {
    new:      { cls: "rd-status-new",      txt: "جديدة" },
    progress: { cls: "rd-status-progress", txt: "قيد التنفيذ" },
    review:   { cls: "rd-status-review",   txt: "بانتظار المراجعة" },
    done:     { cls: "rd-status-done",     txt: "منجزة" },
    delayed:  { cls: "rd-status-delayed",  txt: "متأخرة" },
  };
  const priorityMap = {
    urgent: { cls: "rd-pri-urgent", txt: "عاجل" },
    high:   { cls: "rd-pri-high",   txt: "أولوية عالية" },
    normal: { cls: "rd-pri-normal", txt: "أولوية عادية" },
  };

  return (
    <>
      <div className="crumbs">
        <a data-back="recommendations"><Icon.ChevronStart width="14" height="14" style={{transform:"scaleX(-1)"}}/> رجوع</a>
        <span className="sep"/>
        <a data-nav="dashboard">الرئيسية</a><span className="sep">›</span>
        <a data-nav="recommendations">القرارات والتوصيات</a><span className="sep">›</span>
        <span className="here num">{rec.num}</span>
      </div>

      {/* ============== HERO ============== */}
      <section className="rd-hero">
        <div className="rd-hero-stripe" aria-hidden="true"/>
        <div className="rd-hero-top">
          <div className="rd-hero-tags">
            <span className="rd-ref num">رقم التوصية · {rec.num}</span>
            <span className={`rd-status ${statusMap[rec.status].cls}`}>
              <span className="rd-status-dot"/> {statusMap[rec.status].txt}
            </span>
            <span className={`rd-pri ${priorityMap[rec.priority].cls}`}>{priorityMap[rec.priority].txt}</span>
          </div>
          <div className="rd-hero-actions">
            <button className="btn btn-soft btn-sm"><Icon.Download width="14" height="14"/> تصدير الملف</button>
            <button className="btn btn-secondary btn-sm">رفع تحديث</button>
            <button className="btn btn-primary"><Icon.Check width="14" height="14"/> اعتماد الإنجاز</button>
          </div>
        </div>

        <h1 className="rd-hero-title">{rec.title}</h1>

        <div className="rd-hero-source">
          <span className="rd-src-label">مصدر التوصية</span>
          <a className="rd-src-link">
            <span className="rd-cmark">{rec.committeeMark}</span>
            <span className="rd-src-info">
              <span className="rd-src-cmte">{rec.committee}</span>
              <span className="rd-src-mtg">{rec.source.meeting} · {rec.source.date}</span>
            </span>
          </a>
          <span className="rd-src-decision num">القرار {rec.source.decision}</span>
        </div>

        {/* progress strip */}
        <div className="rd-progress-strip">
          <div className="rd-prog-row">
            <div className="rd-prog-info">
              <span className="rd-prog-label">نسبة الإنجاز</span>
              <span className="rd-prog-num"><b className="num">{rec.progress}</b><i>%</i></span>
            </div>
            <div className="rd-prog-bar">
              <span className="rd-prog-fill" style={{ width: `${rec.progress}%` }}/>
              <span className="rd-prog-target" style={{ left: "100%" }}>المستهدف</span>
            </div>
          </div>
          <div className="rd-prog-meta">
            <div className="rd-pm-cell">
              <span className="rd-pm-lbl"><Icon.Calendar width="13" height="13"/> الموعد النهائي</span>
              <span className="rd-pm-val"><b className="num">{rec.due.d}</b> {rec.due.m}</span>
              <span className="rd-pm-delta rd-pm-delta-danger">{rec.due.w}</span>
            </div>
            <div className="rd-pm-cell">
              <span className="rd-pm-lbl"><Icon.User width="13" height="13"/> المسؤول</span>
              <span className="rd-pm-val">{rec.owner.name}</span>
              <span className="rd-pm-delta-muted">{rec.owner.role}</span>
            </div>
            <div className="rd-pm-cell">
              <span className="rd-pm-lbl"><Icon.Tasks width="13" height="13"/> المراحل</span>
              <span className="rd-pm-val num">4 / 7</span>
              <span className="rd-pm-delta-muted">٤ منجزة · ١ معلّق · ٢ معلّقة</span>
            </div>
            <div className="rd-pm-cell">
              <span className="rd-pm-lbl"><Icon.Warning width="13" height="13"/> آخر تحديث</span>
              <span className="rd-pm-val">أمس ١٧:٠٤</span>
              <span className="rd-pm-delta-muted">من قِبَل {rec.owner.name.split(" ").slice(-1)[0]}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============== TABS ============== */}
      <div className="rd-tabs tabs">
        {sTab("overview",     "نظرة عامة")}
        {sTab("plan",         "خطة التنفيذ", milestones.length)}
        {sTab("updates",      "سجل التحديثات", updates.length)}
        {sTab("dependencies", "الترابط",     dependencies.blocks.length + dependencies.blockedBy.length)}
        {sTab("stakeholders", "الأطراف",     stakeholders.length)}
      </div>

      {/* ============== MAIN GRID ============== */}
      <div className="rd-grid">
        <div className="rd-main">

          {tab === "overview" && (
            <>
              <section className="card">
                <header className="card-head">
                  <div>
                    <span className="eyebrow">وصف التوصية</span>
                    <h3 className="card-title-sm">ما تنصّ عليه</h3>
                  </div>
                </header>
                <p className="rd-body">{rec.body}</p>

                <div className="rd-section-sep"/>

                <header className="card-head">
                  <div>
                    <span className="eyebrow">المبرّر</span>
                    <h3 className="card-title-sm">دواعي الإصدار</h3>
                  </div>
                </header>
                <p className="rd-body">{rec.rationale}</p>
              </section>

              <section className="card">
                <header className="card-head">
                  <div>
                    <span className="eyebrow">الأثر المتوقع</span>
                    <h3 className="card-title-sm">المؤشرات المستهدفة</h3>
                  </div>
                </header>
                <div className="rd-impact-grid">
                  {rec.impact.map((it, i) => (
                    <div key={i} className="rd-impact">
                      <div className="rd-impact-val num">{it.val}</div>
                      <div className="rd-impact-lbl">{it.label}</div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="card rd-blocker">
                <div className="rd-blocker-head">
                  <span className="rd-blocker-icon"><Icon.Warning width="18" height="18"/></span>
                  <div>
                    <span className="eyebrow rd-blocker-eyebrow">معلّق نشط</span>
                    <h3 className="card-title-sm">سبب التأخّر</h3>
                  </div>
                </div>
                <p className="rd-body" style={{ marginTop: 10 }}>
                  اشتراط مراجعة أمنية إضافية من اللجنة الفنية للأمن السيبراني قبل الربط مع نظام الحضور المركزي. تمّت المراجعة بنجاح وفق آخر تحديث، ومن المتوقع رفع التعليق خلال ٤٨ ساعة.
                </p>
                <div className="rd-blocker-foot">
                  <span className="rd-blocker-meta">مرفوع منذ <b className="num">٢٥</b> يوماً · بانتظار رفع التعليق</span>
                  <button className="btn btn-sm btn-burg-secondary">طلب تصعيد</button>
                </div>
              </section>
            </>
          )}

          {tab === "plan" && (
            <section className="card">
              <header className="card-head">
                <div>
                  <span className="eyebrow">خطة التنفيذ</span>
                  <h3 className="card-title-sm">{milestones.length} مراحل · ٤ منجزة من ٧</h3>
                </div>
                <div className="rd-plan-legend">
                  <span><span className="rd-ms-dot rd-ms-done"/> منجز</span>
                  <span><span className="rd-ms-dot rd-ms-blocked"/> معلّق</span>
                  <span><span className="rd-ms-dot rd-ms-pending"/> قادم</span>
                </div>
              </header>
              <ol className="rd-milestones">
                {milestones.map((m, i) => (
                  <li key={i} className={`rd-ms rd-ms-${m.status}`}>
                    <div className="rd-ms-marker">
                      <span className="rd-ms-dot"/>
                      {i < milestones.length - 1 && <span className="rd-ms-line"/>}
                    </div>
                    <div className="rd-ms-body">
                      <div className="rd-ms-head">
                        <span className="rd-ms-date num">{m.d}</span>
                        <span className={`rd-ms-pill rd-ms-pill-${m.status}`}>
                          {m.status === "done" && <><Icon.Check width="11" height="11"/> منجز</>}
                          {m.status === "blocked" && <><Icon.Warning width="11" height="11"/> معلّق</>}
                          {m.status === "pending" && "قادم"}
                        </span>
                      </div>
                      <div className="rd-ms-title">{m.title}</div>
                      <div className="rd-ms-owner"><Icon.User width="12" height="12"/> {m.owner}</div>
                      {m.note && <div className="rd-ms-note">{m.note}</div>}
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {tab === "updates" && (
            <section className="card">
              <header className="card-head">
                <div>
                  <span className="eyebrow">سجل التحديثات</span>
                  <h3 className="card-title-sm">{updates.length} حدث · حتى الآن</h3>
                </div>
                <button className="btn btn-soft btn-sm"><Icon.Plus width="13" height="13"/> إضافة تحديث</button>
              </header>
              <ul className="rd-updates">
                {updates.map((u, i) => (
                  <li key={i} className="rd-update">
                    <span className="rd-update-dot"/>
                    <div className="rd-update-body">
                      <div className="rd-update-head">
                        <span className="rd-update-actor">{u.actor}</span>
                        <span className="rd-update-action">{u.action}</span>
                        <span className="rd-update-time">{u.d}</span>
                      </div>
                      <div className="rd-update-text">{u.body}</div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="rd-update-compose">
                <span className="avatar-sm tone-blue" style={{ width: 36, height: 36, fontSize: 12 }}>أ.ع</span>
                <input className="input rd-update-input" placeholder="اكتب تحديثاً أو تعليقاً..."/>
                <button className="btn btn-primary btn-sm">نشر</button>
              </div>
            </section>
          )}

          {tab === "dependencies" && (
            <>
              <section className="card">
                <header className="card-head">
                  <div>
                    <span className="eyebrow">يعتمد على هذه التوصية</span>
                    <h3 className="card-title-sm">توصيات أخرى تتأثر بإنجاز هذه التوصية</h3>
                  </div>
                </header>
                <DependencyList items={dependencies.blocks} direction="blocks"/>
              </section>
              <section className="card">
                <header className="card-head">
                  <div>
                    <span className="eyebrow">معتمدة على</span>
                    <h3 className="card-title-sm">توصيات يجب إنجازها أولاً</h3>
                  </div>
                </header>
                <DependencyList items={dependencies.blockedBy} direction="blockedBy"/>
              </section>
            </>
          )}

          {tab === "stakeholders" && (
            <section className="card">
              <header className="card-head">
                <div>
                  <span className="eyebrow">الأطراف المعنية</span>
                  <h3 className="card-title-sm">{stakeholders.length} طرف</h3>
                </div>
              </header>
              <ul className="rd-stake">
                {stakeholders.map((s, i) => (
                  <li key={i} className={s.isOwner ? "is-owner" : ""}>
                    <span className={`avatar-sm ${s.tone || ""}`} style={{ width: 44, height: 44, fontSize: 13, borderRadius: s.org ? "var(--r-sm)" : "50%" }}>{s.initials}</span>
                    <div>
                      <div className="rd-stake-name">{s.name}</div>
                      <div className="rd-stake-role">{s.role}</div>
                    </div>
                    {s.isOwner && <span className="pill pill-blue">المسؤول الرئيسي</span>}
                  </li>
                ))}
              </ul>
            </section>
          )}

        </div>

        {/* ============== SIDE ============== */}
        <aside className="rd-side">
          {/* Owner card */}
          <div className="card rd-side-owner">
            <span className="eyebrow">المسؤول عن التنفيذ</span>
            <div className="rd-owner-row">
              <span className="avatar-sm tone-blue" style={{ width: 56, height: 56, fontSize: 17 }}>{rec.owner.initials}</span>
              <div>
                <div className="rd-owner-name">{rec.owner.name}</div>
                <div className="rd-owner-role">{rec.owner.role}</div>
                <div className="rd-owner-org">{rec.owner.org}</div>
              </div>
            </div>
            <div className="rd-owner-contact">
              <div><span>الهاتف</span><span className="num">{rec.owner.phone}</span></div>
              <div><span>البريد</span><span className="rd-owner-email">{rec.owner.email}</span></div>
            </div>
            <div className="rd-owner-actions">
              <button className="btn btn-soft btn-sm btn-block">إرسال رسالة</button>
              <button className="btn btn-secondary btn-sm btn-block">طلب تحديث</button>
            </div>
          </div>

          {/* Source */}
          <div className="card">
            <span className="eyebrow">مصدر القرار</span>
            <h4 className="card-title-sm" style={{ marginTop: 6 }}>{rec.source.meeting}</h4>
            <ul className="rd-source-list">
              <li><span>اللجنة</span><b>{rec.committee}</b></li>
              <li><span>تاريخ الإصدار</span><b className="num">{rec.issued.d} {rec.issued.m}</b></li>
              <li><span>رقم القرار</span><b className="num">{rec.source.decision}</b></li>
              <li><span>نوع القرار</span><b>قرار تنفيذي</b></li>
            </ul>
            <button className="btn btn-soft btn-sm btn-block" style={{ marginTop: 12 }}>
              <Icon.Documents width="13" height="13"/> فتح محضر الاجتماع
            </button>
          </div>

          {/* Documents */}
          <div className="card">
            <header className="side-head">
              <span className="eyebrow">المرفقات</span>
              <span className="side-count num">{docs.length}</span>
            </header>
            <ul className="doc-list" style={{ marginTop: 10 }}>
              {docs.map((d, i) => (
                <li key={i}>
                  <div className={`doc-icon doc-${d.type.toLowerCase() === "pdf" ? "pdf" : "doc"}`}>{d.type}</div>
                  <div className="doc-body">
                    <div className="doc-name">{d.name}</div>
                    <div className="doc-meta"><span className="num">{d.size}</span> · <span className="num">{d.pages} صفحة</span> · {d.tag}</div>
                  </div>
                  <button className="iconbtn iconbtn-sm"><Icon.Download width="14" height="14"/></button>
                </li>
              ))}
            </ul>
          </div>

          {/* Risk indicator */}
          <div className="card rd-risk">
            <span className="eyebrow">مؤشر المخاطر</span>
            <div className="rd-risk-row">
              <span className="rd-risk-num num">3.6</span>
              <span className="rd-risk-of">/ 5</span>
              <span className="rd-risk-pill">مرتفع</span>
            </div>
            <div className="rd-risk-bar">
              <span style={{ width: "72%" }}/>
            </div>
            <ul className="rd-risk-list">
              <li><Icon.Warning width="12" height="12"/> تجاوز الموعد النهائي</li>
              <li><Icon.Warning width="12" height="12"/> ٢ توصيات أخرى مرتبطة</li>
              <li><Icon.Clock width="12" height="12"/> ٤٢٬٠٠٠ موظف بانتظار التطبيق</li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}

/* ---------- DEPENDENCY LIST ---------- */
function DependencyList({ items, direction }) {
  const arrow = direction === "blocks" ? "→" : "←";
  return (
    <ul className="rd-deps">
      {items.map((d, i) => (
        <li key={i}>
          <span className="rd-deps-arrow">{arrow}</span>
          <span className="rd-deps-num num">{d.num}</span>
          <span className="rd-deps-title">{d.title}</span>
          <span className={`pill ${d.status === "new" ? "pill-blue" : d.status === "review" ? "pill-burg" : "pill-gray"}`}>
            {d.status === "new" ? "جديدة" : d.status === "review" ? "بانتظار المراجعة" : "—"}
          </span>
        </li>
      ))}
    </ul>
  );
}

window.RecommendationDetails = RecommendationDetails;
