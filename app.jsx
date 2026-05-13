/* global React, ReactDOM */
/* global Sidebar, Topbar, Dashboard, CommitteeDetail, MeetingDetail, Login, CommitteesList */
/* global TweaksPanel, useTweaks, TweakSection, TweakRadio */

const { useState } = React;

/* =========================================================
   APP SHELL — wraps a screen in the standard chrome
   ========================================================= */
function AppShell({ active, title, subtitle, children, lead }) {
  return (
    <div className="app" data-lead={lead}>
      <Sidebar active={active} lead={lead}/>
      <main className="main">
        <Topbar title={title} subtitle={subtitle}/>
        <div className="page">{children}</div>
      </main>
    </div>
  );
}

function LeadStyles({ lead }) {
  const map = {
    blue:     { primary: "var(--c-blue)",     accent: "var(--c-gold)" },
    burgundy: { primary: "var(--c-burgundy)", accent: "var(--c-gold)" },
    gold:     { primary: "var(--c-gold-700)", accent: "var(--c-burgundy)" },
  };
  const c = map[lead] || map.blue;
  return (
    <style>{`
      [data-lead="${lead}"] .btn-primary { background: ${c.primary}; }
      [data-lead="${lead}"] .btn-primary:hover { background: ${c.primary}; filter: brightness(0.92); }
      [data-lead="${lead}"] .navitem.is-active { color: ${c.primary}; background: color-mix(in oklch, ${c.primary} 8%, white); }
      [data-lead="${lead}"] .navitem.is-active::before { background: ${c.primary}; }
      [data-lead="${lead}"] .topbar::after { background: ${c.accent}; }
      [data-lead="${lead}"] .tab.is-active { color: ${c.primary}; border-bottom-color: ${c.accent}; }
      [data-lead="${lead}"] .brand-ar { color: ${c.primary}; }
    `}</style>
  );
}

/* =========================================================
   DEMO NAV — clickable screen switcher (floating top bar)
   ========================================================= */
const SCREENS = [
  { id: "login",            label: "تسجيل الدخول",     icon: "🔐" },
  { id: "dashboard",        label: "لوحة التحكم",       icon: "📊" },
  { id: "committees",       label: "اللجان",            icon: "🏛️" },
  { id: "committee-detail", label: "ملف لجنة",          icon: "📋" },
  { id: "meeting",          label: "إدارة الاجتماع",   icon: "🎙️" },
];

function DemoNav({ current, onChange }) {
  return (
    <div className="demo-nav">
      <div className="demo-nav-brand">
        <img src="assets/logo-mark.png" alt=""/>
        <div>
          <div className="demo-nav-title">منظومة اللجان الوزارية</div>
          <div className="demo-nav-sub">عرض تجريبي — اختر شاشة للعرض</div>
        </div>
      </div>
      <div className="demo-nav-tabs">
        {SCREENS.map(s => (
          <button key={s.id}
            className={`demo-tab ${current === s.id ? "is-active" : ""}`}
            onClick={() => onChange(s.id)}>
            <span className="demo-tab-icon">{s.icon}</span>
            <span>{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   ROOT — single-page demo with clickable navigation
   ========================================================= */
function Root() {
  const [tw, setTw] = useTweaks(/*EDITMODE-BEGIN*/{
    "lead": "blue"
  }/*EDITMODE-END*/);

  const [current, setCurrent] = useState("login");

  // Allow login button to advance to dashboard
  const goTo = (id) => {
    setCurrent(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Hook login button to navigate
  React.useEffect(() => {
    if (current !== "login") return;
    const t = setTimeout(() => {
      const btn = document.querySelector(".login-page .btn-primary, .login-page .btn-nas");
      if (btn) {
        btn.style.cursor = "pointer";
      }
      // Make all login buttons advance to dashboard
      document.querySelectorAll(".login-page button").forEach(b => {
        b.addEventListener("click", (e) => {
          if (b.classList.contains("login-eye")) return;
          e.preventDefault();
          goTo("dashboard");
        }, { once: true });
      });
    }, 100);
    return () => clearTimeout(t);
  }, [current]);

  const renderScreen = () => {
    switch (current) {
      case "login":
        return <Login/>;
      case "dashboard":
        return (
          <AppShell active="dashboard" lead={tw.lead}
            title="لوحة التحكم"
            subtitle="نظرة شاملة على مؤشرات اللجان والقرارات والاجتماعات">
            <Dashboard/>
          </AppShell>
        );
      case "committees":
        return (
          <AppShell active="committees" lead={tw.lead}
            title="اللجان الوزارية"
            subtitle="إدارة اللجان وربطها بقرارات التشكيل">
            <CommitteesList/>
          </AppShell>
        );
      case "committee-detail":
        return (
          <AppShell active="committees" lead={tw.lead}
            title="ملف اللجنة"
            subtitle="التفاصيل والاختصاصات والأعضاء والقرارات">
            <CommitteeDetail/>
          </AppShell>
        );
      case "meeting":
        return (
          <AppShell active="live" lead={tw.lead}
            title="إدارة أعمال الاجتماع"
            subtitle="جلسة جارية — جدول الأعمال والحضور والتصويت اللحظي">
            <MeetingDetail/>
          </AppShell>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <LeadStyles lead={tw.lead}/>
      <DemoNav current={current} onChange={goTo}/>
      <div className="demo-stage">
        {renderScreen()}
      </div>

      <TweaksPanel title="إعدادات التصميم">
        <TweakSection title="اللون القائد">
          <TweakRadio
            label="اختر اللون الأساسي للنظام"
            value={tw.lead}
            onChange={v => setTw("lead", v)}
            options={[
              { value: "blue",     label: "الأزرق (مؤسسي)" },
              { value: "burgundy", label: "العنابي (رسمي)" },
              { value: "gold",     label: "الذهبي (احتفالي)" },
            ]}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root/>);
