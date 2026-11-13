/**
 * LocalStorage Service for กลุ่มงานบริหารงานวิชาการ โรงเรียนราชประชานุเคราะห์ 51 จังหวัดบุรีรัมย์
 */

import { BookItem, DivisionSettings, HubStoragePayload, NewsItem, ResearchItem } from './types';

// Storage Keys
export const STORAGE_KEYS = {
  SETTINGS: 'academic_pr_settings',
  NEWS: 'academic_pr_news',
  BOOKS: 'academic_pr_books',
  WORKS: 'academic_pr_works',
  THEME: 'academic_pr_theme',
  PROFILE_VER: 'academic_pr_profile_ver',
  ADMIN_SESSION: 'academic_pr_admin_session',
};

export const ADMIN_PASSCODE = '112233';

// Default Settings for โรงเรียนราชประชานุเคราะห์ 51 จังหวัดบุรีรัมย์
export const DEFAULT_SETTINGS: DivisionSettings = {
  divisionName: 'กลุ่มงานบริหารงานวิชาการ',
  organizationName: 'โรงเรียนราชประชานุเคราะห์ 51 จังหวัดบุรีรัมย์',
  contactEmail: 'academic@rpk51.ac.th',
  contactPhone: '044-666-xxx ต่อ 102',
  announcementBar: '📢 ศูนย์ประชาสัมพันธ์และคลังความรู้ กลุ่มงานบริหารงานวิชาการ โรงเรียนราชประชานุเคราะห์ 51 จังหวัดบุรีรัมย์ ประจำปีการศึกษา 2569',
};

// Initial Seed Data
export const DEFAULT_NEWS: NewsItem[] = [
  {
    id: 'news-001',
    title: 'ขอเชิญคณะครูและบุคลากรเข้าร่วมกิจกรรมนิเทศภายในและแลกเปลี่ยนเรียนรู้ (PLC) ภาคเรียนที่ 2/2569',
    summary: 'กลุ่มงานบริหารงานวิชาการกำหนดจัดการประชุมชี้แจงแนวทางการนิเทศชั้นเรียนและการขับเคลื่อนชุมชนแห่งการเรียนรู้ทางวิชาชีพ (PLC) ประจำภาคเรียนที่ 2',
    content: `กลุ่มงานบริหารงานวิชาการ โรงเรียนราชประชานุเคราะห์ 51 จังหวัดบุรีรัมย์ ขอประชาสัมพันธ์กำหนดการนิเทศการจัดการเรียนการสอนภายในสถานศึกษา และกิจกรรมชุมชนแห่งการเรียนรู้ทางวิชาชีพ (PLC) ประจำภาคเรียนที่ 2 ปีการศึกษา 2569

กำหนดการสำคัญ:
- ส่งแผนการจัดการเรียนรู้และโครงสร้างรายวิชา: ภายในวันที่ 20 พฤศจิกายน 2569
- ดำเนินการนิเทศชั้นเรียน (Open Class) รอบที่ 1: 1-15 ธันวาคม 2569
- สรุปผลการนิเทศและแลกเปลี่ยนเรียนรู้ระดับกลุ่มสาระฯ: 25 ธันวาคม 2569 ณ ห้องประชุมวิชาการ รปค.51

คณะครูสามารถดาวน์โหลดแบบบันทึกการนิเทศและแบบฟอร์มแผนการจัดการเรียนรู้ได้ที่เมนู "คลังหนังสือ/เอกสาร"`,
    category: 'อบรมสัมมนา',
    author: 'งานนิเทศและพัฒนาหลักสูตร',
    publishDate: '2026-11-10',
    coverImageUrl: '/src/assets/images/academic_symposium_1794469386664.jpg',
    isPinned: true,
    viewsCount: 184,
    externalLink: 'https://docs.google.com/forms',
  },
  {
    id: 'news-002',
    title: 'ประกาศกำหนดการสอบวัดผลกลางภาคเรียนและแนวปฏิบัติการส่งข้อสอบ ประจำภาคเรียนที่ 2/2569',
    summary: 'แจ้งครูผู้สอนทุกกลุ่มสาระการเรียนรู้จัดทำต้นฉบับข้อสอบพร้อมตารางวิเคราะห์หลักสูตร (Test Blueprint) ส่งที่งานวัดและประเมินผล',
    content: `ด้วยกลุ่มงานบริหารงานวิชาการ โรงเรียนราชประชานุเคราะห์ 51 จังหวัดบุรีรัมย์ ได้กำหนดปฏิทินการวัดและประเมินผลกลางภาคเรียนที่ 2 ปีการศึกษา 2569

ขอให้ครูผู้สอนทุกกลุ่มสาระการเรียนรู้ดำเนินการดังนี้:
1. จัดทำข้อสอบควบคู่กับตารางวิเคราะห์หลักสูตร (Test Blueprint) ตามแบบฟอร์มมาตรฐานของโรงเรียน
2. ตรวจสอบความถูกต้องของตัวชี้วัดและเกณฑ์การให้คะแนน
3. ส่งต้นฉบับข้อสอบให้หัวหน้ากลุ่มสาระฯ ตรวจทาน และนำส่งงานวัดและประเมินผลภายในวันที่กำหนด

ดาวน์โหลดแบบฟอร์ม Test Blueprint ได้ในคลังเอกสารวิชาการ`,
    category: 'ประกาศกลุ่มงาน',
    author: 'งานวัดและประเมินผลการศึกษา',
    publishDate: '2026-11-06',
    coverImageUrl: '/src/assets/images/hero_academic_campus_1794469386153.jpg',
    isPinned: true,
    viewsCount: 246,
  },
  {
    id: 'news-003',
    title: 'เปิดรับผลงานวิจัยในชั้นเรียน (CAR) และนวัตกรรมการจัดการเรียนรู้เพื่อคัดเลือกเป็นผลงานดีเด่น รปค.51',
    summary: 'เชิญชวนคณะครูส่งรายงานการวิจัยในชั้นเรียนและสื่อ/นวัตกรรมการสอน ประจำปีการศึกษา 2569 เพื่อเผยแพร่ในคลังผลงานวิชาการของโรงเรียน',
    content: `กลุ่มงานบริหารงานวิชาการเปิดรับสมัครผลงานวิจัยในชั้นเรียน (Classroom Action Research) และนวัตกรรมการจัดการเรียนรู้เชิงรุก (Active Learning) เพื่อรวบรวมเผยแพร่ในคลังความรู้ของโรงเรียนราชประชานุเคราะห์ 51 จังหวัดบุรีรัมย์ และส่งต่อเข้ารับการคัดเลือกในระดับกลุ่มโรงเรียนราชประชานุเคราะห์`,
    category: 'ข่าววิชาการ',
    author: 'งานวิจัยและพัฒนาคุณภาพการศึกษา',
    publishDate: '2026-11-02',
    isPinned: false,
    viewsCount: 118,
  },
];

