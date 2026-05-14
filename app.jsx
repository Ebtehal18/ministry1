/* global React, ReactDOM */
/* global Sidebar, Topbar, Dashboard, CommitteeDetail, MeetingDetail, Login, CommitteesList, MeetingsReports, Recommendations, Members, Analytics, FormationDecrees, Notifications, ScreenPlaceholder, AgendaBuilder, ExecutionTracking, ReportsArchive, Topics, CreateMeeting */
/* global TweaksPanel, useTweaks, TweakSection, TweakRadio */

const { useState } = React;

/* =========================================================
   APP SHELL — wraps a screen in the standard chrome
   ========================================================= */
function AppShell({ active, title, subtitle, children, lead, onNav }) {
  return (
    <div className="app" data-lead={lead}>
      <Sidebar active={active} lead={lead} onNav={onNav}/>
      <main className="main">
        <Topbar title={title} subtitle={subtitle} onNav={onNav}/>
        <div className="page">{children}</div>
      </main>
    </div>
  );
}

/* Map sidebar item IDs → screen IDs we render */
const SIDEBAR_TO_SCREEN = {
  dashboard:  "dashboard",
  intel:      "analytics",
  alerts:     "alerts",
  committees: "committees",
  formation:  "decrees",
  meetings:   "meetings-reports",
  live:       "meeting",
  agenda:     "agenda",
  referred:   "referred",
  incoming:   "incoming",
  review:     "review",
  recs:       "recommendations",
  tracking:   "tracking",
  members:    "members",
  reports:    "reports",
  newmeeting: "create-meeting",
};

