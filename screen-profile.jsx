/* global React, Icon */

/* =========================================================
   PROFILE — user profile, flat surfaces
   ========================================================= */

const { useState: useStatePF } = React;

function Profile() {
  const [tab, setTab] = useStatePF("overview");

  const user = {
    name: "عبدالله بن حمد العطية",
    role: "أمين عام · مجلس الوزراء",
    initials: "ع.ع",
    title: "أمين عام مجلس الوزراء",
    org: "مجلس الوزراء · دولة قطر",
    email: "a.alattiyah@cm.gov.qa",
    phone: "+974 4406 1234",
    joined: "مارس 2022",
    location: "الدوحة، قطر",
  };

  const stats = [
    { label: "اجتماعات حضرها", val: "284",  sub: "خلال 2026" },
    { label: "قرارات شارك فيها", val: "412", sub: "كأمين سر أو عضو" },
    { label: "توصيات تتابعها", val: "37",   sub: "قيد التنفيذ" },
    { label: "اللجان النشطة",  val: "5",    sub: "عضو دائم في ٣، مقرر في ٢" },
  ];

  const committees = [
    { name: "اللجنة المالية العليا", role: "عضو دائم", since: "2022", tone: "burg", mark: "م", attend: 96 },
    { name: "لجنة التحول الرقمي",   role: "مقرر",      since: "2023", tone: "blue", mark: "ت", attend: 92 },
    { name: "لجنة الشؤون القانونية", role: "عضو دائم", since: "2024", tone: "gold", mark: "ق", attend: 88 },
    { name: "لجنة الأمن الوطني",     role: "عضو مؤقت", since: "2025", tone: "burg", mark: "أ", attend: 78 },
    { name: "لجنة الإسكان والمدن",   role: "مقرر",      since: "2025", tone: "blue", mark: "إ", attend: 84 },
  ];

  const activity = [
    { t: "اليوم ١٤:٢٢", action: "اعتمد قرار",  body: "اعتماد تعديلات اللائحة المالية للوزارات والهيئات الحكومية", tag: "اللجنة المالية العليا" },
    { t: "اليوم ٠٩:٤٠", action: "حضر اجتماع", body: "جلسة الربع الثاني — مراجعة الأداء المالي", tag: "اللجنة المالية العليا" },
    { t: "أمس ١٧:٠٥",  action: "أضاف تعليق", body: "ملاحظة على توصية ٢٠٢٦/١٤/٠١ — الهوية الرقمية الموحدة", tag: "لجنة التحول الرقمي" },
    { t: "أمس ١١:٣٠",  action: "وقّع محضراً", body: "محضر اجتماع لجنة الشؤون القانونية رقم (٤٢)", tag: "لجنة الشؤون القانونية" },
    { t: "٠٩ مايو",     action: "رفع تقرير",  body: "تقرير الأداء الربعي — الربع الأول ٢٠٢٦", tag: "الأمانة العامة" },
    { t: "٠٨ مايو",     action: "صوّت",       body: "تصويت بالموافقة على إقرار البرنامج التحفيزي للقطاع الخاص", tag: "اللجنة المالية العليا" },
  ];

  const upcoming = [
    { d: "13", m: "مايو", w: "غداً", time: "10:00", title: "إقرار خطة الاستجابة للطوارئ الوطنية", c: "لجنة الأمن الوطني" },
    { d: "25", m: "مايو", w: "الإثنين", time: "09:30", title: "مراجعة مذكرة وزارة المالية حول الموازنة", c: "اللجنة المالية العليا" },
    { d: "02", m: "يونيو", w: "الإثنين", time: "11:00", title: "تطوير منصة الخدمات الحكومية الموحدة", c: "لجنة التحول الرقمي" },
  ];

  const sTab = (id, label) => (
    <a className={`tab ${tab === id ? "is-active" : ""}`} onClick={() => setTab(id)}>{label}</a>
  );

  return (
    <>
      <div className="crumbs">
        <a data-back="dashboard"><Icon.ChevronStart width="14" height="14" style={{transform:"scaleX(-1)"}}/> رجوع</a>
        <span className="sep"/>
        <a data-nav="dashboard">الرئيسية</a><span className="sep">›</span>
        <span className="here">الملف الشخصي</span>
      </div>

      {/* HEADER */}
      <section className="pf-hero">
        <div className="pf-hero-stripe" aria-hidden="true"/>
        <div className="pf-hero-main">
          <span className="avatar-lg pf-avatar" style={{background: "var(--c-blue)"}}>
            <img src="assets/avatar-placeholder.svg" alt=""/>
            <span aria-hidden="true">{user.initials}</span>
          </span>
          <div className="pf-hero-info">
            <h1 className="pf-hero-name">{user.name}</h1>
            <div className="pf-hero-title">{user.title}</div>
            <div className="pf-hero-meta">
              <span><Icon.Building width="13" height="13"/> {user.org}</span>
              <span><Icon.Pin width="13" height="13"/> {user.location}</span>
              <span><Icon.Calendar width="13" height="13"/> منذ {user.joined}</span>
            </div>
          </div>
          <div className="pf-hero-actions">
            <button className="btn btn-soft btn-sm">إرسال رسالة</button>
            <button className="btn btn-secondary btn-sm" data-nav="settings"><Icon.Settings width="13" height="13"/> الإعدادات</button>
          </div>
        </div>
        <div className="pf-contact">
          <div><span className="pf-ct-lbl">البريد</span><span className="pf-ct-val">{user.email}</span></div>
          <div><span className="pf-ct-lbl">الهاتف</span><span className="pf-ct-val num">{user.phone}</span></div>
          <div><span className="pf-ct-lbl">الجهة</span><span className="pf-ct-val">{user.org}</span></div>
          <div><span className="pf-ct-lbl">المعرّف</span><span className="pf-ct-val num">USR-2026-014</span></div>
        </div>
      </section>

      {/* STATS */}
      <div className="pf-stats">
        {stats.map((s, i) => (
          <div key={i} className="pf-stat">
            <div className="pf-stat-val num">{s.val}</div>
            <div className="pf-stat-lab">{s.label}</div>
            <div className="pf-stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* TABS */}
      <div className="pf-tabs tabs">
        {sTab("overview",   "نظرة عامة")}
        {sTab("committees", `العضويات · ${committees.length}`)}
        {sTab("activity",   "النشاط")}
        {sTab("schedule",   "الجدول")}
      </div>

      <div className="pf-grid">
        <div className="pf-main">

          {tab === "overview" && (
            <>
              <section className="card">
                <header className="card-head">
                  <div>
                    <span className="eyebrow">آخر نشاط</span>
                    <h3 className="card-title-sm">ما قمت به مؤخراً</h3>
                  </div>
                  <a className="see-all-sm" onClick={() => setTab("activity")}>عرض الكل ←</a>
                </header>
                <ul className="pf-activity">
                  {activity.slice(0, 4).map((a, i) => (
                    <li key={i}>
                      <span className="pf-act-dot"/>
                      <div className="pf-act-body">
                        <div className="pf-act-head">
                          <span className="pf-act-action">{a.action}</span>
                          <span className="pf-act-time">{a.t}</span>
                        </div>
                        <div className="pf-act-text">{a.body}</div>
                        <span className="pf-act-tag">{a.tag}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="card">
                <header className="card-head">
                  <div>
                    <span className="eyebrow">العضويات الرئيسية</span>
                    <h3 className="card-title-sm">اللجان النشطة</h3>
                  </div>
                  <a className="see-all-sm" onClick={() => setTab("committees")}>الكل ←</a>
                </header>
                <ul className="pf-committees">
                  {committees.slice(0, 3).map((c, i) => (
                    <li key={i}>
                      <span className={`cd-mark cd-mark-${c.tone}`} style={{width: 44, height: 44, fontSize: 18}}>{c.mark}</span>
                      <div className="pf-cm-info">
                        <div className="pf-cm-name">{c.name}</div>
                        <div className="pf-cm-role">{c.role} · منذ {c.since}</div>
                      </div>
                      <div className="pf-cm-attend">
                        <div className="num">{c.attend}%</div>
                        <span>حضور</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            </>
          )}

          {tab === "committees" && (
            <section className="card">
              <header className="card-head">
                <div>
                  <span className="eyebrow">جميع العضويات</span>
                  <h3 className="card-title-sm">{committees.length} لجان</h3>
                </div>
              </header>
              <ul className="pf-committees">
                {committees.map((c, i) => (
                  <li key={i}>
                    <span className={`cd-mark cd-mark-${c.tone}`} style={{width: 48, height: 48, fontSize: 20}}>{c.mark}</span>
                    <div className="pf-cm-info">
                      <div className="pf-cm-name">{c.name}</div>
                      <div className="pf-cm-role">
                        <span className={`pill ${c.role === "مقرر" ? "pill-blue" : c.role === "عضو دائم" ? "pill-burg" : "pill-amber"}`}>{c.role}</span>
                        <span style={{marginInlineStart: 8, color: "var(--c-ink-3)", fontSize: 11.5}}>منذ {c.since}</span>
                      </div>
                    </div>
                    <div className="pf-cm-attend">
                      <div className="num">{c.attend}%</div>
                      <span>حضور</span>
                    </div>
                    <button className="btn btn-soft btn-sm">عرض</button>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {tab === "activity" && (
            <section className="card">
              <header className="card-head">
                <div>
                  <span className="eyebrow">سجل النشاط</span>
                  <h3 className="card-title-sm">{activity.length} حدثاً</h3>
                </div>
                <button className="btn btn-ghost btn-sm"><Icon.Filter width="13" height="13"/> تصفية</button>
              </header>
              <ul className="pf-activity">
                {activity.map((a, i) => (
                  <li key={i}>
                    <span className="pf-act-dot"/>
                    <div className="pf-act-body">
                      <div className="pf-act-head">
                        <span className="pf-act-action">{a.action}</span>
                        <span className="pf-act-time">{a.t}</span>
                      </div>
                      <div className="pf-act-text">{a.body}</div>
                      <span className="pf-act-tag">{a.tag}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {tab === "schedule" && (
            <section className="card">
              <header className="card-head">
                <div>
                  <span className="eyebrow">الاجتماعات القادمة</span>
                  <h3 className="card-title-sm">{upcoming.length} اجتماعات</h3>
                </div>
                <button className="btn btn-soft btn-sm"><Icon.Calendar width="13" height="13"/> فتح التقويم</button>
              </header>
              <ul className="pf-schedule">
                {upcoming.map((u, i) => (
                  <li key={i}>
                    <div className="pf-sch-date">
                      <b className="num">{u.d}</b>
                      <span>{u.m}</span>
                      <i>{u.w}</i>
                    </div>
                    <div className="pf-sch-body">
                      <div className="pf-sch-title">{u.title}</div>
                      <div className="pf-sch-meta"><span className="num">{u.time}</span> · {u.c}</div>
                    </div>
                    <button className="btn btn-soft btn-sm">عرض</button>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* SIDE */}
        <aside className="pf-side">
          <div className="card">
            <span className="eyebrow">الصلاحيات</span>
            <h4 className="card-title-sm" style={{marginTop: 6}}>مستوى الوصول</h4>
            <ul className="pf-perms">
              <li><Icon.Check width="14" height="14"/> إنشاء الاجتماعات وإدارتها</li>
              <li><Icon.Check width="14" height="14"/> رفع وتعديل المستندات</li>
              <li><Icon.Check width="14" height="14"/> اعتماد القرارات</li>
              <li><Icon.Check width="14" height="14"/> مراجعة التقارير السرية</li>
              <li className="is-muted"><Icon.Lock width="14" height="14"/> إدارة الأعضاء (يتطلب موافقة)</li>
            </ul>
          </div>

          <div className="card">
            <span className="eyebrow">الإنجازات</span>
            <h4 className="card-title-sm" style={{marginTop: 6}}>أرقام لافتة</h4>
            <ul className="pf-perms">
              <li><Icon.Quorum width="14" height="14"/> أعلى حضور — 96% في اللجنة المالية</li>
              <li><Icon.Tasks width="14" height="14"/> ٤١٢ قراراً مشاركاً فيه</li>
              <li><Icon.Decisions width="14" height="14"/> ٣٧ توصية يتابعها حالياً</li>
            </ul>
          </div>

          <div className="card">
            <span className="eyebrow">إدارة الحساب</span>
            <h4 className="card-title-sm" style={{marginTop: 6, marginBottom: 12}}>إجراءات سريعة</h4>
            <div style={{display: "flex", flexDirection: "column", gap: 8}}>
              <button className="btn btn-soft btn-sm btn-block" data-nav="settings"><Icon.Settings width="13" height="13"/> الإعدادات</button>
              <button className="btn btn-secondary btn-sm btn-block"><Icon.Download width="13" height="13"/> تنزيل ملفي الشخصي</button>
              <button className="btn btn-burg-secondary btn-sm btn-block"><Icon.Lock width="13" height="13"/> تسجيل الخروج</button>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

window.Profile = Profile;
