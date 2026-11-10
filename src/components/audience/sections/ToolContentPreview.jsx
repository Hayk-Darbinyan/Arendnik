import { IMAGES } from "../shared/Photos.jsx";
import { Ic } from "../shared/Icons.jsx";

const DEMOS = {
  hy: [
    {
      type: "chat",
      name: "Անի Մկրտչյան",
      context: "Բնակիչ · Աբովյան 12",
      messages: [
        { text: "Բարև ձեզ, մուտքի լույսը չի աշխատում։", time: "10:24" },
        { text: "Շնորհակալություն, այսօր կուղարկենք մասնագետին։", time: "10:31", outgoing: true },
      ],
      reply: "Պատասխանել հաղորդագրությանը",
    },
    {
      type: "reminders",
      heading: "Մոտակա հիշեցումներ",
      rows: [
        { title: "Ամսական վճարում", detail: "Մինչև հունիսի 5-ը", status: "Ուղարկված", tone: "good" },
        { title: "Պայմանագրի երկարաձգում", detail: "Հունիսի 18", status: "12 օրից", tone: "soon" },
      ],
    },
    {
      type: "photos",
      heading: "Գույքի լուսանկարներ",
      detail: "Կոմիտասի պող. 24 · 2 սենյականոց",
      images: [
        { label: "Հյուրասենյակ", src: IMAGES[1] },
        { label: "Խոհանոց", src: IMAGES[2] },
      ],
      count: "2 լուսանկար",
    },
    {
      type: "request",
      heading: "Սանհանգույցի ծորակի արտահոսք",
      detail: "Կոմիտասի պող. 24 · Բնակարան 16",
      status: "Ընթացքի մեջ",
      assigneeLabel: "Պատասխանատու",
      assignee: "Արամ Սարգսյան",
      timeLabel: "Այցի ժամ",
      time: "Այսօր՝ 16:00",
    },
    {
      type: "lease",
      heading: "Բնակարանի վարձակալության պայմանագիր",
      detail: "Կոմիտասի պող. 24 · Բնակարան 16",
      rows: [
        ["Ժամկետ", "12 ամիս"],
        ["Ամսական վարձ", "180,000 ֏"],
      ],
      status: "Ստորագրման փուլում",
      parties: ["Վարձատու · ստորագրված", "Վարձակալ · սպասվում է"],
    },
    {
      type: "listing",
      heading: "2 սենյականոց բնակարան",
      detail: "Կենտրոն · 58 մ²",
      price: "180,000 ֏ / ամիս",
      status: "Հրապարակված է",
      sites: ["Հարթակ 1 · հրապարակված", "Հարթակ 2 · համաժամեցված"],
    },
    {
      type: "payments",
      heading: "Ամսական մուտքեր",
      amount: "1,240,000 ֏",
      rows: [
        ["Անի Մկրտչյան", "85,000 ֏", "Վճարված"],
        ["Արման Հովսեփյան", "85,000 ֏", "Սպասվում է"],
      ],
    },
    {
      type: "report",
      heading: "Հունիսի հաշվետվություն",
      metrics: [
        ["Մուտքեր", "1,240,000 ֏"],
        ["Ծախսեր", "385,000 ֏"],
        ["Մնացորդ", "855,000 ֏"],
      ],
      months: ["Հնվ", "Փտր", "Մրտ", "Ապր", "Մյս", "Հնս"],
      bars: [42, 58, 48, 70, 62, 86],
      caption: "Ֆինանսական ամփոփում",
    },
  ],
  ru: [
    {
      type: "chat",
      name: "Анна Мкртчян",
      context: "Жилец · ул. Абовяна, 12",
      messages: [
        { text: "Здравствуйте, не работает свет у входа.", time: "10:24" },
        { text: "Спасибо, сегодня отправим специалиста.", time: "10:31", outgoing: true },
      ],
      reply: "Ответить на сообщение",
    },
    {
      type: "reminders",
      heading: "Ближайшие напоминания",
      rows: [
        { title: "Ежемесячный платёж", detail: "До 5 июня", status: "Отправлено", tone: "good" },
        { title: "Продление договора", detail: "18 июня", status: "Через 12 дней", tone: "soon" },
      ],
    },
    {
      type: "photos",
      heading: "Фотографии объекта",
      detail: "ул. Комитаса, 24 · 2 комнаты",
      images: [
        { label: "Гостиная", src: IMAGES[1] },
        { label: "Кухня", src: IMAGES[2] },
      ],
      count: "2 фотографии",
    },
    {
      type: "request",
      heading: "Протекает кран в ванной",
      detail: "ул. Комитаса, 24 · Квартира 16",
      status: "В работе",
      assigneeLabel: "Исполнитель",
      assignee: "Арам Саргсян",
      timeLabel: "Визит",
      time: "Сегодня, 16:00",
    },
    {
      type: "lease",
      heading: "Договор аренды квартиры",
      detail: "ул. Комитаса, 24 · Квартира 16",
      rows: [
        ["Срок", "12 месяцев"],
        ["Аренда в месяц", "180 000 ֏"],
      ],
      status: "Ожидает подписания",
      parties: ["Арендодатель · подписано", "Арендатор · ожидается"],
    },
    {
      type: "listing",
      heading: "2-комнатная квартира",
      detail: "Центр · 58 м²",
      price: "180 000 ֏ / месяц",
      status: "Опубликовано",
      sites: ["Площадка 1 · опубликовано", "Площадка 2 · синхронизировано"],
    },
    {
      type: "payments",
      heading: "Поступления за месяц",
      amount: "1 240 000 ֏",
      rows: [
        ["Анна Мкртчян", "85 000 ֏", "Оплачено"],
        ["Арман Ованесян", "85 000 ֏", "Ожидается"],
      ],
    },
    {
      type: "report",
      heading: "Отчёт за июнь",
      metrics: [
        ["Поступления", "1 240 000 ֏"],
        ["Расходы", "385 000 ֏"],
        ["Остаток", "855 000 ֏"],
      ],
      months: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн"],
      bars: [42, 58, 48, 70, 62, 86],
      caption: "Финансовая сводка",
    },
  ],
  en: [
    {
      type: "chat",
      name: "Ani Mkrtchyan",
      context: "Resident · 12 Abovyan St.",
      messages: [
        { text: "Hi, the entrance light is not working.", time: "10:24" },
        { text: "Thanks, we'll send someone today.", time: "10:31", outgoing: true },
      ],
      reply: "Reply to message",
    },
    {
      type: "reminders",
      heading: "Upcoming reminders",
      rows: [
        { title: "Monthly payment", detail: "Due June 5", status: "Sent", tone: "good" },
        { title: "Lease renewal", detail: "June 18", status: "In 12 days", tone: "soon" },
      ],
    },
    {
      type: "photos",
      heading: "Property photos",
      detail: "24 Komitas Ave. · 2-bedroom",
      images: [
        { label: "Living room", src: IMAGES[1] },
        { label: "Kitchen", src: IMAGES[2] },
      ],
      count: "2 photos",
    },
    {
      type: "request",
      heading: "Bathroom faucet leak",
      detail: "24 Komitas Ave. · Unit 16",
      status: "In progress",
      assigneeLabel: "Assigned to",
      assignee: "Aram Sargsyan",
      timeLabel: "Visit time",
      time: "Today, 4:00 PM",
    },
    {
      type: "lease",
      heading: "Apartment lease agreement",
      detail: "24 Komitas Ave. · Unit 16",
      rows: [
        ["Term", "12 months"],
        ["Monthly rent", "180,000 AMD"],
      ],
      status: "Awaiting signatures",
      parties: ["Landlord · signed", "Tenant · pending"],
    },
    {
      type: "listing",
      heading: "2-bedroom apartment",
      detail: "Kentron · 58 m²",
      price: "180,000 AMD / month",
      status: "Published",
      sites: ["Site 1 · published", "Site 2 · synced"],
    },
    {
      type: "payments",
      heading: "Monthly collections",
      amount: "1,240,000 AMD",
      rows: [
        ["Ani Mkrtchyan", "85,000 AMD", "Paid"],
        ["Arman Hovsepyan", "85,000 AMD", "Pending"],
      ],
    },
    {
      type: "report",
      heading: "June financial report",
      metrics: [
        ["Income", "1,240,000 AMD"],
        ["Expenses", "385,000 AMD"],
        ["Balance", "855,000 AMD"],
      ],
      months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      bars: [42, 58, 48, 70, 62, 86],
      caption: "Financial summary",
    },
  ],
};

