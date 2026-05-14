/* global React, Icon */

/* =========================================================
   AGENDA BUILDER — إدارة جدول الأعمال
   Visual staging board to compose a meeting's agenda
   ========================================================= */

const INITIAL_BOARD = {
  backlog: [
    { id: "b1", t: "مراجعة استراتيجية الإسكان الوطني ٢٠٣٠", owner: "م. ناصر الكواري", min: 25, kind: "study", docs: 3 },
    { id: "b2", t: "تقرير الأداء المالي للربع الأول",        owner: "د. خالد الخليفي",  min: 15, kind: "report", docs: 5 },
    { id: "b3", t: "تحديث منصة الهوية الرقمية",              owner: "م. علياء العمادي", min: 20, kind: "update", docs: 2 },
    { id: "b4", t: "مقترح تعديل لائحة المشتريات الحكومية",   owner: "د. فاطمة الجابر",  min: 30, kind: "decision", docs: 4 },
  ],
  draft: [
    { id: "d1", t: "افتتاح الاجتماع وكلمة الرئيس",           owner: "رئيس اللجنة",       min: 5,  kind: "open",     docs: 0 },
    { id: "d2", t: "اعتماد محضر الاجتماع السابق",            owner: "أمين الاجتماع",     min: 10, kind: "decision", docs: 1 },
    { id: "d3", t: "عرض حالة تنفيذ التوصيات السابقة",       owner: "أمين عام اللجنة",   min: 20, kind: "report",   docs: 2 },
    { id: "d4", t: "مناقشة تقرير الأداء المالي للربع الأول", owner: "د. خالد الخليفي",   min: 25, kind: "report",   docs: 5 },
    { id: "d5", t: "البت في مقترح تحديث منصة الذكاء الاصطناعي", owner: "م. علياء العمادي", min: 35, kind: "decision", docs: 6 },
    { id: "d6", t: "ما يستجد من أعمال",                     owner: "أعضاء اللجنة",      min: 15, kind: "open",     docs: 0 },
  ],
  archive: [
    { id: "a1", t: "اعتماد ميزانية برنامج تطوير الموانئ",   owner: "—",                 min: 20, kind: "decision", docs: 4 },
    { id: "a2", t: "خطة إدارة المخاطر المالية لعام ٢٠٢٥",   owner: "—",                 min: 30, kind: "study",    docs: 3 },
  ],
};

const AGENDA_KIND_META = {
  open:     { label: "إجرائي",  c: "var(--c-ink-3)",     bg: "var(--c-bg-2)" },
  report:   { label: "تقرير",   c: "var(--c-blue)",      bg: "var(--c-blue-50)" },
  study:    { label: "دراسة",   c: "var(--c-blue-700)",  bg: "var(--c-blue-50)" },
  decision: { label: "للقرار",  c: "var(--c-burgundy)",  bg: "var(--c-burgundy-50)" },
  update:   { label: "تحديث",   c: "var(--c-amber)",     bg: "rgba(189,127,33,0.10)" },
};

function AgendaItemCard({ item, draggable, onDragStart }) {
  const k = AGENDA_KIND_META[item.kind];
  return (
    <div className={`ag-item ${draggable ? "is-drag" : ""}`}
         draggable={draggable ? "true" : undefined}
         onDragStart={onDragStart}>
      <div className="ag-item-head">
        <span className="ag-kind" style={{ color: k.c, background: k.bg }}>{k.label}</span>
        <span className="ag-min num">{item.min}<span>د</span></span>
      </div>
      <div className="ag-item-title">{item.t}</div>
      <div className="ag-item-foot">
        <span className="ag-owner"><Icon.User width="11" height="11"/> {item.owner}</span>
        {item.docs > 0 && <span className="ag-docs"><Icon.Documents width="11" height="11"/> {item.docs}</span>}
      </div>
    </div>
  );
}

