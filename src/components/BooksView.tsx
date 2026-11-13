import React, { useState } from 'react';
import { BookOpen, Search, Download, ExternalLink, Grid, List, FileText } from 'lucide-react';
import { BookItem } from '../types';

interface BooksViewProps {
  books: BookItem[];
  onIncrementBookDownload: (id: string) => void;
}

export const BooksView: React.FC<BooksViewProps> = ({ books, onIncrementBookDownload }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ทั้งหมด');
  const [selectedFileType, setSelectedFileType] = useState<string>('ทั้งหมด');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const categories = ['ทั้งหมด', 'คู่มือวิชาการ', 'รายงานวิจัย', 'เอกสารเผยแพร่', 'วารสารวิชาการ', 'แนวปฏิบัติมาตรฐาน'];
  const fileTypes = ['ทั้งหมด', 'PDF', 'DOCX', 'XLSX', 'PPTX'];

  const filteredBooks = books.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.author.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      (item.tags && item.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())));
    const matchesCategory = selectedCategory === 'ทั้งหมด' || item.category === selectedCategory;
    const matchesType = selectedFileType === 'ทั้งหมด' || item.fileType === selectedFileType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const getFileTypeBadge = (type: string) => {
    switch (type) {
      case 'PDF':
        return 'bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400 border-red-200 dark:border-red-800';
      case 'DOCX':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'XLSX':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      case 'PPTX':
        return 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400 border-amber-200 dark:border-amber-800';
      default:
        return 'bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-teal-600" />
          คลังหนังสือและเอกสารวิชาการดาวน์โหลด
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          เอกสารคู่มือ ระเบียบปฏิบัติ แบบฟอร์ม และรายงานวิชาการ โรงเรียนราชประชานุเคราะห์ 51 จังหวัดบุรีรัมย์
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex flex-row items-center justify-between gap-2.5 sm:gap-3">
          <div className="relative flex-1 min-w-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ค้นหาชื่อหนังสือ ผู้จัดทำ แท็ก..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 sm:py-2 text-base sm:text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setViewMode('grid')}
                className={`min-w-[36px] min-h-[36px] sm:min-w-0 sm:min-h-0 flex items-center justify-center p-1.5 rounded transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-700 text-teal-600 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="มุมมองแบบการ์ด (Grid)"
                aria-label="มุมมองแบบการ์ด"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`min-w-[36px] min-h-[36px] sm:min-w-0 sm:min-h-0 flex items-center justify-center p-1.5 rounded transition-colors cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-white dark:bg-slate-700 text-teal-600 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="มุมมองแบบตาราง (Table/List)"
                aria-label="มุมมองแบบรายการ"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar sm:flex-wrap pb-0.5 sm:pb-0">
            <span className="text-xs text-slate-400 mr-1 shrink-0">หมวดหมู่:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`min-h-[36px] sm:min-h-0 px-2.5 py-1.5 sm:py-1 text-xs rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-teal-600 text-white font-semibold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar sm:flex-wrap pb-0.5 sm:pb-0">
            <span className="text-xs text-slate-400 mr-1 shrink-0">ชนิดไฟล์:</span>
            {fileTypes.map((ft) => (
              <button
                key={ft}
                onClick={() => setSelectedFileType(ft)}
                className={`min-h-[36px] sm:min-h-0 px-2.5 sm:px-2 py-1 sm:py-0.5 text-xs rounded transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedFileType === ft
                    ? 'bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 font-bold'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {ft}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Rendering: Grid vs Table */}
      {filteredBooks.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-xl p-12 text-center border border-slate-200 dark:border-slate-800">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300">
            {books.length === 0 ? 'ยังไม่มีหนังสือหรือเอกสารในคลัง (0 เล่ม)' : 'ไม่พบหนังสือหรือเอกสารในคลัง'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {books.length === 0 ? 'รอการอัปเดตเอกสารจากเจ้าหน้าที่กลุ่มงานบริหารงานวิชาการ' : 'ลองเปลี่ยนคำค้นหาหรือตัวกรองประเภทไฟล์'}
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredBooks.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md hover:border-teal-300 dark:hover:border-teal-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] sm:aspect-3/4 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  {item.coverImageUrl ? (
                    <img
                      src={item.coverImageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-teal-950 text-white p-4 text-center">
                      <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-teal-400/80 mb-2" />
                      <span className="text-xs font-semibold text-teal-200 line-clamp-2 px-2">{item.title}</span>
                      <span className="text-[10px] text-slate-400 mt-1.5">{item.publishedYear}</span>
                    </div>
                  )}

                  <span
                    className={`absolute top-2.5 right-2.5 border text-[10px] font-bold px-2 py-0.5 rounded shadow-sm ${getFileTypeBadge(
                      item.fileType
                    )}`}
                  >
                    {item.fileType}
                  </span>

                  <span className="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded tabular-nums">
                    {item.fileSize}
                  </span>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                    <span className="text-teal-600 dark:text-teal-400 font-semibold">{item.category}</span>
                    <span className="tabular-nums">พ.ศ. {item.publishedYear}</span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-1">
                    โดย: {item.author}
                  </p>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                    {item.description}
                  </p>

                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5 text-[11px] text-slate-400">
                      {item.tags.join(' · ')}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 mt-2">
                <a
                  href={item.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onIncrementBookDownload(item.id)}
                  className="w-full min-h-[44px] sm:min-h-0 py-2.5 sm:py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl sm:rounded-lg text-xs font-semibold shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                  <span>ดาวน์โหลด / เปิดไฟล์</span>
                  <ExternalLink className="w-3 h-3 text-teal-200" />
                </a>

                <p className="text-center text-[11px] text-slate-400 tabular-nums">
                  ดาวน์โหลดแล้ว {item.downloadCount} ครั้ง
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          {/* Mobile Compact List View */}
          <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-800">
            {filteredBooks.map((item) => (
              <div key={item.id} className="p-4 space-y-2.5">
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="text-teal-600 dark:text-teal-400 font-semibold truncate">{item.category}</span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className={`border text-[10px] font-bold px-1.5 py-0.5 rounded ${getFileTypeBadge(item.fileType)}`}>
                      {item.fileType}
                    </span>
                    <span className="text-[11px] text-slate-400 tabular-nums">{item.fileSize}</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">{item.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {item.author} · พ.ศ. {item.publishedYear} · โหลด {item.downloadCount} ครั้ง
                  </p>
                </div>
                <a
                  href={item.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onIncrementBookDownload(item.id)}
                  className="w-full min-h-[42px] py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>เปิดดาวน์โหลดไฟล์</span>
                </a>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="py-3 px-4 font-semibold">ชื่อเอกสาร / รายละเอียด</th>
                  <th className="py-3 px-3 font-semibold">หมวดหมู่</th>
                  <th className="py-3 px-3 font-semibold">ไฟล์</th>
                  <th className="py-3 px-3 font-semibold">ผู้จัดทำ</th>
                  <th className="py-3 px-3 font-semibold">ปีเผยแพร่</th>
                  <th className="py-3 px-3 font-semibold text-right">ดาวน์โหลด</th>
                  <th className="py-3 px-4 font-semibold text-right">เปิดไฟล์</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {filteredBooks.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-medium max-w-xs">
                      <p className="font-semibold text-slate-900 dark:text-white line-clamp-1">{item.title}</p>
                      <p className="text-[11px] text-slate-400 line-clamp-1">{item.description}</p>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap text-teal-600 dark:text-teal-400 font-medium">
                      {item.category}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className={`border text-[10px] font-bold px-1.5 py-0.5 rounded ${getFileTypeBadge(item.fileType)}`}>
                        {item.fileType}
                      </span>{' '}
                      <span className="text-slate-400 text-[11px] tabular-nums">{item.fileSize}</span>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap text-slate-500">{item.author}</td>
                    <td className="py-3 px-3 whitespace-nowrap tabular-nums">{item.publishedYear}</td>
                    <td className="py-3 px-3 whitespace-nowrap text-right tabular-nums font-semibold">
                      {item.downloadCount} ครั้ง
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-right">
                      <a
                        href={item.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => onIncrementBookDownload(item.id)}
                        className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg font-semibold text-[11px] inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Download className="w-3 h-3" /> เปิดไฟล์
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