function ChatDemo({ sample }) {
  return (
    <>
      <div className="tool-demo-heading">
        <span className="tool-demo-avatar">{sample.name.slice(0, 1)}</span>
        <span><b>{sample.name}</b><small>{sample.context}</small></span>
        <i className="tool-demo-online" />
      </div>
      <div className="tool-demo-messages">
        {sample.messages.map((message) => (
          <div className={`tool-demo-message${message.outgoing ? " outgoing" : ""}`} key={message.time}>
            <p>{message.text}</p><small>{message.time}</small>
          </div>
        ))}
      </div>
      <div className="tool-demo-reply"><span>{sample.reply}</span><Ic n="arrow" /></div>
    </>
  );
}

function ReminderDemo({ sample }) {
  return (
    <>
      <h3 className="tool-demo-title">{sample.heading}</h3>
      {sample.rows.map((row) => (
        <div className="tool-demo-row" key={row.title}>
          <span className="tool-demo-icon"><Ic n="bell" /></span>
          <span className="tool-demo-row-copy"><b>{row.title}</b><small>{row.detail}</small></span>
          <span className={`tool-demo-status ${row.tone}`}>{row.status}</span>
        </div>
      ))}
    </>
  );
}

function PhotoDemo({ sample }) {
  return (
    <>
      <div className="tool-demo-heading tool-demo-heading-spread">
        <span><b>{sample.heading}</b><small>{sample.detail}</small></span>
        <span className="tool-demo-count"><Ic n="camera" />{sample.count}</span>
      </div>
      <div className="tool-demo-photos">
        {sample.images.map((image) => (
          <figure key={image.label}>
            <img src={image.src} alt={image.label} />
            <figcaption>{image.label}</figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}

function RequestDemo({ sample }) {
  return (
    <>
      <div className="tool-demo-heading tool-demo-heading-spread">
        <span className="tool-demo-icon tool-demo-icon-large"><Ic n="tool" /></span>
        <span className="tool-demo-status soon">{sample.status}</span>
      </div>
      <div className="tool-demo-request-title"><b>{sample.heading}</b><small>{sample.detail}</small></div>
      <div className="tool-demo-request-meta">
        <span><small>{sample.assigneeLabel}</small><b>{sample.assignee}</b></span>
        <span><small>{sample.timeLabel}</small><b>{sample.time}</b></span>
      </div>
    </>
  );
}

function LeaseDemo({ sample }) {
  return (
    <>
      <div className="tool-demo-heading">
        <span className="tool-demo-icon tool-demo-icon-large"><Ic n="doc" /></span>
        <span><b>{sample.heading}</b><small>{sample.detail}</small></span>
      </div>
      <div className="tool-demo-detail-grid">
        {sample.rows.map(([label, value]) => <span key={label}><small>{label}</small><b>{value}</b></span>)}
      </div>
      <div className="tool-demo-signatures">
        {sample.parties.map((party, index) => <span key={party}><i className={index === 0 ? "signed" : "pending"}>{index === 0 ? <Ic n="check" /> : "…"}</i>{party}</span>)}
      </div>
      <span className="tool-demo-status soon">{sample.status}</span>
    </>
  );
}

function ListingDemo({ sample }) {
  return (
    <>
      <div className="tool-demo-listing">
        <span className="tool-demo-icon tool-demo-icon-large"><Ic n="home" /></span>
        <span><b>{sample.heading}</b><small>{sample.detail}</small><strong>{sample.price}</strong></span>
      </div>
      <div className="tool-demo-listing-status"><span className="tool-demo-status good">{sample.status}</span><small>{sample.sites.length} sites</small></div>
      <div className="tool-demo-sites">
        {sample.sites.map((site, index) => <span key={site}><i><Ic n={index === 0 ? "globe" : "check"} /></i>{site}</span>)}
      </div>
    </>
  );
}

function PaymentsDemo({ sample }) {
  return (
    <>
      <div className="tool-demo-total"><small>{sample.heading}</small><b>{sample.amount}</b></div>
      <div className="tool-demo-payment-list">
        {sample.rows.map(([name, amount, status], index) => (
          <div className="tool-demo-row" key={name}>
            <span className={`tool-demo-avatar${index ? " alt" : ""}`}>{name.slice(0, 1)}</span>
            <span className="tool-demo-row-copy"><b>{name}</b><small>{status}</small></span>
            <strong>{amount}</strong>
          </div>
        ))}
      </div>
    </>
  );
}

function ReportDemo({ sample }) {
  return (
    <>
      <div className="tool-demo-report-heading"><b>{sample.heading}</b><small>{sample.caption}</small></div>
      <div className="tool-demo-metrics">
        {sample.metrics.map(([label, value]) => <span key={label}><small>{label}</small><b>{value}</b></span>)}
      </div>
      <div className="tool-demo-chart" aria-label={sample.caption}>
        {sample.bars.map((height, index) => <span key={sample.months[index]}><i style={{ height: `${height}%` }} /><small>{sample.months[index]}</small></span>)}
      </div>
    </>
  );
}

const DEMO_COMPONENTS = [ChatDemo, ReminderDemo, PhotoDemo, RequestDemo, LeaseDemo, ListingDemo, PaymentsDemo, ReportDemo];

export function ToolContentPreview({ index, lang }) {
  const sample = (DEMOS[lang] || DEMOS.en)[index];
  const Demo = DEMO_COMPONENTS[index];

  return (
    <div className={`tool-content tool-content-${sample.type}`}>
      <Demo sample={sample} />
    </div>
  );
}

export default ToolContentPreview;