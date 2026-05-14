/* global React, Icon */

/* =========================================================
   ANALYTICS — executive insights
   blue-led with strong burgundy accents
   ========================================================= */

function AnKpi({ tone, label, num, delta, deltaTone, sub }) {
  return (
    <div className={`an-kpi tone-${tone}`}>
      <div className="an-kpi-head">
        <span className="eyebrow">{label}</span>
        <span className={`an-delta ${deltaTone}`}>{delta}</span>
      </div>
      <div className="an-kpi-num num">{num}</div>
      <div className="an-kpi-sub">{sub}</div>
    </div>
  );
}

/* ---- BAR CHART ---- */
function MeetingsBarChart() {
  const months = [
    { m: "ينا", held: 14, planned: 18 },
    { m: "فبر", held: 19, planned: 22 },
    { m: "مار", held: 23, planned: 24 },
    { m: "أبر", held: 28, planned: 30 },
    { m: "ماي", held: 21, planned: 28 },
    { m: "يون", held: 0,  planned: 26 },
  ];
  const max = 30;
  return (
    <div className="card an-card">
      <div className="an-card-head">
        <div>
          <span className="eyebrow">معدّل الاجتماعات الشهري</span>
          <h3 className="an-card-title">اجتماعات اللجان — ٢٠٢٦</h3>
        </div>
        <div className="an-legend">
          <span><i className="lg-dot" style={{background: "var(--c-blue)"}}/> منعقدة</span>
          <span><i className="lg-dot" style={{background: "var(--c-burgundy-200)"}}/> مخطّطة</span>
        </div>
      </div>
      <div className="bar-chart">
        {months.map(mo => (
          <div key={mo.m} className="bc-col">
            <div className="bc-track">
              <div className="bc-planned" style={{ height: `${(mo.planned/max)*100}%` }}/>
              <div className="bc-held" style={{ height: `${(mo.held/max)*100}%` }}>
                {mo.held > 0 && <span className="bc-num num">{mo.held}</span>}
              </div>
            </div>
            <span className="bc-label">{mo.m}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- DONUT ---- */
function DecisionsDonut() {
  const segs = [
    { lab: "منجزة",        n: 142, color: "var(--c-blue)" },
    { lab: "قيد التنفيذ", n: 63,  color: "var(--c-burgundy)" },
    { lab: "بانتظار",       n: 32,  color: "var(--c-gold)" },
    { lab: "متأخرة",       n: 11,  color: "var(--c-red)" },
  ];
  const total = segs.reduce((s, x) => s + x.n, 0);
  let cum = 0;
  const C = 2 * Math.PI * 64;
  return (
    <div className="card an-card">
      <div className="an-card-head">
        <span className="eyebrow">حالة التوصيات</span>
        <h3 className="an-card-title">توزيع القرارات النشطة</h3>
      </div>
      <div className="donut-row">
        <svg viewBox="0 0 160 160" className="donut">
          <circle cx="80" cy="80" r="64" fill="none" stroke="var(--c-bg-2)" strokeWidth="20"/>
          {segs.map((s, i) => {
            const len = (s.n / total) * C;
            const dash = `${len} ${C - len}`;
            const offset = -cum;
            cum += len;
            return (
              <circle key={i} cx="80" cy="80" r="64" fill="none"
                stroke={s.color} strokeWidth="20"
                strokeDasharray={dash} strokeDashoffset={offset}
                transform="rotate(-90 80 80)"/>
            );
          })}
          <text x="80" y="76" textAnchor="middle" className="donut-num">{total}</text>
          <text x="80" y="96" textAnchor="middle" className="donut-lab">توصية</text>
        </svg>
        <ul className="donut-legend">
          {segs.map((s, i) => (
            <li key={i}>
              <span className="lg-dot" style={{ background: s.color }}/>
              <span className="dl-label">{s.lab}</span>
              <span className="dl-num num">{s.n}</span>
              <span className="dl-pct num">{Math.round((s.n/total)*100)}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---- COMMITTEE ACTIVITY (replaces heatmap) ---- */
function CommitteeActivity() {
  const items = [
    { name: "اللجنة المالية العليا",   chair: "د. خالد الخليفي",   tone: "blue", weeks: [3,4,2,5,4,6,3,5,4,5,6,7], total: 54, trend: "up" },
    { name: "لجنة التحول الرقمي",     chair: "م. علياء العمادي",  tone: "blue", weeks: [2,3,4,3,5,4,5,4,5,6,5,6], total: 52, trend: "up" },
    { name: "لجنة الشؤون القانونية",   chair: "د. فاطمة الجابر",   tone: "burg", weeks: [2,2,3,3,4,3,4,5,4,4,5,5], total: 44, trend: "up" },
    { name: "لجنة الأمن الوطني",       chair: "اللواء عبدالله السويدي", tone: "burg", weeks: [4,2,3,2,4,5,3,2,4,3,5,4], total: 41, trend: "flat" },
    { name: "لجنة المرأة والطفل",     chair: "د. ريم المرّي",     tone: "burg", weeks: [1,2,3,2,3,3,4,3,4,3,4,5], total: 37, trend: "up" },
    { name: "لجنة الإسكان والمدن",     chair: "م. ناصر الكواري",   tone: "blue", weeks: [3,3,2,3,2,3,2,3,2,3,2,3], total: 31, trend: "flat" },
    { name: "لجنة الموازنة",           chair: "م. محمد العنزي",    tone: "blue", weeks: [2,3,2,3,2,2,3,2,2,2,2,3], total: 28, trend: "down" },
    { name: "لجنة المشتريات",          chair: "أ. أحمد الجابر",    tone: "blue", weeks: [1,2,1,2,1,2,2,1,2,1,2,2], total: 19, trend: "down" },
  ];
  const max = 7;
  const trendIcon = { up: "▲", down: "▼", flat: "▬" };
  const trendCls  = { up: "up", down: "down", flat: "flat" };
  return (
    <div className="card an-card">
      <div className="an-card-head">
        <div>
          <span className="eyebrow">الأسابيع الـ١٢ الأخيرة</span>
          <h3 className="an-card-title">نشاط اللجان — اجتماعات وقرارات</h3>
        </div>
        <div className="ca-legend">
          <span className="num">٠</span>
          <div className="ca-legend-bars">
            {[2,3,4,5,6,7].map((h, i) => <i key={i} style={{ height: `${h * 2}px` }}/>)}
          </div>
          <span className="num">٧+</span>
        </div>
      </div>
      <ul className="ca-list">
        {items.map((it, i) => (
          <li key={i} className="ca-row">
            <div className="ca-info">
              <div className="ca-name">{it.name}</div>
              <div className="ca-chair">{it.chair}</div>
            </div>
            <div className={`ca-spark tone-${it.tone}`}>
              {it.weeks.map((v, j) => (
                <span key={j} className="ca-bar" style={{ height: `${(v / max) * 100}%`, opacity: 0.4 + (v/max) * 0.6 }}/>
              ))}
            </div>
            <div className="ca-total">
              <span className="ca-total-num num">{it.total}</span>
              <span className="ca-total-lab">قرار</span>
            </div>
            <div className={`ca-trend ${trendCls[it.trend]}`}>{trendIcon[it.trend]}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---- ATTENDANCE LINE ---- */
function AttendanceLine() {
  // 12 weeks, attendance %
  const data = [78, 82, 85, 84, 88, 91, 87, 92, 94, 90, 93, 95];
  const W = 460, H = 160, P = 24;
  const max = 100, min = 60;
  const x = (i) => P + (i / (data.length - 1)) * (W - P * 2);
  const y = (v) => H - P - ((v - min) / (max - min)) * (H - P * 2);
  const path = data.map((v, i) => `${i ? "L" : "M"} ${x(i)} ${y(v)}`).join(" ");
  const area = `${path} L ${x(data.length - 1)} ${H - P} L ${x(0)} ${H - P} Z`;
  return (
    <div className="card an-card">
      <div className="an-card-head">
        <div>
          <span className="eyebrow">معدل الحضور — الأسابيع الـ١٢ الأخيرة</span>
          <h3 className="an-card-title">حضور الأعضاء عبر اللجان</h3>
        </div>
        <div className="atl-now">
          <span className="atl-now-num num">95<small>%</small></span>
          <span className="atl-now-delta up num">▲ 2.1%</span>
        </div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="line-chart">
        <defs>
          <linearGradient id="atArea" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%"  stopColor="var(--c-burgundy)" stopOpacity="0.22"/>
            <stop offset="100%" stopColor="var(--c-burgundy)" stopOpacity="0"/>
          </linearGradient>
        </defs>
        {[60, 70, 80, 90, 100].map((v, i) => (
          <g key={i}>
            <line x1={P} x2={W - P} y1={y(v)} y2={y(v)} stroke="var(--c-border)" strokeDasharray="2 4"/>
            <text x={W - 4} y={y(v) + 4} textAnchor="end" fontSize="10" fill="var(--c-ink-3)">{v}%</text>
          </g>
        ))}
        <path d={area} fill="url(#atArea)"/>
        <path d={path} fill="none" stroke="var(--c-burgundy)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        {data.map((v, i) => (
          <circle key={i} cx={x(i)} cy={y(v)} r="3.5" fill="#fff" stroke="var(--c-burgundy)" strokeWidth="2"/>
        ))}
      </svg>
    </div>
  );
}

/* ---- TOP PERFORMERS ---- */
function TopCommittees() {
  const items = [
    { rank: 1, name: "اللجنة المالية العليا", chair: "د. خالد الخليفي", meetings: 14, decisions: 22, score: 96, tone: "blue" },
    { rank: 2, name: "لجنة التحول الرقمي",   chair: "م. علياء العمادي", meetings: 12, decisions: 19, score: 92, tone: "blue" },
    { rank: 3, name: "لجنة الشؤون القانونية", chair: "د. فاطمة الجابر",  meetings: 11, decisions: 17, score: 89, tone: "burg" },
    { rank: 4, name: "لجنة المرأة والطفل",   chair: "د. ريم المرّي",    meetings: 9,  decisions: 14, score: 86, tone: "burg" },
    { rank: 5, name: "لجنة الموازنة",         chair: "م. محمد العنزي",   meetings: 8,  decisions: 11, score: 81, tone: "blue" },
  ];
  return (
    <div className="card an-card">
      <div className="an-card-head">
        <span className="eyebrow">الترتيب حسب مؤشر الأداء</span>
        <h3 className="an-card-title">اللجان الأكثر إنتاجية</h3>
      </div>
      <ol className="top-list">
        {items.map(it => (
          <li key={it.rank}>
            <div className={`top-rank tone-${it.tone}`}>{it.rank}</div>
            <div className="top-info">
              <div className="top-name">{it.name}</div>
              <div className="top-chair">{it.chair}</div>
            </div>
            <div className="top-meta num">
              <span>{it.meetings} اجتماع</span>
              <span>{it.decisions} قرار</span>
            </div>
            <div className="top-score">
              <div className="top-score-num num">{it.score}</div>
              <div className="top-score-bar"><span style={{ width: `${it.score}%` }}/></div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ---- ROOT ---- */
function Analytics() {
  return (
    <>
      <div className="crumbs">
        <a>الرئيسية</a>
        <span className="sep">›</span>
        <span className="here">المؤشرات والتحليلات</span>
      </div>

      {/* KPI strip */}
      <div className="an-kpis">
        <AnKpi tone="blue"
          label="معدّل الإنجاز"
          num="87%" delta="▲ 4.2%" deltaTone="up"
          sub="مقارنة بالربع السابق"/>
        <AnKpi tone="burg"
          label="القرارات الصادرة"
          num="248" delta="▲ 18" deltaTone="up"
          sub="منذ بداية العام"/>
        <AnKpi tone="blue"
          label="الاجتماعات المنعقدة"
          num="105" delta="↔ 0" deltaTone="flat"
          sub="من أصل ١٢٢ مخطط"/>
        <AnKpi tone="burg"
          label="معدّل الحضور"
          num="92%" delta="▲ 2.1%" deltaTone="up"
          sub="عبر جميع اللجان"/>
        <AnKpi tone="blue"
          label="متوسط مدة اتخاذ القرار"
          num="14 يوم" delta="▼ 3 أيام" deltaTone="up"
          sub="تحسّن ملحوظ"/>
      </div>

      {/* Two-column: bar + donut */}
      <div className="an-grid an-grid-2">
        <MeetingsBarChart/>
        <DecisionsDonut/>
      </div>

      {/* Heatmap full width */}
      <CommitteeActivity/>

      {/* Two-column: line + top list */}
      <div className="an-grid an-grid-2-line">
        <AttendanceLine/>
        <TopCommittees/>
      </div>
    </>
  );
}

window.Analytics = Analytics;
