
import React, { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
  title: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center dark-glass-bg relative overflow-hidden font-poppins">
      {/* Layered glassy blurs */}
      <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-gradient-to-br from-fuchsia-700/40 via-indigo-700/20 to-transparent rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-700/30 via-teal-700/10 to-transparent rounded-full translate-x-1/4 translate-y-1/4 blur-3xl pointer-events-none" />
      <div className="absolute top-[45%] left-[40%] w-[320px] h-[320px] bg-pink-400/20 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Main Glass Panel */}
      <div className="glass-card-2 relative z-20 w-full max-w-4xl rounded-3xl shadow-2xl border border-white/10 px-0 py-0 bg-white/5 backdrop-blur-xl min-h-screen flex flex-col">
        <div className="p-8 border-b border-white/10">
          <h1
            className="text-center text-4xl sm:text-5xl font-extrabold bg-gradient-to-tr from-[#e0e0f8] via-[#90cdf4] to-[#b084f7] bg-clip-text text-transparent drop-shadow-md tracking-tight font-playfair"
            style={{ letterSpacing: '1.5px' }}
          >
            {title}
          </h1>
        </div>
        <div className="flex-1 flex flex-col">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
