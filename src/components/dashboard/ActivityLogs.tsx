import React from 'react';

export default function ActivityLogs() {
  return (
    <div className="p-8 bg-white rounded-3xl border border-[#EDE0D6] shadow-sm min-h-[400px] flex flex-col items-center justify-center text-center space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-[#FDF8F5] border border-[#E8D5C4] flex items-center justify-center text-[#7C4B2A] text-2xl font-bold">
        📜
      </div>
      <div>
        <h2 className="text-xl font-black text-[#2D1505]">একটিভিটি লগ (Activity Logs)</h2>
        <p className="text-sm font-semibold text-[#A0826C] mt-1">
          ইউআই ডিজাইন খালি করা হয়েছে। আপনি পরে ম্যানুয়ালি এটি তৈরি করবেন।
        </p>
      </div>
    </div>
  );
}
