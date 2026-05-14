/* global React, Icon */

/* =========================================================
   MEMBERS DIRECTORY — grid of all committee members
   ========================================================= */

function MemberCard({ initials, tone, name, role, entity, committees, attendance, decisions, meetings, presence, role_badge, photo }) {
  return (
    <article className="md-card">
      <div className="md-card-top">
        {role_badge && <span className={`pill pill-${role_badge.tone}`}>{role_badge.txt}</span>}
        <button className="iconbtn iconbtn-sm" style={{ marginInlineStart: "auto" }}>
          <Icon.More width="14" height="14"/>
        </button>
      </div>
      <div className="md-avatar-wrap">
        <span className={`avatar-lg ${tone || ""}`}>
          {photo && <img src={photo} alt=""/>}
          <span aria-hidden="true">{initials}</span>
        </span>
        <span className={`presence presence-${presence}`}/>
      </div>
      <h3 className="md-name">{name}</h3>
      <div className="md-role">{role}</div>
      <div className="md-entity"><Icon.Building width="12" height="12"/> {entity}</div>

      <div className="md-committees">
        <div className="md-com-head">
          <span className="eyebrow">عضوية</span>
          <span className="num" style={{ fontSize: 11, color: "var(--c-ink-3)" }}>{committees.length} لجنة</span>
        </div>
        <div className="md-com-list">
          {committees.slice(0, 3).map((c, i) => (
            <span key={i} className="md-com-chip">
              <span className={`md-com-dot dot-${c.tone}`}/>
              {c.name}
              {c.lead && <Icon.Crown width="10" height="10"/>}
            </span>
          ))}
          {committees.length > 3 && <span className="md-com-chip md-com-more">+{committees.length - 3}</span>}
        </div>
      </div>

      <div className="md-stats">
        <div>
          <div className="md-stat-num num">{attendance}%</div>
          <div className="md-stat-lab">حضور</div>
        </div>
        <div>
          <div className="md-stat-num num">{meetings}</div>
          <div className="md-stat-lab">اجتماع</div>
        </div>
        <div>
          <div className="md-stat-num num">{decisions}</div>
          <div className="md-stat-lab">قرار</div>
        </div>
      </div>
    </article>
  );
}

