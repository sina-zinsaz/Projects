import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";

function getGreeting(hour) {
  if (hour < 12) return "صبح بخیر";
  if (hour < 18) return "عصر بخیر";
  return "شب بخیر";
}

const stats = [
  { icon: "📁", title: "پروژه‌ها", value: "۱۲" },
  { icon: "✅", title: "کارهای انجام‌شده", value: "۴۸" },
  { icon: "🔥", title: "روزهای فعالیت", value: "۷" },
];

const actions = ["پروفایل من", "تنظیمات", "اعلان‌ها", "پشتیبانی"];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const name = user.email.split("@")[0];

  return (
    <div className="dash">
      <div className="dash-blob dash-blob1" />
      <div className="dash-blob dash-blob2" />
      <div className="dash-blob dash-blob3" />

      <div className="dash-card">
        <header className="dash-top">
          <span className="dash-brand">Login Pro</span>
          <button className="dash-logout" onClick={logout}>
            خروج
          </button>
        </header>

        <section className="dash-hero">
          <div className="dash-avatar">{name[0].toUpperCase()}</div>
          <div>
            <p className="dash-greet">{getGreeting(now.getHours())} 👋</p>
            <h1>خوش آمدی، {name}</h1>
            <p className="dash-email">{user.email}</p>
          </div>
        </section>

        <section className="dash-time">
          <div className="dash-clock">{now.toLocaleTimeString("fa-IR")}</div>
          <div className="dash-date">
            {now.toLocaleDateString("fa-IR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </section>

        <section className="dash-stats">
          {stats.map((s) => (
            <div className="dash-stat" key={s.title}>
              <span className="dash-stat-icon">{s.icon}</span>
              <strong>{s.value}</strong>
              <small>{s.title}</small>
            </div>
          ))}
        </section>

        <section className="dash-actions">
          {actions.map((a) => (
            <button key={a}>{a}</button>
          ))}
        </section>
      </div>
    </div>
  );
}