import React, { useState } from 'react';
import { GraduationCap, Search, Award, ExternalLink, X, BookOpen, Eye, Users } from 'lucide-react';
import { ResearchItem } from '../types';

interface ResearchViewProps {
  works: ResearchItem[];
  onViewWork: (id: string) => void;
}

export const ResearchView: React.FC<ResearchViewProps> = ({ works, onViewWork }) => {
  const [search, setSearch] = useState('');
  const [selectedField, setSelectedField] = useState<string>('ทั้งหมด');
  const [selectedWorkForModal, setSelectedWorkForModal] = useState<ResearchItem | null>(null);

  const fields = [
    'ทั้งหมด',
    'การศึกษาและการเรียนรู้',
    'นวัตกรรมดิจิทัล',
    'วิทยาศาสตร์และเทคโนโลยี',
    'การแพทย์และสาธารณสุข',
    'การบริหารจัดการองค์กร',
  ];

  const filteredWorks = works.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.researchers.toLowerCase().includes(search.toLowerCase()) ||
      item.abstract.toLowerCase().includes(search.toLowerCase()) ||
      item.publishVenue.toLowerCase().includes(search.toLowerCase());
    const matchesField = selectedField === 'ทั้งหมด' || item.field === selectedField;
    return matchesSearch && matchesField;
  });

  const handleOpenDetailModal = (item: ResearchItem) => {
    onViewWork(item.id);
    setSelectedWorkForModal({ ...item, viewsCount: (item.viewsCount || 0) + 1 });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-indigo-600" />
          การเผยแพร่ผลงานวิชาการและนวัตกรรม
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          คลังงานวิจัยในชั้นเรียน นวัตกรรมการสอน และบทความวิชาการของคณะครู โรงเรียนราชประชานุเคราะห์ 51 จังหวัดบุรีรัมย์
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="ค้นหาชื่อผลงานวิจัย คณะผู้วิจัย แหล่งเผยแพร่..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 sm:py-2 text-base sm:text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800 overflow-x-auto no-scrollbar sm:flex-wrap pb-0.5 sm:pb-0">
          <span className="text-xs text-slate-400 mr-1 shrink-0">สาขาวิชา:</span>
          {fields.map((fld) => (
            <button
              key={fld}
              onClick={() => setSelectedField(fld)}
              className={`min-h-[36px] sm:min-h-0 px-3 py-1.5 sm:py-1 text-xs rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                selectedField === fld
                  ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {fld}
            </button>
          ))}
        </div>
      </div>

      {/* Research List */}
      {filteredWorks.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-xl p-12 text-center border border-slate-200 dark:border-slate-800">
          <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300">
            {works.length === 0 ? 'ยังไม่มีผลงานวิชาการ/วิจัยในระบบ (0 เรื่อง)' : 'ไม่พบผลงานวิจัยที่ค้นหา'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {works.length === 0 ? 'รอการอัปเดตผลงานวิชาการจากเจ้าหน้าที่กลุ่มงานบริหารงานวิชาการ' : 'ลองเปลี่ยนคำค้นหาหรือเลือกสาขาวิชาอื่น'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredWorks.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-700 transition-all space-y-4"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-bold text-indigo-700 dark:text-indigo-400">
                    {item.field}
                  </span>
                  <span>·</span>
                  <span className="tabular-nums">ปีที่ตีพิมพ์ {item.publishYear}</span>
                  <span>·</span>
                  <span>{item.publishVenue}</span>
                </div>

                <h3
                  onClick={() => handleOpenDetailModal(item)}
                  className="text-base sm:text-lg font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors leading-snug"
                >
                  {item.title}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>
                    ผู้วิจัย: <strong className="font-medium text-slate-800 dark:text-slate-200">{item.researchers}</strong>
                  </span>
                </div>

                {item.awardOrImpact && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs font-semibold text-amber-800 dark:text-amber-300">
                    <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{item.awardOrImpact}</span>
                  </div>
                )}
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <p className="line-clamp-3">
                  <strong className="text-slate-800 dark:text-slate-200">บทคัดย่อ: </strong>
                  {item.abstract}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleOpenDetailModal(item)}
                    className="min-h-[40px] sm:min-h-0 px-3.5 py-2 sm:py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50/70 dark:bg-indigo-950/30 hover:bg-indigo-100 dark:hover:bg-indigo-950/50 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>อ่านบทคัดย่อฉบับเต็ม</span>
                  </button>

                  {item.fullPaperUrl && (
                    <a
                      href={item.fullPaperUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[40px] sm:min-h-0 px-3.5 py-2 sm:py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>เปิดเอกสารฉบับเต็ม</span>
                    </a>
                  )}
                </div>

                <span className="text-[11px] text-slate-400 flex items-center gap-1 tabular-nums">
                  <Eye className="w-3 h-3" /> เปิดอ่าน {item.viewsCount} ครั้ง
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Abstract Detail Modal */}
      {selectedWorkForModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-2xl max-w-2xl w-full max-h-[92vh] sm:max-h-[90vh] overflow-y-auto border-t sm:border border-slate-200 dark:border-slate-800 shadow-2xl p-5 sm:p-8 animate-scaleUp pb-safe">
            <div className="w-10 h-1 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mb-3 sm:hidden" />
            <div className="flex justify-between items-start gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="min-w-0">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  {selectedWorkForModal.field}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1 leading-snug">
                  {selectedWorkForModal.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedWorkForModal(null)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg cursor-pointer shrink-0"
                aria-label="ปิดหน้าต่าง"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-2.5 text-xs text-slate-600 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800">
              <p>
                <strong className="text-slate-800 dark:text-slate-200">คณะผู้วิจัย: </strong>
                {selectedWorkForModal.researchers}
              </p>
              <p>
                <strong className="text-slate-800 dark:text-slate-200">แหล่งตีพิมพ์/เผยแพร่: </strong>
                {selectedWorkForModal.publishVenue} ({selectedWorkForModal.publishYear})
              </p>
              {selectedWorkForModal.awardOrImpact && (
                <p className="text-amber-800 dark:text-amber-300 font-semibold bg-amber-50 dark:bg-amber-950/40 p-2.5 rounded-lg">
                  🏆 {selectedWorkForModal.awardOrImpact}
                </p>
              )}
            </div>

            <div className="py-5 sm:py-6 space-y-2">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                บทคัดย่อ (Abstract)
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                {selectedWorkForModal.abstract}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-[11px] text-slate-400 tabular-nums text-center sm:text-left">
                เปิดอ่าน {selectedWorkForModal.viewsCount} ครั้ง
              </span>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                {selectedWorkForModal.fullPaperUrl && (
                  <a
                    href={selectedWorkForModal.fullPaperUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] sm:min-h-0 px-4 py-2.5 sm:py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl sm:rounded-lg text-xs font-semibold shadow-sm transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>เปิดเอกสารฉบับเต็ม</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <button
                  onClick={() => setSelectedWorkForModal(null)}
                  className="min-h-[44px] sm:min-h-0 px-4 py-2.5 sm:py-2 text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl sm:rounded-lg transition-colors cursor-pointer"
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
