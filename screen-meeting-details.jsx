/* global React, Icon */

/* =========================================================
   MEETING DETAILS — the "profile" page for ONE meeting,
   opened from the meetings list. Status-aware:
   upcoming · live · closed.

   Default scenario: an UPCOMING national-security meeting.
   ========================================================= */

const { useState: useStateMD } = React;

function MeetingDetails() {
  const [tab, setTab] = useStateMD("overview");

  // Demo data — an upcoming, classified meeting tomorrow
  const meeting = {
    status: "upcoming",            // upcoming | live | closed
    classified: true,
    refNo: "AGD-2026-0148",
    title: "إقرار خطة الاستجابة للطوارئ الوطنية — المرحلة الثانية",
    committee: "لجنة الأمن الوطني",
    committeeMark: "أ.و",
    committeeTone: "burg",
    chair: "معالي/ عبدالعزيز بن أحمد السبيعي",
    date: { d: "13", m: "مايو 2026", w: "الأربعاء — غداً" },
    time: "10:00 — 12:00",
    duration: "ساعتان",
    location: "غرفة العمليات الموحدة — الدور الأرضي",
    addr: "الديوان الأميري · مجمع الأمانة العامة",
    online: { platform: "Q-Connect (مشفّر)", note: "للأعضاء المعتمدين فقط" },
    countdown: { h: 22, m: 47 },
    purpose:
      "اعتماد المرحلة الثانية من خطة الاستجابة الوطنية للطوارئ الكبرى، ومراجعة نتائج التمرين التجريبي الموحّد الذي نُفّذ في أبريل، والمصادقة على التحديثات المقترحة لبروتوكولات التنسيق بين الجهات الأمنية والمدنية.",
  };

  const counts = { invited: 9, accepted: 7, declined: 1, tentative: 1, quorum: 6 };

  const agenda = [
    { num: 1, title: "كلمة افتتاحية وتلاوة محضر الجلسة السابقة", duration: "١٠ د", presenter: "أمين السر", type: "إجراء" },
    { num: 2, title: "عرض نتائج التمرين التجريبي الموحّد (إبريل ٢٠٢٦)", duration: "٣٠ د", presenter: "وزارة الداخلية", type: "عرض", docs: 2 },
    { num: 3, title: "مناقشة تحديثات بروتوكول التنسيق بين الجهات", duration: "٣٥ د", presenter: "اللجنة التنفيذية", type: "نقاش", docs: 3 },
    { num: 4, title: "التصويت على اعتماد المرحلة الثانية من الخطة", duration: "٤٥ د", presenter: "اللجنة", type: "قرار", docs: 1, decision: true },
  ];

  const members = [
    { name: "معالي/ عبدالعزيز بن أحمد السبيعي", role: "رئيس اللجنة", initials: "ع.س", rsvp: "accepted", tone: "tone-blue", note: "في القاعة" },
    { name: "سعادة/ خالد بن خليفة آل ثاني",     role: "نائب الرئيس", initials: "خ.خ", rsvp: "accepted", note: "في القاعة" },
    { name: "سعادة/ محمد بن عبدالله الكواري",     role: "عضو · وزارة الداخلية", initials: "م.ع", rsvp: "accepted", tone: "tone-blue", note: "في القاعة" },
    { name: "سعادة/ فهد بن جاسم العطية",         role: "عضو · وزارة الدفاع", initials: "ف.ج", rsvp: "accepted", tone: "tone-gold", note: "في القاعة" },
    { name: "سعادة/ راشد بن سيف المري",          role: "عضو · الاستخبارات", initials: "ر.س", rsvp: "accepted", note: "عن بُعد" },
    { name: "سعادة/ ناصر بن حمد المسند",         role: "عضو · وزارة الخارجية", initials: "ن.ح", rsvp: "accepted", note: "في القاعة" },
    { name: "سعادة/ علي بن عبدالله الهاجري",     role: "عضو · الدفاع المدني", initials: "ع.ع", rsvp: "accepted", note: "عن بُعد" },
    { name: "سعادة/ نورة بنت محمد الكواري",      role: "أمين سر اللجنة", initials: "ن.ك", rsvp: "tentative", note: "بانتظار التأكيد" },
    { name: "سعادة/ حمد بن سعيد العطية",          role: "عضو · ديوان المحاسبة", initials: "ح.س", rsvp: "declined", note: "اعتذر — مهمة رسمية" },
  ];

  const docs = [
    { name: "مسودة خطة الاستجابة الوطنية — المرحلة الثانية", type: "PDF", size: "8.4 ميغابايت", pages: 64, classified: true, updated: "تحديث: اليوم ٠٨:٢٤", priority: true },
    { name: "تقرير نتائج التمرين التجريبي الموحّد",            type: "PDF", size: "3.1 ميغابايت", pages: 28, updated: "أمس ١٧:١١" },
    { name: "بروتوكول التنسيق المقترح (مسار التعديلات)",        type: "DOC", size: "780 كيلوبايت", pages: 14, updated: "أمس ١٤:٠٠" },
    { name: "تقييم المخاطر — مصفوفة الجهات المعنية",            type: "XLS", size: "1.2 ميغابايت", pages: null, updated: "٠٩ مايو" },
    { name: "محضر الجلسة السابقة رقم (٢) — للمراجعة",           type: "PDF", size: "640 كيلوبايت", pages: 12, updated: "٠٦ مايو" },
    { name: "ملحق سري — المرفقات المصنّفة",                     type: "PDF", size: "—", pages: null, classified: true, locked: true },
  ];

  const decisionsPrev = [
    { num: "ق-٢٦/٠٧", title: "اعتماد المرحلة الأولى من خطة الاستجابة الوطنية", status: "executed" },
    { num: "ق-٢٦/٠٦", title: "تشكيل فريق التمرين التجريبي الموحّد", status: "executed" },
    { num: "ق-٢٦/٠٥", title: "تخصيص ميزانية التجهيز للمرحلة الأولى", status: "tracking" },
  ];

  const timeline = [
    { t: "٠٦ مايو", label: "إنشاء الاجتماع وإرسال الدعوات", actor: "أمانة سر اللجنة" },
    { t: "٠٨ مايو", label: "اعتماد مسودة جدول الأعمال", actor: "الرئيس" },
    { t: "١٠ مايو", label: "تعميم المستندات على الأعضاء", actor: "النظام" },
    { t: "١٢ مايو", label: "آخر تحديث على المسودة الرئيسية", actor: "وزارة الداخلية" },
  ];

  const sTab = (id, label) => (
    <a className={`tab ${tab === id ? "is-active" : ""}`} onClick={() => setTab(id)}>{label}</a>
  );

  return (
    <>
      <div className="crumbs">
        <a data-back="meetings-reports"><Icon.ChevronStart width="14" height="14" style={{transform:"scaleX(-1)"}}/> رجوع</a>
        <span className="sep"/>
        <a data-nav="dashboard">الرئيسية</a><span className="sep">›</span>
        <a data-nav="meetings-reports">الاجتماعات</a><span className="sep">›</span>
        <span className="here">{meeting.title}</span>
      </div>

      {/* ============== HERO ============== */}
      <section className={`md-hero md-hero-${meeting.status}`}>
        <div className="md-hero-bg" aria-hidden="true"/>

        <div className="md-hero-top">
          <div className="md-hero-tags">
            <span className="md-statuspill md-statuspill-upcoming">
              <span className="dot dot-blue"/> اجتماع قادم
            </span>
            {meeting.classified && (
              <span className="md-classified">
                <Icon.Lock width="12" height="12"/> مصنّف · سري
              </span>
            )}
            <span className="md-ref num">{meeting.refNo}</span>
          </div>

          <div className="md-hero-countdown">
            <span className="eyebrow">يبدأ خلال</span>
            <div className="md-cd">
              <span className="md-cd-num num">{meeting.countdown.h}</span>
              <span className="md-cd-lab">ساعة</span>
              <span className="md-cd-sep">:</span>
              <span className="md-cd-num num">{meeting.countdown.m}</span>
              <span className="md-cd-lab">دقيقة</span>
            </div>
          </div>
        </div>

        <h1 className="md-hero-title">{meeting.title}</h1>

        <div className="md-hero-meta">
          <a className={`md-hero-committee tone-${meeting.committeeTone}`}>
            <span className="md-cmark">{meeting.committeeMark}</span>
            <span className="md-cmark-info">
              <span className="md-cmark-lbl">اللجنة</span>
              <span className="md-cmark-name">{meeting.committee}</span>
            </span>
          </a>
          <span className="md-hero-divider"/>
          <div className="md-hero-field">
            <span className="md-fld-lbl"><Icon.Calendar width="13" height="13"/> التاريخ</span>
            <span className="md-fld-val"><b className="num">{meeting.date.d}</b> {meeting.date.m} <i>· {meeting.date.w}</i></span>
          </div>
          <div className="md-hero-field">
            <span className="md-fld-lbl"><Icon.Clock width="13" height="13"/> التوقيت</span>
            <span className="md-fld-val num">{meeting.time}<i>· {meeting.duration}</i></span>
          </div>
          <div className="md-hero-field">
            <span className="md-fld-lbl"><Icon.Pin width="13" height="13"/> المكان</span>
            <span className="md-fld-val">{meeting.location}</span>
          </div>
        </div>

        <div className="md-hero-foot">
          <div className="md-hero-rsvp">
            <span className="eyebrow">حالتك</span>
            <div className="md-rsvp-current">
              <span className="pill pill-green"><Icon.Check width="12" height="12"/> أكّدت الحضور</span>
              <a className="md-rsvp-change">تعديل</a>
            </div>
          </div>

          <div className="md-hero-actions">
            <button className="btn btn-soft btn-sm"><Icon.Calendar width="14" height="14"/> إضافة للتقويم</button>
            <button className="btn btn-secondary btn-sm"><Icon.Download width="14" height="14"/> تنزيل الحزمة</button>
            <button className="btn btn-primary"><Icon.Tasks width="14" height="14"/> فتح حزمة التحضير</button>
          </div>
        </div>
      </section>

      {/* ============== KPI STRIP ============== */}
      <div className="md-kpis">
        <div className="md-kpi">
          <span className="eyebrow">جدول الأعمال</span>
          <div className="md-kpi-val"><span className="num">{agenda.length}</span><i>بنود</i></div>
          <div className="md-kpi-sub">قرار واحد للتصويت</div>
        </div>
        <div className="md-kpi">
          <span className="eyebrow">المدعوّون</span>
          <div className="md-kpi-val"><span className="num">{counts.invited}</span><i>أعضاء</i></div>
          <div className="md-kpi-sub">النصاب: <b className="num">{counts.quorum}</b></div>
        </div>
        <div className="md-kpi md-kpi-strong">
          <span className="eyebrow">تأكيدات الحضور</span>
          <div className="md-kpi-val"><span className="num">{counts.accepted}</span><span className="md-kpi-of">/ {counts.invited}</span></div>
          <div className="md-rsvp-bar">
            <span style={{ width: `${counts.accepted / counts.invited * 100}%`, background: "var(--c-green)" }}/>
            <span style={{ width: `${counts.tentative / counts.invited * 100}%`, background: "var(--c-amber)" }}/>
            <span style={{ width: `${counts.declined / counts.invited * 100}%`, background: "var(--c-red)" }}/>
          </div>
          <div className="md-kpi-legend">
            <span><span className="dot dot-green"/> موافق <b className="num">{counts.accepted}</b></span>
            <span><span className="dot dot-amber"/> مبدئي <b className="num">{counts.tentative}</b></span>
            <span><span className="dot dot-red"/> اعتذر <b className="num">{counts.declined}</b></span>
          </div>
        </div>
        <div className="md-kpi">
          <span className="eyebrow">المستندات</span>
          <div className="md-kpi-val"><span className="num">{docs.length}</span><i>ملفات</i></div>
          <div className="md-kpi-sub">٢ ملف <b style={{color:"var(--c-burgundy)"}}>مصنّف</b></div>
        </div>
        <div className="md-kpi">
          <span className="eyebrow">قراءتك</span>
          <div className="md-kpi-val"><span className="num">3</span><span className="md-kpi-of">/ {docs.length}</span></div>
          <div className="bar" style={{marginTop:8}}><div className="bar-fill bar-fill-amber" style={{width: "50%"}}/></div>
        </div>
      </div>

      {/* ============== TABS ============== */}
      <div className="md-tabs tabs">
        {sTab("overview", "نظرة عامة")}
        {sTab("agenda",   `جدول الأعمال · ${agenda.length}`)}
        {sTab("members",  `الحضور · ${counts.invited}`)}
        {sTab("docs",     `المستندات · ${docs.length}`)}
        {sTab("history",  "السجل والصلة")}
      </div>

      {/* ============== MAIN GRID ============== */}
      <div className="md-grid">
        <div className="md-main">

          {tab === "overview" && (
            <>
              {/* Purpose */}
              <section className="card md-purpose">
                <header className="card-head">
                  <div>
                    <span className="eyebrow">الهدف من الاجتماع</span>
                    <h3 className="card-title-sm">ما الذي سيُناقَش</h3>
                  </div>
                  <span className="pill pill-blue">قرار للتصويت</span>
                </header>
                <p className="md-purpose-body">{meeting.purpose}</p>
                <ul className="md-purpose-outcomes">
                  <li><Icon.Check width="14" height="14"/> اعتماد المرحلة الثانية من الخطة الوطنية</li>
                  <li><Icon.Check width="14" height="14"/> المصادقة على البروتوكول المعدّل للتنسيق</li>
                  <li><Icon.Check width="14" height="14"/> تكليف فريق المتابعة الموحّد بالتنفيذ</li>
                </ul>
              </section>

              {/* Agenda preview (top 3) */}
              <section className="card">
                <header className="card-head">
                  <div>
                    <span className="eyebrow">جدول الأعمال</span>
                    <h3 className="card-title-sm">٤ بنود · المدة الكلية ساعتان</h3>
                  </div>
                  <a className="see-all-sm" onClick={() => setTab("agenda")}>عرض الكل ←</a>
                </header>
                <AgendaList items={agenda.slice(0, 3)} compact/>
              </section>

              {/* Two-up: timeline + decisions tracker */}
              <div className="md-two-up">
                <section className="card">
                  <header className="card-head"><div>
                    <span className="eyebrow">المسار الزمني</span>
                    <h3 className="card-title-sm">تحضير الاجتماع</h3>
                  </div></header>
                  <ol className="md-timeline">
                    {timeline.map((t, i) => (
                      <li key={i}>
                        <span className="md-tl-dot"/>
                        <span className="md-tl-date num">{t.t}</span>
                        <div>
                          <div className="md-tl-label">{t.label}</div>
                          <div className="md-tl-actor">{t.actor}</div>
                        </div>
                      </li>
                    ))}
                    <li className="md-tl-pending">
                      <span className="md-tl-dot md-tl-dot-pending"/>
                      <span className="md-tl-date num">١٣ مايو</span>
                      <div>
                        <div className="md-tl-label">انعقاد الاجتماع</div>
                        <div className="md-tl-actor">القاعة المخصصة · ١٠:٠٠</div>
                      </div>
                    </li>
                  </ol>
                </section>

                <section className="card">
                  <header className="card-head"><div>
                    <span className="eyebrow">قرارات سابقة ذات صلة</span>
                    <h3 className="card-title-sm">من جلسات اللجنة</h3>
                  </div></header>
                  <ul className="md-prev-decisions">
                    {decisionsPrev.map((d, i) => (
                      <li key={i}>
                        <div className="md-pd-num num">{d.num}</div>
                        <div className="md-pd-title">{d.title}</div>
                        {d.status === "executed"
                          ? <span className="pill pill-green">منفّذ</span>
                          : <span className="pill pill-amber">قيد المتابعة</span>}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </>
          )}

          {tab === "agenda" && (
            <section className="card">
              <header className="card-head">
                <div>
                  <span className="eyebrow">جدول الأعمال الكامل</span>
                  <h3 className="card-title-sm">{agenda.length} بنود · المدة المتوقعة ساعتان</h3>
                </div>
                <div className="md-agenda-legend">
                  <span><span className="md-bullet md-bullet-إجراء"/> إجراء</span>
                  <span><span className="md-bullet md-bullet-عرض"/> عرض</span>
                  <span><span className="md-bullet md-bullet-نقاش"/> نقاش</span>
                  <span><span className="md-bullet md-bullet-قرار"/> قرار</span>
                </div>
              </header>
              <AgendaList items={agenda}/>
            </section>
          )}

          {tab === "members" && (
            <section className="card">
              <header className="card-head">
                <div>
                  <span className="eyebrow">الحضور المتوقّع</span>
                  <h3 className="card-title-sm">{counts.invited} أعضاء مدعوّين · النصاب {counts.quorum}</h3>
                </div>
                <div className="md-rsvp-summary-mini">
                  <span><span className="dot dot-green"/> {counts.accepted} موافق</span>
                  <span><span className="dot dot-amber"/> {counts.tentative} مبدئي</span>
                  <span><span className="dot dot-red"/> {counts.declined} اعتذر</span>
                </div>
              </header>
              <ul className="md-members">
                {members.map((m, i) => (
                  <li key={i} className={`md-member md-member-${m.rsvp}`}>
                    <span className={`avatar-sm ${m.tone || ""}`}>{m.initials}</span>
                    <div className="md-member-info">
                      <div className="md-member-name">{m.name}</div>
                      <div className="md-member-role">{m.role}</div>
                    </div>
                    <div className="md-member-note">{m.note}</div>
                    <span className={`md-rsvp-pill md-rsvp-${m.rsvp}`}>
                      {m.rsvp === "accepted"  && <><Icon.Check width="12" height="12"/> أكّد</>}
                      {m.rsvp === "tentative" && <><Icon.Clock width="12" height="12"/> مبدئي</>}
                      {m.rsvp === "declined"  && <>اعتذر</>}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {tab === "docs" && (
            <section className="card">
              <header className="card-head">
                <div>
                  <span className="eyebrow">حزمة التحضير</span>
                  <h3 className="card-title-sm">{docs.length} مستندات · ٢ ملفات مصنّفة</h3>
                </div>
                <div className="md-docs-actions">
                  <button className="btn btn-soft btn-sm"><Icon.Download width="13" height="13"/> تنزيل الحزمة</button>
                  <button className="btn btn-secondary btn-sm">رفع جديد</button>
                </div>
              </header>
              <ul className="md-docs">
                {docs.map((d, i) => (
                  <li key={i} className={`md-doc ${d.priority ? "is-priority" : ""} ${d.locked ? "is-locked" : ""}`}>
                    <div className={`doc-icon doc-${d.type.toLowerCase() === "pdf" ? "pdf" : d.type.toLowerCase() === "doc" ? "doc" : "xls"}`}>{d.type}</div>
                    <div className="md-doc-body">
                      <div className="md-doc-name">
                        {d.name}
                        {d.priority && <span className="pill pill-blue" style={{marginInlineStart:8}}>ضروري</span>}
                        {d.classified && <span className="pill pill-burg" style={{marginInlineStart:6}}><Icon.Lock width="10" height="10"/> سري</span>}
                      </div>
                      <div className="md-doc-meta">
                        <span className="num">{d.size}</span>
                        {d.pages && <><span className="md-doc-sep">·</span><span className="num">{d.pages} صفحة</span></>}
                        <span className="md-doc-sep">·</span>
                        <span>{d.updated}</span>
                      </div>
                    </div>
                    <div className="md-doc-actions">
                      {d.locked
                        ? <span className="pill pill-gray"><Icon.Lock width="11" height="11"/> صلاحية أعلى</span>
                        : <>
                            <button className="iconbtn iconbtn-sm" title="معاينة"><Icon.Eye width="14" height="14"/></button>
                            <button className="iconbtn iconbtn-sm" title="تنزيل"><Icon.Download width="14" height="14"/></button>
                          </>}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {tab === "history" && (
            <>
              <section className="card">
                <header className="card-head"><div>
                  <span className="eyebrow">المسار الزمني الكامل</span>
                  <h3 className="card-title-sm">من إنشاء الاجتماع حتى الآن</h3>
                </div></header>
                <ol className="md-timeline md-timeline-wide">
                  {timeline.map((t, i) => (
                    <li key={i}>
                      <span className="md-tl-dot"/>
                      <span className="md-tl-date num">{t.t}</span>
                      <div>
                        <div className="md-tl-label">{t.label}</div>
                        <div className="md-tl-actor">{t.actor}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>

              <section className="card">
                <header className="card-head"><div>
                  <span className="eyebrow">اجتماعات ذات صلة</span>
                  <h3 className="card-title-sm">سلسلة جلسات اللجنة</h3>
                </div></header>
                <ul className="md-related">
                  <li>
                    <div className="md-rel-date"><b className="num">٠٦</b><span>مايو</span></div>
                    <div className="md-rel-body">
                      <div className="md-rel-title">الجلسة (٠٢) — اعتماد المرحلة الأولى</div>
                      <div className="md-rel-meta">منتهٍ · ٧ أعضاء · ٣ قرارات</div>
                    </div>
                    <span className="pill pill-gray">منتهٍ</span>
                  </li>
                  <li className="is-current">
                    <div className="md-rel-date"><b className="num">١٣</b><span>مايو</span></div>
                    <div className="md-rel-body">
                      <div className="md-rel-title">الجلسة (٠٣) — اعتماد المرحلة الثانية</div>
                      <div className="md-rel-meta">قادم · غداً · ٤ بنود</div>
                    </div>
                    <span className="pill pill-blue">الحالي</span>
                  </li>
                  <li>
                    <div className="md-rel-date"><b className="num">٢٧</b><span>مايو</span></div>
                    <div className="md-rel-body">
                      <div className="md-rel-title">الجلسة (٠٤) — مراجعة التقدّم في التنفيذ</div>
                      <div className="md-rel-meta">مقرر · بعد أسبوعين</div>
                    </div>
                    <span className="pill pill-outline">مجدول</span>
                  </li>
                </ul>
              </section>
            </>
          )}

        </div>

        {/* ============== SIDE ============== */}
        <aside className="md-side">
          {/* RSVP card */}
          <div className="card md-side-rsvp">
            <span className="eyebrow">إقرار الحضور</span>
            <h4 className="card-title-sm">هل ستحضر؟</h4>
            <p className="md-side-note">يُرجى تأكيد حضورك قبل بداية الاجتماع بـ٢٤ ساعة على الأقل لضمان النصاب.</p>
            <div className="md-rsvp-buttons">
              <button className="md-rsvp-btn is-active"><Icon.Check width="14" height="14"/> سأحضر</button>
              <button className="md-rsvp-btn">عن بُعد</button>
              <button className="md-rsvp-btn">اعتذار</button>
            </div>
          </div>

          {/* Location */}
          <div className="card md-side-loc">
            <div className="md-loc-map" aria-hidden="true">
              <div className="md-loc-grid"/>
              <div className="md-loc-pin"><Icon.Pin width="20" height="20"/></div>
              <div className="md-loc-ripple"/>
            </div>
            <div className="md-loc-body">
              <span className="eyebrow">المكان</span>
              <h4 className="md-loc-title">{meeting.location}</h4>
              <div className="md-loc-addr">{meeting.addr}</div>
              <div className="md-loc-extras">
                <span><Icon.Globe width="13" height="13"/> {meeting.online.platform}</span>
                <span className="md-loc-note">{meeting.online.note}</span>
              </div>
              <button className="btn btn-soft btn-sm btn-block" style={{marginTop:14}}>
                <Icon.Pin width="13" height="13"/> فتح الموقع على الخريطة
              </button>
            </div>
          </div>

          {/* Chair */}
          <div className="card md-side-chair">
            <span className="eyebrow">رئيس الجلسة</span>
            <div className="md-chair-row">
              <span className="avatar-sm tone-blue" style={{width:44, height:44, fontSize:14}}>ع.س</span>
              <div>
                <div className="md-chair-name">{meeting.chair}</div>
                <div className="md-chair-role">رئيس اللجنة · ١٤ سنة خبرة</div>
              </div>
            </div>
            <div className="md-chair-foot">
              <a><Icon.User width="13" height="13"/> الملف الشخصي</a>
            </div>
          </div>

          {/* Quick docs */}
          <div className="card">
            <header className="side-head">
              <span className="eyebrow">المستندات الأهم</span>
              <a className="see-all-sm" onClick={() => setTab("docs")}>الكل ←</a>
            </header>
            <ul className="doc-list" style={{marginTop:10}}>
              {docs.slice(0, 3).map((d, i) => (
                <li key={i}>
                  <div className={`doc-icon doc-${d.type.toLowerCase() === "pdf" ? "pdf" : d.type.toLowerCase() === "doc" ? "doc" : "xls"}`}>{d.type}</div>
                  <div className="doc-body">
                    <div className="doc-name">{d.name}</div>
                    <div className="doc-meta">{d.size}{d.pages ? ` · ${d.pages} صفحة` : ""}</div>
                  </div>
                  <button className="iconbtn iconbtn-sm"><Icon.Download width="14" height="14"/></button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}

/* =========================================================
   AGENDA LIST — reusable
   ========================================================= */
function AgendaList({ items, compact }) {
  return (
    <ol className="md-agenda">
      {items.map(a => (
        <li key={a.num} className={`md-ag ${a.decision ? "is-decision" : ""}`}>
          <div className="md-ag-num num">{a.num}</div>
          <div className="md-ag-body">
            <div className="md-ag-title">{a.title}</div>
            <div className="md-ag-meta">
              <span className={`md-ag-type md-bullet-${a.type}`}>
                <span className={`md-bullet md-bullet-${a.type}`}/> {a.type}
              </span>
              <span><Icon.User width="12" height="12"/> {a.presenter}</span>
              <span><Icon.Clock width="12" height="12"/> {a.duration}</span>
              {a.docs && <span className="md-ag-docs"><Icon.Documents width="12" height="12"/> {a.docs} مرفقات</span>}
              {a.decision && <span className="pill pill-burg" style={{marginInlineStart:"auto"}}>تصويت</span>}
            </div>
          </div>
          {!compact && (
            <button className="iconbtn iconbtn-sm" title="مزيد"><Icon.ChevronStart width="14" height="14" style={{transform:"rotate(180deg)"}}/></button>
          )}
        </li>
      ))}
    </ol>
  );
}

window.MeetingDetails = MeetingDetails;
