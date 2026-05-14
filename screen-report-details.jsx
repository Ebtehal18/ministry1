/* global React, Icon */

/* =========================================================
   REPORT DETAILS — single report / meeting minutes profile
   Flat surfaces · no gradients
   ========================================================= */

const { useState: useStateRP } = React;

function ReportDetails() {
  const [tab, setTab] = useStateRP("preview");

  const report = {
    refNo: "MOM-2026-024",
    kind: "محضر اجتماع",
    title: "محضر اجتماع اللجنة المالية العليا — الجلسة ٢٤",
    committee: "اللجنة المالية العليا",
    committeeMark: "م",
    committeeTone: "burg",
    classification: "مقيد",
    date: "08 مايو 2026",
    dateW: "الخميس",
    pages: 18,
    size: "2.4 MB",
    type: "PDF",
    version: "1.2",
    language: "العربية",
    status: "signed",
    issuedBy: "أمانة سر اللجنة المالية العليا",
    sessionRef: "اجتماع رقم ٢٤ — ٢٠٢٦",
    chair: "معالي/ خالد بن خليفة آل ثاني",
    duration: "ساعتان و١٥ دقيقة",
  };

  const toc = [
    { num: "1", title: "افتتاح الجلسة والتأكد من النصاب", page: 1 },
    { num: "2", title: "تلاوة محضر الجلسة السابقة والمصادقة عليه", page: 2 },
    { num: "3", title: "مراجعة التقرير المالي للربع الأول من العام ٢٠٢٦", page: 3 },
    { num: "4", title: "مناقشة توصيات ديوان المحاسبة بشأن مراجعة العقود", page: 7 },
    { num: "5", title: "اعتماد توصيات تقرير ديوان المحاسبة", page: 11 },
    { num: "6", title: "إقرار البرنامج التحفيزي للقطاع الخاص للربع الثاني", page: 13 },
    { num: "7", title: "ما يستجد من أعمال", page: 16 },
    { num: "8", title: "اختتام الجلسة والتوقيع", page: 18 },
  ];

  const decisions = [
    { num: "٢٠٢٦/١٤٧", title: "اعتماد تعديلات اللائحة المالية للوزارات والهيئات الحكومية", status: "approved", vote: { y: 8, n: 0, a: 1 } },
    { num: "٢٠٢٦/١٤٨", title: "إقرار البرنامج التحفيزي للقطاع الخاص للربع الثاني",       status: "approved", vote: { y: 7, n: 1, a: 1 } },
    { num: "٢٠٢٦/١٤٩", title: "تكليف لجنة فرعية بمراجعة آلية التعاقد على المشاريع",       status: "approved", vote: { y: 9, n: 0, a: 0 } },
  ];

  const attendees = [
    { name: "معالي/ خالد بن خليفة آل ثاني",  role: "رئيس اللجنة", initials: "خ.خ", attendance: "present", tone: "tone-burg" },
    { name: "معالي/ محمد بن عبدالله السادة",  role: "نائب الرئيس",  initials: "م.ع", attendance: "present", tone: "tone-blue" },
    { name: "معالي/ فهد بن جاسم آل ثاني",     role: "عضو",          initials: "ف.ج", attendance: "present", tone: "tone-gold" },
    { name: "سعادة/ نورة الكواري",            role: "عضو",          initials: "ن.ك", attendance: "present" },
    { name: "سعادة/ عبدالعزيز السبيعي",        role: "عضو",          initials: "ع.س", attendance: "remote" },
    { name: "سعادة/ محمد العمادي",            role: "عضو",          initials: "م.ع", attendance: "present" },
    { name: "سعادة/ علي بن سعيد المحمود",     role: "عضو",          initials: "ع.م", attendance: "absent" },
    { name: "سعادة/ راشد المري",              role: "أمين السر",     initials: "ر.م", attendance: "present" },
  ];

  const signatures = [
    { name: "معالي/ خالد بن خليفة آل ثاني", role: "رئيس اللجنة", date: "08 مايو 2026", status: "signed" },
    { name: "سعادة/ راشد المري",            role: "أمين السر",    date: "08 مايو 2026", status: "signed" },
    { name: "معالي/ محمد بن عبدالله السادة", role: "نائب الرئيس", date: "—",            status: "pending" },
  ];

  const versions = [
    { v: "1.2", d: "08 مايو 2026", note: "المراجعة النهائية والتوقيع", by: "أمانة السر", current: true },
    { v: "1.1", d: "07 مايو 2026", note: "تصحيحات لغوية وتوضيحات",       by: "أمانة السر" },
    { v: "1.0", d: "07 مايو 2026", note: "المسودة الأولى",                by: "أمانة السر" },
  ];

  const related = [
    { num: "MOM-2026-023", title: "محضر الجلسة ٢٣ — ٢٠٢٦", date: "24 أبريل 2026" },
    { num: "RPT-2026-Q1",  title: "تقرير الأداء الربعي — Q1",  date: "30 أبريل 2026" },
    { num: "DEC-2026-147", title: "قرار اعتماد اللائحة المالية", date: "08 مايو 2026" },
  ];

  const sTab = (id, label) => (
    <a className={`tab ${tab === id ? "is-active" : ""}`} onClick={() => setTab(id)}>{label}</a>
  );

  return (
    <>
      <div className="crumbs">
        <a data-back="reports"><Icon.ChevronStart width="14" height="14" style={{transform:"scaleX(-1)"}}/> رجوع</a>
        <span className="sep"/>
        <a data-nav="dashboard">الرئيسية</a><span className="sep">›</span>
        <a data-nav="reports">التقارير والأرشفة</a><span className="sep">›</span>
        <span className="here num">{report.refNo}</span>
      </div>

      {/* HERO */}
      <section className="rpd-hero">
        <div className="rpd-hero-stripe" aria-hidden="true"/>

        <div className="rpd-hero-top">
          <div className="rpd-hero-tags">
            <span className="pill pill-blue">{report.kind}</span>
            <span className="pill pill-amber"><Icon.Lock width="11" height="11"/> {report.classification}</span>
            <span className="pill pill-green"><Icon.Check width="11" height="11"/> موقّع</span>
            <span className="rpd-ref num">{report.refNo}</span>
          </div>
          <div className="rpd-hero-actions">
            <button className="btn btn-soft btn-sm"><Icon.Eye width="13" height="13"/> معاينة</button>
            <button className="btn btn-secondary btn-sm"><Icon.Download width="13" height="13"/> تنزيل</button>
            <button className="btn btn-primary btn-sm">طباعة / تصدير</button>
          </div>
        </div>

        <h1 className="rpd-hero-title">{report.title}</h1>

        <div className="rpd-hero-source">
          <a className="rpd-src-link">
            <span className={`rd-cmark`} style={{background: "var(--c-burgundy)"}}>{report.committeeMark}</span>
            <span className="rd-src-info">
              <span className="rd-src-cmte">{report.committee}</span>
              <span className="rd-src-mtg">{report.sessionRef} · {report.dateW} {report.date}</span>
            </span>
          </a>
        </div>

        <div className="rpd-meta">
          <div className="rpd-meta-cell">
            <span className="rpd-meta-lbl"><Icon.Documents width="13" height="13"/> النوع</span>
            <span className="rpd-meta-val">{report.type} · {report.pages} صفحة</span>
          </div>
          <div className="rpd-meta-cell">
            <span className="rpd-meta-lbl"><Icon.Calendar width="13" height="13"/> تاريخ الإصدار</span>
            <span className="rpd-meta-val">{report.date}</span>
          </div>
          <div className="rpd-meta-cell">
            <span className="rpd-meta-lbl"><Icon.User width="13" height="13"/> رئيس الجلسة</span>
            <span className="rpd-meta-val">{report.chair}</span>
          </div>
          <div className="rpd-meta-cell">
            <span className="rpd-meta-lbl"><Icon.Clock width="13" height="13"/> مدة الجلسة</span>
            <span className="rpd-meta-val">{report.duration}</span>
          </div>
          <div className="rpd-meta-cell">
            <span className="rpd-meta-lbl"><Icon.Members width="13" height="13"/> الحضور</span>
            <span className="rpd-meta-val">6 من 8</span>
          </div>
          <div className="rpd-meta-cell">
            <span className="rpd-meta-lbl"><Icon.Decisions width="13" height="13"/> القرارات</span>
            <span className="rpd-meta-val">3 قرارات</span>
          </div>
        </div>
      </section>

      {/* TABS */}
      <div className="rpd-tabs tabs">
        {sTab("preview",   "معاينة المحضر")}
        {sTab("decisions", `القرارات · ${decisions.length}`)}
        {sTab("attendees", `الحضور · ${attendees.length}`)}
        {sTab("signatures","التوقيعات")}
        {sTab("versions",  "الإصدارات")}
      </div>

      <div className="rpd-grid">
        <div className="rpd-main">

          {tab === "preview" && (
            <section className="card rpd-viewer">
              <header className="card-head">
                <div>
                  <span className="eyebrow">المعاينة</span>
                  <h3 className="card-title-sm">عرض المستند — صفحة 1 من {report.pages}</h3>
                </div>
                <div className="rpd-viewer-tools">
                  <button className="iconbtn iconbtn-sm"><Icon.ChevronStart width="14" height="14"/></button>
                  <span className="num rpd-viewer-page">1 / {report.pages}</span>
                  <button className="iconbtn iconbtn-sm"><Icon.ChevronStart width="14" height="14" style={{transform: "rotate(180deg)"}}/></button>
                  <span className="rpd-viewer-sep"/>
                  <button className="btn btn-ghost btn-sm">- تصغير</button>
                  <button className="btn btn-ghost btn-sm">100%</button>
                  <button className="btn btn-ghost btn-sm">+ تكبير</button>
                </div>
              </header>
              <div className="rpd-page">
                <div className="rpd-page-hdr">
                  <div className="rpd-page-emblem"/>
                  <div>
                    <div className="rpd-page-state">دولة قطر · مجلس الوزراء</div>
                    <div className="rpd-page-cmte">اللجنة المالية العليا</div>
                  </div>
                  <div className="rpd-page-meta num">
                    رقم المحضر · {report.refNo}<br/>
                    التاريخ · {report.date}
                  </div>
                </div>
                <div className="rpd-page-title">محضر اجتماع الجلسة الرابعة والعشرين</div>
                <div className="rpd-page-sub">اجتماع رقم ٢٤ لعام ٢٠٢٦ · انعقد في قاعة الوزراء — الدور الثالث</div>

                <div className="rpd-page-section">
                  <h4>أولاً: افتتاح الجلسة</h4>
                  <p>افتُتحت الجلسة الرابعة والعشرون للجنة المالية العليا في تمام الساعة العاشرة من صباح يوم الخميس الموافق الثامن من شهر مايو لعام ألفين وستة وعشرين، برئاسة معالي/ خالد بن خليفة آل ثاني، رئيس اللجنة، وبحضور أعضاء اللجنة المُدرَجة أسماؤهم في كشف الحضور المرفق.</p>
                  <p>افتتح معاليه الجلسة بكلمة ترحيبية بالحضور، مشيراً إلى أهمية البنود المدرجة على جدول الأعمال، وداعياً إلى ضرورة التركيز والاستفاضة في النقاش بما يحقّق المصلحة العامة.</p>
                </div>

                <div className="rpd-page-section">
                  <h4>ثانياً: التأكد من النصاب</h4>
                  <p>أكّد أمين السر اكتمال النصاب القانوني للاجتماع وفقاً للائحة الداخلية للجنة، حيث حضر ستة من أعضاء اللجنة الثمانية حضوراً شخصياً، فيما شارك أحد الأعضاء عن بُعد عبر منصة Q-Connect المُعتمَدة. وقد تغيّب عضو واحد بعذر مقبول.</p>
                </div>

                <div className="rpd-page-section">
                  <h4>ثالثاً: مراجعة التقرير المالي للربع الأول</h4>
                  <p>عرض مدير عام الموازنة العامة التقرير المالي للربع الأول من العام المالي ٢٠٢٦…</p>
                </div>

                <div className="rpd-page-foot">
                  <span>صفحة 1 من {report.pages}</span>
                  <span className="num">{report.refNo}</span>
                </div>
              </div>
            </section>
          )}

          {tab === "decisions" && (
            <section className="card">
              <header className="card-head">
                <div>
                  <span className="eyebrow">القرارات الصادرة في الجلسة</span>
                  <h3 className="card-title-sm">{decisions.length} قرارات معتمدة</h3>
                </div>
              </header>
              <ul className="rpd-decisions">
                {decisions.map((d, i) => (
                  <li key={i}>
                    <span className="rpd-dec-num num">{d.num}</span>
                    <div className="rpd-dec-body">
                      <div className="rpd-dec-title">{d.title}</div>
                      <div className="rpd-dec-vote">
                        <span><span className="dot dot-green"/> موافق <b className="num">{d.vote.y}</b></span>
                        <span><span className="dot dot-red"/> معارض <b className="num">{d.vote.n}</b></span>
                        <span><span className="dot dot-amber"/> ممتنع <b className="num">{d.vote.a}</b></span>
                      </div>
                    </div>
                    <span className="pill pill-green"><Icon.Check width="11" height="11"/> معتمد</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {tab === "attendees" && (
            <section className="card">
              <header className="card-head">
                <div>
                  <span className="eyebrow">قائمة الحضور</span>
                  <h3 className="card-title-sm">{attendees.length} أعضاء — 6 حضوراً، 1 عن بُعد، 1 غياب</h3>
                </div>
              </header>
              <ul className="md-members">
                {attendees.map((a, i) => (
                  <li key={i} className={`md-member md-member-${a.attendance === "absent" ? "declined" : "accepted"}`}>
                    <span className={`avatar-sm ${a.tone || ""}`}>{a.initials}</span>
                    <div className="md-member-info">
                      <div className="md-member-name">{a.name}</div>
                      <div className="md-member-role">{a.role}</div>
                    </div>
                    <span className={`md-rsvp-pill md-rsvp-${a.attendance === "absent" ? "declined" : a.attendance === "remote" ? "tentative" : "accepted"}`}>
                      {a.attendance === "present" && <><Icon.Check width="12" height="12"/> في القاعة</>}
                      {a.attendance === "remote"  && <><Icon.Globe width="12" height="12"/> عن بُعد</>}
                      {a.attendance === "absent"  && <>غياب</>}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {tab === "signatures" && (
            <section className="card">
              <header className="card-head">
                <div>
                  <span className="eyebrow">حالة التوقيع</span>
                  <h3 className="card-title-sm">2 موقّعون من 3</h3>
                </div>
              </header>
              <ul className="rpd-signatures">
                {signatures.map((s, i) => (
                  <li key={i} className={`rpd-sig rpd-sig-${s.status}`}>
                    <div className="rpd-sig-line">
                      <div className="rpd-sig-name">{s.name}</div>
                      <div className="rpd-sig-role">{s.role}</div>
                    </div>
                    <div className="rpd-sig-state">
                      {s.status === "signed"
                        ? <><span className="rpd-sig-mark"><Icon.Check width="14" height="14"/></span>
                            <div>
                              <div className="rpd-sig-status-txt">تمّ التوقيع</div>
                              <div className="rpd-sig-date num">{s.date}</div>
                            </div></>
                        : <><span className="rpd-sig-mark rpd-sig-mark-pending"><Icon.Clock width="14" height="14"/></span>
                            <div>
                              <div className="rpd-sig-status-txt">بانتظار التوقيع</div>
                              <button className="btn btn-soft btn-sm" style={{marginTop: 6}}>إرسال تذكير</button>
                            </div></>}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {tab === "versions" && (
            <section className="card">
              <header className="card-head">
                <div>
                  <span className="eyebrow">سجل النسخ</span>
                  <h3 className="card-title-sm">{versions.length} نسخ</h3>
                </div>
              </header>
              <ul className="rpd-versions">
                {versions.map((v, i) => (
                  <li key={i} className={v.current ? "is-current" : ""}>
                    <div className="rpd-ver-tag num">v{v.v}</div>
                    <div className="rpd-ver-body">
                      <div className="rpd-ver-note">{v.note}</div>
                      <div className="rpd-ver-meta">{v.d} · بواسطة {v.by}</div>
                    </div>
                    {v.current
                      ? <span className="pill pill-blue">الحالي</span>
                      : <button className="btn btn-ghost btn-sm">عرض</button>}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="rpd-side">
          {/* TOC */}
          <div className="card">
            <span className="eyebrow">جدول المحتويات</span>
            <h4 className="card-title-sm" style={{marginTop: 6, marginBottom: 8}}>محتويات المحضر</h4>
            <ul className="rpd-toc">
              {toc.map((t, i) => (
                <li key={i}>
                  <span className="rpd-toc-num num">{t.num}</span>
                  <span className="rpd-toc-title">{t.title}</span>
                  <span className="rpd-toc-page num">{t.page}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* File info */}
          <div className="card">
            <span className="eyebrow">معلومات الملف</span>
            <h4 className="card-title-sm" style={{marginTop: 6}}>تفاصيل تقنية</h4>
            <ul className="rd-source-list">
              <li><span>الصيغة</span><b>{report.type}</b></li>
              <li><span>الحجم</span><b className="num">{report.size}</b></li>
              <li><span>عدد الصفحات</span><b className="num">{report.pages}</b></li>
              <li><span>الإصدار</span><b className="num">v{report.version}</b></li>
              <li><span>اللغة</span><b>{report.language}</b></li>
              <li><span>التصنيف</span><b style={{color: "var(--c-amber)"}}>{report.classification}</b></li>
            </ul>
            <button className="btn btn-soft btn-sm btn-block" style={{marginTop: 12}}>
              <Icon.Download width="13" height="13"/> تنزيل ({report.size})
            </button>
          </div>

          {/* Related */}
          <div className="card">
            <span className="eyebrow">مستندات ذات صلة</span>
            <h4 className="card-title-sm" style={{marginTop: 6}}>المرتبطات</h4>
            <ul className="rpd-related">
              {related.map((r, i) => (
                <li key={i}>
                  <Icon.Documents width="14" height="14"/>
                  <div>
                    <div className="rpd-rel-title">{r.title}</div>
                    <div className="rpd-rel-meta"><span className="num">{r.num}</span> · {r.date}</div>
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

window.ReportDetails = ReportDetails;
