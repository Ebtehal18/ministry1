/* global React, Icon */

/* =========================================================
   RECOMMENDATIONS / DECISIONS — tracking board
   ========================================================= */

function RecKpi({ label, num, sub, tone, icon }) {
  return (
    <div className="rec-kpi">
      <div className={`icon-circle icon-circle-sm icon-circle-${tone}`}>{icon}</div>
      <div>
        <div className="rec-kpi-num num">{num}</div>
        <div className="rec-kpi-label">{label}</div>
        <div className="rec-kpi-sub">{sub}</div>
      </div>
    </div>
  );
}

function StatusBadge({ s }) {
  const m = {
    new:        { cls: "pill pill-blue",  txt: "جديدة" },
    progress:   { cls: "pill pill-amber", txt: "قيد التنفيذ" },
    done:       { cls: "pill pill-green", txt: "منجزة" },
    delayed:    { cls: "pill pill-red",   txt: "متأخرة" },
    review:     { cls: "pill pill-burg",  txt: "بانتظار مراجعة" },
  };
  return <span className={m[s].cls}>{m[s].txt}</span>;
}

function RecRow({ num, title, committee, owner, ownerRole, ownerTone, due, dueDelta, progress, status, priority }) {
  return (
    <tr>
      <td><span className="dec-num num">{num}</span></td>
      <td>
        <div className="rec-title-cell">
          <div className="rec-title-text">{title}</div>
          <div className="rec-title-meta">
            <span><Icon.Committees width="12" height="12"/> {committee}</span>
            {priority && <span className={`pri pri-${priority.tone}`}>{priority.txt}</span>}
          </div>
        </div>
      </td>
      <td>
        <div className="member-cell">
          <span className={`avatar-sm ${ownerTone || ""}`}>{owner.initials}</span>
          <div>
            <div className="member-name">{owner.name}</div>
            <div className="ink-2" style={{ fontSize: 11.5, marginTop: 2 }}>{ownerRole}</div>
          </div>
        </div>
      </td>
      <td>
        <div className="rec-due-cell">
          <span className="num" style={{ fontWeight: 600 }}>{due}</span>
          <span className={`rec-due-delta ${dueDelta.tone}`}>{dueDelta.txt}</span>
        </div>
      </td>
      <td style={{ minWidth: 160 }}>
        <div className="att-cell">
          <div className="att-track"><div className={`att-fill ${progress.tone || ""}`} style={{ width: `${progress.pct}%` }}/></div>
          <span className="att-pct num">{progress.pct}%</span>
        </div>
      </td>
      <td><StatusBadge s={status}/></td>
      <td style={{ textAlign: "end" }}>
        <button className="iconbtn iconbtn-sm"><Icon.More width="16" height="16"/></button>
      </td>
    </tr>
  );
}

