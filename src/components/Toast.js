'use client';

import { useAdmin } from '@/app/context/AdminContext';

export default function Toast() {
  const { state } = useAdmin();
  const { toast } = state;

  if (!toast) return null;

  return (
    <div className="toast-container">
      <div className={`toast toast-${toast.type} ${toast.show ? 'show' : ''}`}>
        {toast.message}
      </div>
    </div>
  );
}
