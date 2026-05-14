/* global React */
const { useState } = React;

/* =========================================================
   SHARED ICONS — minimal line set, currentColor
   ========================================================= */
const Icon = {
  Dashboard: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/>
      <rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>
    </svg>
  ),
  Committees: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 21V10l9-6 9 6v11"/><path d="M9 21v-6h6v6"/><path d="M3 21h18"/>
    </svg>
  ),
  Meetings: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18"/><path d="M8 3v4M16 3v4"/>
    </svg>
  ),
  Decisions: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
    </svg>
  ),
  Members: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M22 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
    </svg>
  ),
  Documents: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/>
      <path d="M9 13h6M9 17h6M9 9h2"/>
    </svg>
  ),
  Reports: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 5-6"/>
    </svg>
  ),
  Tasks: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M8 10l3 3 5-6"/><path d="M3 8h18"/>
    </svg>
  ),
  Settings: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"/>
    </svg>
  ),
  Search: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>
    </svg>
  ),
  Bell: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 01-3.4 0"/>
    </svg>
  ),
  Globe: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/>
    </svg>
  ),
  Plus: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 5v14M5 12h14"/>
    </svg>
  ),
  ChevronDown: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M6 9l6 6 6-6"/>
    </svg>
  ),
  ChevronStart: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M15 18l-6-6 6-6"/>
    </svg>
  ),
  Calendar: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/>
    </svg>
  ),
  Clock: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>
    </svg>
  ),
  Pin: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 21s7-7.5 7-12a7 7 0 10-14 0c0 4.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>
    </svg>
  ),
  Download: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>
    </svg>
  ),
  Filter: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M22 3H2l8 9.5V19l4 2v-8.5z"/>
    </svg>
  ),
  More: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="1.2"/><circle cx="19" cy="12" r="1.2"/><circle cx="5" cy="12" r="1.2"/>
    </svg>
  ),
  Lock: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/>
    </svg>
  ),
  User: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  Check: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M20 6L9 17l-5-5"/>
    </svg>
  ),
  Crown: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 7l4 4 5-7 5 7 4-4v11H3z"/>
    </svg>
  ),
  Eye: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  Building: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M8 7h2M8 11h2M8 15h2M14 7h2M14 11h2M14 15h2"/>
    </svg>
  ),
  Warning: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18v.01"/>
    </svg>
  ),
  Quorum: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="9" cy="9" r="3"/><circle cx="17" cy="11" r="2.5"/><path d="M3 20a6 6 0 0112 0"/><path d="M14 20a4 4 0 017-2.6"/>
    </svg>
  ),
};

/* =========================================================
   GOV EMBLEM — official Council of Ministers logo
   ========================================================= */
function GovEmblem({ size = 52, variant = "mark" }) {
  const src = "assets/logo-official.png";
  return (
    <img src={src} alt="State of Qatar — Council of Ministers"
      style={{ width: size, height: size, objectFit: "contain", display: "block" }}/>
  );
}

/* =========================================================
   SIDEBAR
   ========================================================= */