function Recommendations() {
  return (
    <>
      <div className="crumbs">
        <a>الرئيسية</a>
        <span className="sep">›</span>
        <span className="here">القرارات والتوصيات</span>
      </div>

      {/* KPI strip */}
      <div className="rec-kpis">
        <RecKpi tone="blue"  icon={<Icon.Decisions width="20" height="20"/>}  num="248" label="إجمالي التوصيات" sub="منذ بداية 2026"/>
        <RecKpi tone="amber" icon={<Icon.Clock width="20" height="20"/>}      num="63"  label="قيد التنفيذ"     sub="٢٢ مستحقة هذا الأسبوع"/>
        <RecKpi tone="green" icon={<Icon.Check width="20" height="20"/>}      num="142" label="منجزة"           sub="بنسبة 87% من المستهدف"/>
        <RecKpi tone="red"   icon={<Icon.Warning width="20" height="20"/>}    num="11"  label="متأخرة"          sub="تتطلب تدخلاً عاجلاً"/>
        <RecKpi tone="burg"  icon={<Icon.Eye width="20" height="20"/>}        num="32"  label="بانتظار المراجعة" sub="من قِبل المعالي"/>
      </div>

      {/* Filters */}
      <div className="rec-toolbar">
        <div className="rec-search">
          <Icon.Search width="16" height="16"/>
          <input placeholder="ابحث في التوصيات والقرارات..."/>
        </div>
        <div className="rec-filters">
          {["جميع اللجان","المالية العليا","التحول الرقمي","الشؤون القانونية","الأمن الوطني"].map((c, i) => (
            <button key={c} className={`filter-chip ${i === 0 ? "is-active" : ""}`}>{c}</button>
          ))}
        </div>
        <div className="rec-actions">
          <button className="btn btn-ghost btn-sm"><Icon.Download width="14" height="14"/> تصدير</button>
          <button className="btn btn-primary btn-sm"><Icon.Plus width="14" height="14"/> توصية جديدة</button>
        </div>
      </div>

      {/* Status tabs */}
      <div className="status-tabs">
        {[
          { id: "all", label: "الكل", n: 248, active: true },
          { id: "new", label: "جديدة", n: 18 },
          { id: "progress", label: "قيد التنفيذ", n: 63 },
          { id: "review", label: "بانتظار المراجعة", n: 32 },
          { id: "done", label: "منجزة", n: 142 },
          { id: "delayed", label: "متأخرة", n: 11, tone: "burg" },
        ].map(t => (
          <button key={t.id} className={`status-tab ${t.active ? "is-active" : ""} ${t.tone === "burg" ? "tone-burg" : ""}`}>
            {t.label}
            <span className="num">{t.n}</span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="surface" style={{ overflow: "hidden" }}>
        <table className="gov-table rec-table">
          <thead>
            <tr>
              <th style={{ width: 100 }}>الرقم</th>
              <th>التوصية</th>
              <th style={{ width: 220 }}>المسؤول</th>
              <th style={{ width: 140 }}>الموعد النهائي</th>
              <th style={{ width: 180 }}>التقدّم</th>
              <th style={{ width: 140 }}>الحالة</th>
              <th style={{ width: 56 }}/>
            </tr>
          </thead>
          <tbody>
            <RecRow num="2026/14/03" title="إصدار اللائحة التنفيذية لقانون حماية البيانات الشخصية"
              committee="الشؤون القانونية"
              owner={{ initials: "ف.ج", name: "د. فاطمة الجابر" }} ownerRole="مستشار قانوني" ownerTone="tone-gold"
              due="20 مايو 2026" dueDelta={{ tone: "danger", txt: "متبقي ٨ أيام" }}
              progress={{ pct: 72, tone: "" }} status="progress"
              priority={{ tone: "high", txt: "أولوية عالية" }}/>
            <RecRow num="2026/14/02" title="تحديث منظومة المدفوعات الحكومية وربطها بالخزانة العامة"
              committee="اللجنة المالية العليا"
              owner={{ initials: "م.ع", name: "م. محمد العنزي" }} ownerRole="مدير الخزانة" ownerTone="tone-blue"
              due="01 يونيو 2026" dueDelta={{ tone: "ok", txt: "متبقي ٢٠ يوماً" }}
              progress={{ pct: 45 }} status="progress"/>
            <RecRow num="2026/14/01" title="إنشاء الهوية الرقمية الموحدة لموظفي القطاع الحكومي"
              committee="التحول الرقمي"
              owner={{ initials: "ع.ع", name: "م. علياء العمادي" }} ownerRole="رئيس قسم الهوية"
              due="15 أبريل 2026" dueDelta={{ tone: "delayed", txt: "تأخر ٢٥ يوماً" }}
              progress={{ pct: 88, tone: "" }} status="delayed"
              priority={{ tone: "urgent", txt: "عاجل" }}/>
            <RecRow num="2026/13/12" title="اعتماد إطار حوكمة المخاطر المالية للمؤسسات السيادية"
              committee="اللجنة المالية العليا"
              owner={{ initials: "خ.خ", name: "د. خالد الخليفي" }} ownerRole="رئيس اللجنة"
              due="—" dueDelta={{ tone: "done", txt: "اكتمل" }}
              progress={{ pct: 100 }} status="done"/>
            <RecRow num="2026/13/11" title="مراجعة سياسة الاحتفاظ بالوثائق الرقمية الحساسة"
              committee="التحول الرقمي"
              owner={{ initials: "س.ع", name: "م. سارة العذبة" }} ownerRole="مهندس أمن"
              due="—" dueDelta={{ tone: "neutral", txt: "بانتظار المراجعة" }}
              progress={{ pct: 95 }} status="review"/>
            <RecRow num="2026/13/10" title="تطوير منصة موحدة لإدارة الكوارث والاستجابة الميدانية"
              committee="الأمن الوطني"
              owner={{ initials: "ع.س", name: "اللواء عبدالله السويدي" }} ownerRole="رئيس اللجنة"
              due="30 يونيو 2026" dueDelta={{ tone: "ok", txt: "متبقي ٤٩ يوماً" }}
              progress={{ pct: 28 }} status="progress"
              priority={{ tone: "high", txt: "أولوية عالية" }}/>
            <RecRow num="2026/13/09" title="إطلاق برنامج التدريب القيادي للكوادر النسائية"
              committee="المرأة والطفل"
              owner={{ initials: "ر.م", name: "د. ريم المرّي" }} ownerRole="رئيس اللجنة" ownerTone="tone-gold"
              due="—" dueDelta={{ tone: "done", txt: "اكتمل" }}
              progress={{ pct: 100 }} status="done"/>
            <RecRow num="2026/13/08" title="إعداد دراسة جدوى لمشروع المدن الذكية الجديدة"
              committee="الإسكان والمدن"
              owner={{ initials: "ن.ك", name: "م. ناصر الكواري" }} ownerRole="مدير التخطيط العمراني"
              due="—" dueDelta={{ tone: "neutral", txt: "جديدة" }}
              progress={{ pct: 6 }} status="new"/>
          </tbody>
        </table>
        <div className="table-foot">
          <span className="ink-2 num">عرض ٨ من ٢٤٨ توصية</span>
          <div className="pager">
            <button className="iconbtn iconbtn-sm"><Icon.ChevronStart width="14" height="14"/></button>
            <button className="pager-num is-active num">1</button>
            <button className="pager-num num">2</button>
            <button className="pager-num num">3</button>
            <span className="ink-3">...</span>
            <button className="pager-num num">31</button>
            <button className="iconbtn iconbtn-sm"><Icon.ChevronStart width="14" height="14" style={{ transform: "rotate(180deg)" }}/></button>
          </div>
        </div>
      </div>
    </>
  );
}

window.Recommendations = Recommendations;