function AgendaBuilder() {
  const [board, setBoard] = React.useState(INITIAL_BOARD);
  const [drag, setDrag] = React.useState(null);

  const totalMin = board.draft.reduce((s, i) => s + i.min, 0);
  const targetMin = 120;
  const fill = Math.min(100, (totalMin / targetMin) * 100);

  const onDragStart = (col, id) => () => setDrag({ col, id });
  const onDrop = (toCol) => (e) => {
    e.preventDefault();
    if (!drag) return;
    if (drag.col === toCol) return;
    const item = board[drag.col].find(x => x.id === drag.id);
    if (!item) return;
    setBoard({
      ...board,
      [drag.col]: board[drag.col].filter(x => x.id !== drag.id),
      [toCol]: [...board[toCol], item],
    });
    setDrag(null);
  };
  const allow = (e) => e.preventDefault();

  return (
    <>
      <div className="crumbs">
        <a>الرئيسية</a>
        <span className="sep">›</span>
        <a>الاجتماعات</a>
        <span className="sep">›</span>
        <span className="here">إدارة جدول الأعمال</span>
      </div>

      {/* Meeting context bar */}
      <div className="ag-context">
        <div className="ag-context-info">
          <span className="eyebrow eyebrow-secondary">جدول أعمال</span>
          <h2 className="ag-context-title">الاجتماع الـ ٢٤ — اللجنة المالية العليا</h2>
          <div className="ag-context-meta">
            <span><Icon.Calendar width="13" height="13"/> الخميس ١٤ مايو ٢٠٢٦</span>
            <span><Icon.Clock width="13" height="13"/> ١٠:٠٠ ص – ١٢:٠٠ م</span>
            <span><Icon.Building width="13" height="13"/> القاعة الرئيسية · مجلس الوزراء</span>
            <span><Icon.Members width="13" height="13"/> ٩ أعضاء</span>
          </div>
        </div>
        <div className="ag-context-actions">
          <button className="btn btn-ghost btn-sm"><Icon.Eye width="13" height="13"/> معاينة</button>
          <button className="btn btn-soft btn-sm"><Icon.Download width="13" height="13"/> PDF</button>
          <button className="btn btn-primary btn-sm"><Icon.Check width="13" height="13"/> اعتماد الجدول</button>
        </div>
      </div>

      {/* Time meter */}
      <div className="ag-meter">
        <div className="ag-meter-info">
          <div className="ag-meter-label">إجمالي وقت البنود</div>
          <div className="ag-meter-stat">
            <span className="num ag-meter-cur">{totalMin}</span>
            <span className="ag-meter-sep">من</span>
            <span className="num">{targetMin}</span>
            <span className="ag-meter-unit">دقيقة</span>
          </div>
        </div>
        <div className="ag-meter-bar">
          <div className="ag-meter-fill" style={{ width: `${fill}%`, background: totalMin > targetMin ? "var(--c-burgundy)" : "var(--c-blue)" }}/>
          <div className="ag-meter-target" style={{ insetInlineStart: "100%" }}/>
        </div>
        <div className="ag-meter-status">
          {totalMin > targetMin
            ? <span className="ag-meter-warn"><Icon.Warning width="13" height="13"/> تجاوز المدة المخصصة بـ {totalMin - targetMin} دقيقة</span>
            : <span className="ag-meter-ok"><Icon.Check width="13" height="13"/> ضمن المدة المخصصة · متبقي {targetMin - totalMin} دقيقة</span>}
        </div>
      </div>

      {/* Three-column board */}
      <div className="ag-board">
        {/* Backlog */}
        <section className="ag-col ag-col-backlog"
          onDragOver={allow} onDrop={onDrop("backlog")}>
          <header className="ag-col-head">
            <div>
              <div className="ag-col-title">المقترحات</div>
              <div className="ag-col-sub">بنود مقترحة للإدراج</div>
            </div>
            <span className="ag-col-count num">{board.backlog.length}</span>
          </header>
          <div className="ag-col-body">
            {board.backlog.map(it => (
              <AgendaItemCard key={it.id} item={it} draggable
                onDragStart={onDragStart("backlog", it.id)}/>
            ))}
            <button className="ag-add">
              <Icon.Plus width="14" height="14"/> اقتراح بند جديد
            </button>
          </div>
        </section>

        {/* Draft agenda — main column */}
        <section className="ag-col ag-col-draft"
          onDragOver={allow} onDrop={onDrop("draft")}>
          <header className="ag-col-head">
            <div>
              <div className="ag-col-title">جدول الأعمال — مسوّدة</div>
              <div className="ag-col-sub">اسحب البنود لإعادة الترتيب</div>
            </div>
            <span className="ag-col-count num is-primary">{board.draft.length}</span>
          </header>
          <div className="ag-col-body ag-draft-list">
            {board.draft.map((it, i) => (
              <div key={it.id} className="ag-draft-row">
                <div className="ag-draft-num">
                  <span className="num">{i + 1}</span>
                  <Icon.More width="14" height="14"/>
                </div>
                <AgendaItemCard item={it} draggable
                  onDragStart={onDragStart("draft", it.id)}/>
              </div>
            ))}
          </div>
        </section>

        {/* Archive / library */}
        <section className="ag-col ag-col-archive"
          onDragOver={allow} onDrop={onDrop("archive")}>
          <header className="ag-col-head">
            <div>
              <div className="ag-col-title">المؤجلة والمؤرشفة</div>
              <div className="ag-col-sub">بنود معلّقة أو محالة لاحقاً</div>
            </div>
            <span className="ag-col-count num">{board.archive.length}</span>
          </header>
          <div className="ag-col-body">
            {board.archive.map(it => (
              <AgendaItemCard key={it.id} item={it} draggable
                onDragStart={onDragStart("archive", it.id)}/>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

window.AgendaBuilder = AgendaBuilder;
