/* global React, Icon */

/* =========================================================
   COMMITTEE DETAIL — full committee profile
   Flat surfaces · functional tabs · no gradients
   ========================================================= */

const { useState: useStateCD } = React;

function CommitteeDetail() {
  const [tab, setTab] = useStateCD("overview");

  const committee = {
    mark: "م",
    markTone: "burg",
    name: "اللجنة المالية العليا",
    type: "لجنة دائمة",
    typeTone: "gold",
    status: "active",
    formation: { decree: "مرسوم أميري رقم ٢٢ لسنة ٢٠٢٢", date: "14 مارس 2022" },
    summary:
      "تختص بمراجعة السياسات المالية للدولة، ومراقبة تنفيذ الموازنة العامة، وإقرار التقارير الدورية المرفوعة لمجلس الوزراء. تجتمع اللجنة بشكل منتظم كل أسبوعين، ويُعقد اجتماع طارئ عند الضرورة بقرار من رئيسها.",
    chair: { name: "معالي/ خالد بن خليفة آل ثاني", role: "رئيس اللجنة", title: "وزير المالية", initials: "خ.خ", tenure: "٤ سنوات" },
    secretary: { name: "سعادة/ راشد المري", role: "أمين السر", initials: "ر.م" },
    quorum: "ثلثا الأعضاء",
    nextMeeting: { d: "12", m: "مايو 2026", w: "الثلاثاء · ١٠:٠٠", title: "جلسة الربع الثاني — مراجعة الأداء المالي", loc: "قاعة الوزراء — الدور الثالث" },
  };

  const kpis = [
    { label: "الأعضاء",            val: "12",  sub: "٤ معالي · ٧ سعادة · ١ أمين",       icon: "Members", tone: "blue" },
    { label: "اجتماعات 2026",       val: "34",  sub: "٣ اجتماعات هذا الشهر",             icon: "Meetings", tone: "burg" },
    { label: "القرارات المعتمدة",   val: "247", sub: "٤٢ قرار خلال 2026",               icon: "Decisions", tone: "gold" },
    { label: "متوسط الحضور",        val: "91%", sub: "أعلى من المستهدف (٨٥٪)",         icon: "Quorum",   tone: "green" },
    { label: "معدل تنفيذ القرارات",  val: "87%", sub: "ضمن المهلة المحددة",              icon: "Tasks",    tone: "blue" },
  ];

  const members = [
    { name: "معالي/ خالد بن خليفة آل ثاني", role: "رئيس اللجنة", title: "وزير المالية", attendance: 96, decisions: 247, status: "online" },
    { name: "معالي/ محمد بن عبدالله السادة", role: "نائب الرئيس", title: "وزير المواصلات", attendance: 92, decisions: 198, status: "online" },
    { name: "معالي/ فهد بن جاسم آل ثاني",     role: "عضو",         title: "وزير العدل", attendance: 88, decisions: 173, status: "offline" },
    { name: "سعادة/ نورة الكواري",            role: "عضو",         title: "أمين عام مساعد · الشؤون المالية", attendance: 100, decisions: 247, status: "online" },
    { name: "سعادة/ عبدالعزيز السبيعي",      role: "عضو",         title: "محافظ المصرف المركزي", attendance: 84, decisions: 156, status: "busy" },
    { name: "سعادة/ محمد العمادي",            role: "عضو",         title: "رئيس ديوان المحاسبة", attendance: 90, decisions: 184, status: "online" },
    { name: "سعادة/ علي بن سعيد المحمود",     role: "عضو",         title: "مدير عام الموازنة العامة", attendance: 89, decisions: 167, status: "offline" },
    { name: "سعادة/ راشد المري",              role: "أمين السر",   title: "مدير الشؤون الإدارية", attendance: 100, decisions: 247, status: "online" },
  ];

  const decisions = [
    { num: "٢٠٢٦/١٤٧", title: "اعتماد تعديلات اللائحة المالية للوزارات والهيئات الحكومية", date: "اليوم", status: "approved", meeting: "اجتماع رقم ٣٤" },
    { num: "٢٠٢٦/١٤٢", title: "مراجعة آلية التعاقد على المشاريع الإنشائية الكبرى",      date: "أمس",   status: "rejected", meeting: "اجتماع رقم ٣٣" },
    { num: "٢٠٢٦/١٣٨", title: "إقرار البرنامج التحفيزي للقطاع الخاص للربع الثاني",       date: "منذ ٣ أيام", status: "approved", meeting: "اجتماع رقم ٣٢" },
    { num: "٢٠٢٦/١٣٤", title: "تأجيل البت في توسعة الميزانية التشغيلية لقطاع الصحة",   date: "منذ أسبوع", status: "deferred", meeting: "اجتماع رقم ٣١" },
    { num: "٢٠٢٦/١٢٩", title: "اعتماد سياسة إدارة المخاطر المالية للجهات السيادية",     date: "٢٢ أبريل", status: "approved", meeting: "اجتماع رقم ٣٠" },
  ];

  const recommendations = [
    { num: "2026/14/02", title: "تحديث منظومة المدفوعات الحكومية وربطها بالخزانة العامة", progress: 45, status: "progress", owner: "م. محمد العنزي" },
    { num: "2026/13/12", title: "اعتماد إطار حوكمة المخاطر المالية للمؤسسات السيادية",   progress: 100, status: "done", owner: "د. خالد الخليفي" },
    { num: "2026/13/04", title: "مراجعة معايير منح الإعفاءات الضريبية للقطاعات الناشئة",  progress: 60, status: "progress", owner: "د. فاطمة العمادي" },
    { num: "2026/12/18", title: "تطوير منظومة الإفصاح المالي للجهات الحكومية",            progress: 30, status: "delayed", owner: "م. أحمد الكواري" },
  ];

  const meetings = [
    { d: "12", m: "مايو", w: "الثلاثاء", time: "10:00", title: "جلسة الربع الثاني — مراجعة الأداء المالي", status: "live", items: 7 },
    { d: "25", m: "مايو", w: "الإثنين",  time: "09:30", title: "مراجعة مذكرة وزارة المالية حول الموازنة",   status: "upcoming", items: 5 },
    { d: "11", m: "مايو", w: "الأحد",    time: "10:30", title: "اعتماد تعديلات اللائحة المالية",            status: "closed", items: 8 },
    { d: "27", m: "أبريل", w: "الإثنين", time: "11:00", title: "مراجعة تقرير ديوان المحاسبة Q1",              status: "closed", items: 6 },
    { d: "13", m: "أبريل", w: "الإثنين", time: "10:00", title: "إقرار خطة الاستجابة المالية لطوارئ المناخ",    status: "closed", items: 9 },
  ];

  const mandate = [
    "مراجعة الموازنة العامة للدولة قبل رفعها لمجلس الوزراء",
    "اعتماد التقارير الدورية لديوان المحاسبة والاستجابة لها",
    "دراسة المقترحات المتعلقة بالسياسة المالية والنقدية",
    "مراقبة التزام الجهات الحكومية بالأنظمة واللوائح المالية",
    "رفع التوصيات لمجلس الوزراء حول المشاريع الاستراتيجية",
    "اعتماد سياسات إدارة الدين العام والاحتياطيات السيادية",
    "النظر في الإعفاءات الضريبية والجمركية ذات الأثر الكبير",
  ];

  const docs = [
    { name: "ميثاق اللجنة المالية العليا — النسخة المحدّثة",  type: "PDF", size: "2.4 ميغابايت", date: "مارس 2026", tag: "ميثاق" },
    { name: "اللائحة الداخلية لإجراءات التصويت",                type: "DOC", size: "720 كيلوبايت", date: "فبراير 2026", tag: "لائحة" },
    { name: "جدول الاجتماعات السنوي 2026",                      type: "XLS", size: "140 كيلوبايت", date: "يناير 2026", tag: "جدول" },
    { name: "المرسوم الأميري رقم ٢٢ لسنة ٢٠٢٢ — التشكيل",        type: "PDF", size: "1.8 ميغابايت", date: "مارس 2022", tag: "تأسيس" },
    { name: "تقرير الأداء السنوي 2025",                           type: "PDF", size: "8.6 ميغابايت", date: "يناير 2026", tag: "تقرير" },
  ];

  // Monthly activity data — meetings & decisions
  const activity = [
    { m: "يناير", meetings: 3, decisions: 11 },
    { m: "فبراير", meetings: 4, decisions: 14 },
    { m: "مارس", meetings: 3, decisions: 9 },
    { m: "أبريل", meetings: 4, decisions: 12 },
    { m: "مايو", meetings: 3, decisions: 8 },
  ];
  const maxMeetings = 5;
  const maxDecisions = 16;

  const sTab = (id, label, n) => (
    <a className={`tab ${tab === id ? "is-active" : ""}`} onClick={() => setTab(id)}>
      {label}{n != null && <span className="cd-tab-n num">{n}</span>}
    </a>
  );

  return (
    <>
      <div className="crumbs">
        <a data-back="committees"><Icon.ChevronStart width="14" height="14" style={{transform:"scaleX(-1)"}}/> رجوع</a>
        <span className="sep"/>
        <a data-nav="dashboard">الرئيسية</a><span className="sep">›</span>
        <a data-nav="committees">اللجان</a><span className="sep">›</span>
        <span className="here">{committee.name}</span>
      </div>

      {/* ============== HERO ============== */}
      <section className="cd-hero">
        <div className="cd-hero-stripe" aria-hidden="true"/>
        <div className="cd-hero-main">
          <div className={`cd-mark cd-mark-${committee.markTone}`}>{committee.mark}</div>
          <div className="cd-hero-info">
            <div className="cd-hero-tags">
              <span className={`pill pill-${committee.typeTone}`}>{committee.type}</span>
              <span className="pill pill-green"><span className="dot dot-green"/> نشطة</span>
              <span className="cd-ref num">{committee.formation.decree}</span>
            </div>
            <h1 className="cd-hero-title">{committee.name}</h1>
            <p className="cd-hero-sub">{committee.summary}</p>
            <div className="cd-hero-meta">
              <span><Icon.Calendar width="13" height="13"/> أُسست في <b className="num">{committee.formation.date}</b></span>
              <span><Icon.Members width="13" height="13"/> {members.length} عضواً</span>
              <span><Icon.Decisions width="13" height="13"/> ٢٤٧ قراراً صادراً</span>
              <span><Icon.Quorum width="13" height="13"/> النصاب: {committee.quorum}</span>
            </div>
          </div>
          <div className="cd-hero-side">
            <div className="cd-hero-chair">
              <span className="eyebrow">رئيس اللجنة</span>
              <div className="cd-chair-row">
                <span className="avatar-sm" style={{ width: 40, height: 40, fontSize: 13, background: "var(--c-burgundy)" }}>{committee.chair.initials}</span>
                <div>
                  <div className="cd-chair-name">{committee.chair.name}</div>
                  <div className="cd-chair-title">{committee.chair.title}</div>
                </div>
              </div>
            </div>
            <div className="cd-hero-actions">
              <button className="btn btn-soft btn-sm btn-block"><Icon.Download width="13" height="13"/> ميثاق اللجنة</button>
              <button className="btn btn-primary btn-sm btn-block"><Icon.Plus width="13" height="13"/> دعوة لاجتماع</button>
            </div>
          </div>
        </div>
      </section>

      {/* ============== KPI STRIP ============== */}
      <div className="cd-kpis">
        {kpis.map((k, i) => (
          <div key={i} className="cd-kpi">
            <span className={`icon-circle icon-circle-sm icon-circle-${k.tone}`}>
              {Icon[k.icon] ? Icon[k.icon]({ width: 18, height: 18 }) : null}
            </span>
            <div className="cd-kpi-body">
              <div className="cd-kpi-val num">{k.val}</div>
              <div className="cd-kpi-lab">{k.label}</div>
              <div className="cd-kpi-sub">{k.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ============== TABS ============== */}
      <div className="cd-tabs tabs">
        {sTab("overview", "نظرة عامة")}
        {sTab("members",  "الأعضاء", members.length)}
        {sTab("meetings", "الاجتماعات", 34)}
        {sTab("decisions","القرارات", 247)}
        {sTab("recs",     "التوصيات", recommendations.length)}
        {sTab("docs",     "الوثائق", docs.length)}
        {sTab("mandate",  "الاختصاصات")}
      </div>

      {/* ============== MAIN GRID ============== */}
      <div className="cd-grid">
        <div className="cd-main">

          {tab === "overview" && (
            <>
              {/* Activity chart */}
              <section className="card">
                <header className="card-head">
                  <div>
                    <span className="eyebrow">النشاط الشهري · 2026</span>
                    <h3 className="card-title-sm">الاجتماعات والقرارات</h3>
                  </div>
                  <div className="cd-chart-legend">
                    <span><span className="cd-leg-dot" style={{ background: "var(--c-blue)" }}/> اجتماعات</span>
                    <span><span className="cd-leg-dot" style={{ background: "var(--c-burgundy)" }}/> قرارات</span>
                  </div>
                </header>
                <div className="cd-chart">
                  {activity.map((a, i) => (
                    <div key={i} className="cd-bar-group">
                      <div className="cd-bars">
                        <div className="cd-bar cd-bar-blue" style={{ height: `${a.meetings / maxMeetings * 100}%` }}>
                          <span className="cd-bar-val num">{a.meetings}</span>
                        </div>
                        <div className="cd-bar cd-bar-burg" style={{ height: `${a.decisions / maxDecisions * 100}%` }}>
                          <span className="cd-bar-val num">{a.decisions}</span>
                        </div>
                      </div>
                      <div className="cd-bar-lab">{a.m}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Recent decisions */}
              <section className="card">
                <header className="card-head">
                  <div>
                    <span className="eyebrow">السجل</span>
                    <h3 className="card-title-sm">آخر القرارات الصادرة</h3>
                  </div>
                  <a className="see-all-sm" onClick={() => setTab("decisions")}>عرض الكل ←</a>
                </header>
                <ul className="cd-decisions">
                  {decisions.slice(0, 4).map((d, i) => (
                    <li key={i}>
                      <span className="cd-dec-num num">{d.num}</span>
                      <div className="cd-dec-body">
                        <div className="cd-dec-title">{d.title}</div>
                        <div className="cd-dec-meta">{d.meeting} · {d.date}</div>
                      </div>
                      <span className={`pill ${d.status === "approved" ? "pill-green" : d.status === "rejected" ? "pill-red" : "pill-amber"}`}>
                        {d.status === "approved" ? "معتمد" : d.status === "rejected" ? "مرفوض" : "مؤجل"}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Active recommendations */}
              <section className="card">
                <header className="card-head">
                  <div>
                    <span className="eyebrow">قيد المتابعة</span>
                    <h3 className="card-title-sm">التوصيات النشطة</h3>
                  </div>
                  <a className="see-all-sm" onClick={() => setTab("recs")}>عرض الكل ←</a>
                </header>
                <ul className="cd-recs">
                  {recommendations.slice(0, 3).map((r, i) => (
                    <li key={i}>
                      <div className="cd-rec-top">
                        <span className="cd-rec-num num">{r.num}</span>
                        <span className={`pill ${r.status === "done" ? "pill-green" : r.status === "delayed" ? "pill-red" : "pill-amber"}`}>
                          {r.status === "done" ? "منجزة" : r.status === "delayed" ? "متأخرة" : "قيد التنفيذ"}
                        </span>
                      </div>
                      <div className="cd-rec-title">{r.title}</div>
                      <div className="cd-rec-foot">
                        <span><Icon.User width="12" height="12"/> {r.owner}</span>
                        <div className="cd-rec-bar">
                          <span className={r.status === "done" ? "is-done" : r.status === "delayed" ? "is-delayed" : ""} style={{ width: `${r.progress}%` }}/>
                        </div>
                        <span className="num cd-rec-pct">{r.progress}%</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            </>
          )}

          {tab === "members" && (
            <section className="card">
              <header className="card-head">
                <div>
                  <span className="eyebrow">تشكيل اللجنة</span>
                  <h3 className="card-title-sm">{members.length} أعضاء</h3>
                </div>
                <div className="cd-row-actions">
                  <button className="btn btn-ghost btn-sm"><Icon.Filter width="13" height="13"/> تصفية</button>
                  <button className="btn btn-secondary btn-sm"><Icon.Plus width="13" height="13"/> إضافة عضو</button>
                </div>
              </header>
              <table className="gov-table">
                <thead>
                  <tr>
                    <th>العضو</th>
                    <th>الصفة</th>
                    <th>المنصب</th>
                    <th>الحضور</th>
                    <th>القرارات</th>
                    <th>الحالة</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((m, i) => (
                    <tr key={i}>
                      <td>
                        <div className="member-cell">
                          <span className="avatar-sm">
                            {m.name.split(" ").slice(-2).map(s => s[0]).join("")}
                            <span className={`presence presence-${m.status}`}/>
                          </span>
                          <div className="member-name">{m.name}</div>
                        </div>
                      </td>
                      <td>
                        <span className={`pill ${m.role.includes("رئيس") && !m.role.includes("نائب") ? "pill-burg" : m.role.includes("نائب") ? "pill-blue" : m.role.includes("سر") ? "pill-gold" : "pill-gray"}`}>{m.role}</span>
                      </td>
                      <td className="ink-2">{m.title}</td>
                      <td>
                        <div className="att-cell">
                          <div className="att-track"><div className="att-fill cd-att-flat" style={{ width: `${m.attendance}%` }}/></div>
                          <span className="num att-pct">{m.attendance}%</span>
                        </div>
                      </td>
                      <td className="num">{m.decisions}</td>
                      <td>
                        <span className={`pill ${m.status === "online" ? "pill-green" : m.status === "busy" ? "pill-amber" : "pill-gray"}`}>
                          <span className={`dot dot-${m.status === "online" ? "green" : m.status === "busy" ? "amber" : "blue"}`}/>
                          {m.status === "online" ? "متصل" : m.status === "busy" ? "في اجتماع" : "غير متصل"}
                        </span>
                      </td>
                      <td><button className="iconbtn iconbtn-sm"><Icon.More width="14" height="14"/></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}

          {tab === "meetings" && (
            <section className="card">
              <header className="card-head">
                <div>
                  <span className="eyebrow">سجل الاجتماعات</span>
                  <h3 className="card-title-sm">آخر ٥ من إجمالي ٣٤ اجتماع</h3>
                </div>
                <div className="cd-row-actions">
                  <button className="btn btn-ghost btn-sm"><Icon.Calendar width="13" height="13"/> عرض التقويم</button>
                  <button className="btn btn-secondary btn-sm"><Icon.Plus width="13" height="13"/> اجتماع جديد</button>
                </div>
              </header>
              <ul className="cd-meetings">
                {meetings.map((m, i) => (
                  <li key={i} className={`cd-mtg cd-mtg-${m.status}`}>
                    <div className="cd-mtg-date">
                      <b className="num">{m.d}</b>
                      <span>{m.m}</span>
                      <i>{m.w}</i>
                    </div>
                    <div className="cd-mtg-body">
                      <div className="cd-mtg-title">{m.title}</div>
                      <div className="cd-mtg-meta">
                        <span className="num">{m.time}</span>
                        <span>·</span>
                        <span><Icon.Tasks width="12" height="12"/> {m.items} بنود</span>
                      </div>
                    </div>
                    <span className={`pill ${m.status === "live" ? "pill-burg" : m.status === "upcoming" ? "pill-blue" : "pill-gray"}`}>
                      {m.status === "live" && <span className="dot dot-live"/>}
                      {m.status === "live" ? "جارٍ الآن" : m.status === "upcoming" ? "قادم" : "منتهٍ"}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {tab === "decisions" && (
            <section className="card">
              <header className="card-head">
                <div>
                  <span className="eyebrow">السجل الكامل</span>
                  <h3 className="card-title-sm">247 قراراً</h3>
                </div>
                <div className="cd-row-actions">
                  <button className="btn btn-ghost btn-sm"><Icon.Filter width="13" height="13"/> تصفية</button>
                  <button className="btn btn-ghost btn-sm"><Icon.Download width="13" height="13"/> تصدير</button>
                </div>
              </header>
              <ul className="cd-decisions">
                {decisions.map((d, i) => (
                  <li key={i}>
                    <span className="cd-dec-num num">{d.num}</span>
                    <div className="cd-dec-body">
                      <div className="cd-dec-title">{d.title}</div>
                      <div className="cd-dec-meta">{d.meeting} · {d.date}</div>
                    </div>
                    <span className={`pill ${d.status === "approved" ? "pill-green" : d.status === "rejected" ? "pill-red" : "pill-amber"}`}>
                      {d.status === "approved" ? "معتمد" : d.status === "rejected" ? "مرفوض" : "مؤجل"}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {tab === "recs" && (
            <section className="card">
              <header className="card-head">
                <div>
                  <span className="eyebrow">قيد المتابعة</span>
                  <h3 className="card-title-sm">{recommendations.length} توصيات نشطة</h3>
                </div>
                <button className="btn btn-secondary btn-sm"><Icon.Plus width="13" height="13"/> توصية جديدة</button>
              </header>
              <ul className="cd-recs">
                {recommendations.map((r, i) => (
                  <li key={i}>
                    <div className="cd-rec-top">
                      <span className="cd-rec-num num">{r.num}</span>
                      <span className={`pill ${r.status === "done" ? "pill-green" : r.status === "delayed" ? "pill-red" : "pill-amber"}`}>
                        {r.status === "done" ? "منجزة" : r.status === "delayed" ? "متأخرة" : "قيد التنفيذ"}
                      </span>
                    </div>
                    <div className="cd-rec-title">{r.title}</div>
                    <div className="cd-rec-foot">
                      <span><Icon.User width="12" height="12"/> {r.owner}</span>
                      <div className="cd-rec-bar">
                        <span className={r.status === "done" ? "is-done" : r.status === "delayed" ? "is-delayed" : ""} style={{ width: `${r.progress}%` }}/>
                      </div>
                      <span className="num cd-rec-pct">{r.progress}%</span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {tab === "docs" && (
            <section className="card">
              <header className="card-head">
                <div>
                  <span className="eyebrow">المكتبة المرجعية</span>
                  <h3 className="card-title-sm">{docs.length} وثائق</h3>
                </div>
                <button className="btn btn-secondary btn-sm">رفع وثيقة</button>
              </header>
              <ul className="cd-docs">
                {docs.map((d, i) => (
                  <li key={i}>
                    <div className={`doc-icon doc-${d.type.toLowerCase() === "pdf" ? "pdf" : d.type.toLowerCase() === "doc" ? "doc" : "xls"}`}>{d.type}</div>
                    <div className="cd-doc-body">
                      <div className="cd-doc-name">{d.name} <span className="cd-doc-tag">{d.tag}</span></div>
                      <div className="cd-doc-meta"><span className="num">{d.size}</span> · {d.date}</div>
                    </div>
                    <div className="cd-doc-actions">
                      <button className="iconbtn iconbtn-sm"><Icon.Eye width="14" height="14"/></button>
                      <button className="iconbtn iconbtn-sm"><Icon.Download width="14" height="14"/></button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {tab === "mandate" && (
            <section className="card">
              <header className="card-head">
                <div>
                  <span className="eyebrow">الاختصاصات والصلاحيات</span>
                  <h3 className="card-title-sm">المهام المنوطة باللجنة</h3>
                </div>
              </header>
              <ol className="cd-mandate">
                {mandate.map((m, i) => (
                  <li key={i}>
                    <span className="cd-mandate-num num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="cd-mandate-text">{m}</span>
                  </li>
                ))}
              </ol>
              <div className="cd-mandate-foot">
                <Icon.Documents width="14" height="14"/>
                <span>الاختصاصات مستندة إلى {committee.formation.decree} وتعديلاته</span>
              </div>
            </section>
          )}

        </div>

        {/* ============== SIDE ============== */}
        <aside className="cd-side">
          {/* Next meeting */}
          <div className="card cd-side-next">
            <span className="eyebrow">الاجتماع القادم</span>
            <div className="cd-next-row">
              <div className="cd-next-date">
                <b className="num">{committee.nextMeeting.d}</b>
                <span>{committee.nextMeeting.m}</span>
              </div>
              <div>
                <div className="cd-next-time num">{committee.nextMeeting.w}</div>
              </div>
            </div>
            <div className="cd-next-title">{committee.nextMeeting.title}</div>
            <div className="cd-next-loc"><Icon.Pin width="13" height="13"/> {committee.nextMeeting.loc}</div>
            <button className="btn btn-soft btn-sm btn-block" style={{ marginTop: 14 }}>عرض جدول الأعمال</button>
          </div>

          {/* Quorum & meeting cadence */}
          <div className="card">
            <span className="eyebrow">الأرقام التشغيلية</span>
            <ul className="cd-ops">
              <li>
                <span>وتيرة الاجتماع</span>
                <b>كل أسبوعين</b>
              </li>
              <li>
                <span>النصاب القانوني</span>
                <b>ثلثا الأعضاء (٨ من ١٢)</b>
              </li>
              <li>
                <span>متوسط الحضور 2026</span>
                <b className="num">91%</b>
              </li>
              <li>
                <span>زمن الجلسة الوسيط</span>
                <b className="num">2س 14د</b>
              </li>
              <li>
                <span>أمين سر اللجنة</span>
                <b>{committee.secretary.name}</b>
              </li>
            </ul>
          </div>

          {/* Mandate preview */}
          <div className="card">
            <header className="side-head">
              <span className="eyebrow">الاختصاصات</span>
              <a className="see-all-sm" onClick={() => setTab("mandate")}>الكل ←</a>
            </header>
            <ul className="cd-mandate-mini">
              {mandate.slice(0, 4).map((m, i) => (
                <li key={i}><Icon.Check width="13" height="13"/> {m}</li>
              ))}
            </ul>
          </div>

          {/* Related committees */}
          <div className="card">
            <span className="eyebrow">لجان ذات صلة</span>
            <ul className="cd-related">
              {[
                { mark: "ت", tone: "blue",  name: "لجنة التحول الرقمي",   role: "تنسيق مشاريع المنظومات المالية" },
                { mark: "ق", tone: "gold",  name: "لجنة الشؤون القانونية", role: "مراجعة اللوائح المالية" },
                { mark: "أ", tone: "burg",  name: "لجنة الأمن الوطني",     role: "إدارة الميزانية الطارئة" },
              ].map((r, i) => (
                <li key={i}>
                  <span className={`cd-rel-mark cd-mark-${r.tone}`} style={{ width: 36, height: 36, fontSize: 13 }}>{r.mark}</span>
                  <div>
                    <div className="cd-rel-name">{r.name}</div>
                    <div className="cd-rel-role">{r.role}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}

window.CommitteeDetail = CommitteeDetail;