function LeadStyles({ lead }) {
  const map = {
    blue:     { primary: "var(--c-blue)",     accent: "var(--c-burgundy)" },
    burgundy: { primary: "var(--c-burgundy)", accent: "var(--c-blue)" },
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
  { id: "login",            label: "تسجيل الدخول",     I: "Lock" },
  { id: "dashboard",        label: "لوحة التحكم",       I: "Dashboard" },
  { id: "committees",       label: "اللجان",            I: "Committees" },
  { id: "committee-detail", label: "ملف لجنة",          I: "Documents" },
  { id: "meeting",          label: "إدارة الاجتماع",   I: "Pin" },
  { id: "meetings-reports", label: "الاجتماعات",        I: "Calendar" },
  { id: "recommendations",  label: "التوصيات",          I: "Decisions" },
  { id: "members",          label: "الأعضاء",           I: "Members" },
  { id: "analytics",        label: "المؤشرات",          I: "Reports" },
  { id: "decrees",          label: "قرارات التشكيل",    I: "Documents" },
  { id: "alerts",           label: "التنبيهات",         I: "Bell" },
  { id: "agenda",           label: "بناء الجدول",       I: "Tasks" },
  { id: "tracking",         label: "متابعة التنفيذ",    I: "Clock" },
  { id: "reports",          label: "الأرشيف",           I: "Reports" },
];

function DemoNav() { return null; }

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
    // Translate sidebar IDs to screen IDs if needed
    const screen = SIDEBAR_TO_SCREEN[id] || id;
    setCurrent(screen);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Convert Arabic-Indic digits → Western digits app-wide
  React.useEffect(() => {
    const map = { "٠":"0","١":"1","٢":"2","٣":"3","٤":"4","٥":"5","٦":"6","٧":"7","٨":"8","٩":"9","۰":"0","۱":"1","۲":"2","۳":"3","۴":"4","۵":"5","۶":"6","۷":"7","۸":"8","۹":"9" };
    const re = /[\u0660-\u0669\u06f0-\u06f9]/g;
    const convert = (root) => {
      const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
      const nodes = [];
      while (w.nextNode()) nodes.push(w.currentNode);
      nodes.forEach(n => {
        if (re.test(n.nodeValue)) n.nodeValue = n.nodeValue.replace(re, ch => map[ch] || ch);
      });
    };
    const run = () => { try { convert(document.body); } catch(e){} };
    const t = setTimeout(run, 50);
    const obs = new MutationObserver(() => { clearTimeout(window.__numT); window.__numT = setTimeout(run, 60); });
    obs.observe(document.body, { childList: true, subtree: true, characterData: true });
    return () => { clearTimeout(t); obs.disconnect(); };
  }, []);

  // Hook "create meeting" buttons globally to navigate to create-meeting screen
  React.useEffect(() => {
    const handler = (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      const txt = (btn.textContent || "").trim();
      if ((txt.includes("إنشاء اجتماع") || txt.includes("اجتماع جديد")) && !btn.closest(".topbar")) {
        e.preventDefault();
        e.stopPropagation();
        const screen = SIDEBAR_TO_SCREEN["newmeeting"];
        setCurrent(screen);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, []);

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
          <AppShell active="dashboard" lead={tw.lead} onNav={goTo}
            title="لوحة التحكم"
            subtitle="نظرة شاملة على مؤشرات اللجان والقرارات والاجتماعات">
            <Dashboard/>
          </AppShell>
        );
      case "committees":
        return (
          <AppShell active="committees" lead={tw.lead} onNav={goTo}
            title="اللجان الوزارية"
            subtitle="إدارة اللجان وربطها بقرارات التشكيل">
            <CommitteesList/>
          </AppShell>
        );
      case "committee-detail":
        return (
          <AppShell active="committees" lead={tw.lead} onNav={goTo}
            title="ملف اللجنة"
            subtitle="التفاصيل والاختصاصات والأعضاء والقرارات">
            <CommitteeDetail/>
          </AppShell>
        );
      case "meeting":
        return (
          <AppShell active="live" lead={tw.lead} onNav={goTo}
            title="إدارة أعمال الاجتماع"
            subtitle="جلسة جارية — جدول الأعمال والحضور والتصويت اللحظي">
            <MeetingDetail/>
          </AppShell>
        );
      case "meetings-reports":
        return (
          <AppShell active="meetings" lead={tw.lead} onNav={goTo}
            title="الاجتماعات"
            subtitle="جدول الاجتماعات القادمة، الجارية، وأرشيف المحاضر">
            <MeetingsReports/>
          </AppShell>
        );
      case "recommendations":
        return (
          <AppShell active="recs" lead={tw.lead} onNav={goTo}
            title="القرارات والتوصيات"
            subtitle="متابعة تنفيذ القرارات والتوصيات الصادرة عن اللجان">
            <Recommendations/>
          </AppShell>
        );
      case "members":
        return (
          <AppShell active="members" lead={tw.lead} onNav={goTo}
            title="الأعضاء"
            subtitle="دليل أعضاء اللجان الوزارية وعضوياتهم">
            <Members/>
          </AppShell>
        );
      case "analytics":
        return (
          <AppShell active="intel" lead={tw.lead} onNav={goTo}
            title="المؤشرات والتحليلات التنفيذية"
            subtitle="نظرة شاملة على أداء اللجان والقرارات والحضور">
            <Analytics/>
          </AppShell>
        );
      case "decrees":
        return (
          <AppShell active="formation" lead={tw.lead} onNav={goTo}
            title="قرارات تشكيل اللجان"
            subtitle="السجل الموثّق للقرارات الأميرية والوزارية المنظِّمة لأعمال اللجان">
            <FormationDecrees/>
          </AppShell>
        );
      case "alerts":
        return (
          <AppShell active="alerts" lead={tw.lead} onNav={goTo}
            title="التنبيهات"
            subtitle="مركز التنبيهات والإشعارات الصادرة من النظام واللجان">
            <Notifications/>
          </AppShell>
        );
      case "agenda":
        return (
          <AppShell active="agenda" lead={tw.lead} onNav={goTo}
            title="إدارة جدول الأعمال"
            subtitle="بناء جداول أعمال الاجتماعات وترتيب البنود">
            <AgendaBuilder/>
          </AppShell>
        );
      case "create-meeting":
        return (
          <AppShell active="newmeeting" lead={tw.lead} onNav={goTo}
            title="إنشاء اجتماع جديد"
            subtitle="إعداد ودعوة لاجتماع لجنة">
            <CreateMeeting/>
          </AppShell>
        );
      case "referred":
        return (
          <AppShell active="referred" lead={tw.lead} onNav={goTo}
            title="الموضوعات المحالة"
            subtitle="الموضوعات المحالة إلى اللجان من جهات الاختصاص">
            <Topics view="referred"/>
          </AppShell>
        );
      case "incoming":
        return (
          <AppShell active="incoming" lead={tw.lead} onNav={goTo}
            title="الموضوعات الواردة"
            subtitle="الموضوعات الواردة من الوزارات والجهات الحكومية">
            <Topics view="incoming"/>
          </AppShell>
        );
      case "review":
        return (
          <AppShell active="review" lead={tw.lead} onNav={goTo}
            title="مراجعة الموضوعات"
            subtitle="فحص ومراجعة الموضوعات قبل عرضها على اللجان">
            <Topics view="review"/>
          </AppShell>
        );
      case "tracking":
        return (
          <AppShell active="tracking" lead={tw.lead} onNav={goTo}
            title="متابعة تنفيذ التوصيات"
            subtitle="تتبع تقدم تنفيذ التوصيات من قبل الجهات المعنية">
            <ExecutionTracking/>
          </AppShell>
        );
      case "reports":
        return (
          <AppShell active="reports" lead={tw.lead} onNav={goTo}
            title="التقارير والأرشفة"
            subtitle="مكتبة التقارير ومحاضر الاجتماعات المؤرشفة">
            <ReportsArchive/>
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
