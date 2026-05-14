/* global React, Icon */

/* =========================================================
   CREATE MEETING — multi-step wizard
   ========================================================= */

const COMMITTEES = [
  "اللجنة المالية العليا",
  "لجنة التحول الرقمي",
  "لجنة الشؤون القانونية",
  "لجنة الأمن الوطني",
  "لجنة المرأة والطفل",
  "لجنة التنمية المستدامة",
];

const ROOMS = [
  { id: "main",   name: "القاعة الرئيسية · مجلس الوزراء", cap: 24, free: true  },
  { id: "north",  name: "قاعة الشمال — الدور الثالث",     cap: 16, free: true  },
  { id: "ops",    name: "غرفة العمليات الموحدة",          cap: 12, free: false },
  { id: "remote", name: "عن بُعد · منصة Q-Connect",        cap: 99, free: true  },
];

const MEMBERS = [
  { id: 1, n: "معالي/ خالد بن خليفة آل ثاني", r: "رئيس اللجنة" },
  { id: 2, n: "د. خالد الخليفي",              r: "نائب الرئيس" },
  { id: 3, n: "سعادة/ نورة الكواري",          r: "عضو" },
  { id: 4, n: "م. ناصر بن عبدالعزيز",         r: "عضو" },
  { id: 5, n: "د. فاطمة الجابر",              r: "عضو" },
  { id: 6, n: "م. علياء العمادي",             r: "عضو" },
  { id: 7, n: "أ. محمد المسند",               r: "أمين الاجتماع" },
  { id: 8, n: "د. عبدالله المهندي",           r: "عضو" },
];

function StepRail({ step, steps }) {
  return (
    <ol className="cm-rail">
      {steps.map((s, i) => {
        const idx = i + 1;
        const state = idx < step ? "done" : idx === step ? "active" : "todo";
        return (
          <li key={s} className={`cm-rail-step is-${state}`}>
            <span className="cm-rail-dot">
              {state === "done" ? <Icon.Check width="13" height="13"/> : <span className="num">{idx}</span>}
            </span>
            <span className="cm-rail-label">{s}</span>
          </li>
        );
      })}
    </ol>
  );
}