function Sidebar({ active = "dashboard", lead = "blue", onNav }) {
  const groups = [
    { title: "لوحة المعلومات", items: [
      { id: "dashboard",  label: "لوحة التحكم",                Icon: Icon.Dashboard },
      { id: "intel",      label: "مؤشرات وتحليلات تنفيذية",   Icon: Icon.Reports },
      { id: "alerts",     label: "التنبيهات",                  Icon: Icon.Bell, badge: "5" },
    ]},
    { title: "اللجان", items: [
      { id: "committees", label: "اللجان",                     Icon: Icon.Committees, badge: "18" },
      { id: "formation",  label: "قرارات تشكيل اللجان",        Icon: Icon.Documents },
    ]},
    { title: "الاجتماعات", items: [
      { id: "meetings",   label: "الاجتماعات",                 Icon: Icon.Meetings, badge: "3" },
      { id: "newmeeting", label: "إنشاء اجتماع",               Icon: Icon.Plus },
      { id: "live",       label: "إدارة أعمال الاجتماع",       Icon: Icon.Pin },
      { id: "agenda",     label: "إدارة جدول الأعمال",        Icon: Icon.Tasks },
    ]},
    { title: "الموضوعات والمهام", items: [
      { id: "referred",   label: "الموضوعات المحالة",          Icon: Icon.Decisions },
      { id: "incoming",   label: "الموضوعات الواردة",          Icon: Icon.Download },
      { id: "review",     label: "مراجعة الموضوعات",           Icon: Icon.Check },
    ]},
    { title: "التوصيات والمتابعة", items: [
      { id: "recs",       label: "التوصيات",                   Icon: Icon.Decisions },
      { id: "tracking",   label: "متابعة تنفيذ التوصيات",     Icon: Icon.Clock },
    ]},
    { title: "الأعضاء والتقارير", items: [
      { id: "members",    label: "الأعضاء",                    Icon: Icon.Members },
      { id: "reports",    label: "التقارير والأرشفة",          Icon: Icon.Reports },
    ]},
  ];
  const items = groups.flatMap(g => g.items);

  const leadColor =
    lead === "burgundy" ? "var(--c-burgundy)" :
    lead === "gold"     ? "var(--c-gold)" :
                          "var(--c-blue)";

  return (
    <aside className="sidebar" style={{ "--lead": leadColor }}>
      {/* Deep blue brand header — ministerial gravitas */}
      <div className="sidebar-brand">
        <div className="brand-watermark" aria-hidden="true">
          <GovEmblem size={140} variant="mark"/>
        </div>
        <div className="brand-emblem">
          <GovEmblem size={108} variant="mark"/>
        </div>
        <div className="brand-text">
          <div className="brand-ar">الأمانة العامة لمجلس الوزراء</div>
          <div className="brand-en">Council of Ministers · Qatar</div>
        </div>
        <div className="brand-system">
          <span className="brand-system-rule" aria-hidden="true"/>
          <span className="brand-system-label">منظومة اللجان الوزارية</span>
        </div>
        <a className="brand-meetings-today" data-nav="meetings-reports">
          <span className="bmt-dot"/>
          <span className="bmt-text"><span className="num">4</span> اجتماعات اليوم</span>
        </a>
      </div>

      <nav className="sidebar-nav">
        {groups.map((g, gi) => (
          <div key={gi} className="navgroup">
            <div className="navgroup-title">{g.title}</div>
            {g.items.map(it => (
              <a key={it.id}
                 className={`navitem ${active === it.id ? "is-active" : ""}`}
                 onClick={(e) => { e.preventDefault(); onNav && onNav(it.id); }}
                 style={{ cursor: "pointer" }}>
                <span className="navitem-icon"><it.Icon width="18" height="18"/></span>
                <span className="navitem-label">{it.label}</span>
                {it.badge && <span className="navitem-badge">{it.badge}</span>}
              </a>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-foot">
        <a className="navitem">
          <span className="navitem-icon"><Icon.Settings width="18" height="18"/></span>
          <span className="navitem-label">الإعدادات</span>
        </a>
        <div className="sidebar-foot-meta">
          <span>الإصدار 4.2.0</span>
          <span className="dot-mid">·</span>
          <span>مايو 2026</span>
        </div>
      </div>
    </aside>
  );
}

/* =========================================================
   TOPBAR
   ========================================================= */
function Topbar({ title = "لوحة المعلومات", subtitle = "نظرة شاملة على نشاط اللجان", onNav }) {
  // Western numeral date — manually compose in Arabic months but with Western digits
  const d = new Date();
  const arDays = ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"];
  const arMonths = ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"];
  const dateLabel = `${arDays[d.getDay()]}، ${d.getDate()} ${arMonths[d.getMonth()]} ${d.getFullYear()}`;
  return (
    <header className="topbar">
      <div className="topbar-row topbar-row-1">
        <div className="topbar-titles">
          <div className="topbar-eyebrow">
            <span className="topbar-eyebrow-rule"/>
            <span>{dateLabel}</span>
            <span className="topbar-eyebrow-dot">·</span>
            <span>{d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })} توقيت الدوحة</span>
          </div>
          <h1 className="page-title">{title}</h1>
          <div className="page-sub">{subtitle}</div>
        </div>

        <div className="topbar-actions">
          <div className="search">
            <Icon.Search width="16" height="16"/>
            <input placeholder="ابحث في اللجان والاجتماعات والقرارات…"/>
            <kbd>Ctrl K</kbd>
          </div>
          <button className="iconbtn iconbtn-onblue" title="اللغة" aria-label="Language"><span className="lang">EN</span></button>
          <button className="iconbtn iconbtn-onblue" title="المساعدة" aria-label="Help">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 015 0c0 1.5-2.5 2-2.5 4M12 17v.01"/></svg>
          </button>
          <button className="iconbtn iconbtn-onblue iconbtn-bell" title="الإشعارات" onClick={() => onNav && onNav("alerts")}>
            <Icon.Bell width="18" height="18"/>
            <span className="dot-notif"></span>
          </button>
          <div className="userchip userchip-onblue" style={{cursor: "pointer"}}>
            <div className="avatar">
              <img src="assets/avatar-placeholder.svg" alt=""/>
              <span aria-hidden="true">ع.ع</span>
            </div>
            <div className="userinfo">
              <div className="uname">عبدالله بن حمد العطية</div>
              <div className="urole">أمين عام · مجلس الوزراء</div>
            </div>
            <Icon.ChevronDown width="14" height="14"/>
          </div>
        </div>
      </div>
    </header>
  );
}

/* =========================================================
   EXPORT
   ========================================================= */
Object.assign(window, { Icon, GovEmblem, Sidebar, Topbar });