export const DEFAULT_BOOKS: BookItem[] = [
  {
    id: 'book-001',
    title: 'คู่มือการบริหารงานวิชาการและหลักสูตรสถานศึกษา โรงเรียนราชประชานุเคราะห์ 51 จังหวัดบุรีรัมย์ ฉบับปี 2569',
    author: 'กลุ่มงานบริหารงานวิชาการ รปค.51',
    category: 'คู่มือวิชาการ',
    fileType: 'PDF',
    fileSize: '5.2 MB',
    downloadUrl: 'https://drive.google.com/file/d/sample-rpk51-academic-handbook/view',
    coverImageUrl: '/src/assets/images/academic_book_cover_1794469386645.jpg',
    description: 'แนวทางการบริหารหลักสูตรสถานศึกษา โครงสร้างเวลาเรียน การเทียบโอนผลการเรียน และปฏิทินปฏิบัติงานวิชาการตลอดปีการศึกษา',
    publishedYear: '2569',
    downloadCount: 342,
    tags: ['คู่มือวิชาการ', 'หลักสูตร รปค.51', 'ปีการศึกษา 2569'],
  },
  {
    id: 'book-002',
    title: 'ระเบียบการวัดและประเมินผลการเรียนรู้ ตามหลักสูตรแกนกลางฯ (ฉบับปรับปรุง รปค.51)',
    author: 'งานวัดและประเมินผลการศึกษา',
    category: 'แนวปฏิบัติมาตรฐาน',
    fileType: 'PDF',
    fileSize: '3.4 MB',
    downloadUrl: 'https://drive.google.com/file/d/sample-rpk51-assessment-manual/view',
    description: 'เกณฑ์การตัดสินผลการเรียน การซ่อมเสริม การอนุมัติจบหลักสูตร และแนวทางการจัดทำ ปพ.1 - ปพ.9 สำหรับครูประจำชั้นและครูผู้สอน',
    publishedYear: '2569',
    downloadCount: 289,
    tags: ['วัดผลประเมินผล', 'ปพ.', 'ระเบียบวิชาการ'],
  },
  {
    id: 'book-003',
    title: 'แบบฟอร์มแผนการจัดการเรียนรู้เชิงรุก (Active Learning) และแบบบันทึกหลังสอน',
    author: 'งานพัฒนาหลักสูตรและการสอน',
    category: 'แนวปฏิบัติมาตรฐาน',
    fileType: 'DOCX',
    fileSize: '920 KB',
    downloadUrl: 'https://1drv.ms/w/s!sample-rpk51-lesson-plan-template',
    description: 'เทมเพลตไฟล์ Microsoft Word สำหรับจัดทำหน่วยการเรียนรู้ แผนการจัดการเรียนรู้ และบันทึกหลังสอนพร้อมตารางวิเคราะห์ผู้เรียนรายบุคคล',
    publishedYear: '2569',
    downloadCount: 468,
    tags: ['แผนการสอน', 'Active Learning', 'Word'],
  },
  {
    id: 'book-004',
    title: 'รายงานการประเมินตนเองของสถานศึกษา (SAR) และผลสัมฤทธิ์ทางการเรียน ประจำปีการศึกษา 2568',
    author: 'งานประกันคุณภาพและมาตรฐานการศึกษา',
    category: 'รายงานวิจัย',
    fileType: 'PDF',
    fileSize: '9.8 MB',
    downloadUrl: 'https://drive.google.com/file/d/sample-rpk51-sar-2568/view',
    description: 'สรุปผลการดำเนินงานตามมาตรฐานการศึกษาขั้นพื้นฐาน ผลสอบ O-NET, RT, NT และโครงการยกระดับคุณภาพผู้เรียน รปค.51',
    publishedYear: '2568',
    downloadCount: 215,
    tags: ['SAR', 'ประกันคุณภาพ', 'ผลสัมฤทธิ์'],
  },
];