function CreateMeeting() {
  const [step, setStep] = React.useState(1);
  const [data, setData] = React.useState({
    title: "", committee: COMMITTEES[0],
    date: "2026-05-14", time: "10:00", duration: 120,
    room: "main", remote: true, recurrence: "none",
    members: [1, 2, 3, 4, 5, 6, 7],
    agenda: [
      { id: 1, t: "افتتاح الاجتماع وكلمة الرئيس", min: 5 },
      { id: 2, t: "اعتماد محضر الاجتماع السابق",  min: 10 },
    ],
    privacy: "internal", recording: true, livestream: false,
  });
  const set = (k, v) => setData({ ...data, [k]: v });
  const toggleMember = (id) => set("members",
    data.members.includes(id) ? data.members.filter(x => x !== id) : [...data.members, id]);

  const steps = ["تفاصيل أساسية", "الموعد والمكان", "الأعضاء", "جدول الأعمال", "المراجعة"];
  const next = () => setStep(s => Math.min(steps.length, s + 1));
  const prev = () => setStep(s => Math.max(1, s - 1));

  const totalMin = data.agenda.reduce((s, i) => s + i.min, 0);

  return (
    <>
      <div className="crumbs">
        <a>الرئيسية</a>
        <span className="sep">›</span>
        <a>الاجتماعات</a>
        <span className="sep">›</span>
        <span className="here">إنشاء اجتماع جديد</span>
      </div>

      <div className="cm-shell">
        {/* LEFT — step rail */}
        <aside className="cm-side">
          <div className="cm-side-head">
            <span className="eyebrow eyebrow-secondary">اجتماع جديد</span>
            <h2 className="cm-side-title">إعداد الاجتماع</h2>
            <p className="cm-side-sub">اتبع الخطوات التالية لإنشاء اجتماع جديد لإحدى اللجان الوزارية.</p>
          </div>
          <StepRail step={step} steps={steps}/>
          <div className="cm-side-tip">
            <Icon.Warning width="14" height="14"/>
            <div>
              <strong>تذكير:</strong> اجتماعات اللجان السيادية تتطلب موافقة الأمين العام قبل الاعتماد النهائي.
            </div>
          </div>
        </aside>

        {/* RIGHT — form */}
        <section className="cm-main">
          {step === 1 && (
            <div className="cm-step">
              <h3 className="cm-step-title">التفاصيل الأساسية</h3>
              <p className="cm-step-sub">عرّف الاجتماع وحدد اللجنة المعنية</p>

              <label className="cm-field">
                <span className="cm-label">عنوان الاجتماع <span className="req">*</span></span>
                <input className="cm-input" placeholder="مثال: مراجعة الموازنة التشغيلية للربع الثاني"
                  value={data.title} onChange={e => set("title", e.target.value)}/>
                <span className="cm-hint">عنوان واضح يصف الغرض الرئيسي من الاجتماع</span>
              </label>

              <label className="cm-field">
                <span className="cm-label">اللجنة <span className="req">*</span></span>
                <select className="cm-input" value={data.committee} onChange={e => set("committee", e.target.value)}>
                  {COMMITTEES.map(c => <option key={c}>{c}</option>)}
                </select>
              </label>

              <div className="cm-grid-2">
                <label className="cm-field">
                  <span className="cm-label">نوع الاجتماع</span>
                  <select className="cm-input" defaultValue="regular">
                    <option value="regular">اجتماع دوري</option>
                    <option value="extra">اجتماع استثنائي</option>
                    <option value="emergency">اجتماع طارئ</option>
                    <option value="closed">جلسة مغلقة</option>
                  </select>
                </label>
                <label className="cm-field">
                  <span className="cm-label">الأولوية</span>
                  <div className="cm-segmented">
                    {["عادية","متوسطة","عالية"].map((p, i) => (
                      <button key={p} className={i === 0 ? "is-on" : ""}>{p}</button>
                    ))}
                  </div>
                </label>
              </div>

              <label className="cm-field">
                <span className="cm-label">ملخص الاجتماع</span>
                <textarea className="cm-input cm-textarea" rows="4"
                  placeholder="وصف مختصر للأهداف والمخرجات المتوقعة من هذا الاجتماع…"/>
              </label>
            </div>
          )}

          {step === 2 && (
            <div className="cm-step">
              <h3 className="cm-step-title">الموعد والمكان</h3>
              <p className="cm-step-sub">حدد التاريخ والوقت ومكان انعقاد الاجتماع</p>

              <div className="cm-grid-3">
                <label className="cm-field">
                  <span className="cm-label">التاريخ <span className="req">*</span></span>
                  <input type="date" className="cm-input" value={data.date} onChange={e => set("date", e.target.value)}/>
                </label>
                <label className="cm-field">
                  <span className="cm-label">وقت البدء <span className="req">*</span></span>
                  <input type="time" className="cm-input" value={data.time} onChange={e => set("time", e.target.value)}/>
                </label>
                <label className="cm-field">
                  <span className="cm-label">المدة (دقيقة)</span>
                  <input type="number" className="cm-input" value={data.duration}
                    onChange={e => set("duration", +e.target.value)} step="15"/>
                </label>
              </div>

              <span className="cm-label">قاعة الاجتماع</span>
              <div className="cm-rooms">
                {ROOMS.map(r => (
                  <button key={r.id}
                    className={`cm-room ${data.room === r.id ? "is-on" : ""} ${!r.free ? "is-busy" : ""}`}
                    disabled={!r.free}
                    onClick={() => set("room", r.id)}>
                    <Icon.Building width="18" height="18"/>
                    <div className="cm-room-info">
                      <div className="cm-room-name">{r.name}</div>
                      <div className="cm-room-meta">
                        <span><Icon.Members width="11" height="11"/> {r.cap}</span>
                        <span className={r.free ? "cm-free" : "cm-busy"}>
                          {r.free ? "متاحة" : "محجوزة"}
                        </span>
                      </div>
                    </div>
                    {data.room === r.id && <Icon.Check width="16" height="16" className="cm-room-check"/>}
                  </button>
                ))}
              </div>

              <div className="cm-toggles">
                <label className="cm-toggle">
                  <input type="checkbox" checked={data.remote}
                    onChange={e => set("remote", e.target.checked)}/>
                  <span><strong>السماح بالحضور عن بُعد</strong> — بث مرئي مباشر للأعضاء</span>
                </label>
                <label className="cm-toggle">
                  <input type="checkbox" checked={data.recording}
                    onChange={e => set("recording", e.target.checked)}/>
                  <span><strong>تسجيل الجلسة</strong> — حفظ المحضر الصوتي والمرئي بشكل آمن</span>
                </label>
              </div>

              <label className="cm-field">
                <span className="cm-label">التكرار</span>
                <div className="cm-segmented">
                  {[
                    {k:"none", l:"لمرة واحدة"},
                    {k:"weekly", l:"أسبوعياً"},
                    {k:"biweekly", l:"كل أسبوعين"},
                    {k:"monthly", l:"شهرياً"},
                  ].map(o => (
                    <button key={o.k}
                      className={data.recurrence === o.k ? "is-on" : ""}
                      onClick={() => set("recurrence", o.k)}>{o.l}</button>
                  ))}
                </div>
              </label>
            </div>
          )}

          {step === 3 && (
            <div className="cm-step">
              <h3 className="cm-step-title">الأعضاء والمدعوون</h3>
              <p className="cm-step-sub">حدد الأعضاء المطلوب حضورهم — يلزم نصاب ٧ أعضاء على الأقل</p>

              <div className="cm-quorum">
                <span><Icon.Quorum width="14" height="14"/> النصاب القانوني</span>
                <strong className="num">{data.members.length} / 7</strong>
                <span className={data.members.length >= 7 ? "cm-quorum-ok" : "cm-quorum-bad"}>
                  {data.members.length >= 7 ? "مكتمل ✓" : "ناقص"}
                </span>
              </div>

              <div className="cm-search">
                <Icon.Search width="14" height="14"/>
                <input placeholder="ابحث عن عضو…"/>
              </div>

              <div className="cm-members">
                {MEMBERS.map(m => {
                  const on = data.members.includes(m.id);
                  return (
                    <button key={m.id} className={`cm-member ${on ? "is-on" : ""}`}
                      onClick={() => toggleMember(m.id)}>
                      <span className="cm-avatar" style={{
                        background: on ? "var(--c-blue)" : "var(--c-bg-2)",
                        color: on ? "#fff" : "var(--c-ink-2)",
                      }}>{m.n.split(" ").pop().slice(0,2)}</span>
                      <span className="cm-member-info">
                        <span className="cm-member-name">{m.n}</span>
                        <span className="cm-member-role">{m.r}</span>
                      </span>
                      <span className="cm-member-check">
                        {on ? <Icon.Check width="14" height="14"/> : <Icon.Plus width="14" height="14"/>}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="cm-step">
              <h3 className="cm-step-title">جدول الأعمال</h3>
              <p className="cm-step-sub">أضف بنود الاجتماع — يمكنك إعادة الترتيب لاحقاً</p>

              <div className="cm-agenda-meter">
                <span>إجمالي وقت البنود: <strong className="num">{totalMin}</strong> دقيقة</span>
                <span className={totalMin > data.duration ? "cm-quorum-bad" : "cm-quorum-ok"}>
                  من أصل <strong className="num">{data.duration}</strong> د
                </span>
              </div>

              <div className="cm-agenda-list">
                {data.agenda.map((it, i) => (
                  <div key={it.id} className="cm-agenda-row">
                    <span className="cm-agenda-num num">{i + 1}</span>
                    <input className="cm-input" defaultValue={it.t}/>
                    <input className="cm-input cm-min-input" type="number" defaultValue={it.min}/>
                    <span className="cm-agenda-unit">د</span>
                    <button className="iconbtn iconbtn-sm"><Icon.More width="14" height="14"/></button>
                  </div>
                ))}
                <button className="cm-add-agenda">
                  <Icon.Plus width="14" height="14"/> إضافة بند
                </button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="cm-step">
              <h3 className="cm-step-title">المراجعة والاعتماد</h3>
              <p className="cm-step-sub">تأكد من البيانات قبل الإرسال للموافقة</p>

              <div className="cm-review">
                <div className="cm-review-row">
                  <span>عنوان الاجتماع</span>
                  <strong>{data.title || "— لم يُحدَّد —"}</strong>
                </div>
                <div className="cm-review-row">
                  <span>اللجنة</span>
                  <strong>{data.committee}</strong>
                </div>
                <div className="cm-review-row">
                  <span>الموعد</span>
                  <strong>{data.date} · {data.time} ({data.duration} د)</strong>
                </div>
                <div className="cm-review-row">
                  <span>المكان</span>
                  <strong>{ROOMS.find(r => r.id === data.room)?.name}</strong>
                </div>
                <div className="cm-review-row">
                  <span>الأعضاء</span>
                  <strong className="num">{data.members.length} عضو</strong>
                </div>
                <div className="cm-review-row">
                  <span>عدد البنود</span>
                  <strong className="num">{data.agenda.length}</strong>
                </div>
              </div>

              <div className="cm-review-notice">
                <Icon.Lock width="14" height="14"/>
                <div>
                  <strong>إرسال للاعتماد</strong>
                  <p>سيتم إرسال هذا الاجتماع إلى رئيس اللجنة للموافقة قبل إخطار الأعضاء.</p>
                </div>
              </div>
            </div>
          )}

          {/* Footer nav */}
          <div className="cm-footer">
            <button className="btn btn-ghost" onClick={prev} disabled={step === 1}>السابق</button>
            <div className="cm-footer-spacer"/>
            <button className="btn btn-secondary btn-sm">حفظ كمسوّدة</button>
            {step < steps.length
              ? <button className="btn btn-primary" onClick={next}>التالي <Icon.ChevronStart width="14" height="14"/></button>
              : <button className="btn btn-primary"><Icon.Check width="14" height="14"/> إرسال للاعتماد</button>}
          </div>
        </section>
      </div>
    </>
  );
}

window.CreateMeeting = CreateMeeting;
