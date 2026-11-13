import React, { useState } from 'react';
import { Megaphone, X } from 'lucide-react';

interface AnnouncementTickerProps {
  text: string;
}

export const AnnouncementTicker: React.FC<AnnouncementTickerProps> = ({ text }) => {
  const [visible, setVisible] = useState(true);

  if (!visible || !text) return null;

  return (
    <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white text-xs sm:text-sm py-2 px-3.5 sm:px-4 shadow-sm border-b border-indigo-950">
      <div className="max-w-7xl mx-auto flex items-start sm:items-center justify-between gap-2.5">
        <div className="flex items-start sm:items-center gap-2 min-w-0">
          <Megaphone className="w-4 h-4 text-blue-300 shrink-0 mt-0.5 sm:mt-0 animate-pulse" />
          <span className="line-clamp-2 sm:truncate font-medium leading-snug">{text}</span>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="text-slate-300 hover:text-white shrink-0 min-w-[36px] min-h-[36px] sm:min-w-0 sm:min-h-0 flex items-center justify-center p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          title="ปิดการแจ้งเตือน"
          aria-label="ปิดการแจ้งเตือน"
        >
          <X className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
        </button>
      </div>
    </div>
  );
};