export const DEFAULT_WORKS: ResearchItem[] = [
  {
    id: 'work-001',
    title: 'การพัฒนาชุดกิจกรรมการเรียนรู้เชิงรุกแบบโครงงานเป็นฐานเพื่อส่งเสริมทักษะอาชีพและนวัตกรรมสำหรับนักเรียนโรงเรียนราชประชานุเคราะห์ 51',
    researchers: 'คณะครูกลุ่มสาระการเรียนรู้การงานอาชีพและเทคโนโลยี รปค.51',
    field: 'การศึกษาและการเรียนรู้',
    abstract: 'การวิจัยในชั้นเรียนนี้มีวัตถุประสงค์เพื่อพัฒนาชุดกิจกรรมการเรียนรู้แบบโครงงานเป็นฐาน (Project-Based Learning) สำหรับนักเรียนระดับมัธยมศึกษาตอนปลาย โรงเรียนราชประชานุเคราะห์ 51 จังหวัดบุรีรัมย์ ผลการศึกษาพบว่านักเรียนมีทักษะการปฏิบัติงานอาชีพและผลสัมฤทธิ์ทางการเรียนสูงกว่าเกณฑ์ร้อยละ 80 อย่างมีนัยสำคัญทางสถิติ และสามารถต่อยอดเป็นผลิตภัณฑ์สร้างรายได้ระหว่างเรียนได้จริง',
    publishVenue: 'วารสารวิชาการกลุ่มโรงเรียนราชประชานุเคราะห์ ประจำปี 2568',
    publishYear: '2568',
    awardOrImpact: 'รางวัลนวัตกรรมการจัดการเรียนรู้ดีเด่น ระดับภาคตะวันออกเฉียงเหนือ',
    fullPaperUrl: 'https://drive.google.com/file/d/sample-rpk51-pbl-research/view',
    viewsCount: 234,
  },
  {
    id: 'work-002',
    title: 'การพัฒนาระบบคลังข้อมูลสารสนเทศและสื่อดิจิทัลเพื่อสนับสนุนการจัดการเรียนการสอนในโรงเรียนประจำ',
    researchers: 'กลุ่มงานบริหารงานวิชาการ และงานเทคโนโลยีสารสนเทศ รปค.51',
    field: 'นวัตกรรมดิจิทัล',
    abstract: 'การศึกษาและพัฒนารูปแบบการจัดเก็บและเผยแพร่ทรัพยากรการเรียนรู้แบบ Local-First และคลาวด์สำหรับครูและนักเรียน ช่วยลดระยะเวลาในการสืบค้นเอกสารคู่มือวิชาการ แบบฟอร์ม และสื่อทบทวนบทเรียนนอกเวลาเรียน เพิ่มประสิทธิภาพการบริหารงานวิชาการในสถานศึกษา',
    publishVenue: 'รายงานการประชุมวิชาการแลกเปลี่ยนเรียนรู้ (Symposium) สพฐ. 2569',
    publishYear: '2569',
    awardOrImpact: 'ผลงานแนวปฏิบัติที่ดี (Best Practice) ด้านบริหารงานวิชาการ',
    fullPaperUrl: 'https://drive.google.com/file/d/sample-rpk51-digital-hub/view',
    viewsCount: 192,
  },
  {
    id: 'work-003',
    title: 'รูปแบบการเสริมสร้างความสามารถด้านการอ่านออกเขียนได้และทักษะการคิดวิเคราะห์ด้วยการจัดการเรียนรู้แบบร่วมมือ (PLC)',
    researchers: 'คณะครูกลุ่มสาระการเรียนรู้ภาษาไทย รปค.51',
    field: 'การบริหารจัดการองค์กร',
    abstract: 'การวิจัยเชิงปฏิบัติการแบบมีส่วนร่วมเพื่อยกระดับสมรรถนะการอ่านจับใจความและการคิดวิเคราะห์ของนักเรียน โดยใช้กระบวนการชุมชนแห่งการเรียนรู้ทางวิชาชีพ (PLC) ร่วมกับการนิเทศแบบกัลยาณมิตรตลอด 2 ภาคเรียน ผลพบว่าคะแนนเฉลี่ยด้านการอ่านและการเขียนเพิ่มขึ้นร้อยละ 18.5',
    publishVenue: 'คลังผลงานวิจัยในชั้นเรียน โรงเรียนราชประชานุเคราะห์ 51 จังหวัดบุรีรัมย์',
    publishYear: '2568',
    fullPaperUrl: 'https://drive.google.com/file/d/sample-rpk51-plc-thai/view',
    viewsCount: 158,
  },
];

