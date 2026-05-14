/* global React, Icon */

/* =========================================================
   MEETINGS & REPORTS — calendar + list of all meetings
   themeBlue-led · burgundy reserved for "live now"
   ========================================================= */

function MeetingsToolbar({ view, onView, filter, onFilter, count }) {
  return (
    <div className="mr-toolbar">
      <div className="mr-tabs">
        <button className={`mr-tab ${view === "list" ? "is-active" : ""}`} onClick={() => onView("list")}>
          <Icon.Tasks width="16" height="16"/> القائمة
        </button>
        <button className={`mr-tab ${view === "calendar" ? "is-active" : ""}`} onClick={() => onView("calendar")}>
          <Icon.Calendar width="16" height="16"/> التقويم
        </button>
        <button className={`mr-tab ${view === "archive" ? "is-active" : ""}`} onClick={() => onView("archive")}>
          <Icon.Documents width="16" height="16"/> أرشيف المحاضر
        </button>
      </div>
      <div className="mr-filters">
        {[
          { id: "all", label: "كل الاجتماعات", n: count.all },
          { id: "upcoming", label: "القادمة", n: count.upcoming },
          { id: "live", label: "جارية الآن", n: count.live },
          { id: "closed", label: "منتهية", n: count.closed },
        ].map(f => (
          <button key={f.id}
            className={`filter-chip ${filter === f.id ? "is-active" : ""}`}
            onClick={() => onFilter(f.id)}>
            {f.label}
            <span className="num">{f.n}</span>
          </button>
        ))}
        <button className="filter-chip">
          <Icon.Filter width="14" height="14"/> فلاتر متقدمة
        </button>
        <button className="btn btn-primary btn-sm" style={{ marginInlineStart: "auto" }}>
          <Icon.Plus width="14" height="14"/> اجتماع جديد
        </button>
      </div>
    </div>
  );
}

