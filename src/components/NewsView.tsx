import React, { useState } from 'react';
import { Newspaper, Search, Eye, Pin, Calendar, User, ExternalLink, X } from 'lucide-react';
import { NewsItem } from '../types';

interface NewsViewProps {
  news: NewsItem[];
  onSelectNews: (item: NewsItem) => void;
  selectedNews: NewsItem | null;
  onCloseNewsModal: () => void;
}

export const NewsView: React.FC<NewsViewProps> = ({
  news,
  onSelectNews,
  selectedNews,
  onCloseNewsModal,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ทั้งหมด');
  const [showPinnedOnly, setShowPinnedOnly] = useState(false);

  const categories = ['ทั้งหมด', 'ข่าววิชาการ', 'อบรมสัมมนา', 'ประกาศกลุ่มงาน', 'กิจกรรม/นิทรรศการ'];

  const filteredNews = news
    .filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.summary.toLowerCase().includes(search.toLowerCase()) ||
        item.author.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'ทั้งหมด' || item.category === selectedCategory;
      const matchesPinned = !showPinnedOnly || item.isPinned;
      return matchesSearch && matchesCategory && matchesPinned;
    })
    .sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Newspaper className="w-6 h-6 text-blue-600" />
          ข่าวสารและประกาศกลุ่มงานบริหารงานวิชาการ
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          ประชาสัมพันธ์ข่าววิชาการ กิจกรรมนิเทศ PLC กำหนดการสอบ และประกาศสำคัญของโรงเรียนราชประชานุเคราะห์ 51 จังหวัดบุรีรัมย์
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2.5 sm:gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ค้นหาตามหัวข้อข่าว เนื้อหา หรือผู้ลงข่าว..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 sm:py-2 text-base sm:text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={() => setShowPinnedOnly(!showPinnedOnly)}
            className={`min-h-[40px] sm:min-h-0 flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer shrink-0 ${
              showPinnedOnly
                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
            }`}
          >
            <Pin className="w-3.5 h-3.5" />
            <span>เฉพาะข่าวปักหมุด</span>
          </button>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800 overflow-x-auto no-scrollbar sm:flex-wrap pb-0.5 sm:pb-0">
          <span className="text-xs text-slate-400 mr-1 shrink-0">หมวดหมู่:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`min-h-[36px] sm:min-h-0 px-3 py-1.5 sm:py-1 text-xs rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* News Grid */}
      {filteredNews.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-xl p-12 text-center border border-slate-200 dark:border-slate-800">
          <Newspaper className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300">
            {news.length === 0 ? 'ยังไม่มีข่าวประชาสัมพันธ์ในระบบ (0 รายการ)' : 'ไม่พบข่าวสารที่ค้นหา'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {news.length === 0 ? 'รอการอัปเดตข้อมูลจากเจ้าหน้าที่กลุ่มงานบริหารงานวิชาการ' : 'ลองเปลี่ยนคำค้นหาหรือตัวกรองหมวดหมู่'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectNews(item)}
              className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="relative aspect-video w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  {item.coverImageUrl ? (
                    <img
                      src={item.coverImageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-blue-950 text-white p-4 text-center">
                      <Newspaper className="w-8 h-8 text-blue-400/80 mb-1" />
                      <span className="text-[11px] text-slate-300 font-medium">{item.category}</span>
                    </div>
                  )}

                  {item.isPinned && (
                    <span className="absolute top-2.5 left-2.5 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
                      <Pin className="w-3 h-3" /> ปักหมุด
                    </span>
                  )}

                  <span className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded flex items-center gap-1 tabular-nums">
                    <Eye className="w-3 h-3" /> {item.viewsCount}
                  </span>
                </div>

                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-semibold text-blue-600 dark:text-blue-400">{item.category}</span>
                    <span className="flex items-center gap-1 tabular-nums">
                      <Calendar className="w-3 h-3" /> {item.publishDate}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 mt-2 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 truncate max-w-[200px]">
                  <User className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">{item.author}</span>
                </span>
                <span className="text-blue-600 dark:text-blue-400 font-semibold shrink-0">อ่านเพิ่มเติม →</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Read Full News Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-2xl max-w-3xl w-full max-h-[92vh] sm:max-h-[90vh] overflow-y-auto border-t sm:border border-slate-200 dark:border-slate-800 shadow-2xl animate-scaleUp pb-safe">
            {selectedNews.coverImageUrl && (
              <div className="w-full aspect-video sm:aspect-21/9 bg-slate-900 overflow-hidden relative">
                <img
                  src={selectedNews.coverImageUrl}
                  alt={selectedNews.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={onCloseNewsModal}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 min-w-[40px] min-h-[40px] flex items-center justify-center bg-black/65 hover:bg-black/80 text-white p-2 rounded-full transition-colors cursor-pointer"
                  aria-label="ปิดหน้าต่าง"
                >
                  <X className="w-5 h-5 sm:w-4 sm:h-4" />
                </button>
              </div>
            )}

            <div className="p-5 sm:p-8">
              {!selectedNews.coverImageUrl && (
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-1 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto sm:hidden" />
                  <button
                    onClick={onCloseNewsModal}
                    className="ml-auto text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg cursor-pointer"
                    aria-label="ปิดหน้าต่าง"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-500 mb-3">
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  {selectedNews.category}
                </span>
                <span>·</span>
                <span className="tabular-nums">วันที่เผยแพร่: {selectedNews.publishDate}</span>
                <span>·</span>
                <span className="flex items-center gap-1 tabular-nums">
                  <Eye className="w-3.5 h-3.5" /> เข้าชม {selectedNews.viewsCount} ครั้ง
                </span>
              </div>

              <h2 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                {selectedNews.title}
              </h2>

              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                ผู้ลงข่าว: <span className="font-medium text-slate-700 dark:text-slate-300">{selectedNews.author}</span>
              </p>

              <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-slate-100 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {selectedNews.content}
              </div>

              {selectedNews.externalLink && (
                <div className="mt-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-blue-900 dark:text-blue-300">เอกสารหรือลิงก์ที่เกี่ยวข้อง</p>
                    <p className="text-[11px] text-blue-700 dark:text-blue-400 truncate">{selectedNews.externalLink}</p>
                  </div>
                  <a
                    href={selectedNews.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 min-h-[40px] px-4 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>เปิดลิงก์</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              <div className="mt-6 sm:mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button
                  onClick={onCloseNewsModal}
                  className="w-full sm:w-auto min-h-[44px] sm:min-h-0 px-5 py-2.5 sm:py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl sm:rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                >
                  ปิดหน้าต่าง
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
