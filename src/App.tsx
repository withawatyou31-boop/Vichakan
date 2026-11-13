/**
 * กลุ่มงานบริหารงานวิชาการ โรงเรียนราชประชานุเคราะห์ 51 จังหวัดบุรีรัมย์
 * Offline-first academic portal running with browser LocalStorage,
 * public showcase views, and passcode-protected Admin Management Console.
 */

import { useEffect, useState } from 'react';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminView } from './components/AdminView';
import { AnnouncementTicker } from './components/AnnouncementTicker';
import { BooksView } from './components/BooksView';
import { DashboardView } from './components/DashboardView';
import { Navbar } from './components/Navbar';
import { NewsView } from './components/NewsView';
import { ResearchView } from './components/ResearchView';
import { StorageManager } from './storage';
import { BookItem, DivisionSettings, NewsItem, ResearchItem } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'news' | 'books' | 'works' | 'admin'>('dashboard');
  const [isDark, setIsDark] = useState<boolean>(() => {
    return localStorage.getItem('academic_pr_theme') === 'dark';
  });

  // Admin authentication state (protected by passcode 112233)
  const [isAdmin, setIsAdmin] = useState<boolean>(() => StorageManager.isAdminAuthenticated());
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Data states loaded from LocalStorage
  const [settings, setSettings] = useState<DivisionSettings>(() => StorageManager.getSettings());
  const [news, setNews] = useState<NewsItem[]>(() => StorageManager.getNews());
  const [books, setBooks] = useState<BookItem[]>(() => StorageManager.getBooks());
  const [works, setWorks] = useState<ResearchItem[]>(() => StorageManager.getWorks());
  const [storageUsage, setStorageUsage] = useState(() => StorageManager.getStorageUsage());

  // Reading modal state
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  // Sync theme with <html> class
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('academic_pr_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('academic_pr_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const refreshAllData = () => {
    setSettings(StorageManager.getSettings());
    setNews(StorageManager.getNews());
    setBooks(StorageManager.getBooks());
    setWorks(StorageManager.getWorks());
    setStorageUsage(StorageManager.getStorageUsage());
  };

  // On fresh hosting with 0 items, silently check if ./data.json exists on the host
  useEffect(() => {
    let active = true;
    StorageManager.tryLoadHostedDataJson().then((loaded) => {
      if (active && loaded) {
        refreshAllData();
      }
    });
    return () => {
      active = false;
    };
  }, []);

  // Admin Access Handlers
  const handleOpenAdmin = () => {
    if (isAdmin) {
      setActiveTab('admin');
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleLoginAdmin = (passcode: string): boolean => {
    const ok = StorageManager.loginAdmin(passcode);
    if (ok) {
      setIsAdmin(true);
      setIsLoginModalOpen(false);
      setActiveTab('admin');
      return true;
    }
    return false;
  };

  const handleLogoutAdmin = () => {
    StorageManager.logoutAdmin();
    setIsAdmin(false);
    setActiveTab('dashboard');
  };

  // News Handlers
  const handleAddNews = (item: Omit<NewsItem, 'id' | 'viewsCount'>) => {
    StorageManager.addNews(item);
    refreshAllData();
  };

  const handleUpdateNews = (item: NewsItem) => {
    StorageManager.updateNews(item);
    refreshAllData();
  };

  const handleDeleteNews = (id: string) => {
    StorageManager.deleteNews(id);
    refreshAllData();
  };

  const handleSelectNews = (item: NewsItem) => {
    StorageManager.incrementNewsView(item.id);
    setSelectedNews({ ...item, viewsCount: (item.viewsCount || 0) + 1 });
    refreshAllData();
  };

  // Books Handlers
  const handleAddBook = (item: Omit<BookItem, 'id' | 'downloadCount'>) => {
    StorageManager.addBook(item);
    refreshAllData();
  };

  const handleUpdateBook = (item: BookItem) => {
    StorageManager.updateBook(item);
    refreshAllData();
  };

  const handleDeleteBook = (id: string) => {
    StorageManager.deleteBook(id);
    refreshAllData();
  };

  const handleIncrementBookDownload = (id: string) => {
    StorageManager.incrementBookDownload(id);
    refreshAllData();
  };

  // Research Handlers
  const handleAddWork = (item: Omit<ResearchItem, 'id' | 'viewsCount'>) => {
    StorageManager.addWork(item);
    refreshAllData();
  };

  const handleUpdateWork = (item: ResearchItem) => {
    StorageManager.updateWork(item);
    refreshAllData();
  };

  const handleDeleteWork = (id: string) => {
    StorageManager.deleteWork(id);
    refreshAllData();
  };

  const handleViewWork = (id: string) => {
    StorageManager.incrementWorkView(id);
    refreshAllData();
  };

  // Settings Handler
  const handleSaveSettings = (newSettings: DivisionSettings) => {
    StorageManager.saveSettings(newSettings);
    refreshAllData();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors flex flex-col justify-between">
      <div>
        {/* Top Header Navbar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            if (tab === 'admin' && !isAdmin) {
              setIsLoginModalOpen(true);
            } else {
              setActiveTab(tab);
            }
          }}
          settings={settings}
          isAdmin={isAdmin}
          onOpenAdmin={handleOpenAdmin}
          isDark={isDark}
          onToggleTheme={toggleTheme}
        />

        {/* Global Announcement Banner */}
        <AnnouncementTicker text={settings.announcementBar} />

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-8 w-full">
          {activeTab === 'dashboard' && (
            <DashboardView
              settings={settings}
              news={news}
              books={books}
              works={works}
              isAdmin={isAdmin}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onOpenAdmin={handleOpenAdmin}
              onSelectNews={handleSelectNews}
              onIncrementBookDownload={handleIncrementBookDownload}
            />
          )}

          {activeTab === 'news' && (
            <NewsView
              news={news}
              onSelectNews={handleSelectNews}
              selectedNews={selectedNews}
              onCloseNewsModal={() => setSelectedNews(null)}
            />
          )}

          {activeTab === 'books' && (
            <BooksView
              books={books}
              onIncrementBookDownload={handleIncrementBookDownload}
            />
          )}

          {activeTab === 'works' && (
            <ResearchView
              works={works}
              onViewWork={handleViewWork}
            />
          )}

          {activeTab === 'admin' && isAdmin && (
            <AdminView
              news={news}
              books={books}
              works={works}
              settings={settings}
              storageUsage={storageUsage}
              onAddNews={handleAddNews}
              onUpdateNews={handleUpdateNews}
              onDeleteNews={handleDeleteNews}
              onAddBook={handleAddBook}
              onUpdateBook={handleUpdateBook}
              onDeleteBook={handleDeleteBook}
              onAddWork={handleAddWork}
              onUpdateWork={handleUpdateWork}
              onDeleteWork={handleDeleteWork}
              onSaveSettings={handleSaveSettings}
              onDataImportedOrReset={refreshAllData}
              onExitToPublic={() => setActiveTab('dashboard')}
              onLogoutAdmin={handleLogoutAdmin}
            />
          )}
        </main>
      </div>

      {/* Admin Passcode Modal */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLoginAdmin}
      />

      {/* Footer */}
      <footer className="mt-10 sm:mt-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-6 pb-20 md:py-8 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 text-center md:text-left text-xs text-slate-500 dark:text-slate-400">
            <div>
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                {settings.divisionName} — {settings.organizationName}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleOpenAdmin}
                className="min-h-[40px] md:min-h-0 px-3 py-1.5 md:p-0 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer font-medium"
              >
                {isAdmin ? 'หน้าจัดการ Admin' : 'สำหรับเจ้าหน้าที่ (Admin)'}
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