// Helper Functions
function safeParse<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch (error) {
    console.warn(`Failed to parse LocalStorage key "${key}":`, error);
    return fallback;
  }
}

function safeSet<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Failed to write LocalStorage key "${key}":`, error);
    return false;
  }
}

const SEED_NEWS_IDS = new Set(DEFAULT_NEWS.map((n) => n.id));
const SEED_BOOK_IDS = new Set(DEFAULT_BOOKS.map((b) => b.id));
const SEED_WORK_IDS = new Set(DEFAULT_WORKS.map((w) => w.id));

// Initialize clean zero-state on fresh hosting (all item counts start at 0 until data is uploaded/added)
function ensureZeroStateInitialized(): void {
  try {
    const currentVer = localStorage.getItem(STORAGE_KEYS.PROFILE_VER);
    if (currentVer === 'rpk51-zero-v1') return;

    const existingSettings = safeParse<DivisionSettings | null>(STORAGE_KEYS.SETTINGS, null);
    if (
      !existingSettings ||
      existingSettings.organizationName === 'สำนักงานส่งเสริมวิชาการและนวัตกรรมองค์กร'
    ) {
      safeSet(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
    }

    // Clear untouched auto-seeded demo items so fresh hosting / preview starts at 0
    const existingNews = safeParse<NewsItem[]>(STORAGE_KEYS.NEWS, []);
    if (existingNews.length > 0 && existingNews.every((n) => SEED_NEWS_IDS.has(n.id))) {
      safeSet(STORAGE_KEYS.NEWS, []);
    } else if (!localStorage.getItem(STORAGE_KEYS.NEWS)) {
      safeSet(STORAGE_KEYS.NEWS, []);
    }

    const existingBooks = safeParse<BookItem[]>(STORAGE_KEYS.BOOKS, []);
    if (existingBooks.length > 0 && existingBooks.every((b) => SEED_BOOK_IDS.has(b.id))) {
      safeSet(STORAGE_KEYS.BOOKS, []);
    } else if (!localStorage.getItem(STORAGE_KEYS.BOOKS)) {
      safeSet(STORAGE_KEYS.BOOKS, []);
    }

    const existingWorks = safeParse<ResearchItem[]>(STORAGE_KEYS.WORKS, []);
    if (existingWorks.length > 0 && existingWorks.every((w) => SEED_WORK_IDS.has(w.id))) {
      safeSet(STORAGE_KEYS.WORKS, []);
    } else if (!localStorage.getItem(STORAGE_KEYS.WORKS)) {
      safeSet(STORAGE_KEYS.WORKS, []);
    }

    localStorage.setItem(STORAGE_KEYS.PROFILE_VER, 'rpk51-zero-v1');
  } catch (err) {
    console.warn('Zero-state initialization check failed:', err);
  }
}

// Storage Manager
export const StorageManager = {
  // Admin Session (sessionStorage so each browser session requires passcode unless kept open)
  isAdminAuthenticated(): boolean {
    try {
      return sessionStorage.getItem(STORAGE_KEYS.ADMIN_SESSION) === 'authenticated';
    } catch {
      return false;
    }
  },
  loginAdmin(passcode: string): boolean {
    if (passcode.trim() === ADMIN_PASSCODE) {
      try {
        sessionStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, 'authenticated');
      } catch {
        // ignore storage error
      }
      return true;
    }
    return false;
  },
  logoutAdmin(): void {
    try {
      sessionStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
    } catch {
      // ignore
    }
  },

  // Settings
  getSettings(): DivisionSettings {
    ensureZeroStateInitialized();
    return safeParse(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
  },
  saveSettings(settings: DivisionSettings): void {
    safeSet(STORAGE_KEYS.SETTINGS, settings);
  },

  // News
  getNews(): NewsItem[] {
    ensureZeroStateInitialized();
    return safeParse<NewsItem[]>(STORAGE_KEYS.NEWS, []);
  },
  saveNews(items: NewsItem[]): void {
    safeSet(STORAGE_KEYS.NEWS, items);
  },
  addNews(item: Omit<NewsItem, 'id' | 'viewsCount'>): NewsItem {
    const current = this.getNews();
    const newItem: NewsItem = {
      ...item,
      id: `news-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      viewsCount: 0,
    };
    this.saveNews([newItem, ...current]);
    return newItem;
  },
  updateNews(item: NewsItem): void {
    const current = this.getNews();
    const updated = current.map((n) => (n.id === item.id ? item : n));
    this.saveNews(updated);
  },
  deleteNews(id: string): void {
    const current = this.getNews();
    this.saveNews(current.filter((n) => n.id !== id));
  },
  incrementNewsView(id: string): void {
    const current = this.getNews();
    const updated = current.map((n) => (n.id === id ? { ...n, viewsCount: (n.viewsCount || 0) + 1 } : n));
    this.saveNews(updated);
  },

  // Books
  getBooks(): BookItem[] {
    ensureZeroStateInitialized();
    return safeParse<BookItem[]>(STORAGE_KEYS.BOOKS, []);
  },
  saveBooks(items: BookItem[]): void {
    safeSet(STORAGE_KEYS.BOOKS, items);
  },
  addBook(item: Omit<BookItem, 'id' | 'downloadCount'>): BookItem {
    const current = this.getBooks();
    const newItem: BookItem = {
      ...item,
      id: `book-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      downloadCount: 0,
    };
    this.saveBooks([newItem, ...current]);
    return newItem;
  },
  updateBook(item: BookItem): void {
    const current = this.getBooks();
    const updated = current.map((b) => (b.id === item.id ? item : b));
    this.saveBooks(updated);
  },
  deleteBook(id: string): void {
    const current = this.getBooks();
    this.saveBooks(current.filter((b) => b.id !== id));
  },
  incrementBookDownload(id: string): void {
    const current = this.getBooks();
    const updated = current.map((b) => (b.id === id ? { ...b, downloadCount: (b.downloadCount || 0) + 1 } : b));
    this.saveBooks(updated);
  },

  // Research Works
  getWorks(): ResearchItem[] {
    ensureZeroStateInitialized();
    return safeParse<ResearchItem[]>(STORAGE_KEYS.WORKS, []);
  },
  saveWorks(items: ResearchItem[]): void {
    safeSet(STORAGE_KEYS.WORKS, items);
  },
  addWork(item: Omit<ResearchItem, 'id' | 'viewsCount'>): ResearchItem {
    const current = this.getWorks();
    const newItem: ResearchItem = {
      ...item,
      id: `work-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      viewsCount: 0,
    };
    this.saveWorks([newItem, ...current]);
    return newItem;
  },
  updateWork(item: ResearchItem): void {
    const current = this.getWorks();
    const updated = current.map((w) => (w.id === item.id ? item : w));
    this.saveWorks(updated);
  },
  deleteWork(id: string): void {
    const current = this.getWorks();
    this.saveWorks(current.filter((w) => w.id !== id));
  },
  incrementWorkView(id: string): void {
    const current = this.getWorks();
    const updated = current.map((w) => (w.id === id ? { ...w, viewsCount: (w.viewsCount || 0) + 1 } : w));
    this.saveWorks(updated);
  },

  // Clear all item data to 0 (keep school settings)
  clearAllToZero(): void {
    this.saveNews([]);
    this.saveBooks([]);
    this.saveWorks([]);
    localStorage.setItem(STORAGE_KEYS.PROFILE_VER, 'rpk51-zero-v1');
  },

  // Load sample demo data for testing
  loadSampleDemoData(): void {
    this.saveSettings(DEFAULT_SETTINGS);
    this.saveNews(DEFAULT_NEWS);
    this.saveBooks(DEFAULT_BOOKS);
    this.saveWorks(DEFAULT_WORKS);
    localStorage.setItem(STORAGE_KEYS.PROFILE_VER, 'rpk51-zero-v1');
  },

  // Optional auto-load from ./data.json on static web hosting if localStorage is completely empty (0)
  async tryLoadHostedDataJson(): Promise<boolean> {
    try {
      const hasAnyData =
        this.getNews().length > 0 || this.getBooks().length > 0 || this.getWorks().length > 0;
      if (hasAnyData) return false;

      const res = await fetch('./data.json', { cache: 'no-store' });
      if (!res.ok) return false;
      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('application/json') && !contentType.includes('text/plain')) {
        return false;
      }
      const data = (await res.json()) as Partial<HubStoragePayload>;
      if (!data || typeof data !== 'object') return false;

      let loaded = false;
      if (Array.isArray(data.news) && data.news.length > 0) {
        this.saveNews(data.news);
        loaded = true;
      }
      if (Array.isArray(data.books) && data.books.length > 0) {
        this.saveBooks(data.books);
        loaded = true;
      }
      if (Array.isArray(data.works) && data.works.length > 0) {
        this.saveWorks(data.works);
        loaded = true;
      }
      if (data.settings && typeof data.settings === 'object' && data.settings.divisionName) {
        this.saveSettings(data.settings);
      }
      return loaded;
    } catch {
      return false;
    }
  },

  // Storage usage calculation
  getStorageUsage(): { usedKB: number; totalEstimatedMB: number; percent: number } {
    let totalLength = 0;
    for (const key in localStorage) {
      if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
        totalLength += (localStorage[key]?.length || 0) + key.length;
      }
    }
    const usedKB = Math.round((totalLength * 2) / 1024);
    const maxKB = 5 * 1024;
    const percent = Math.min(100, Math.round((usedKB / maxKB) * 100));
    return { usedKB, totalEstimatedMB: 5, percent };
  },

  // Full Backup Export as JSON
  exportAllJSON(customFilename?: string): void {
    const payload: HubStoragePayload = {
      version: '1.1.0',
      exportedAt: new Date().toISOString(),
      settings: this.getSettings(),
      news: this.getNews(),
      books: this.getBooks(),
      works: this.getWorks(),
    };
    const jsonStr = JSON.stringify(payload, null, 2);
    downloadFile(jsonStr, customFilename || `rpk51_academic_backup_${formatDateStamp()}.json`, 'application/json');
  },

  // Import JSON Backup
  importAllJSON(jsonString: string): { success: boolean; message: string; count?: { news: number; books: number; works: number } } {
    try {
      const data = JSON.parse(jsonString) as HubStoragePayload;
      if (!data || typeof data !== 'object') {
        return { success: false, message: 'รูปแบบไฟล์ JSON ไม่ถูกต้อง' };
      }
      if (Array.isArray(data.news)) this.saveNews(data.news);
      if (Array.isArray(data.books)) this.saveBooks(data.books);
      if (Array.isArray(data.works)) this.saveWorks(data.works);
      if (data.settings && typeof data.settings === 'object') this.saveSettings(data.settings);

      return {
        success: true,
        message: 'นำเข้าข้อมูลสำเร็จเรียบร้อยแล้ว',
        count: {
          news: data.news?.length || 0,
          books: data.books?.length || 0,
          works: data.works?.length || 0,
        },
      };
    } catch (err) {
      return { success: false, message: 'เกิดข้อผิดพลาดในการอ่านไฟล์: ' + String(err) };
    }
  },

  // CSV Exporters with UTF-8 BOM (\uFEFF) for Thai Excel compatibility
  exportNewsCSV(): void {
    const items = this.getNews();
    const headers = ['รหัส (ID)', 'หัวข้อข่าว', 'หมวดหมู่', 'ผู้ลงข่าว', 'วันที่เผยแพร่', 'ปักหมุด', 'ยอดเข้าชม', 'เนื้อหาย่อ', 'ลิงก์เพิ่มเติม'];
    const rows = items.map((item) => [
      item.id,
      escapeCSV(item.title),
      escapeCSV(item.category),
      escapeCSV(item.author),
      item.publishDate,
      item.isPinned ? 'ใช่' : 'ไม่ใช่',
      item.viewsCount,
      escapeCSV(item.summary),
      escapeCSV(item.externalLink || ''),
    ]);
    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    downloadFile(csvContent, `rpk51_academic_news_${formatDateStamp()}.csv`, 'text/csv;charset=utf-8;');
  },

  exportBooksCSV(): void {
    const items = this.getBooks();
    const headers = ['รหัส (ID)', 'ชื่อหนังสือ/เอกสาร', 'ผู้จัดทำ', 'หมวดหมู่', 'ประเภทไฟล์', 'ขนาดไฟล์', 'ปีที่เผยแพร่', 'ยอดดาวน์โหลด', 'ลิงก์ดาวน์โหลด'];
    const rows = items.map((item) => [
      item.id,
      escapeCSV(item.title),
      escapeCSV(item.author),
      escapeCSV(item.category),
      item.fileType,
      item.fileSize,
      item.publishedYear,
      item.downloadCount,
      escapeCSV(item.downloadUrl),
    ]);
    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    downloadFile(csvContent, `rpk51_academic_books_${formatDateStamp()}.csv`, 'text/csv;charset=utf-8;');
  },

  exportWorksCSV(): void {
    const items = this.getWorks();
    const headers = ['รหัส (ID)', 'ชื่อผลงานวิจัย/นวัตกรรม', 'คณะผู้วิจัย', 'สาขาวิชา', 'แหล่งเผยแพร่/วารสาร', 'ปีที่ตีพิมพ์', 'รางวัล/ผลกระทบ', 'ยอดเข้าชม', 'ลิงก์บทความ'];
    const rows = items.map((item) => [
      item.id,
      escapeCSV(item.title),
      escapeCSV(item.researchers),
      escapeCSV(item.field),
      escapeCSV(item.publishVenue),
      item.publishYear,
      escapeCSV(item.awardOrImpact || ''),
      item.viewsCount,
      escapeCSV(item.fullPaperUrl || ''),
    ]);
    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    downloadFile(csvContent, `rpk51_academic_works_${formatDateStamp()}.csv`, 'text/csv;charset=utf-8;');
  },

  // Export as Standalone Single-File HTML (Run 100% Offline in Browser)
  exportStandaloneHTML(): void {
    const settings = this.getSettings();
    const news = this.getNews();
    const books = this.getBooks();
    const works = this.getWorks();

    const dataPayload = JSON.stringify({ settings, news, books, works });

    const htmlContent = `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHTML(settings.divisionName)} - ${escapeHTML(settings.organizationName)}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@400;500;600;700&family=Noto+Sans+Thai:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Noto Sans Thai', sans-serif; line-height: 1.65; }
    h1, h2, h3, h4 { font-family: 'IBM Plex Sans Thai', 'Noto Sans Thai', sans-serif; line-height: 1.45; }
    .tabular-nums { font-variant-numeric: tabular-nums; }
  </style>
</head>
<body class="bg-slate-50 text-slate-800 antialiased min-h-screen">
  <header class="bg-[#0F1E36] text-white sticky top-0 z-30 shadow-md">
    <div class="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-2">
      <div class="min-w-0">
        <h1 class="text-base sm:text-lg font-bold tracking-tight truncate">${escapeHTML(settings.divisionName)}</h1>
        <p class="text-[11px] sm:text-xs text-slate-300 truncate">${escapeHTML(settings.organizationName)} (ฉบับออฟไลน์ Single-File)</p>
      </div>
      <div class="flex items-center gap-3 text-xs shrink-0">
        <span class="bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-500/30 font-medium">✓ Offline Ready</span>
      </div>
    </div>
  </header>

  <div class="bg-blue-900/10 border-b border-blue-200 py-2 px-4 text-center text-xs text-blue-900 font-medium">
    ${escapeHTML(settings.announcementBar)}
  </div>

  <main class="max-w-7xl mx-auto px-3.5 sm:px-4 py-6 sm:py-8 space-y-8 sm:space-y-10">
    <section class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
      <div class="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm">
        <p class="text-xs text-slate-500 font-medium">ข่าวสารประชาสัมพันธ์</p>
        <p class="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tabular-nums">${news.length}</p>
        <p class="text-[11px] sm:text-xs text-slate-400 mt-1">รายการที่เผยแพร่</p>
      </div>
      <div class="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm">
        <p class="text-xs text-slate-500 font-medium">หนังสือและเอกสารวิชาการ</p>
        <p class="text-2xl sm:text-3xl font-bold text-blue-600 mt-1 tabular-nums">${books.length}</p>
        <p class="text-[11px] sm:text-xs text-slate-400 mt-1">ไฟล์พร้อมดาวน์โหลด</p>
      </div>
      <div class="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm">
        <p class="text-xs text-slate-500 font-medium">ผลงานวิจัยและนวัตกรรม</p>
        <p class="text-2xl sm:text-3xl font-bold text-teal-600 mt-1 tabular-nums">${works.length}</p>
        <p class="text-[11px] sm:text-xs text-slate-400 mt-1">บทความวิชาการ</p>
      </div>
      <div class="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm">
        <p class="text-xs text-slate-500 font-medium">ยอดดาวน์โหลดรวม</p>
        <p class="text-2xl sm:text-3xl font-bold text-indigo-600 mt-1 tabular-nums">${books.reduce((acc, b) => acc + (b.downloadCount || 0), 0)}</p>
        <p class="text-[11px] sm:text-xs text-slate-400 mt-1">ครั้ง</p>
      </div>
    </section>

    <section>
      <div class="flex items-center justify-between mb-4 border-b border-slate-200 pb-2">
        <h2 class="text-lg sm:text-xl font-bold text-slate-900">ข่าวประชาสัมพันธ์และกิจกรรม</h2>
        <span class="text-xs text-slate-500 shrink-0">${news.length} รายการ</span>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        ${news
          .map(
            (n) => `
          <div class="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span class="font-medium text-blue-600">${escapeHTML(n.category)}</span>
                <span>${escapeHTML(n.publishDate)}</span>
              </div>
              <h3 class="font-semibold text-slate-900 line-clamp-2 mb-2">${escapeHTML(n.title)}</h3>
              <p class="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">${escapeHTML(n.summary)}</p>
            </div>
            <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span class="truncate">โดย: ${escapeHTML(n.author)}</span>
              ${n.externalLink ? `<a href="${escapeHTML(n.externalLink)}" target="_blank" class="text-blue-600 hover:underline shrink-0">เปิดลิงก์ →</a>` : ''}
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    </section>

    <section>
      <div class="flex items-center justify-between mb-4 border-b border-slate-200 pb-2">
        <h2 class="text-lg sm:text-xl font-bold text-slate-900">คลังหนังสือและเอกสารดาวน์โหลด</h2>
        <span class="text-xs text-slate-500 shrink-0">${books.length} เล่ม</span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        ${books
          .map(
            (b) => `
          <div class="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span class="font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">${escapeHTML(b.fileType)}</span>
                <span class="tabular-nums">${escapeHTML(b.fileSize)}</span>
              </div>
              <h3 class="font-semibold text-slate-900 text-sm line-clamp-2 mb-1">${escapeHTML(b.title)}</h3>
              <p class="text-xs text-slate-500 mb-2">ผู้จัดทำ: ${escapeHTML(b.author)} (${escapeHTML(b.publishedYear)})</p>
              <p class="text-xs text-slate-600 line-clamp-3 mb-4">${escapeHTML(b.description)}</p>
            </div>
            <div>
              <a href="${escapeHTML(b.downloadUrl)}" target="_blank" class="w-full inline-block text-center bg-[#0F1E36] hover:bg-slate-800 text-white text-xs font-medium py-2.5 rounded-lg transition-colors">
                เปิดดาวน์โหลดไฟล์ ↗
              </a>
              <p class="text-center text-[11px] text-slate-400 mt-1.5 tabular-nums">ดาวน์โหลดแล้ว ${b.downloadCount} ครั้ง</p>
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    </section>

    <section>
      <div class="flex items-center justify-between mb-4 border-b border-slate-200 pb-2">
        <h2 class="text-lg sm:text-xl font-bold text-slate-900">การเผยแพร่ผลงานวิจัยและนวัตกรรม</h2>
        <span class="text-xs text-slate-500 shrink-0">${works.length} ผลงาน</span>
      </div>
      <div class="space-y-4">
        ${works
          .map(
            (w) => `
          <div class="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm">
            <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div class="min-w-0">
                <span class="text-xs font-semibold text-indigo-600">${escapeHTML(w.field)}</span>
                <h3 class="text-base font-bold text-slate-900 mt-1">${escapeHTML(w.title)}</h3>
                <p class="text-xs text-slate-500 mt-1">ผู้วิจัย: ${escapeHTML(w.researchers)} · ตีพิมพ์ปี ${escapeHTML(w.publishYear)} (${escapeHTML(w.publishVenue)})</p>
                ${w.awardOrImpact ? `<p class="text-xs text-amber-700 bg-amber-50 px-2 py-1 rounded inline-block mt-2">🏆 ${escapeHTML(w.awardOrImpact)}</p>` : ''}
                <div class="mt-3 text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span class="font-semibold text-slate-700">บทคัดย่อ:</span> ${escapeHTML(w.abstract)}
                </div>
              </div>
              ${w.fullPaperUrl ? `<a href="${escapeHTML(w.fullPaperUrl)}" target="_blank" class="shrink-0 text-center text-xs font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-2.5 sm:py-2 rounded-lg border border-blue-200 transition-colors">บทความฉบับเต็ม ↗</a>` : ''}
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    </section>
  </main>

  <footer class="bg-white border-t border-slate-200 py-6 px-4 text-center text-xs text-slate-500">
    <p>${escapeHTML(settings.divisionName)} — ${escapeHTML(settings.organizationName)}</p>
    <p class="mt-1">อีเมล: ${escapeHTML(settings.contactEmail)} | โทร: ${escapeHTML(settings.contactPhone)}</p>
    <p class="mt-2 text-slate-400">ไฟล์ HTML อิสระ (Standalone Single-File) บันทึกข้อมูลเมื่อ: ${new Date().toLocaleString('th-TH')}</p>
  </footer>

  <script>
    window.OFFLINE_PAYLOAD = ${dataPayload};
  </script>
</body>
</html>`;

    downloadFile(htmlContent, `rpk51_academic_offline_${formatDateStamp()}.html`, 'text/html;charset=utf-8;');
  },
};

// Utilities
function escapeCSV(text: string): string {
  if (!text) return '""';
  const clean = String(text).replace(/"/g, '""');
  return `"${clean}"`;
}

function escapeHTML(text: string): string {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function formatDateStamp(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}${month}${day}_${d.getHours()}${d.getMinutes()}`;
}
