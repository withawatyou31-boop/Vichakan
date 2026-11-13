import React from 'react';
import {
  Newspaper,
  BookOpen,
  GraduationCap,
  Download,
  ArrowRight,
  School,
  BarChart3,
  PieChart,
  FileText,
  FileSpreadsheet,
  Presentation,
  FileCode2,
  Pin,
  Eye,
  Calendar,
  Trophy,
  TrendingUp,
  Sparkles,
  Compass,
} from 'lucide-react';
import { BookItem, DivisionSettings, NewsItem, ResearchItem } from '../types';

interface DashboardViewProps {
  settings: DivisionSettings;
  news: NewsItem[];
  books: BookItem[];
  works: ResearchItem[];
  isAdmin: boolean;
  onNavigateTab: (tab: 'news' | 'books' | 'works' | 'admin') => void;
  onOpenAdmin: () => void;
  onSelectNews: (item: NewsItem) => void;
  onIncrementBookDownload: (id: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  settings,
  news,
  books,
  works,
  isAdmin,
  onNavigateTab,
  onOpenAdmin,
  onSelectNews,
  onIncrementBookDownload,
}) => {
  const totalDownloads = books.reduce((acc, b) => acc + (b.downloadCount || 0), 0);
  const totalViews =
    news.reduce((acc, n) => acc + (n.viewsCount || 0), 0) +
    works.reduce((acc, w) => acc + (w.viewsCount || 0), 0);

  // Discipline breakdown for research works
  const fieldCounts: Record<string, number> = {};
  works.forEach((w) => {
    fieldCounts[w.field] = (fieldCounts[w.field] || 0) + 1;
  });
  const fields = Object.entries(fieldCounts).sort((a, b) => b[1] - a[1]);

  // Book file type breakdown
  const typeCounts: Record<string, number> = {};
  books.forEach((b) => {
    typeCounts[b.fileType] = (typeCounts[b.fileType] || 0) + 1;
  });

  // Top downloaded books
  const topBooks = [...books].sort((a, b) => (b.downloadCount || 0) - (a.downloadCount || 0)).slice(0, 4);

  // Recent pinned & latest news
  const recentNews = [...news].sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0)).slice(0, 3);

  const barGradients = [
    'from-blue-500 via-indigo-500 to-violet-500',
    'from-teal-500 via-emerald-500 to-green-500',
    'from-amber-500 via-orange-500 to-rose-500',
    'from-cyan-500 via-sky-500 to-blue-600',
    'from-fuchsia-500 via-pink-500 to-rose-500',
  ];

  const barDotColors = [
    'bg-indigo-500',
    'bg-emerald-500',
    'bg-amber-500',
    'bg-sky-500',
    'bg-pink-500',
  ];

  const fileTypeStyles: Record<
    string,
    {
      icon: React.ReactNode;
      cardBg: string;
      iconBg: string;
      textColor: string;
      badgeBg: string;
    }
  > = {
    PDF: {
      icon: <FileText className="w-5 h-5" />,
      cardBg: 'bg-rose-50/80 dark:bg-rose-950/25 border-rose-200/70 dark:border-rose-900/50',
      iconBg: 'bg-gradient-to-br from-rose-500 to-red-600 text-white shadow-sm shadow-rose-500/25',
      textColor: 'text-rose-700 dark:text-rose-300',
      badgeBg: 'bg-rose-100 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300',
    },
    DOCX: {
      icon: <FileCode2 className="w-5 h-5" />,
      cardBg: 'bg-blue-50/80 dark:bg-blue-950/25 border-blue-200/70 dark:border-blue-900/50',
      iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-sm shadow-blue-500/25',
      textColor: 'text-blue-700 dark:text-blue-300',
      badgeBg: 'bg-blue-100 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300',
    },
    XLSX: {
      icon: <FileSpreadsheet className="w-5 h-5" />,
      cardBg: 'bg-emerald-50/80 dark:bg-emerald-950/25 border-emerald-200/70 dark:border-emerald-900/50',
      iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-sm shadow-emerald-500/25',
      textColor: 'text-emerald-700 dark:text-emerald-300',
      badgeBg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300',
    },
    PPTX: {
      icon: <Presentation className="w-5 h-5" />,
      cardBg: 'bg-amber-50/80 dark:bg-amber-950/25 border-amber-200/70 dark:border-amber-900/50',
      iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-sm shadow-amber-500/25',
      textColor: 'text-amber-700 dark:text-amber-300',
      badgeBg: 'bg-amber-100 text-amber-700 dark:bg-amber-950/70 dark:text-amber-300',
    },
  };

  return (
    <div className="space-y-5 sm:space-y-8 animate-fadeIn">
      {/* Hero Welcome Banner with Campus Backdrop */}
      <div className="relative overflow-hidden rounded-2xl bg-[#0A192F] text-white p-5 sm:p-8 shadow-xl border border-slate-700/60">
        <img
          src="/src/assets/images/hero_academic_campus_1794469386153.jpg"
          alt="บรรยากาศศูนย์วิชาการ"
          className="absolute inset-0 w-full h-full object-cover opacity-25 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A192F]/95 via-[#0F274A]/90 to-[#1E3A8A]/80 pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-300 mb-2">
              <School className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="leading-snug">{settings.organizationName}</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight text-white">
              {settings.divisionName}
            </h2>
            <p className="mt-2 sm:mt-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed">
              ศูนย์รวมข่าวสารประชาสัมพันธ์ ปฏิทินและแนวปฏิบัติงานวิชาการ คลังหนังสือคู่มือดาวน์โหลด และเวทีเผยแพร่ผลงานวิจัยในชั้นเรียนและนวัตกรรมการเรียนรู้ของคณะครูและบุคลากร
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <button
              onClick={() => onNavigateTab('books')}
              className="w-full sm:w-auto min-h-[44px] bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-teal-900/30 transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <BookOpen className="w-4 h-4" />
              <span>เข้าสู่คลังเอกสารวิชาการ</span>
            </button>
          </div>
        </div>
      </div>

      {/* Vibrant KPI Cards Grid */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {/* KPI 1: News */}
        <div
          onClick={() => onNavigateTab('news')}
          className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-xl p-3.5 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500 transition-all cursor-pointer"
        >
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
          <div className="flex items-center justify-between gap-2 pt-1">
            <span className="text-[11px] sm:text-xs font-semibold text-slate-600 dark:text-slate-300 leading-snug">ข่าวประชาสัมพันธ์</span>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/25 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Newspaper className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2 sm:mt-2.5 tabular-nums">
            {news.length}
          </p>
          <div className="flex items-center justify-between gap-1 mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-slate-100 dark:border-slate-800 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1 truncate">
              <Pin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500 shrink-0" />
              <span className="truncate">ปักหมุด {news.filter((n) => n.isPinned).length}</span>
            </span>
            <span className="text-blue-600 dark:text-blue-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 shrink-0">
              <span className="hidden sm:inline">ดูทั้งหมด</span> <ArrowRight className="w-3.5 h-3.5 sm:w-3 sm:h-3" />
            </span>
          </div>
        </div>

        {/* KPI 2: Books */}
        <div
          onClick={() => onNavigateTab('books')}
          className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-xl p-3.5 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-teal-400 dark:hover:border-teal-500 transition-all cursor-pointer"
        >
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-teal-500 to-emerald-500" />
          <div className="flex items-center justify-between gap-2 pt-1">
            <span className="text-[11px] sm:text-xs font-semibold text-slate-600 dark:text-slate-300 leading-snug">คลังหนังสือ & เอกสาร</span>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-md shadow-teal-500/25 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2 sm:mt-2.5 tabular-nums">
            {books.length}
          </p>
          <div className="flex items-center justify-between gap-1 mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-slate-100 dark:border-slate-800 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
            <span className="truncate">{Object.keys(typeCounts).length} รูปแบบไฟล์</span>
            <span className="text-teal-600 dark:text-teal-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 shrink-0">
              <span className="hidden sm:inline">เปิดคลัง</span> <ArrowRight className="w-3.5 h-3.5 sm:w-3 sm:h-3" />
            </span>
          </div>
        </div>

        {/* KPI 3: Research */}
        <div
          onClick={() => onNavigateTab('works')}
          className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-xl p-3.5 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-violet-400 dark:hover:border-violet-500 transition-all cursor-pointer"
        >
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 to-violet-500" />
          <div className="flex items-center justify-between gap-2 pt-1">
            <span className="text-[11px] sm:text-xs font-semibold text-slate-600 dark:text-slate-300 leading-snug">ผลงานวิชาการ/วิจัย</span>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-500/25 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2 sm:mt-2.5 tabular-nums">
            {works.length}
          </p>
          <div className="flex items-center justify-between gap-1 mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-slate-100 dark:border-slate-800 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1 truncate">
              <Trophy className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500 shrink-0" />
              <span className="truncate">{works.filter((w) => !!w.awardOrImpact).length} รางวัล</span>
            </span>
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 shrink-0">
              <span className="hidden sm:inline">สืบค้น</span> <ArrowRight className="w-3.5 h-3.5 sm:w-3 sm:h-3" />
            </span>
          </div>
        </div>

        {/* KPI 4: Downloads & Engagement */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-900 rounded-xl p-3.5 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500" />
          <div className="flex items-center justify-between gap-2 pt-1">
            <span className="text-[11px] sm:text-xs font-semibold text-slate-600 dark:text-slate-300 leading-snug">ยอดดาวน์โหลดรวม</span>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/25 flex items-center justify-center shrink-0">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2 sm:mt-2.5 tabular-nums">
            {totalDownloads.toLocaleString()}
          </p>
          <div className="flex items-center justify-between gap-1 mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-slate-100 dark:border-slate-800 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1 truncate">
              <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sky-500 shrink-0" />
              <span className="truncate">เข้าชม {totalViews.toLocaleString()}</span>
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold shrink-0 hidden sm:inline">
              พร้อมใช้งาน
            </span>
          </div>
        </div>
      </section>

      {/* Two-Column Visual Analytics Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Research by Field Colorful Bar Chart */}
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 sm:mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center shadow-sm shrink-0">
                <BarChart3 className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                  สัดส่วนผลงานวิจัยและนวัตกรรมตามสาขาวิชา
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  การกระจายตัวของผลงานทางวิชาการ รปค.51
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 tabular-nums shrink-0">
              รวม {works.length} เรื่อง
            </span>
          </div>

          {fields.length === 0 ? (
            <div className="py-10 text-center space-y-2">
              <BarChart3 className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto" />
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                ยังไม่มีข้อมูลผลงานวิจัย (0 เรื่อง)
              </p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500">
                รอการอัปเดตหรือนำเข้าข้อมูลจากผู้ดูแลระบบ
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {fields.map(([fieldName, count], idx) => {
                const percentage = Math.round((count / (works.length || 1)) * 100);
                const barGradient = barGradients[idx % barGradients.length];
                const dotColor = barDotColors[idx % barDotColors.length];
                return (
                  <div key={fieldName} className="space-y-1.5">
                    <div className="flex justify-between gap-2 text-xs items-center">
                      <span className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2 min-w-0">
                        <span className={`w-2.5 h-2.5 rounded-sm ${dotColor} shrink-0`} />
                        <span className="truncate">{fieldName}</span>
                      </span>
                      <span className="text-slate-600 dark:text-slate-400 font-semibold tabular-nums shrink-0">
                        {count} เรื่อง ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${barGradient} rounded-full transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* File Types Colorful Grid */}
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 sm:mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 text-white flex items-center justify-center shadow-sm shrink-0">
                <PieChart className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                  ประเภทเอกสารและคู่มือในคลังวิชาการ
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  รูปแบบไฟล์ที่พร้อมให้ดาวน์โหลดผ่าน Cloud Drive
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-teal-600 dark:text-teal-400 tabular-nums shrink-0">
              รวม {books.length} เอกสาร
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {['PDF', 'DOCX', 'XLSX', 'PPTX'].map((type) => {
              const count = typeCounts[type] || 0;
              const percent = books.length ? Math.round((count / books.length) * 100) : 0;
              const style = fileTypeStyles[type];
              return (
                <div
                  key={type}
                  onClick={() => onNavigateTab('books')}
                  className={`p-3.5 rounded-xl border text-center transition-transform hover:-translate-y-0.5 cursor-pointer ${style.cardBg}`}
                >
                  <div className={`w-9 h-9 mx-auto rounded-lg flex items-center justify-center mb-2 ${style.iconBg}`}>
                    {style.icon}
                  </div>
                  <p className={`text-xs font-bold ${style.textColor}`}>{type}</p>
                  <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5 tabular-nums">
                    {count}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 tabular-nums">{percent}% ของคลัง</p>
                </div>
              );
            })}
          </div>

          <div className="mt-5 p-3.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50/70 dark:from-blue-950/35 dark:to-indigo-950/25 border border-blue-200/70 dark:border-blue-900/50 text-xs text-blue-900 dark:text-blue-200 flex items-start gap-2.5">
            <Compass className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">บริการสำหรับบุคลากรและผู้เรียน:</span> ค้นหาและดาวน์โหลดคู่มือวิชาการ แนวปฏิบัติการวัดผล และแบบฟอร์มต่าง ๆ ได้ทันทีตลอดเวลา
            </div>
          </div>
        </div>
      </section>

      {/* Two Column Feeds: Recent Announcements & Top Downloaded Resources */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent News */}
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-sky-500 text-white flex items-center justify-center shadow-xs shrink-0">
                  <Newspaper className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                  ข่าวประชาสัมพันธ์ล่าสุด
                </h3>
              </div>
              <button
                onClick={() => onNavigateTab('news')}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold cursor-pointer whitespace-nowrap shrink-0"
              >
                ดูทั้งหมด ({news.length}) →
              </button>
            </div>

            {recentNews.length === 0 ? (
              <div className="py-10 text-center space-y-2 bg-slate-50/70 dark:bg-slate-800/30 rounded-xl border border-dashed border-slate-200 dark:border-slate-700/60">
                <Newspaper className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto" />
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  ยังไม่มีข่าวประชาสัมพันธ์ (0 รายการ)
                </p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500">
                  รอการอัปเดตข้อมูลจากกลุ่มงานบริหารงานวิชาการ
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentNews.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onSelectNews(item)}
                    className="group p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 hover:bg-blue-50/60 dark:hover:bg-blue-950/30 border border-slate-200/60 dark:border-slate-700/50 hover:border-blue-300 dark:hover:border-blue-700 transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between gap-2 text-xs text-slate-400 mb-1.5">
                      <span className="text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1.5 truncate">
                        {item.isPinned && <Pin className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                        <span className="truncate">{item.category}</span>
                      </span>
                      <span className="tabular-nums flex items-center gap-1 shrink-0">
                        <Calendar className="w-3 h-3" /> {item.publishDate}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                      {item.summary}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Top Downloaded Documents */}
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-500 text-white flex items-center justify-center shadow-xs shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                  เอกสารวิชาการยอดนิยม
                </h3>
              </div>
              <button
                onClick={() => onNavigateTab('books')}
                className="text-xs text-teal-600 dark:text-teal-400 hover:underline font-semibold cursor-pointer whitespace-nowrap shrink-0"
              >
                ดูทั้งหมด ({books.length}) →
              </button>
            </div>

            {topBooks.length === 0 ? (
              <div className="py-10 text-center space-y-2 bg-slate-50/70 dark:bg-slate-800/30 rounded-xl border border-dashed border-slate-200 dark:border-slate-700/60">
                <BookOpen className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto" />
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  ยังไม่มีเอกสารในคลัง (0 เล่ม)
                </p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500">
                  รอการอัปเดตเอกสารวิชาการจากผู้ดูแลระบบ
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {topBooks.map((item) => {
                  const style = fileTypeStyles[item.fileType] || fileTypeStyles.PDF;
                  return (
                    <div
                      key={item.id}
                      className="p-3 sm:p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50 flex items-center justify-between gap-2.5 sm:gap-3 hover:border-teal-300 dark:hover:border-teal-700 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                        <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0 ${style.iconBg}`}>
                          {style.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mb-0.5">
                            <span className={`font-bold text-[11px] ${style.textColor}`}>
                              {item.fileType}
                            </span>
                            <span>·</span>
                            <span>{item.fileSize}</span>
                            <span>·</span>
                            <span className="tabular-nums">โหลด {item.downloadCount}</span>
                          </div>
                          <h4 className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 line-clamp-1">
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                            {item.author} ({item.publishedYear})
                          </p>
                        </div>
                      </div>

                      <a
                        href={item.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => onIncrementBookDownload(item.id)}
                        className="shrink-0 min-h-[40px] sm:min-h-0 px-3 py-2 text-xs font-semibold bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white rounded-lg shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                        title="เปิดลิงก์ดาวน์โหลดเอกสาร"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span className="sm:hidden">โหลด</span>
                        <span className="hidden sm:inline">ดาวน์โหลด</span>
                      </a>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
