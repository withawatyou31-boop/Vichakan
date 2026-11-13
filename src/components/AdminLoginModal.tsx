import React, { useEffect, useRef, useState } from 'react';
import { Lock, X, Eye, EyeOff, ShieldCheck, AlertCircle } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (passcode: string) => boolean;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPasscode('');
      setError('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setError('กรุณากรอกรหัสผ่านผู้ดูแลระบบ');
      return;
    }
    const ok = onLogin(passcode);
    if (!ok) {
      setError('รหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบและลองใหม่อีกครั้ง');
      setPasscode('');
      inputRef.current?.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-2xl max-w-md w-full border-t sm:border border-slate-200 dark:border-slate-800 shadow-2xl p-5 sm:p-8 pb-safe">
        <div className="w-10 h-1 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mb-3 sm:hidden" />
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#0A192F] text-blue-400 flex items-center justify-center border border-slate-700 shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">
                เข้าสู่ระบบจัดการ Admin
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                กลุ่มงานบริหารงานวิชาการ รปค.51 จ.บุรีรัมย์
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg cursor-pointer shrink-0"
            aria-label="ปิดหน้าต่าง"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 sm:mt-5 space-y-4">
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            กรุณากรอกรหัสผ่านเจ้าหน้าที่วิชาการเพื่อเข้าถึงเมนูจัดการข่าวสาร คลังหนังสือ ผลงานวิชาการ ตั้งค่าโรงเรียน และการส่งออก/สำรองข้อมูล
          </p>

          <div>
            <label
              htmlFor="admin-passcode-input"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
            >
              รหัสผ่านผู้ดูแลระบบ (Admin Passcode)
            </label>
            <div className="relative">
              <input
                ref={inputRef}
                id="admin-passcode-input"
                type={showPasscode ? 'text' : 'password'}
                inputMode="numeric"
                autoComplete="off"
                placeholder="กรอกรหัสผ่าน 6 หลัก"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  if (error) setError('');
                }}
                className="w-full pl-3.5 pr-12 py-3 sm:py-2.5 text-base sm:text-sm font-mono tracking-widest bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                type="button"
                onClick={() => setShowPasscode((prev) => !prev)}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 min-w-[40px] min-h-[40px] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                aria-label={showPasscode ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน'}
              >
                {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600 dark:text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <div className="pt-2 pb-2 sm:pb-0 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] sm:min-h-0 px-4 py-2.5 sm:py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl sm:rounded-lg transition-colors cursor-pointer"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="min-h-[44px] sm:min-h-0 px-5 py-2.5 sm:py-2 text-xs font-semibold bg-[#0A192F] hover:bg-blue-900 dark:bg-blue-600 dark:hover:bg-blue-500 text-white rounded-xl sm:rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>ยืนยันเข้าสู่ระบบ</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
