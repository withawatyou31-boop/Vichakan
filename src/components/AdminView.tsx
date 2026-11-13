import React, { useState } from 'react';
import {
  ShieldCheck,
  Newspaper,
  BookOpen,
  GraduationCap,
  Settings,
  HardDriveDownload,
  Plus,
  Edit2,
  Trash2,
  Pin,
  Check,
  X,
  LogOut,
  ArrowLeft,
  Database,
  FileSpreadsheet,
  FileCode,
  Globe,
  RefreshCw,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { StorageManager } from '../storage';
import { BookItem, DivisionSettings, NewsItem, ResearchItem } from '../types';

interface AdminViewProps {
  news: NewsItem[];
  books: BookItem[];
  works: ResearchItem[];
  settings: DivisionSettings;
  storageUsage: { usedKB: number; totalEstimatedMB: number; percent: number };
  onAddNews: (item: Omit<NewsItem, 'id' | 'viewsCount'>) => void;
  onUpdateNews: (item: NewsItem) => void;
  onDeleteNews: (id: string) => void;
  onAddBook: (item: Omit<BookItem, 'id' | 'downloadCount'>) => void;
  onUpdateBook: (item: BookItem) => void;
  onDeleteBook: (id: string) => void;
  onAddWork: (item: Omit<ResearchItem, 'id' | 'viewsCount'>) => void;
  onUpdateWork: (item: ResearchItem) => void;
  onDeleteWork: (id: string) => void;
  onSaveSettings: (settings: DivisionSettings) => void;
  onDataImportedOrReset: () => void;
  onExitToPublic: () => void;
  onLogoutAdmin: () => void;
}

type AdminTab = 'news' | 'books' | 'works' | 'settings' | 'datahub';

export const AdminView: React.FC<AdminViewProps> = ({
  news,
  books,
  works,
  settings,
  storageUsage,
  onAddNews,
  onUpdateNews,
  onDeleteNews,
  onAddBook,
  onUpdateBook,
  onDeleteBook,
  onAddWork,
  onUpdateWork,
  onDeleteWork,
  onSaveSettings,
  onDataImportedOrReset,
  onExitToPublic,
  onLogoutAdmin,
}) => {
  const [adminTab, setAdminTab] = useState<AdminTab>('news');
  const [toast, setToast] = useState<{ text: string; isError?: boolean } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{ type: 'news' | 'book' | 'work' | 'clearZero' | 'loadDemo'; id?: string; title: string } | null>(null);

  // News Form Modal State
  const [newsModalOpen, setNewsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [newsTitle, setNewsTitle] = useState('');
  const [newsSummary, setNewsSummary] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [newsCategory, setNewsCategory] = useState<NewsItem['category']>('ข่าววิชาการ');
  const [newsAuthor, setNewsAuthor] = useState('กลุ่มงานบริหารงานวิชาการ');
  const [newsPublishDate, setNewsPublishDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [newsCoverImageUrl, setNewsCoverImageUrl] = useState('');
  const [newsIsPinned, setNewsIsPinned] = useState(false);
  const [newsExternalLink, setNewsExternalLink] = useState('');
  const [newsFormError, setNewsFormError] = useState('');

  // Book Form Modal State
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<BookItem | null>(null);
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('กลุ่มงานบริหารงานวิชาการ รปค.51');
  const [bookCategory, setBookCategory] = useState<BookItem['category']>('คู่มือวิชาการ');
  const [bookFileType, setBookFileType] = useState<BookItem['fileType']>('PDF');
  const [bookFileSize, setBookFileSize] = useState('3.5 MB');
  const [bookDownloadUrl, setBookDownloadUrl] = useState('');
  const [bookCoverImageUrl, setBookCoverImageUrl] = useState('');
  const [bookDescription, setBookDescription] = useState('');
  const [bookPublishedYear, setBookPublishedYear] = useState('2569');
  const [bookTags, setBookTags] = useState('');
  const [bookFormError, setBookFormError] = useState('');

  // Work Form Modal State
  const [workModalOpen, setWorkModalOpen] = useState(false);
  const [editingWork, setEditingWork] = useState<ResearchItem | null>(null);
  const [workTitle, setWorkTitle] = useState('');
  const [workResearchers, setWorkResearchers] = useState('');
  const [workField, setWorkField] = useState<ResearchItem['field']>('การศึกษาและการเรียนรู้');
  const [workAbstract, setWorkAbstract] = useState('');
  const [workVenue, setWorkVenue] = useState('');
  const [workYear, setWorkYear] = useState('2569');
  const [workAward, setWorkAward] = useState('');
  const [workFullPaperUrl, setWorkFullPaperUrl] = useState('');
  const [workFormError, setWorkFormError] = useState('');

  // Settings Form State
  const [divisionName, setDivisionName] = useState(settings.divisionName);
  const [organizationName, setOrganizationName] = useState(settings.organizationName);
  const [contactEmail, setContactEmail] = useState(settings.contactEmail);
  const [contactPhone, setContactPhone] = useState(settings.contactPhone);
  const [announcementBar, setAnnouncementBar] = useState(settings.announcementBar);

  // DataHub Schema Tab State
  const [activeSchemaTab, setActiveSchemaTab] = useState<'news' | 'books' | 'works' | 'settings'>('news');

  const notify = (text: string, isError = false) => {
    setToast({ text, isError });
    setTimeout(() => {
      setToast((prev) => (prev?.text === text ? null : prev));
    }, 4000);
  };

  // News Modal Handlers
  const openAddNews = () => {
    setEditingNews(null);
    setNewsTitle('');
    setNewsSummary('');
    setNewsContent('');
    setNewsCategory('ข่าววิชาการ');
    setNewsAuthor('กลุ่มงานบริหารงานวิชาการ');
    setNewsPublishDate(new Date().toISOString().slice(0, 10));
    setNewsCoverImageUrl('');
    setNewsIsPinned(false);
    setNewsExternalLink('');
    setNewsFormError('');
    setNewsModalOpen(true);
  };

  const openEditNews = (item: NewsItem) => {
    setEditingNews(item);
    setNewsTitle(item.title);
    setNewsSummary(item.summary);
    setNewsContent(item.content);
    setNewsCategory(item.category);
    setNewsAuthor(item.author);
    setNewsPublishDate(item.publishDate);
    setNewsCoverImageUrl(item.coverImageUrl || '');
    setNewsIsPinned(item.isPinned);
    setNewsExternalLink(item.externalLink || '');
    setNewsFormError('');
    setNewsModalOpen(true);
  };

  const submitNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsTitle.trim() || !newsSummary.trim()) {
      setNewsFormError('กรุณากรอกหัวข้อข่าวและเนื้อหาย่อให้ครบถ้วน');
      return;
    }
    if (editingNews) {
      onUpdateNews({
        ...editingNews,
        title: newsTitle.trim(),
        summary: newsSummary.trim(),
        content: newsContent.trim() || newsSummary.trim(),
        category: newsCategory,
        author: newsAuthor.trim() || 'กลุ่มงานบริหารงานวิชาการ',
        publishDate: newsPublishDate,
        coverImageUrl: newsCoverImageUrl.trim() || undefined,
        isPinned: newsIsPinned,
        externalLink: newsExternalLink.trim() || undefined,
      });
      notify('อัปเดตข่าวประชาสัมพันธ์เรียบร้อยแล้ว');
    } else {
      onAddNews({
        title: newsTitle.trim(),
        summary: newsSummary.trim(),
        content: newsContent.trim() || newsSummary.trim(),
        category: newsCategory,
        author: newsAuthor.trim() || 'กลุ่มงานบริหารงานวิชาการ',
        publishDate: newsPublishDate,
        coverImageUrl: newsCoverImageUrl.trim() || undefined,
        isPinned: newsIsPinned,
        externalLink: newsExternalLink.trim() || undefined,
      });
      notify('เพิ่มข่าวประชาสัมพันธ์ใหม่เรียบร้อยแล้ว');
    }
    setNewsModalOpen(false);
  };

  // Book Modal Handlers
  const openAddBook = () => {
    setEditingBook(null);
    setBookTitle('');
    setBookAuthor('กลุ่มงานบริหารงานวิชาการ รปค.51');
    setBookCategory('คู่มือวิชาการ');
    setBookFileType('PDF');
    setBookFileSize('2.5 MB');
    setBookDownloadUrl('');
    setBookCoverImageUrl('');
    setBookDescription('');
    setBookPublishedYear('2569');
    setBookTags('');
    setBookFormError('');
    setBookModalOpen(true);
  };

  const openEditBook = (item: BookItem) => {
    setEditingBook(item);
    setBookTitle(item.title);
    setBookAuthor(item.author);
    setBookCategory(item.category);
    setBookFileType(item.fileType);
    setBookFileSize(item.fileSize);
    setBookDownloadUrl(item.downloadUrl);
    setBookCoverImageUrl(item.coverImageUrl || '');
    setBookDescription(item.description);
    setBookPublishedYear(item.publishedYear);
    setBookTags(item.tags?.join(', ') || '');
    setBookFormError('');
    setBookModalOpen(true);
  };

  const submitBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookTitle.trim() || !bookDownloadUrl.trim()) {
      setBookFormError('กรุณากรอกชื่อหนังสือ/เอกสาร และลิงก์ดาวน์โหลดให้ครบถ้วน');
      return;
    }
    const tagsArray = bookTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingBook) {
      onUpdateBook({
        ...editingBook,
        title: bookTitle.trim(),
        author: bookAuthor.trim() || 'กลุ่มงานบริหารงานวิชาการ รปค.51',
        category: bookCategory,
        fileType: bookFileType,
        fileSize: bookFileSize.trim() || '1.0 MB',
        downloadUrl: bookDownloadUrl.trim(),
        coverImageUrl: bookCoverImageUrl.trim() || undefined,
        description: bookDescription.trim(),
        publishedYear: bookPublishedYear.trim() || '2569',
        tags: tagsArray.length ? tagsArray : undefined,
      });
      notify('อัปเดตข้อมูลหนังสือ/เอกสารเรียบร้อยแล้ว');
    } else {
      onAddBook({
        title: bookTitle.trim(),
        author: bookAuthor.trim() || 'กลุ่มงานบริหารงานวิชาการ รปค.51',
        category: bookCategory,
        fileType: bookFileType,
        fileSize: bookFileSize.trim() || '1.0 MB',
        downloadUrl: bookDownloadUrl.trim(),
        coverImageUrl: bookCoverImageUrl.trim() || undefined,
        description: bookDescription.trim(),
        publishedYear: bookPublishedYear.trim() || '2569',
        tags: tagsArray.length ? tagsArray : undefined,
      });
      notify('เพิ่มหนังสือ/เอกสารเข้าคลังเรียบร้อยแล้ว');
    }
    setBookModalOpen(false);
  };

  // Work Modal Handlers
  const openAddWork = () => {
    setEditingWork(null);
    setWorkTitle('');
    setWorkResearchers('');
    setWorkField('การศึกษาและการเรียนรู้');
    setWorkAbstract('');
    setWorkVenue('');
    setWorkYear('2569');
    setWorkAward('');
    setWorkFullPaperUrl('');
    setWorkFormError('');
    setWorkModalOpen(true);
  };

  const openEditWork = (item: ResearchItem) => {
    setEditingWork(item);
    setWorkTitle(item.title);
    setWorkResearchers(item.researchers);
    setWorkField(item.field);
    setWorkAbstract(item.abstract);
    setWorkVenue(item.publishVenue);
    setWorkYear(item.publishYear);
    setWorkAward(item.awardOrImpact || '');
    setWorkFullPaperUrl(item.fullPaperUrl || '');
    setWorkFormError('');
    setWorkModalOpen(true);
  };

  const submitWork = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workTitle.trim() || !workResearchers.trim() || !workAbstract.trim()) {
      setWorkFormError('กรุณากรอกชื่อผลงาน รายชื่อผู้วิจัย และบทคัดย่อให้ครบถ้วน');
      return;
    }
    if (editingWork) {
      onUpdateWork({
        ...editingWork,
        title: workTitle.trim(),
        researchers: workResearchers.trim(),
        field: workField,
        abstract: workAbstract.trim(),
        publishVenue: workVenue.trim() || 'คลังผลงานวิชาการ รปค.51',
        publishYear: workYear.trim() || '2569',
        awardOrImpact: workAward.trim() || undefined,
        fullPaperUrl: workFullPaperUrl.trim() || undefined,
      });
      notify('อัปเดตผลงานวิชาการเรียบร้อยแล้ว');
    } else {
      onAddWork({
        title: workTitle.trim(),
        researchers: workResearchers.trim(),
        field: workField,
        abstract: workAbstract.trim(),
        publishVenue: workVenue.trim() || 'คลังผลงานวิชาการ รปค.51',
        publishYear: workYear.trim() || '2569',
        awardOrImpact: workAward.trim() || undefined,
        fullPaperUrl: workFullPaperUrl.trim() || undefined,
      });
      notify('เผยแพร่ผลงานวิชาการใหม่เรียบร้อยแล้ว');
    }
    setWorkModalOpen(false);
  };

  // Settings Save
  const handleSaveSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings({
      divisionName: divisionName.trim() || 'กลุ่มงานบริหารงานวิชาการ',
      organizationName: organizationName.trim() || 'โรงเรียนราชประชานุเคราะห์ 51 จังหวัดบุรีรัมย์',
      contactEmail: contactEmail.trim(),
      contactPhone: contactPhone.trim(),
      announcementBar: announcementBar.trim(),
    });
    notify('บันทึกการตั้งค่าข้อมูลกลุ่มงานและโรงเรียนเรียบร้อยแล้ว');
  };

  // File Upload Import
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = StorageManager.importAllJSON(content);
      if (res.success) {
        onDataImportedOrReset();
        const updated = StorageManager.getSettings();
        setDivisionName(updated.divisionName);
        setOrganizationName(updated.organizationName);
        setContactEmail(updated.contactEmail);
        setContactPhone(updated.contactPhone);
        setAnnouncementBar(updated.announcementBar);
        notify(`นำเข้าข้อมูลสำเร็จ: ข่าว ${res.count?.news} · หนังสือ ${res.count?.books} · ผลงาน ${res.count?.works}`);
      } else {
        notify(res.message, true);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Execute Confirmed Action
  const handleConfirmAction = () => {
    if (!confirmDelete) return;
    if (confirmDelete.type === 'news' && confirmDelete.id) {
      onDeleteNews(confirmDelete.id);
      notify('ลบข่าวประชาสัมพันธ์เรียบร้อยแล้ว');
    } else if (confirmDelete.type === 'book' && confirmDelete.id) {
      onDeleteBook(confirmDelete.id);
      notify('ลบหนังสือ/เอกสารเรียบร้อยแล้ว');
    } else if (confirmDelete.type === 'work' && confirmDelete.id) {
      onDeleteWork(confirmDelete.id);
      notify('ลบผลงานวิจัยเรียบร้อยแล้ว');
    } else if (confirmDelete.type === 'clearZero') {
      StorageManager.clearAllToZero();
      onDataImportedOrReset();
      notify('ล้างข้อมูลทั้งหมดเป็น 0 เรียบร้อยแล้ว');
    } else if (confirmDelete.type === 'loadDemo') {
      StorageManager.loadSampleDemoData();
      onDataImportedOrReset();
      const updated = StorageManager.getSettings();
      setDivisionName(updated.divisionName);
      setOrganizationName(updated.organizationName);
      setContactEmail(updated.contactEmail);
      setContactPhone(updated.contactPhone);
      setAnnouncementBar(updated.announcementBar);
      notify('โหลดข้อมูลตัวอย่างโรงเรียนราชประชานุเคราะห์ 51 เรียบร้อยแล้ว');
    }
    setConfirmDelete(null);
  };

  return (
    <div className="space-y-6">
      {/* Admin Workspace Header */}
      <div className="bg-gradient-to-r from-[#0A192F] via-[#102A4C] to-[#173A69] text-white rounded-2xl p-4 sm:p-6 shadow-md border border-slate-700/60 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5 min-w-0">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs text-emerald-300 font-semibold">
              <span>โหมดผู้ดูแลระบบ (Admin Console)</span>
            </div>
            <h2 className="text-base sm:text-xl font-bold tracking-tight text-white mt-0.5 leading-snug">
              หน้าจัดการข้อมูล {settings.divisionName}
            </h2>
            <p className="text-xs text-slate-300 truncate">{settings.organizationName}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-2 sm:gap-2.5 shrink-0">
          <button
            onClick={onExitToPublic}
            className="min-h-[42px] sm:min-h-0 px-3.5 py-2 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/15 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>กลับหน้าพอร์ทัลสาธารณะ</span>
          </button>
          <button
            onClick={onLogoutAdmin}
            className="min-h-[42px] sm:min-h-0 px-3.5 py-2 text-xs font-semibold bg-red-600/90 hover:bg-red-500 text-white rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>ล็อกและออกจาก Admin</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div
          className={`p-3.5 rounded-xl border text-xs flex items-center justify-between gap-3 shadow-sm ${
            toast.isError
              ? 'bg-red-50 text-red-800 border-red-200 dark:bg-red-950/50 dark:text-red-300 dark:border-red-900'
              : 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-900'
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            {toast.isError ? <AlertCircle className="w-4 h-4 shrink-0" /> : <Check className="w-4 h-4 shrink-0" />}
            <span className="font-medium leading-snug">{toast.text}</span>
          </div>
          <button onClick={() => setToast(null)} className="min-w-[32px] min-h-[32px] flex items-center justify-center p-1 hover:opacity-70 cursor-pointer shrink-0">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Admin Sub-Navigation Tabs */}
      <div className="bg-white dark:bg-slate-900 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center overflow-x-auto no-scrollbar sm:flex-wrap gap-1.5">
        <button
          onClick={() => setAdminTab('news')}
          className={`min-h-[40px] sm:min-h-0 flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
            adminTab === 'news'
              ? 'bg-[#0A192F] text-white dark:bg-blue-600 shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Newspaper className="w-4 h-4" />
          <span>จัดการข่าวและประกาศ ({news.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('books')}
          className={`min-h-[40px] sm:min-h-0 flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
            adminTab === 'books'
              ? 'bg-[#0A192F] text-white dark:bg-teal-600 shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>จัดการคลังหนังสือ/เอกสาร ({books.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('works')}
          className={`min-h-[40px] sm:min-h-0 flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
            adminTab === 'works'
              ? 'bg-[#0A192F] text-white dark:bg-indigo-600 shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>จัดการผลงานวิชาการ/วิจัย ({works.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('settings')}
          className={`min-h-[40px] sm:min-h-0 flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
            adminTab === 'settings'
              ? 'bg-[#0A192F] text-white dark:bg-blue-600 shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>ตั้งค่ากลุ่มงานและประกาศ</span>
        </button>

        <button
          onClick={() => setAdminTab('datahub')}
          className={`min-h-[40px] sm:min-h-0 flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
            adminTab === 'datahub'
              ? 'bg-[#0A192F] text-white dark:bg-emerald-600 shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <HardDriveDownload className="w-4 h-4" />
          <span>สำรองข้อมูล & Export CSV/JSON/HTML</span>
        </button>
      </div>

      {/* TAB 1: Manage News */}
      {adminTab === 'news' && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">รายการข่าวสารและประกาศทั้งหมด</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">เพิ่ม แก้ไข ปักหมุด หรือลบข่าวประชาสัมพันธ์ของกลุ่มงาน</p>
            </div>
            <button
              onClick={openAddNews}
              className="w-full sm:w-auto min-h-[42px] sm:min-h-0 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>ลงข่าวประชาสัมพันธ์ใหม่</span>
            </button>
          </div>

          {/* Mobile Card List */}
          <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-800">
            {news.length === 0 ? (
              <div className="py-10 px-4 text-center text-xs text-slate-400">
                ยังไม่มีข่าวประชาสัมพันธ์ในระบบ
              </div>
            ) : (
              news.map((item) => (
                <div key={item.id} className="p-4 space-y-2.5">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="text-blue-600 dark:text-blue-400 font-semibold truncate">{item.category}</span>
                    <span className="text-[11px] text-slate-400 tabular-nums shrink-0">{item.publishDate}</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-900 dark:text-white leading-snug">{item.title}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 tabular-nums">
                      โดย: {item.author} · เข้าชม {item.viewsCount} ครั้ง
                    </p>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => {
                        onUpdateNews({ ...item, isPinned: !item.isPinned });
                        notify(item.isPinned ? 'ยกเลิกการปักหมุดข่าวแล้ว' : 'ปักหมุดข่าวไว้ด้านบนสุดแล้ว');
                      }}
                      className={`min-h-[38px] px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 border cursor-pointer ${
                        item.isPinned
                          ? 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/50 dark:border-amber-800 dark:text-amber-300'
                          : 'bg-slate-50 border-slate-200 text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <Pin className="w-3.5 h-3.5" />
                      <span>{item.isPinned ? 'ปักหมุดแล้ว' : 'ปักหมุด'}</span>
                    </button>
                    <button
                      onClick={() => openEditNews(item)}
                      className="min-h-[38px] px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>แก้ไข</span>
                    </button>
                    <button
                      onClick={() => setConfirmDelete({ type: 'news', id: item.id, title: item.title })}
                      className="min-h-[38px] px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center gap-1.5 ml-auto cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>ลบ</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="py-3 px-4 font-semibold">หัวข้อข่าว / ผู้ลงข่าว</th>
                  <th className="py-3 px-3 font-semibold">หมวดหมู่</th>
                  <th className="py-3 px-3 font-semibold">วันที่เผยแพร่</th>
                  <th className="py-3 px-3 font-semibold text-right">เข้าชม</th>
                  <th className="py-3 px-3 font-semibold text-center">ปักหมุด</th>
                  <th className="py-3 px-4 font-semibold text-right">จัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {news.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-slate-400">
                      ยังไม่มีข่าวประชาสัมพันธ์ในระบบ
                    </td>
                  </tr>
                ) : (
                  news.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4 max-w-md">
                        <p className="font-semibold text-slate-900 dark:text-white line-clamp-1">{item.title}</p>
                        <p className="text-[11px] text-slate-400 line-clamp-1">โดย: {item.author}</p>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap text-blue-600 dark:text-blue-400 font-medium">
                        {item.category}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap tabular-nums">{item.publishDate}</td>
                      <td className="py-3 px-3 whitespace-nowrap text-right tabular-nums">{item.viewsCount}</td>
                      <td className="py-3 px-3 whitespace-nowrap text-center">
                        <button
                          onClick={() => {
                            onUpdateNews({ ...item, isPinned: !item.isPinned });
                            notify(item.isPinned ? 'ยกเลิกการปักหมุดข่าวแล้ว' : 'ปักหมุดข่าวไว้ด้านบนสุดแล้ว');
                          }}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            item.isPinned
                              ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                              : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                          title={item.isPinned ? 'คลิกเพื่อยกเลิกปักหมุด' : 'คลิกเพื่อปักหมุด'}
                        >
                          <Pin className="w-3.5 h-3.5" />
                        </button>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openEditNews(item)}
                            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                            title="แก้ไขข่าว"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setConfirmDelete({ type: 'news', id: item.id, title: item.title })}
                            className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                            title="ลบข่าว"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Manage Books */}
      {adminTab === 'books' && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">จัดการคลังหนังสือและเอกสารดาวน์โหลด</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">เพิ่มลิงก์เอกสาร Google Drive / OneDrive คู่มือ และแบบฟอร์มวิชาการ</p>
            </div>
            <button
              onClick={openAddBook}
              className="w-full sm:w-auto min-h-[42px] sm:min-h-0 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold rounded-lg shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>เพิ่มหนังสือ/เอกสารใหม่</span>
            </button>
          </div>

          {/* Mobile Card List */}
          <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-800">
            {books.length === 0 ? (
              <div className="py-10 px-4 text-center text-xs text-slate-400">
                ยังไม่มีหนังสือหรือเอกสารในคลัง
              </div>
            ) : (
              books.map((item) => (
                <div key={item.id} className="p-4 space-y-2.5">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="text-teal-600 dark:text-teal-400 font-semibold truncate">{item.category}</span>
                    <span className="text-[11px] text-slate-400 tabular-nums shrink-0">
                      {item.fileType} · {item.fileSize} · พ.ศ. {item.publishedYear}
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-900 dark:text-white leading-snug">{item.title}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 tabular-nums">
                      {item.author} · ดาวน์โหลด {item.downloadCount} ครั้ง
                    </p>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href={item.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[38px] px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>ทดสอบลิงก์</span>
                    </a>
                    <button
                      onClick={() => openEditBook(item)}
                      className="min-h-[38px] px-3 py-1.5 rounded-lg text-xs font-medium bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>แก้ไข</span>
                    </button>
                    <button
                      onClick={() => setConfirmDelete({ type: 'book', id: item.id, title: item.title })}
                      className="min-h-[38px] px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center gap-1.5 ml-auto cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>ลบ</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="py-3 px-4 font-semibold">ชื่อเอกสาร / ผู้จัดทำ</th>
                  <th className="py-3 px-3 font-semibold">หมวดหมู่</th>
                  <th className="py-3 px-3 font-semibold">ชนิด/ขนาด</th>
                  <th className="py-3 px-3 font-semibold">ปี พ.ศ.</th>
                  <th className="py-3 px-3 font-semibold text-right">ดาวน์โหลด</th>
                  <th className="py-3 px-4 font-semibold text-right">จัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {books.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-slate-400">
                      ยังไม่มีหนังสือหรือเอกสารในคลัง
                    </td>
                  </tr>
                ) : (
                  books.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4 max-w-md">
                        <p className="font-semibold text-slate-900 dark:text-white line-clamp-1">{item.title}</p>
                        <p className="text-[11px] text-slate-400 line-clamp-1">{item.author}</p>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap text-teal-600 dark:text-teal-400 font-medium">
                        {item.category}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap tabular-nums">
                        <span className="font-semibold">{item.fileType}</span> · {item.fileSize}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap tabular-nums">{item.publishedYear}</td>
                      <td className="py-3 px-3 whitespace-nowrap text-right tabular-nums font-semibold">
                        {item.downloadCount}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={item.downloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-slate-500 hover:text-teal-600 hover:bg-teal-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                            title="ทดสอบลิงก์ไฟล์"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={() => openEditBook(item)}
                            className="p-1.5 text-slate-500 hover:text-teal-600 hover:bg-teal-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                            title="แก้ไขเอกสาร"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setConfirmDelete({ type: 'book', id: item.id, title: item.title })}
                            className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                            title="ลบเอกสาร"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Manage Research Works */}
      {adminTab === 'works' && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">จัดการผลงานวิชาการและงานวิจัย</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">เผยแพร่งานวิจัยในชั้นเรียน นวัตกรรม และบทความวิชาการของบุคลากร</p>
            </div>
            <button
              onClick={openAddWork}
              className="w-full sm:w-auto min-h-[42px] sm:min-h-0 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>เผยแพร่ผลงานวิจัยใหม่</span>
            </button>
          </div>

          {/* Mobile Card List */}
          <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-800">
            {works.length === 0 ? (
              <div className="py-10 px-4 text-center text-xs text-slate-400">
                ยังไม่มีผลงานวิจัยในระบบ
              </div>
            ) : (
              works.map((item) => (
                <div key={item.id} className="p-4 space-y-2.5">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="text-indigo-600 dark:text-indigo-400 font-semibold truncate">{item.field}</span>
                    <span className="text-[11px] text-slate-400 tabular-nums shrink-0">พ.ศ. {item.publishYear}</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-900 dark:text-white leading-snug">{item.title}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 tabular-nums">
                      {item.researchers} · เปิดอ่าน {item.viewsCount} ครั้ง
                    </p>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => openEditWork(item)}
                      className="min-h-[38px] px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>แก้ไข</span>
                    </button>
                    <button
                      onClick={() => setConfirmDelete({ type: 'work', id: item.id, title: item.title })}
                      className="min-h-[38px] px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center gap-1.5 ml-auto cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>ลบ</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="py-3 px-4 font-semibold">ชื่อผลงาน / คณะผู้วิจัย</th>
                  <th className="py-3 px-3 font-semibold">สาขาวิชา</th>
                  <th className="py-3 px-3 font-semibold">ปี พ.ศ.</th>
                  <th className="py-3 px-3 font-semibold text-right">เปิดอ่าน</th>
                  <th className="py-3 px-4 font-semibold text-right">จัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {works.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-10 text-center text-slate-400">
                      ยังไม่มีผลงานวิจัยในระบบ
                    </td>
                  </tr>
                ) : (
                  works.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4 max-w-md">
                        <p className="font-semibold text-slate-900 dark:text-white line-clamp-1">{item.title}</p>
                        <p className="text-[11px] text-slate-400 line-clamp-1">{item.researchers}</p>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap text-indigo-600 dark:text-indigo-400 font-medium">
                        {item.field}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap tabular-nums">{item.publishYear}</td>
                      <td className="py-3 px-3 whitespace-nowrap text-right tabular-nums">{item.viewsCount}</td>
                      <td className="py-3 px-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openEditWork(item)}
                            className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                            title="แก้ไขผลงาน"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setConfirmDelete({ type: 'work', id: item.id, title: item.title })}
                            className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                            title="ลบผลงาน"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: Division & School Settings */}
      {adminTab === 'settings' && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-8 max-w-3xl">
          <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-600 shrink-0" />
              ตั้งค่าข้อมูลกลุ่มงานและแถบประกาศโรงเรียน
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              ข้อมูลส่วนนี้จะแสดงบนส่วนหัว (Header), แถบประกาศด่วน และท้ายเว็บ (Footer) รวมถึงไฟล์ Offline Single-File
            </p>
          </div>

          <form onSubmit={handleSaveSettingsSubmit} className="mt-5 sm:mt-6 space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                ชื่อกลุ่มงาน *
              </label>
              <input
                type="text"
                required
                value={divisionName}
                onChange={(e) => setDivisionName(e.target.value)}
                className="w-full px-3.5 py-2.5 sm:py-2 text-base sm:text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                ชื่อสถานศึกษา / หน่วยงาน *
              </label>
              <input
                type="text"
                required
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                className="w-full px-3.5 py-2.5 sm:py-2 text-base sm:text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  อีเมลติดต่อ
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 sm:py-2 text-base sm:text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  เบอร์โทรศัพท์ติดต่อ
                </label>
                <input
                  type="text"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 sm:py-2 text-base sm:text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                ข้อความแถบประกาศด่วน (Announcement Ticker)
              </label>
              <textarea
                rows={2}
                value={announcementBar}
                onChange={(e) => setAnnouncementBar(e.target.value)}
                className="w-full px-3.5 py-2.5 sm:py-2 text-base sm:text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                type="submit"
                className="w-full sm:w-auto min-h-[44px] sm:min-h-0 px-5 py-2.5 sm:py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl sm:rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>บันทึกการตั้งค่า</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 5: Data Hub (LocalStorage, Schema, CSV, JSON, Standalone HTML) */}
      {adminTab === 'datahub' && (
        <div className="space-y-5 sm:space-y-6">
          {/* Storage Capacity Gauge */}
          <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs mb-2">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  สถานะพื้นที่ LocalStorage ของเว็บเบราว์เซอร์
                </span>
              </div>
              <span className="tabular-nums font-bold text-slate-700 dark:text-slate-300">
                ใช้งาน {storageUsage.usedKB} KB / ~5,120 KB ({storageUsage.percent}%)
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all"
                style={{ width: `${Math.max(2, storageUsage.percent)}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
              ✓ จัดเก็บบนคอมพิวเตอร์เครื่องนี้โดยตรง รันแบบออฟไลน์ได้ทันทีโดยไม่ต้องใช้ฐานข้อมูลภายนอก
            </p>
          </div>

          {/* CSV Export Section */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                ส่งออกข้อมูลเป็นไฟล์ Excel / CSV (UTF-8 BOM)
              </h3>
              <span className="text-[11px] text-emerald-700 dark:text-emerald-300 font-medium">
                เปิดภาษาไทยใน Microsoft Excel ได้สมบูรณ์ 100%
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => {
                  StorageManager.exportNewsCSV();
                  notify('ส่งออกไฟล์ข่าวประชาสัมพันธ์ (.csv) แล้ว');
                }}
                className="p-3.5 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-left transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">ข่าวประชาสัมพันธ์.csv</span>
                  <FileSpreadsheet className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">ส่งออก {news.length} รายการ</p>
              </button>

              <button
                onClick={() => {
                  StorageManager.exportBooksCSV();
                  notify('ส่งออกไฟล์คลังหนังสือเอกสาร (.csv) แล้ว');
                }}
                className="p-3.5 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-left transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">คลังหนังสือเอกสาร.csv</span>
                  <FileSpreadsheet className="w-4 h-4 text-teal-600" />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">ส่งออก {books.length} เล่ม</p>
              </button>

              <button
                onClick={() => {
                  StorageManager.exportWorksCSV();
                  notify('ส่งออกไฟล์ผลงานวิจัยวิชาการ (.csv) แล้ว');
                }}
                className="p-3.5 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-left transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">ผลงานวิจัยวิชาการ.csv</span>
                  <FileSpreadsheet className="w-4 h-4 text-indigo-600" />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">ส่งออก {works.length} เรื่อง</p>
              </button>
            </div>
          </div>

          {/* Standalone Single-File HTML Export */}
          <div className="bg-gradient-to-r from-[#0A192F] via-[#102A4C] to-[#1E3A8A] text-white p-5 sm:p-6 rounded-2xl shadow-md space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-300 shrink-0" />
                <h3 className="text-sm font-bold">สร้างไฟล์ Single-File HTML สำหรับเปิดใช้งานแบบ Offline</h3>
              </div>
              <span className="text-[11px] text-blue-200 font-medium">Portable Standalone (.html)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              แปลงข้อมูลข่าว คลังหนังสือ และผลงานวิชาการทั้งหมดในขณะนี้เป็นไฟล์ HTML เพียงไฟล์เดียว สำหรับนำไปเปิดดูแบบออฟไลน์บนเครื่องคอมพิวเตอร์อื่นหรือส่งต่อให้ผู้บริหาร
            </p>
            <button
              onClick={() => {
                StorageManager.exportStandaloneHTML();
                notify('สร้างและดาวน์โหลดไฟล์ Single-File HTML เรียบร้อยแล้ว');
              }}
              className="w-full sm:w-auto min-h-[44px] sm:min-h-0 px-4 py-2.5 sm:py-2 bg-white hover:bg-slate-100 text-slate-900 rounded-xl text-xs font-bold transition-all shadow-md inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <HardDriveDownload className="w-4 h-4 text-blue-600" />
              <span>ดาวน์โหลด Single-File HTML ออฟไลน์ทันที</span>
            </button>
          </div>

          {/* JSON Backup & Restore + Hosting data.json */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <FileCode className="w-4 h-4 text-indigo-600 shrink-0" />
                  ส่งออกข้อมูลทั้งหมด (.json) / สำหรับอัปขึ้นโฮสต์
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  บันทึกข้อมูลทั้งหมดเป็นไฟล์ .json หรือส่งออกชื่อ <code>data.json</code> เพื่อวางคู่กับไฟล์เว็บในโฮสต์ให้ผู้เยี่ยมชมทุกคนเห็นข้อมูลเดียวกันทันที
                </p>
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    StorageManager.exportAllJSON();
                    notify('ดาวน์โหลดไฟล์ Backup (.json) เรียบร้อยแล้ว');
                  }}
                  className="min-h-[42px] sm:min-h-0 py-2 px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  Backup (.json)
                </button>
                <button
                  onClick={() => {
                    StorageManager.exportAllJSON('data.json');
                    notify('ดาวน์โหลดไฟล์ data.json สำหรับอัปขึ้นโฮสต์แล้ว');
                  }}
                  className="min-h-[42px] sm:min-h-0 py-2 px-3 bg-[#0A192F] hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  ส่งออก data.json
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <RefreshCw className="w-4 h-4 text-teal-600 shrink-0" />
                  อัปโหลด / นำเข้าข้อมูลจากไฟล์ (.json)
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  เมื่อนำเว็บขึ้นโฮสต์แล้ว (ค่าเริ่มต้นเป็น 0) ให้เลือกไฟล์ <code>.json</code> ที่สำรองไว้เพื่ออัปข้อมูลเข้าสู่ระบบทันที
                </p>
              </div>
              <label className="mt-4 w-full min-h-[42px] sm:min-h-0 py-2.5 sm:py-2 px-3 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer flex items-center justify-center">
                เลือกไฟล์ .json เพื่ออัปข้อมูลเข้าระบบ
                <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>
          </div>

          {/* LocalStorage Schema Reference + Clear to Zero / Load Demo */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileCode className="w-4 h-4 text-blue-600 shrink-0" />
                โครงสร้างฟิลด์ LocalStorage Schema
              </h3>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() =>
                    setConfirmDelete({
                      type: 'loadDemo',
                      title: 'โหลดข้อมูลตัวอย่างของโรงเรียนราชประชานุเคราะห์ 51 เพื่อทดสอบ',
                    })
                  }
                  className="min-h-[36px] sm:min-h-0 text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium cursor-pointer"
                >
                  โหลดข้อมูลตัวอย่าง
                </button>
                <button
                  onClick={() =>
                    setConfirmDelete({
                      type: 'clearZero',
                      title: 'ล้างข้อมูลทั้งหมดกลับเป็น 0 (ข่าว 0, หนังสือ 0, ผลงาน 0)',
                    })
                  }
                  className="min-h-[36px] sm:min-h-0 text-xs text-red-600 hover:underline font-medium cursor-pointer"
                >
                  ล้างข้อมูลทั้งหมดเป็น 0
                </button>
              </div>
            </div>

            <div className="flex overflow-x-auto no-scrollbar sm:flex-wrap bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-xs">
              {(['news', 'books', 'works', 'settings'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveSchemaTab(tab)}
                  className={`px-4 py-2.5 sm:py-2 font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    activeSchemaTab === tab
                      ? 'bg-white dark:bg-slate-900 text-blue-600 border-b-2 border-blue-600'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  academic_pr_{tab}
                </button>
              ))}
            </div>

            <div className="p-4 text-xs grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600 dark:text-slate-400">
              {activeSchemaTab === 'news' && (
                <>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded"><code>id, title, summary, content</code> — เนื้อหาข่าว</div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded"><code>category, author, publishDate</code> — หมวดหมู่และผู้ลงข่าว</div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded"><code>isPinned, viewsCount</code> — ปักหมุดและยอดเข้าชม</div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded"><code>coverImageUrl, externalLink</code> — ภาพและลิงก์แนบ</div>
                </>
              )}
              {activeSchemaTab === 'books' && (
                <>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded"><code>id, title, author, category</code> — ข้อมูลหนังสือ/เอกสาร</div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded"><code>fileType, fileSize, publishedYear</code> — ชนิดและขนาดไฟล์</div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded"><code>downloadUrl, downloadCount</code> — ลิงก์ Drive และยอดโหลด</div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded"><code>description, tags, coverImageUrl</code> — คำอธิบายและแท็ก</div>
                </>
              )}
              {activeSchemaTab === 'works' && (
                <>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded"><code>id, title, researchers, field</code> — ข้อมูลงานวิจัย</div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded"><code>abstract, publishVenue, publishYear</code> — บทคัดย่อ</div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded"><code>awardOrImpact, fullPaperUrl</code> — รางวัลและลิงก์ฉบับเต็ม</div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded"><code>viewsCount</code> — ยอดเปิดอ่านบทคัดย่อ</div>
                </>
              )}
              {activeSchemaTab === 'settings' && (
                <>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded"><code>divisionName, organizationName</code> — ชื่อกลุ่มงานและโรงเรียน</div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded"><code>contactEmail, contactPhone</code> — ช่องทางติดต่อ</div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded sm:col-span-2"><code>announcementBar</code> — ข้อความแถบประกาศด่วน</div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal (Delete / Reset) */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-2xl max-w-md w-full border-t sm:border border-slate-200 dark:border-slate-800 shadow-2xl p-5 sm:p-6 pb-safe">
            <div className="w-10 h-1 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mb-3 sm:hidden" />
            <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              ยืนยันการดำเนินการ
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              คุณต้องการ{confirmDelete.type === 'clearZero' || confirmDelete.type === 'loadDemo' ? '' : 'ลบรายการ '}
              <span className="font-semibold text-slate-900 dark:text-white">"{confirmDelete.title}"</span> ใช่หรือไม่? การดำเนินการนี้ไม่สามารถย้อนกลับได้
            </p>
            <div className="mt-5 pb-2 sm:pb-0 flex flex-col-reverse sm:flex-row justify-end gap-2">
              <button
                onClick={() => setConfirmDelete(null)}
                className="min-h-[44px] sm:min-h-0 px-4 py-2.5 sm:py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl sm:rounded-lg cursor-pointer"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleConfirmAction}
                className="min-h-[44px] sm:min-h-0 px-4 py-2.5 sm:py-2 text-xs font-semibold bg-red-600 hover:bg-red-500 text-white rounded-xl sm:rounded-lg cursor-pointer"
              >
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit News Modal */}
      {newsModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-2xl max-w-2xl w-full max-h-[92vh] sm:max-h-[90vh] overflow-y-auto border-t sm:border border-slate-200 dark:border-slate-800 shadow-2xl p-5 sm:p-8 pb-safe">
            <div className="w-10 h-1 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mb-3 sm:hidden" />
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-blue-600 shrink-0" />
                {editingNews ? 'แก้ไขข่าวประชาสัมพันธ์' : 'ลงข่าวประชาสัมพันธ์ใหม่'}
              </h3>
              <button onClick={() => setNewsModalOpen(false)} className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={submitNews} className="mt-5 space-y-4 text-xs">
              {newsFormError && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900">
                  {newsFormError}
                </div>
              )}
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">หัวข้อข่าวประชาสัมพันธ์ *</label>
                <input
                  type="text"
                  required
                  value={newsTitle}
                  onChange={(e) => setNewsTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 sm:py-2 text-base sm:text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">หมวดหมู่ข่าว</label>
                  <select
                    value={newsCategory}
                    onChange={(e) => setNewsCategory(e.target.value as NewsItem['category'])}
                    className="w-full px-3.5 py-2.5 sm:py-2 text-base sm:text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="ข่าววิชาการ">ข่าววิชาการ</option>
                    <option value="อบรมสัมมนา">อบรมสัมมนา</option>
                    <option value="ประกาศกลุ่มงาน">ประกาศกลุ่มงาน</option>
                    <option value="กิจกรรม/นิทรรศการ">กิจกรรม/นิทรรศการ</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">วันที่เผยแพร่</label>
                  <input
                    type="date"
                    value={newsPublishDate}
                    onChange={(e) => setNewsPublishDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 sm:py-2 text-base sm:text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">ผู้ลงข่าว / งานที่รับผิดชอบ</label>
                <input
                  type="text"
                  value={newsAuthor}
                  onChange={(e) => setNewsAuthor(e.target.value)}
                  className="w-full px-3.5 py-2.5 sm:py-2 text-base sm:text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">เนื้อหาย่อ *</label>
                <textarea
                  rows={2}
                  required
                  value={newsSummary}
                  onChange={(e) => setNewsSummary(e.target.value)}
                  className="w-full px-3.5 py-2.5 sm:py-2 text-base sm:text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">เนื้อหาข่าวฉบับเต็ม</label>
                <textarea
                  rows={4}
                  value={newsContent}
                  onChange={(e) => setNewsContent(e.target.value)}
                  className="w-full px-3.5 py-2.5 sm:py-2 text-base sm:text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">URL ภาพประกอบข่าว</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={newsCoverImageUrl}
                    onChange={(e) => setNewsCoverImageUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 sm:py-2 text-base sm:text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">ลิงก์เพิ่มเติม (Google Form / Drive)</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={newsExternalLink}
                    onChange={(e) => setNewsExternalLink(e.target.value)}
                    className="w-full px-3.5 py-2.5 sm:py-2 text-base sm:text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <label className="flex items-center gap-2.5 py-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newsIsPinned}
                  onChange={(e) => setNewsIsPinned(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600"
                />
                <span className="text-slate-700 dark:text-slate-300">ปักหมุดข่าวนี้ไว้ด้านบนสุดของหน้าพอร์ทัล</span>
              </label>

              <div className="pt-4 pb-2 sm:pb-0 border-t border-slate-100 dark:border-slate-800 flex flex-col-reverse sm:flex-row justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNewsModalOpen(false)}
                  className="min-h-[44px] sm:min-h-0 px-4 py-2.5 sm:py-2 font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl sm:rounded-lg cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="min-h-[44px] sm:min-h-0 px-5 py-2.5 sm:py-2 font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-xl sm:rounded-lg shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingNews ? 'บันทึกการแก้ไข' : 'บันทึกลงข่าว'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add/Edit Book Modal */}
      {bookModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-2xl max-w-2xl w-full max-h-[92vh] sm:max-h-[90vh] overflow-y-auto border-t sm:border border-slate-200 dark:border-slate-800 shadow-2xl p-5 sm:p-8 pb-safe">
            <div className="w-10 h-1 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mb-3 sm:hidden" />
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-teal-600 shrink-0" />
                {editingBook ? 'แก้ไขข้อมูลหนังสือ/เอกสาร' : 'เพิ่มหนังสือ/เอกสารใหม่เข้าคลัง'}
              </h3>
              <button onClick={() => setBookModalOpen(false)} className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={submitBook} className="mt-5 space-y-4 text-xs">
              {bookFormError && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900">
                  {bookFormError}
                </div>
              )}
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">ชื่อหนังสือ / เอกสารวิชาการ *</label>
                <input
                  type="text"
                  required
                  value={bookTitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 sm:py-2 text-base sm:text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">หมวดหมู่เอกสาร</label>
                  <select
                    value={bookCategory}
                    onChange={(e) => setBookCategory(e.target.value as BookItem['category'])}
                    className="w-full px-3.5 py-2.5 sm:py-2 text-base sm:text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="คู่มือวิชาการ">คู่มือวิชาการ</option>
                    <option value="รายงานวิจัย">รายงานวิจัย</option>
                    <option value="เอกสารเผยแพร่">เอกสารเผยแพร่</option>
                    <option value="วารสารวิชาการ">วารสารวิชาการ</option>
                    <option value="แนวปฏิบัติมาตรฐาน">แนวปฏิบัติมาตรฐาน</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">ผู้จัดทำ / คณะผู้แต่ง</label>
                  <input
                    type="text"
                    value={bookAuthor}
                    onChange={(e) => setBookAuthor(e.target.value)}
                    className="w-full px-3.5 py-2.5 sm:py-2 text-base sm:text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">ประเภทไฟล์</label>
                  <select
                    value={bookFileType}
                    onChange={(e) => setBookFileType(e.target.value as BookItem['fileType'])}
                    className="w-full px-3.5 py-2.5 sm:py-2 text-base sm:text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="PDF">PDF</option>
                    <option value="DOCX">DOCX</option>
                    <option value="XLSX">XLSX</option>
                    <option value="PPTX">PPTX</option>
                    <option value="ZIP">ZIP</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">ขนาดไฟล์</label>
                  <input
                    type="text"
                    value={bookFileSize}
                    onChange={(e) => setBookFileSize(e.target.value)}
                    className="w-full px-3.5 py-2.5 sm:py-2 text-base sm:text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">ปีที่เผยแพร่ (พ.ศ.)</label>
                  <input
                    type="text"
                    value={bookPublishedYear}
                    onChange={(e) => setBookPublishedYear(e.target.value)}
                    className="w-full px-3.5 py-2.5 sm:py-2 text-base sm:text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">URL ลิงก์ดาวน์โหลด (Google Drive / OneDrive) *</label>
                <input
                  type="url"
                  required
                  placeholder="https://drive.google.com/..."
                  value={bookDownloadUrl}
                  onChange={(e) => setBookDownloadUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 sm:py-2 text-base sm:text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">URL ภาพหน้าปก</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={bookCoverImageUrl}
                  onChange={(e) => setBookCoverImageUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 sm:py-2 text-base sm:text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">คำอธิบาย</label>
                <textarea
                  rows={3}
                  value={bookDescription}
                  onChange={(e) => setBookDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 sm:py-2 text-base sm:text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">แท็กคำค้นหา (คั่นด้วย , )</label>
                <input
                  type="text"
                  value={bookTags}
                  onChange={(e) => setBookTags(e.target.value)}
                  className="w-full px-3.5 py-2.5 sm:py-2 text-base sm:text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="pt-4 pb-2 sm:pb-0 border-t border-slate-100 dark:border-slate-800 flex flex-col-reverse sm:flex-row justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setBookModalOpen(false)}
                  className="min-h-[44px] sm:min-h-0 px-4 py-2.5 sm:py-2 font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl sm:rounded-lg cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="min-h-[44px] sm:min-h-0 px-5 py-2.5 sm:py-2 font-semibold bg-teal-600 hover:bg-teal-500 text-white rounded-xl sm:rounded-lg shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingBook ? 'บันทึกการแก้ไข' : 'เพิ่มเอกสารเข้าคลัง'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add/Edit Research Work Modal */}
      {workModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-2xl max-w-2xl w-full max-h-[92vh] sm:max-h-[90vh] overflow-y-auto border-t sm:border border-slate-200 dark:border-slate-800 shadow-2xl p-5 sm:p-8 pb-safe">
            <div className="w-10 h-1 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mb-3 sm:hidden" />
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-indigo-600 shrink-0" />
                {editingWork ? 'แก้ไขข้อมูลผลงานวิชาการ' : 'เผยแพร่ผลงานวิชาการ/วิจัยใหม่'}
              </h3>
              <button onClick={() => setWorkModalOpen(false)} className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={submitWork} className="mt-5 space-y-4 text-xs">
              {workFormError && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900">
                  {workFormError}
                </div>
              )}
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">ชื่อผลงานวิจัย / นวัตกรรมวิชาการ *</label>
                <input
                  type="text"
                  required
                  value={workTitle}
                  onChange={(e) => setWorkTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 sm:py-2 text-base sm:text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">คณะผู้วิจัย / ผู้สร้างสรรค์ผลงาน *</label>
                <input
                  type="text"
                  required
                  value={workResearchers}
                  onChange={(e) => setWorkResearchers(e.target.value)}
                  className="w-full px-3.5 py-2.5 sm:py-2 text-base sm:text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">สาขาวิชาการ</label>
                  <select
                    value={workField}
                    onChange={(e) => setWorkField(e.target.value as ResearchItem['field'])}
                    className="w-full px-3.5 py-2.5 sm:py-2 text-base sm:text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="การศึกษาและการเรียนรู้">การศึกษาและการเรียนรู้</option>
                    <option value="นวัตกรรมดิจิทัล">นวัตกรรมดิจิทัล</option>
                    <option value="วิทยาศาสตร์และเทคโนโลยี">วิทยาศาสตร์และเทคโนโลยี</option>
                    <option value="การแพทย์และสาธารณสุข">การแพทย์และสาธารณสุข</option>
                    <option value="การบริหารจัดการองค์กร">การบริหารจัดการองค์กร</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">ปีที่เผยแพร่ (พ.ศ.)</label>
                  <input
                    type="text"
                    value={workYear}
                    onChange={(e) => setWorkYear(e.target.value)}
                    className="w-full px-3.5 py-2.5 sm:py-2 text-base sm:text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">แหล่งตีพิมพ์ / วารสาร / เวทีนำเสนอ</label>
                <input
                  type="text"
                  value={workVenue}
                  onChange={(e) => setWorkVenue(e.target.value)}
                  className="w-full px-3.5 py-2.5 sm:py-2 text-base sm:text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">รางวัล หรือ ผลกระทบที่ได้รับ</label>
                <input
                  type="text"
                  value={workAward}
                  onChange={(e) => setWorkAward(e.target.value)}
                  className="w-full px-3.5 py-2.5 sm:py-2 text-base sm:text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">บทคัดย่อ (Abstract) *</label>
                <textarea
                  rows={4}
                  required
                  value={workAbstract}
                  onChange={(e) => setWorkAbstract(e.target.value)}
                  className="w-full px-3.5 py-2.5 sm:py-2 text-base sm:text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">URL บทความวิจัยฉบับเต็ม</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={workFullPaperUrl}
                  onChange={(e) => setWorkFullPaperUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 sm:py-2 text-base sm:text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="pt-4 pb-2 sm:pb-0 border-t border-slate-100 dark:border-slate-800 flex flex-col-reverse sm:flex-row justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setWorkModalOpen(false)}
                  className="min-h-[44px] sm:min-h-0 px-4 py-2.5 sm:py-2 font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl sm:rounded-lg cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="min-h-[44px] sm:min-h-0 px-5 py-2.5 sm:py-2 font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl sm:rounded-lg shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingWork ? 'บันทึกการแก้ไข' : 'เผยแพร่ผลงาน'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
