/* global React, Icon */

/* =========================================================
   SETTINGS — flat surfaces, no gradients
   ========================================================= */

const { useState: useStateSet } = React;

function Settings() {
  const [section, setSection] = useStateSet("account");
  const [twoFA, setTwoFA] = useStateSet(true);
  const [theme, setTheme] = useStateSet("light");
  const [density, setDensity] = useStateSet("comfortable");
  const [notif, setNotif] = useStateSet({
    meetings: true, decisions: true, recommendations: true,
    mentions: true, marketing: false, weekly: true,
  });

  const sections = [
    { id: "account",       label: "الحساب",                  icon: "User" },
    { id: "appearance",    label: "المظهر والعرض",            icon: "Eye" },
    { id: "notifications", label: "التنبيهات والإشعارات",     icon: "Bell" },
    { id: "security",      label: "الأمان وكلمة المرور",       icon: "Lock" },
    { id: "integrations",  label: "التكاملات الخارجية",        icon: "Globe" },
    { id: "language",      label: "اللغة والمنطقة",            icon: "Globe" },
  ];

  return (
    <>
      <div className="crumbs">
        <a data-back="dashboard"><Icon.ChevronStart width="14" height="14" style={{transform:"scaleX(-1)"}}/> رجوع</a>
        <span className="sep"/>
        <a data-nav="dashboard">الرئيسية</a><span className="sep">›</span>
        <span className="here">الإعدادات</span>
      </div>

      <div className="set-grid">
        {/* SIDEBAR */}
        <nav className="set-nav card">
          <span className="eyebrow">إعدادات النظام</span>
          <h3 className="card-title-sm" style={{marginBottom: 14}}>التحكم بحسابك</h3>
          <ul className="set-nav-list">
            {sections.map(s => {
              const Ic = Icon[s.icon] || Icon.Settings;
              return (
                <li key={s.id}>
                  <a className={`set-nav-link ${section === s.id ? "is-active" : ""}`} onClick={() => setSection(s.id)}>
                    <Ic width="16" height="16"/>
                    <span>{s.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="set-nav-foot">
            <button className="btn btn-burg-secondary btn-block btn-sm">
              <Icon.Lock width="13" height="13"/> تسجيل الخروج من جميع الجلسات
            </button>
          </div>
        </nav>

        {/* CONTENT */}
        <div className="set-main">

          {section === "account" && (
            <>
              <section className="card">
                <header className="card-head">
                  <div>
                    <span className="eyebrow">المعلومات الشخصية</span>
                    <h3 className="card-title-sm">بيانات الحساب</h3>
                  </div>
                  <button className="btn btn-soft btn-sm">حفظ التغييرات</button>
                </header>

                <div className="set-avatar-row">
                  <span className="avatar-lg" style={{width: 84, height: 84, background: "var(--c-blue)"}}>ع.ع</span>
                  <div className="set-avatar-info">
                    <div className="set-avatar-name">عبدالله بن حمد العطية</div>
                    <div className="set-avatar-role">أمين عام · مجلس الوزراء</div>
                    <div className="set-avatar-actions">
                      <button className="btn btn-secondary btn-sm">رفع صورة جديدة</button>
                      <button className="btn btn-ghost btn-sm">إزالة</button>
                    </div>
                  </div>
                </div>

                <div className="set-fields">
                  <div className="set-field">
                    <label>الاسم الكامل</label>
                    <input className="input" defaultValue="عبدالله بن حمد العطية"/>
                  </div>
                  <div className="set-field">
                    <label>المسمى الوظيفي</label>
                    <input className="input" defaultValue="أمين عام · مجلس الوزراء"/>
                  </div>
                  <div className="set-field">
                    <label>البريد الرسمي</label>
                    <input className="input" defaultValue="a.alattiyah@cm.gov.qa"/>
                  </div>
                  <div className="set-field">
                    <label>رقم الهاتف</label>
                    <input className="input num" defaultValue="+974 4406 1234" dir="ltr"/>
                  </div>
                  <div className="set-field set-field-full">
                    <label>نبذة مختصرة</label>
                    <textarea className="input set-textarea" rows="3" defaultValue="أمين عام مجلس الوزراء منذ 2022، يشرف على أعمال اللجان الوزارية وتنسيق القرارات والتوصيات."/>
                  </div>
                </div>
              </section>

              <section className="card">
                <header className="card-head">
                  <div>
                    <span className="eyebrow">العضويات</span>
                    <h3 className="card-title-sm">اللجان المرتبطة بحسابك</h3>
                  </div>
                </header>
                <ul className="set-list">
                  {[
                    { name: "اللجنة المالية العليا", role: "عضو", since: "2022" },
                    { name: "لجنة التحول الرقمي",   role: "مقرر", since: "2023" },
                    { name: "لجنة الشؤون القانونية", role: "عضو", since: "2024" },
                  ].map((c, i) => (
                    <li key={i} className="set-list-row">
                      <Icon.Committees width="16" height="16"/>
                      <div>
                        <div className="set-list-name">{c.name}</div>
                        <div className="set-list-meta">{c.role} · منذ {c.since}</div>
                      </div>
                      <button className="iconbtn iconbtn-sm"><Icon.More width="14" height="14"/></button>
                    </li>
                  ))}
                </ul>
              </section>
            </>
          )}

          {section === "appearance" && (
            <>
              <section className="card">
                <header className="card-head">
                  <div>
                    <span className="eyebrow">السمة</span>
                    <h3 className="card-title-sm">المظهر العام</h3>
                  </div>
                </header>
                <div className="set-theme-grid">
                  {[
                    { id: "light", label: "فاتح", bg: "#fff",            border: "#E3E8EC" },
                    { id: "dark",  label: "داكن", bg: "#161E26",         border: "#38434E" },
                    { id: "auto",  label: "تلقائي حسب النظام", bg: "linear-gradient(90deg,#fff 50%,#161E26 50%)", border: "#CED6DD" },
                  ].map(t => (
                    <button key={t.id} className={`set-theme ${theme === t.id ? "is-active" : ""}`} onClick={() => setTheme(t.id)}>
                      <span className="set-theme-swatch" style={{ background: t.bg, borderColor: t.border }}/>
                      <span className="set-theme-label">{t.label}</span>
                      {theme === t.id && <span className="set-theme-check"><Icon.Check width="13" height="13"/></span>}
                    </button>
                  ))}
                </div>
              </section>

              <section className="card">
                <header className="card-head">
                  <div>
                    <span className="eyebrow">الكثافة</span>
                    <h3 className="card-title-sm">مسافات الواجهة</h3>
                  </div>
                </header>
                <div className="set-radio-row">
                  {[
                    { id: "compact",    label: "متراص" },
                    { id: "comfortable",label: "مريح" },
                    { id: "spacious",   label: "واسع" },
                  ].map(d => (
                    <button key={d.id}
                      className={`set-radio ${density === d.id ? "is-active" : ""}`}
                      onClick={() => setDensity(d.id)}>
                      {d.label}
                    </button>
                  ))}
                </div>
              </section>
            </>
          )}

          {section === "notifications" && (
            <section className="card">
              <header className="card-head">
                <div>
                  <span className="eyebrow">قنوات التنبيه</span>
                  <h3 className="card-title-sm">اختر ما تريد أن تُنبَّه عنه</h3>
                </div>
                <button className="btn btn-soft btn-sm">حفظ</button>
              </header>
              <ul className="set-toggles">
                {[
                  { k: "meetings",        title: "الاجتماعات",            desc: "تذكير قبل الاجتماع بـ24 ساعة، وتغييرات في الجدول الزمني" },
                  { k: "decisions",       title: "القرارات الصادرة",      desc: "إشعار عند اعتماد قرار في لجنة تنتمي إليها" },
                  { k: "recommendations", title: "تحديثات التوصيات",      desc: "تقدّم التنفيذ، تجاوز المواعيد، طلبات تصعيد" },
                  { k: "mentions",        title: "الإشارات والتعليقات",   desc: "حين يُشار إليك في تعليق أو مهمة" },
                  { k: "weekly",          title: "ملخّص أسبوعي",          desc: "تقرير دوري بكل ما حدث في لجانك" },
                  { k: "marketing",       title: "تحديثات النظام",        desc: "مزايا جديدة، تحسينات، صيانة مجدولة" },
                ].map(t => (
                  <li key={t.k} className="set-toggle-row">
                    <div>
                      <div className="set-toggle-title">{t.title}</div>
                      <div className="set-toggle-desc">{t.desc}</div>
                    </div>
                    <button className={`set-toggle ${notif[t.k] ? "is-on" : ""}`}
                      onClick={() => setNotif({...notif, [t.k]: !notif[t.k]})}>
                      <span className="set-toggle-knob"/>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {section === "security" && (
            <>
              <section className="card">
                <header className="card-head">
                  <div>
                    <span className="eyebrow">كلمة المرور</span>
                    <h3 className="card-title-sm">تغيير كلمة المرور</h3>
                  </div>
                </header>
                <div className="set-fields">
                  <div className="set-field set-field-full">
                    <label>كلمة المرور الحالية</label>
                    <input className="input" type="password" defaultValue="••••••••••••"/>
                  </div>
                  <div className="set-field">
                    <label>كلمة المرور الجديدة</label>
                    <input className="input" type="password" placeholder="على الأقل 12 حرفاً"/>
                  </div>
                  <div className="set-field">
                    <label>تأكيد كلمة المرور</label>
                    <input className="input" type="password" placeholder="أعد إدخالها"/>
                  </div>
                </div>
                <div className="set-pw-meter">
                  <span>قوة كلمة المرور</span>
                  <div className="set-pw-bar">
                    <span style={{width: "70%"}}/>
                  </div>
                  <b>قوية</b>
                </div>
                <button className="btn btn-primary btn-sm" style={{marginTop: 14}}>حفظ كلمة المرور الجديدة</button>
              </section>

              <section className="card">
                <header className="card-head">
                  <div>
                    <span className="eyebrow">المصادقة الثنائية</span>
                    <h3 className="card-title-sm">طبقة أمان إضافية</h3>
                  </div>
                  <button className={`set-toggle ${twoFA ? "is-on" : ""}`} onClick={() => setTwoFA(!twoFA)}>
                    <span className="set-toggle-knob"/>
                  </button>
                </header>
                <p className="set-body">
                  عند تفعيل المصادقة الثنائية، سيُطلب منك إدخال رمز من تطبيق المصادقة (Google Authenticator أو Microsoft Authenticator) في كل محاولة تسجيل دخول جديدة.
                </p>
              </section>

              <section className="card">
                <header className="card-head">
                  <div>
                    <span className="eyebrow">الجلسات النشطة</span>
                    <h3 className="card-title-sm">الأجهزة المسجّل دخولها</h3>
                  </div>
                </header>
                <ul className="set-list">
                  {[
                    { dev: "MacBook Pro · Safari", loc: "الدوحة، قطر · IP 86.36.…", time: "الآن", current: true },
                    { dev: "iPhone 15 · Q-Connect", loc: "الدوحة، قطر · IP 86.36.…", time: "أمس ١٧:٤٣" },
                    { dev: "Windows · Chrome",     loc: "الدوحة، قطر · IP 217.18.…", time: "قبل 3 أيام" },
                  ].map((s, i) => (
                    <li key={i} className="set-list-row">
                      <Icon.Globe width="16" height="16"/>
                      <div>
                        <div className="set-list-name">{s.dev} {s.current && <span className="pill pill-green" style={{fontSize:10, marginInlineStart:6}}>الحالي</span>}</div>
                        <div className="set-list-meta">{s.loc} · {s.time}</div>
                      </div>
                      {!s.current && <button className="btn btn-ghost btn-sm">إنهاء الجلسة</button>}
                    </li>
                  ))}
                </ul>
              </section>
            </>
          )}

          {section === "integrations" && (
            <section className="card">
              <header className="card-head">
                <div>
                  <span className="eyebrow">التكاملات المتاحة</span>
                  <h3 className="card-title-sm">ربط الحساب بأنظمة أخرى</h3>
                </div>
              </header>
              <ul className="set-int-list">
                {[
                  { name: "Microsoft Outlook", desc: "مزامنة الاجتماعات مع تقويم Outlook", on: true },
                  { name: "Q-Connect",         desc: "البث المباشر للاجتماعات", on: true },
                  { name: "نظام النفاذ الموحّد",  desc: "تسجيل الدخول بالهوية الرقمية", on: true },
                  { name: "ديوان المحاسبة",     desc: "تبادل التقارير الرقابية", on: false },
                  { name: "نظام الموارد البشرية", desc: "مزامنة بيانات الأعضاء وعضوياتهم", on: false },
                ].map((it, i) => (
                  <li key={i} className="set-int">
                    <div className="set-int-icon"><Icon.Globe width="18" height="18"/></div>
                    <div>
                      <div className="set-int-name">{it.name}</div>
                      <div className="set-int-desc">{it.desc}</div>
                    </div>
                    {it.on
                      ? <span className="pill pill-green"><Icon.Check width="11" height="11"/> مفعّل</span>
                      : <button className="btn btn-soft btn-sm">ربط</button>}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {section === "language" && (
            <>
              <section className="card">
                <header className="card-head">
                  <div>
                    <span className="eyebrow">لغة الواجهة</span>
                    <h3 className="card-title-sm">اللغة المعروضة في النظام</h3>
                  </div>
                </header>
                <div className="set-radio-row">
                  <button className="set-radio is-active">العربية</button>
                  <button className="set-radio">English</button>
                </div>
              </section>

              <section className="card">
                <header className="card-head">
                  <div>
                    <span className="eyebrow">المنطقة الزمنية</span>
                    <h3 className="card-title-sm">توقيت الدوحة</h3>
                  </div>
                </header>
                <select className="input">
                  <option>(GMT+3) توقيت الدوحة</option>
                  <option>(GMT+4) توقيت الإمارات</option>
                  <option>(GMT) توقيت غرينتش</option>
                </select>
              </section>

              <section className="card">
                <header className="card-head">
                  <div>
                    <span className="eyebrow">تنسيق الأرقام والتاريخ</span>
                    <h3 className="card-title-sm">الخيارات الإقليمية</h3>
                  </div>
                </header>
                <div className="set-fields">
                  <div className="set-field">
                    <label>تنسيق الأرقام</label>
                    <div className="set-radio-row">
                      <button className="set-radio is-active">عربية شرقية (٠١٢)</button>
                      <button className="set-radio">عربية غربية (012)</button>
                    </div>
                  </div>
                  <div className="set-field">
                    <label>تنسيق التاريخ</label>
                    <div className="set-radio-row">
                      <button className="set-radio is-active">ميلادي</button>
                      <button className="set-radio">هجري</button>
                      <button className="set-radio">الاثنين معاً</button>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}

        </div>
      </div>
    </>
  );
}

window.Settings = Settings;