/* ---------- CALENDAR VIEW ---------- */
function CalendarMonth() {
  const days = ["السبت","الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة"];
  // Synthetic month: 30 days, starting on Sunday (col 1)
  const cells = [];
  for (let i = 0; i < 1; i++) cells.push({ pad: true });
  for (let d = 1; d <= 30; d++) cells.push({ d });
  // Pad to 35
  while (cells.length < 35) cells.push({ pad: true });

  const events = {
    3:  [{ tone: "blue", time: "09:00", title: "اللجنة المالية" }],
    7:  [{ tone: "blue", time: "10:30", title: "التحول الرقمي" }, { tone: "gold", time: "14:00", title: "الشؤون القانونية" }],
    10: [{ tone: "burg", time: "11:00", title: "الأمن الوطني — جلسة طارئة" }],
    12: [{ tone: "blue", time: "09:00", title: "اللجنة المالية" }, { tone: "blue", time: "13:00", title: "المشتريات" }],
    14: [{ tone: "gold", time: "10:00", title: "المرأة والطفل" }],
    17: [{ tone: "blue", time: "09:00", title: "التحول الرقمي" }, { tone: "burg", time: "16:30", title: "الطوارئ" }, { tone: "blue", time: "11:00", title: "+2 أخرى" }],
    21: [{ tone: "blue", time: "10:00", title: "الموازنة Q3" }],
    23: [{ tone: "gold", time: "14:00", title: "الشؤون القانونية" }],
    25: [{ tone: "blue", time: "09:30", title: "المالية العليا" }, { tone: "blue", time: "13:00", title: "الإسكان" }],
    28: [{ tone: "blue", time: "11:00", title: "الديوان الأميري" }],
  };

  return (
    <div className="cal-wrap">
      <header className="cal-head">
        <div>
          <span className="eyebrow">مايو 2026</span>
          <h2 className="cal-title">اجتماعات الشهر</h2>
        </div>
        <div className="cal-nav">
          <button className="iconbtn iconbtn-sm"><Icon.ChevronStart width="16" height="16"/></button>
          <button className="btn btn-soft btn-sm">اليوم</button>
          <button className="iconbtn iconbtn-sm"><Icon.ChevronStart width="16" height="16" style={{ transform: "rotate(180deg)" }}/></button>
        </div>
      </header>
      <div className="cal-grid-head">
        {days.map(d => <div key={d} className="cal-day-name">{d}</div>)}
      </div>
      <div className="cal-grid">
        {cells.map((c, i) => {
          if (c.pad) return <div key={i} className="cal-cell cal-pad"/>;
          const isToday = c.d === 12;
          const evs = events[c.d] || [];
          return (
            <div key={i} className={`cal-cell ${isToday ? "is-today" : ""}`}>
              <div className="cal-num num">{c.d}</div>
              <div className="cal-events">
                {evs.map((e, j) => (
                  <div key={j} className={`cal-event tone-${e.tone}`}>
                    <span className="num">{e.time}</span>
                    <span className="cal-event-title">{e.title}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- LIST VIEW ---------- */
function MeetingListItem({ time, date, dur, title, committee, room, status, online, attendees, agenda }) {
  const sMap = {
    live:    { cls: "pill pill-burg", txt: "جارٍ الآن", live: true },
    upcoming:{ cls: "pill pill-blue", txt: "قادم" },
    pending: { cls: "pill pill-amber", txt: "بانتظار النصاب" },
    closed:  { cls: "pill pill-gray", txt: "منتهٍ" },
  };
  const s = sMap[status];
  return (
    <div className={`mi-row ${status === "live" ? "is-live" : ""}`}>
      <div className="mi-date">
        <div className="mi-day num">{date.d}</div>
        <div className="mi-month">{date.m}</div>
        <div className="mi-weekday">{date.w}</div>
      </div>
      <div className="mi-body">
        <div className="mi-top">
          <h3 className="mi-title">{title}</h3>
          <span className={s.cls}>{s.live && <span className="dot dot-live"/>}{s.txt}</span>
        </div>
        <div className="mi-meta">
          <span><Icon.Committees width="13" height="13"/> {committee}</span>
          <span><Icon.Clock width="13" height="13"/> {time} <span style={{ opacity: 0.5 }}>({dur})</span></span>
          <span><Icon.Pin width="13" height="13"/> {room}</span>
          {online && <span className="online-tag">+ بث مباشر</span>}
        </div>
        <div className="mi-foot">
          <div className="mi-attendees">
            {attendees.slice(0, 4).map((a, i) => (
              <span key={i} className={`avatar-sm ${a.tone || ""}`} style={{ marginInlineStart: i ? "-8px" : 0, zIndex: 4 - i }}>{a.initials}</span>
            ))}
            {attendees.length > 4 && (
              <span className="mi-att-more">+{attendees.length - 4}</span>
            )}
          </div>
          <div className="mi-agenda">
            <Icon.Tasks width="13" height="13"/>
            <span>{agenda} بنود في جدول الأعمال</span>
          </div>
          <div className="mi-actions">
            {status === "live"
              ? <button className="btn btn-burg btn-sm">الانضمام</button>
              : status === "closed"
                ? <button className="btn btn-soft btn-sm"><Icon.Documents width="13" height="13"/> المحضر</button>
                : <button className="btn btn-secondary btn-sm">التفاصيل</button>}
            <button className="iconbtn iconbtn-sm"><Icon.More width="16" height="16"/></button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MeetingsList() {
  return (
    <div className="mi-list">
      <MeetingListItem
        date={{ d: "12", m: "مايو", w: "الثلاثاء — اليوم" }}
        time="09:00 — 11:30" dur="ساعتان ونصف" status="live" online
        title="مراجعة الموازنة التشغيلية للربع الثاني — 2026"
        committee="اللجنة المالية العليا"
        room="قاعة الوزراء — الدور الثالث"
        attendees={[{ initials: "خ.خ" },{ initials: "م.ع", tone: "tone-blue" },{ initials: "ف.ج", tone: "tone-gold" },{ initials: "ع.ع" },{ initials: "ن.ك" },{ initials: "س.ع" }]}
        agenda={7}/>
      <MeetingListItem
        date={{ d: "12", m: "مايو", w: "الثلاثاء — اليوم" }}
        time="11:30 — 13:00" dur="ساعة ونصف" status="upcoming" online
        title="مناقشة مشروع قانون حماية البيانات الشخصية"
        committee="لجنة الشؤون القانونية"
        room="قاعة (ب) — الديوان الأميري"
        attendees={[{ initials: "ف.ج", tone: "tone-gold" },{ initials: "م.ع", tone: "tone-blue" },{ initials: "ع.ع" }]}
        agenda={5}/>
      <MeetingListItem
        date={{ d: "12", m: "مايو", w: "الثلاثاء — اليوم" }}
        time="14:00 — 16:00" dur="ساعتان" status="pending"
        title="متابعة مبادرات التحول الرقمي 2026"
        committee="لجنة التحول الرقمي"
        room="عن بُعد — منصة Q-Connect"
        attendees={[{ initials: "م.ع", tone: "tone-blue" },{ initials: "س.ع" },{ initials: "ن.ك" },{ initials: "ع.ع" },{ initials: "ر.م", tone: "tone-gold" }]}
        agenda={9}/>
      <MeetingListItem
        date={{ d: "13", m: "مايو", w: "الأربعاء — غداً" }}
        time="10:00 — 12:00" dur="ساعتان" status="upcoming" online
        title="إقرار خطة الاستجابة للطوارئ الوطنية — المرحلة الثانية"
        committee="لجنة الأمن الوطني"
        room="غرفة العمليات الموحدة"
        attendees={[{ initials: "ع.س" },{ initials: "خ.خ" },{ initials: "م.ع", tone: "tone-blue" },{ initials: "ف.ج", tone: "tone-gold" }]}
        agenda={4}/>
      <MeetingListItem
        date={{ d: "11", m: "مايو", w: "الإثنين" }}
        time="10:30 — 12:30" dur="ساعتان" status="closed"
        title="مراجعة محضر الجلسة (١٤) واعتماد التوصيات"
        committee="اللجنة المالية العليا"
        room="قاعة الوزراء — الدور الثالث"
        attendees={[{ initials: "خ.خ" },{ initials: "م.ع", tone: "tone-blue" },{ initials: "ف.ج", tone: "tone-gold" },{ initials: "ع.ع" },{ initials: "ن.ك" }]}
        agenda={8}/>
      <MeetingListItem
        date={{ d: "10", m: "مايو", w: "الأحد" }}
        time="13:00 — 15:00" dur="ساعتان" status="closed"
        title="اعتماد مذكرة التفاهم مع الجهاز المركزي للإحصاء"
        committee="لجنة التحول الرقمي"
        room="قاعة الاجتماعات الرئيسية"
        attendees={[{ initials: "م.ع", tone: "tone-blue" },{ initials: "ع.ع" },{ initials: "س.ع" }]}
        agenda={6}/>
    </div>
  );
}

/* ---------- ARCHIVE VIEW ---------- */
function ArchiveView() {
  return (
    <div className="archive-grid">
      {[
        { num: "1431", title: "محضر اجتماع اللجنة المالية العليا (١٤)", date: "11 مايو 2026", committee: "اللجنة المالية العليا", pages: 24, decisions: 6, signed: true },
        { num: "1430", title: "محضر اجتماع التحول الرقمي (٠٩)", date: "10 مايو 2026", committee: "لجنة التحول الرقمي", pages: 18, decisions: 4, signed: true },
        { num: "1429", title: "محضر اجتماع الشؤون القانونية (٠٧)", date: "08 مايو 2026", committee: "لجنة الشؤون القانونية", pages: 32, decisions: 9, signed: true },
        { num: "1428", title: "محضر اجتماع الأمن الوطني (٠٣) — مغلق", date: "06 مايو 2026", committee: "لجنة الأمن الوطني", pages: 16, decisions: 3, signed: true, restricted: true },
        { num: "1427", title: "محضر اجتماع الإسكان والمدن (٠٥)", date: "05 مايو 2026", committee: "لجنة الإسكان", pages: 22, decisions: 5, signed: false },
        { num: "1426", title: "محضر اجتماع المرأة والطفل (٠٢)", date: "03 مايو 2026", committee: "لجنة المرأة والطفل", pages: 14, decisions: 4, signed: true },
      ].map(m => (
        <div key={m.num} className="archive-card">
          <div className="ar-head">
            <span className="doc-icon doc-pdf">PDF</span>
            <div className="ar-num num">رقم {m.num}</div>
            {m.restricted && <span className="pill pill-burg" style={{ marginInlineStart: "auto" }}><Icon.Lock width="11" height="11"/> سري</span>}
          </div>
          <h4 className="ar-title">{m.title}</h4>
          <div className="ar-committee"><Icon.Committees width="13" height="13"/> {m.committee}</div>
          <div className="ar-meta">
            <span><Icon.Calendar width="12" height="12"/> {m.date}</span>
            <span className="num">{m.pages} صفحة</span>
            <span className="num">{m.decisions} قرارات</span>
          </div>
          <div className="ar-foot">
            {m.signed
              ? <span className="ar-sign signed"><Icon.Check width="13" height="13"/> موقّع</span>
              : <span className="ar-sign pending"><Icon.Clock width="13" height="13"/> بانتظار التوقيع</span>}
            <button className="btn btn-ghost btn-sm"><Icon.Download width="13" height="13"/> تنزيل</button>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- ROOT ---------- */
function MeetingsReports() {
  const [view, setView] = React.useState(() => {
    const v = window.__defaultMeetingsView;
    if (v) { delete window.__defaultMeetingsView; return v; }
    return "list";
  });
  const [filter, setFilter] = React.useState("all");
  const counts = { all: 34, upcoming: 12, live: 1, closed: 21 };

  return (
    <>
      <div className="crumbs">
        <a>الرئيسية</a>
        <span className="sep">›</span>
        <span className="here">الاجتماعات</span>
      </div>

      <MeetingsToolbar view={view} onView={setView} filter={filter} onFilter={setFilter} count={counts}/>

      {view === "list" && <MeetingsList/>}
      {view === "calendar" && <CalendarMonth/>}
      {view === "archive" && <ArchiveView/>}
    </>
  );
}

window.MeetingsReports = MeetingsReports;
