/* global React, Icon */

/* =========================================================
   ADD MEMBER — multi-section form, flat, no gradients
   ========================================================= */

const { useState: useStateAM } = React;

function AddMember() {
  const [step, setStep] = useStateAM(0);
  const steps = [
    { id: "personal",   label: "البيانات الشخصية",     icon: "User" },
    { id: "position",   label: "الجهة والمنصب",         icon: "Building" },
    { id: "committees", label: "العضوية في اللجان",    icon: "Committees" },
    { id: "access",     label: "الصلاحيات والوصول",    icon: "Lock" },
    { id: "review",     label: "المراجعة والاعتماد",   icon: "Check" },
  ];

  const next = () => setStep(Math.min(step + 1, steps.length - 1));
  const prev = () => setStep(Math.max(step - 1, 0));

  const [data, setData] = useStateAM({
    fnameAr: "", fnameEn: "", title: "", qid: "",
    email: "", phone: "",
    entity: "", position: "", department: "",
    committees: [],
    role: "member",
    permissions: { meetings: true, docs: true, votes: false, sign: false, classified: false },
  });
  const set = (k, v) => setData({...data, [k]: v});
  const toggleCmte = (c) => {
    if (data.committees.includes(c)) set("committees", data.committees.filter(x => x !== c));
    else set("committees", [...data.committees, c]);
  };
  const togglePerm = (k) => set("permissions", {...data.permissions, [k]: !data.permissions[k]});

  return (
    <>
      <div className="crumbs">
        <a data-back="members"><Icon.ChevronStart width="14" height="14" style={{transform:"scaleX(-1)"}}/> رجوع</a>
        <span className="sep"/>
        <a data-nav="dashboard">الرئيسية</a><span className="sep">›</span>
        <a data-nav="members">الأعضاء</a><span className="sep">›</span>
        <span className="here">إضافة عضو جديد</span>
      </div>

      <div className="am-grid">
        {/* STEPS NAV */}
        <nav className="am-steps card">
          <span className="eyebrow">خطوات الإضافة</span>
          <h3 className="card-title-sm" style={{marginBottom: 18}}>أكمل البيانات التالية</h3>
          <ol className="am-steps-list">
            {steps.map((s, i) => {
              const Ic = Icon[s.icon] || Icon.User;
              const done = i < step;
              const active = i === step;
              return (
                <li key={s.id} className={`am-step ${active ? "is-active" : ""} ${done ? "is-done" : ""}`}
                    onClick={() => setStep(i)}>
                  <span className="am-step-marker">
                    {done ? <Icon.Check width="14" height="14"/> : <span className="num">{i+1}</span>}
                  </span>
                  <div className="am-step-body">
                    <div className="am-step-label">{s.label}</div>
                    <div className="am-step-icon"><Ic width="14" height="14"/></div>
                  </div>
                </li>
              );
            })}
          </ol>
          <div className="am-progress">
            <div className="am-progress-bar">
              <span style={{width: `${(step / (steps.length - 1)) * 100}%`}}/>
            </div>
            <div className="am-progress-lab"><span className="num">{step + 1}</span> من <span className="num">{steps.length}</span></div>
          </div>
        </nav>

        {/* CONTENT */}
        <div className="am-main">
          <section className="card">
            <header className="card-head">
              <div>
                <span className="eyebrow">الخطوة {step + 1}</span>
                <h2 className="card-title-sm">{steps[step].label}</h2>
              </div>
              <span className="pill pill-blue">إجباري</span>
            </header>

            {/* STEP 1: Personal */}
            {step === 0 && (
              <>
                <div className="am-avatar-row">
                  <span className="avatar-lg" style={{width: 88, height: 88, background: "var(--c-blue)"}}>+</span>
                  <div>
                    <div className="am-avatar-title">صورة العضو</div>
                    <div className="am-avatar-sub">PNG أو JPG · لا تزيد عن 2 ميغابايت</div>
                    <div style={{display: "flex", gap: 8, marginTop: 10}}>
                      <button className="btn btn-secondary btn-sm">رفع صورة</button>
                      <button className="btn btn-ghost btn-sm">إنشاء بحرف الاسم</button>
                    </div>
                  </div>
                </div>

                <div className="am-fields">
                  <div className="am-field">
                    <label>الاسم الكامل (عربي) <span className="am-req">*</span></label>
                    <input className="input" value={data.fnameAr} onChange={e => set("fnameAr", e.target.value)} placeholder="مثال: سعادة/ محمد بن عبدالله الكواري"/>
                  </div>
                  <div className="am-field">
                    <label>الاسم الكامل (إنجليزي) <span className="am-req">*</span></label>
                    <input className="input" value={data.fnameEn} onChange={e => set("fnameEn", e.target.value)} placeholder="e.g., Mohammed Abdulla Al-Kuwari" dir="ltr"/>
                  </div>
                  <div className="am-field">
                    <label>اللقب / المسمى الشرفي</label>
                    <select className="input" value={data.title} onChange={e => set("title", e.target.value)}>
                      <option value="">— اختر —</option>
                      <option>معالي</option>
                      <option>سعادة</option>
                      <option>سعادة الشيخ</option>
                      <option>الدكتور</option>
                      <option>المهندس</option>
                      <option>اللواء</option>
                    </select>
                  </div>
                  <div className="am-field">
                    <label>الرقم الشخصي (QID) <span className="am-req">*</span></label>
                    <input className="input num" value={data.qid} onChange={e => set("qid", e.target.value)} placeholder="000000000" dir="ltr" maxLength="11"/>
                  </div>
                  <div className="am-field">
                    <label>البريد الإلكتروني الرسمي <span className="am-req">*</span></label>
                    <input className="input" type="email" value={data.email} onChange={e => set("email", e.target.value)} placeholder="name@gov.qa" dir="ltr"/>
                  </div>
                  <div className="am-field">
                    <label>رقم الهاتف <span className="am-req">*</span></label>
                    <input className="input num" value={data.phone} onChange={e => set("phone", e.target.value)} placeholder="+974 0000 0000" dir="ltr"/>
                  </div>
                </div>
              </>
            )}

            {/* STEP 2: Position */}
            {step === 1 && (
              <div className="am-fields">
                <div className="am-field am-field-full">
                  <label>الجهة الحكومية <span className="am-req">*</span></label>
                  <select className="input" value={data.entity} onChange={e => set("entity", e.target.value)}>
                    <option value="">— اختر الجهة —</option>
                    <option>مجلس الوزراء</option>
                    <option>وزارة المالية</option>
                    <option>وزارة الداخلية</option>
                    <option>وزارة الخارجية</option>
                    <option>وزارة الاتصالات وتقنية المعلومات</option>
                    <option>وزارة العدل</option>
                    <option>الديوان الأميري</option>
                    <option>ديوان المحاسبة</option>
                  </select>
                </div>
                <div className="am-field">
                  <label>المنصب / المسمى الوظيفي <span className="am-req">*</span></label>
                  <input className="input" value={data.position} onChange={e => set("position", e.target.value)} placeholder="مثال: وكيل وزارة مساعد"/>
                </div>
                <div className="am-field">
                  <label>الإدارة / القطاع</label>
                  <input className="input" value={data.department} onChange={e => set("department", e.target.value)} placeholder="مثال: قطاع الموازنة العامة"/>
                </div>
                <div className="am-field">
                  <label>الرتبة الوظيفية</label>
                  <select className="input">
                    <option>— اختر —</option>
                    <option>وزير</option>
                    <option>وكيل وزارة</option>
                    <option>وكيل وزارة مساعد</option>
                    <option>مدير عام</option>
                    <option>مدير إدارة</option>
                    <option>رئيس قسم</option>
                  </select>
                </div>
                <div className="am-field">
                  <label>تاريخ التعيين بالمنصب</label>
                  <input className="input num" type="date"/>
                </div>
                <div className="am-field am-field-full">
                  <label>الجهة المُحيلة لعضوية اللجنة</label>
                  <input className="input" placeholder="الجهة التي رشّحت العضو لعضوية اللجنة"/>
                </div>
              </div>
            )}

            {/* STEP 3: Committees */}
            {step === 2 && (
              <>
                <p className="am-step-intro">اختر اللجان التي سيشارك فيها العضو. يمكنه أن يكون عضواً دائماً أو مؤقتاً أو مقرراً في كل لجنة.</p>
                <div className="am-cmtes">
                  {[
                    { id: "fin",   name: "اللجنة المالية العليا", tone: "burg", mark: "م", info: "12 عضو" },
                    { id: "dig",   name: "لجنة التحول الرقمي",   tone: "blue", mark: "ت", info: "9 أعضاء" },
                    { id: "law",   name: "لجنة الشؤون القانونية", tone: "gold", mark: "ق", info: "8 أعضاء" },
                    { id: "sec",   name: "لجنة الأمن الوطني",     tone: "burg", mark: "أ", info: "11 عضو" },
                    { id: "health",name: "لجنة الصحة والوقاية",  tone: "blue", mark: "ص", info: "10 أعضاء" },
                    { id: "energy",name: "لجنة الطاقة والبيئة",   tone: "gold", mark: "ط", info: "9 أعضاء" },
                  ].map(c => (
                    <button key={c.id} type="button"
                      className={`am-cmte ${data.committees.includes(c.id) ? "is-checked" : ""}`}
                      onClick={() => toggleCmte(c.id)}>
                      <span className={`cd-mark cd-mark-${c.tone}`} style={{width: 44, height: 44, fontSize: 18}}>{c.mark}</span>
                      <div className="am-cmte-info">
                        <div className="am-cmte-name">{c.name}</div>
                        <div className="am-cmte-meta">{c.info}</div>
                      </div>
                      <span className="am-cmte-check">
                        {data.committees.includes(c.id) && <Icon.Check width="14" height="14"/>}
                      </span>
                    </button>
                  ))}
                </div>

                {data.committees.length > 0 && (
                  <div className="am-role-block">
                    <span className="eyebrow">الصفة في اللجان المختارة</span>
                    <div className="set-radio-row" style={{marginTop: 8}}>
                      {[
                        { id: "member",  label: "عضو دائم" },
                        { id: "temp",    label: "عضو مؤقت" },
                        { id: "rapport", label: "مقرر" },
                        { id: "chair",   label: "رئيس" },
                      ].map(r => (
                        <button key={r.id}
                          className={`set-radio ${data.role === r.id ? "is-active" : ""}`}
                          onClick={() => set("role", r.id)}>{r.label}</button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* STEP 4: Access */}
            {step === 3 && (
              <>
                <p className="am-step-intro">حدّد ما يمكن للعضو القيام به داخل النظام. يمكن تعديل هذه الصلاحيات في أي وقت.</p>
                <ul className="set-toggles">
                  {[
                    { k: "meetings",    title: "حضور الاجتماعات",        desc: "الانضمام للجلسات والاطلاع على جدول الأعمال" },
                    { k: "docs",        title: "الاطلاع على المستندات", desc: "قراءة وتنزيل وثائق اللجان غير المُصنّفة" },
                    { k: "votes",       title: "التصويت على القرارات",  desc: "إبداء الرأي والتصويت في الجلسات" },
                    { k: "sign",        title: "التوقيع على المحاضر",   desc: "التوقيع الرقمي على المحاضر الرسمية" },
                    { k: "classified",  title: "الوصول للوثائق المُصنّفة", desc: "صلاحية الاطلاع على المستندات السرية والمقيدة" },
                  ].map(t => (
                    <li key={t.k} className="set-toggle-row">
                      <div>
                        <div className="set-toggle-title">{t.title}</div>
                        <div className="set-toggle-desc">{t.desc}</div>
                      </div>
                      <button className={`set-toggle ${data.permissions[t.k] ? "is-on" : ""}`}
                        onClick={() => togglePerm(t.k)}>
                        <span className="set-toggle-knob"/>
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="am-info-box">
                  <Icon.Warning width="16" height="16"/>
                  <div>
                    <div className="am-info-title">ملاحظة هامة</div>
                    <div className="am-info-body">صلاحية «الوصول للوثائق المُصنّفة» تتطلب موافقة إضافية من رئيس اللجنة، وسيتم رفعها للاعتماد تلقائياً عند تفعيلها.</div>
                  </div>
                </div>
              </>
            )}

            {/* STEP 5: Review */}
            {step === 4 && (
              <>
                <p className="am-step-intro">راجع البيانات قبل الإرسال. سيتم إنشاء حساب للعضو وإرسال دعوة تفعيل عبر البريد الإلكتروني.</p>

                <div className="am-review">
                  <div className="am-review-section">
                    <div className="am-review-head">
                      <span className="eyebrow">البيانات الشخصية</span>
                      <a onClick={() => setStep(0)}>تعديل</a>
                    </div>
                    <dl className="am-review-list">
                      <dt>الاسم</dt><dd>{data.fnameAr || "—"}</dd>
                      <dt>الاسم الإنجليزي</dt><dd dir="ltr">{data.fnameEn || "—"}</dd>
                      <dt>الرقم الشخصي</dt><dd className="num">{data.qid || "—"}</dd>
                      <dt>البريد</dt><dd dir="ltr">{data.email || "—"}</dd>
                      <dt>الهاتف</dt><dd className="num">{data.phone || "—"}</dd>
                    </dl>
                  </div>

                  <div className="am-review-section">
                    <div className="am-review-head">
                      <span className="eyebrow">الجهة والمنصب</span>
                      <a onClick={() => setStep(1)}>تعديل</a>
                    </div>
                    <dl className="am-review-list">
                      <dt>الجهة</dt><dd>{data.entity || "—"}</dd>
                      <dt>المنصب</dt><dd>{data.position || "—"}</dd>
                      <dt>الإدارة</dt><dd>{data.department || "—"}</dd>
                    </dl>
                  </div>

                  <div className="am-review-section">
                    <div className="am-review-head">
                      <span className="eyebrow">العضوية في اللجان</span>
                      <a onClick={() => setStep(2)}>تعديل</a>
                    </div>
                    <div className="am-review-tags">
                      {data.committees.length === 0
                        ? <span className="am-review-empty">لم يتم اختيار أي لجان</span>
                        : data.committees.map(c => <span key={c} className="pill pill-blue">{c}</span>)}
                    </div>
                    <div style={{marginTop: 10, fontSize: 12.5, color: "var(--c-ink-3)"}}>الصفة: {data.role}</div>
                  </div>

                  <div className="am-review-section">
                    <div className="am-review-head">
                      <span className="eyebrow">الصلاحيات الممنوحة</span>
                      <a onClick={() => setStep(3)}>تعديل</a>
                    </div>
                    <div className="am-review-tags">
                      {Object.entries(data.permissions).filter(([_,v]) => v).map(([k]) => (
                        <span key={k} className="pill pill-green"><Icon.Check width="11" height="11"/> {k}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="am-confirm">
                  <label className="login-check">
                    <input type="checkbox" defaultChecked/>
                    <span>أؤكد صحة البيانات المُدخلة وأوافق على إنشاء الحساب وإرسال الدعوة.</span>
                  </label>
                </div>
              </>
            )}

            {/* NAV */}
            <div className="am-nav">
              <button className="btn btn-ghost" onClick={prev} disabled={step === 0}>السابق</button>
              {step < steps.length - 1
                ? <button className="btn btn-primary" onClick={next}>التالي · {steps[step + 1].label}</button>
                : <button className="btn btn-primary"><Icon.Check width="14" height="14"/> إنشاء الحساب وإرسال الدعوة</button>}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

window.AddMember = AddMember;
