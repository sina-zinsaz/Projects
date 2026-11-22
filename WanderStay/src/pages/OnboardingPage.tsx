import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const OnboardingPage = () => {
  const navigate = useNavigate();

  // انتقال خودکار بعد از ۳ ثانیه بدون واکنش به کلیک روی صفحه
useEffect(() => {
  const timer = setTimeout(() => {
    navigate('/welcome');
  }, 3000);
  return () => clearTimeout(timer);
}, [navigate]);

  return (
    <div className="fixed inset-0 w-full h-full bg-[#357AE8] flex flex-col items-center justify-center p-6 text-white select-none z-50 m-0">
      <div className="flex flex-col items-center text-center">
        {/* آیکون نقشه و پین زرد */}
        <div className="w-28 h-28 mb-6 flex items-center justify-center drop-shadow-lg">
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* لایه چپ نقشه */}
            <path
              d="M18 28L40 20V74L18 82V28Z"
              fill="#FACC15"
            />
            {/* لایه راست نقشه */}
            <path
              d="M60 20L82 28V82L60 74V20Z"
              fill="#FACC15"
            />
            {/* لایه وسط نقشه */}
            <path
              d="M40 20L60 20V74L40 74V20Z"
              fill="#EAB308"
            />
            {/* پین لوکیشن زرد در مرکز */}
            <path
              d="M50 24C41.7157 24 35 30.7157 35 39C35 50.5 50 65 50 65C50 65 65 50.5 65 39C65 30.7157 58.2843 24 50 24Z"
              fill="#FDE047"
            />
            {/* دایره مرکز پین */}
            <circle cx="50" cy="38" r="5.5" fill="#357AE8" />
          </svg>
        </div>

        {/* عنوان برند */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-none mb-3 font-sans">
          WanderStay
        </h1>

        {/* شعار */}
        <p className="text-[#FACC15] text-base font-semibold tracking-wide font-sans">
          Find Your Stay, Your Way
        </p>
      </div>
    </div>
  );
};