function Members() {
  return (
    <>
      <div className="crumbs">
        <a>الرئيسية</a>
        <span className="sep">›</span>
        <span className="here">الأعضاء</span>
      </div>

      {/* Header summary */}
      <div className="md-header surface">
        <div className="md-header-left">
          <span className="eyebrow">دليل الأعضاء</span>
          <h2 className="md-header-title">١٤٢ عضواً عبر ٢٧ لجنة</h2>
          <p className="md-header-sub">يضم النظام أعضاء من ١٨ جهة حكومية، يشاركون في أعمال اللجان الوزارية الدائمة والمؤقتة.</p>
        </div>
        <div className="md-header-stats">
          <div className="md-hs">
            <div className="num md-hs-num">٢٧</div>
            <div className="md-hs-lab">رئيس لجنة</div>
          </div>
          <div className="md-hs-sep"/>
          <div className="md-hs">
            <div className="num md-hs-num">٢٧</div>
            <div className="md-hs-lab">مقرر</div>
          </div>
          <div className="md-hs-sep"/>
          <div className="md-hs">
            <div className="num md-hs-num">٨٨</div>
            <div className="md-hs-lab">عضو</div>
          </div>
          <div className="md-hs-sep"/>
          <div className="md-hs">
            <div className="num md-hs-num">٩٢٪</div>
            <div className="md-hs-lab">معدل الحضور</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="md-toolbar">
        <div className="md-search">
          <Icon.Search width="16" height="16"/>
          <input placeholder="ابحث بالاسم أو المنصب أو الجهة..."/>
        </div>
        <div className="md-chips">
          {["كل الأعضاء","رئيس لجنة","مقرر","عضو دائم","عضو مؤقت"].map((c, i) => (
            <button key={c} className={`filter-chip ${i === 0 ? "is-active" : ""}`}>{c}</button>
          ))}
        </div>
        <button className="btn btn-secondary btn-sm">
          <Icon.Filter width="14" height="14"/> الجهة
        </button>
        <button className="btn btn-primary btn-sm" style={{ marginInlineStart: "auto" }}>
          <Icon.Plus width="14" height="14"/> إضافة عضو
        </button>
      </div>

      {/* Grid */}
      <div className="md-grid">
        <MemberCard initials="خ.خ" photo="assets/avatar-placeholder.svg" tone="" name="د. خالد بن محمد الخليفي"
          role="رئيس اللجنة المالية العليا" entity="وزارة المالية"
          presence="online" attendance={97} meetings={42} decisions={68}
          role_badge={{ tone: "burg", txt: "رئيس" }}
          committees={[
            { name: "المالية العليا", tone: "blue", lead: true },
            { name: "حوكمة المخاطر", tone: "blue" },
            { name: "الموازنة", tone: "blue" },
            { name: "الاستثمار", tone: "gold" },
          ]}/>
        <MemberCard initials="ر.م" photo="assets/avatar-placeholder.svg" tone="tone-gold" name="د. ريم بنت عبدالله المرّي"
          role="رئيس لجنة المرأة والطفل" entity="وزارة التنمية الاجتماعية"
          presence="online" attendance={94} meetings={31} decisions={47}
          role_badge={{ tone: "burg", txt: "رئيس" }}
          committees={[
            { name: "المرأة والطفل", tone: "burg", lead: true },
            { name: "التنمية الاجتماعية", tone: "blue" },
          ]}/>
        <MemberCard initials="ع.س" photo="assets/avatar-placeholder.svg" tone="" name="اللواء عبدالله السويدي"
          role="رئيس لجنة الأمن الوطني" entity="وزارة الداخلية"
          presence="busy" attendance={92} meetings={28} decisions={36}
          role_badge={{ tone: "burg", txt: "رئيس" }}
          committees={[
            { name: "الأمن الوطني", tone: "burg", lead: true },
            { name: "الطوارئ", tone: "burg" },
          ]}/>
        <MemberCard initials="م.ع" photo="assets/avatar-placeholder.svg" tone="tone-blue" name="م. محمد بن عيسى العنزي"
          role="مدير عام الخزانة العامة" entity="وزارة المالية"
          presence="online" attendance={89} meetings={56} decisions={91}
          role_badge={{ tone: "blue", txt: "مقرر" }}
          committees={[
            { name: "المالية العليا", tone: "blue" },
            { name: "التحول الرقمي", tone: "blue" },
            { name: "المشتريات", tone: "blue" },
            { name: "الاستثمار", tone: "gold" },
            { name: "الموازنة", tone: "blue" },
          ]}/>
        <MemberCard initials="ف.ج" photo="assets/avatar-placeholder.svg" tone="tone-gold" name="د. فاطمة الجابر"
          role="مستشار قانوني — الديوان الأميري" entity="الديوان الأميري"
          presence="online" attendance={95} meetings={38} decisions={62}
          role_badge={{ tone: "blue", txt: "مقرر" }}
          committees={[
            { name: "الشؤون القانونية", tone: "burg", lead: true },
            { name: "حوكمة المخاطر", tone: "blue" },
            { name: "حماية البيانات", tone: "burg" },
          ]}/>
        <MemberCard initials="ع.ع" photo="assets/avatar-placeholder.svg" tone="" name="م. علياء بنت أحمد العمادي"
          role="رئيس قسم الهوية الرقمية" entity="وزارة الاتصالات"
          presence="online" attendance={91} meetings={34} decisions={52}
          committees={[
            { name: "التحول الرقمي", tone: "blue" },
            { name: "حماية البيانات", tone: "burg" },
            { name: "الذكاء الاصطناعي", tone: "blue" },
          ]}/>
        <MemberCard initials="س.ع" photo="assets/avatar-placeholder.svg" tone="" name="م. سارة بنت يوسف العذبة"
          role="مهندس أمن المعلومات" entity="جهاز الأمن السيبراني"
          presence="busy" attendance={88} meetings={22} decisions={29}
          committees={[
            { name: "التحول الرقمي", tone: "blue" },
            { name: "الأمن السيبراني", tone: "burg" },
          ]}/>
        <MemberCard initials="ن.ك" photo="assets/avatar-placeholder.svg" tone="" name="م. ناصر بن جاسم الكواري"
          role="مدير التخطيط العمراني" entity="وزارة البلدية"
          presence="offline" attendance={84} meetings={26} decisions={31}
          committees={[
            { name: "الإسكان والمدن", tone: "blue", lead: true },
            { name: "التنمية المستدامة", tone: "blue" },
          ]}/>
        <MemberCard initials="أ.ج" photo="assets/avatar-placeholder.svg" tone="tone-blue" name="أ. أحمد بن خليفة الجابر"
          role="وكيل وزارة الاقتصاد المساعد" entity="وزارة التجارة والصناعة"
          presence="absent" attendance={71} meetings={19} decisions={24}
          committees={[
            { name: "الاستثمار", tone: "gold" },
            { name: "الاقتصاد", tone: "blue" },
            { name: "المشتريات", tone: "blue" },
          ]}/>
      </div>

      {/* Footer */}
      <div className="md-footer">
        <button className="btn btn-soft btn-sm">عرض المزيد ({(133).toLocaleString("ar-EG")} عضواً)</button>
      </div>
    </>
  );
}

window.Members = Members;
