/**
 * Academic Division PR & Knowledge Hub Types
 */

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'ข่าววิชาการ' | 'อบรมสัมมนา' | 'ประกาศกลุ่มงาน' | 'กิจกรรม/นิทรรศการ';
  author: string;
  publishDate: string; // YYYY-MM-DD
  coverImageUrl?: string;
  isPinned: boolean;
  viewsCount: number;
  externalLink?: string;
}

export interface BookItem {
  id: string;
  title: string;
  author: string;
  category: 'คู่มือวิชาการ' | 'รายงานวิจัย' | 'เอกสารเผยแพร่' | 'วารสารวิชาการ' | 'แนวปฏิบัติมาตรฐาน';
  fileType: 'PDF' | 'DOCX' | 'XLSX' | 'PPTX' | 'ZIP';
  fileSize: string;
  downloadUrl: string;
  coverImageUrl?: string;
  description: string;
  publishedYear: string;
  downloadCount: number;
  tags?: string[];
}

export interface ResearchItem {
  id: string;
  title: string;
  researchers: string;
  field: 'วิทยาศาสตร์และเทคโนโลยี' | 'การศึกษาและการเรียนรู้' | 'การแพทย์และสาธารณสุข' | 'การบริหารจัดการองค์กร' | 'นวัตกรรมดิจิทัล';
  abstract: string;
  publishVenue: string;
  publishYear: string;
  awardOrImpact?: string;
  fullPaperUrl?: string;
  viewsCount: number;
}

export interface DivisionSettings {
  divisionName: string;
  organizationName: string;
  contactEmail: string;
  contactPhone: string;
  announcementBar: string;
  lastBackupDate?: string;
}

export interface HubStoragePayload {
  version: string;
  exportedAt: string;
  settings: DivisionSettings;
  news: NewsItem[];
  books: BookItem[];
  works: ResearchItem[];
}
