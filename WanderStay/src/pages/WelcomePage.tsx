import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 w-full h-full bg-[#F8FAFC] flex flex-col justify-between p-6 select-none overflow-hidden m-0 z-50">
      {/* بخش تصاویر دایره‌ای متمرکز */}
      <div className="flex-1 flex flex-col items-center justify-center relative w-full">
        {/* کانتینر اصلی تمام دایره‌ها در مرکز */}
        <div className="relative w-72 h-72 flex items-center justify-center mb-4">
          
          {/* دایره اصلی مرکز (با بوردور آبی) */}
          <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-[#3B82F6] shadow-xl z-10">
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
              alt="Resort View"
              className="w-full h-full object-cover"
            />
          </div>

          {/* دایره بالا سمت راست (چسبیده به مرکز با بوردور زرد) */}
          <div className="absolute -top-2 -right-2 w-24 h-24 rounded-full overflow-hidden border-4 border-[#FACC15] shadow-md z-20">
            <img
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80"
              alt="Pool View"
              className="w-full h-full object-cover"
            />
          </div>

          {/* دایره پایین سمت چپ (چسبیده به مرکز با بوردور زرد) */}
          <div className="absolute -bottom-2 -left-2 w-20 h-20 rounded-full overflow-hidden border-4 border-[#FACC15] shadow-md z-20">
            <img
              src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80"
              alt="Luxury Room"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* متون توضیحات */}
        <div className="text-center space-y-2 px-4">
          <h2 className="text-2xl font-bold text-[#3B82F6] tracking-tight">
            Unleash Your Inner Traveller
          </h2>
          <p className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto">
            Your passport to a world of extraordinary hotel experiences. Join us today and unlock a realm of comfort, luxury, and adventure.
          </p>
        </div>
      </div>

      {/* بخش دکمه Start Exploring و لینک لاگین */}
      <div className="w-full max-w-sm mx-auto space-y-4 pb-4">
        <button
          onClick={() => navigate('/register')}
          className="w-full bg-[#3B82F6] hover:bg-blue-600 text-white font-semibold py-3.5 px-6 rounded-2xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95"
        >
          <span className="text-sm">Start Exploring</span>
          <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
        </button>

        <p className="text-center text-xs text-gray-500 font-medium">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-[#FACC15] font-bold hover:underline ml-1"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};