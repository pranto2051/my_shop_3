import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Clock, 
  Target, 
  Calendar,
  MessageSquare,
  FileText,
  User,
  Zap
} from 'lucide-react';

const TaskCard = ({ title, status, priority, dueDate }: any) => (
  <motion.div 
    whileHover={{ scale: 1.01 }}
    className="glass-card flex items-center justify-between group"
  >
    <div className="flex items-center space-x-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
        status === 'completed' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'
      }`}>
        {status === 'completed' ? <CheckCircle2 size={22} /> : <Clock size={22} />}
      </div>
      <div>
        <h3 className="font-semibold text-slate-200 group-hover:text-white transition-colors">{title}</h3>
        <div className="flex items-center space-x-3 mt-1">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
            priority === 'high' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'
          }`}>
            {priority}
          </span>
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <Calendar size={12} />
            {dueDate}
          </span>
        </div>
      </div>
    </div>
    <button className="opacity-0 group-hover:opacity-100 px-4 py-2 text-xs font-bold bg-white/5 hover:bg-white/10 rounded-lg transition-all border border-white/10">
      Update Progress
    </button>
  </motion.div>
);

export default function EmployeeDashboard() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center space-x-5">
          <div className="w-16 h-16 rounded-2xl bg-linear-to-tr from-green-500 to-blue-500 p-0.5">
            <div className="w-full h-full rounded-[14px] overflow-hidden bg-slate-900">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Pranto" alt="Avatar" className="w-full h-full" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Hello, Pranto! 👋</h1>
            <p className="text-slate-400">You have <span className="text-green-500 font-bold">4 active tasks</span> for today.</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass-dark border border-white/10 hover:bg-white/5 transition-all font-medium text-sm">
            <User size={18} className="text-slate-400" />
            Edit Profile
          </button>
          <button className="btn-primary flex items-center gap-2 text-sm">
            <Zap size={18} />
            Quick Update
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-card flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
            <Target size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Weekly Target</p>
            <p className="text-xl font-bold">85%</p>
          </div>
        </div>
        <div className="glass-card flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-green-500/10 text-green-500">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Completed Tasks</p>
            <p className="text-xl font-bold">12</p>
          </div>
        </div>
        <div className="glass-card flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500">
            <MessageSquare size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Feedback</p>
            <p className="text-xl font-bold">4 New</p>
          </div>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <FileText className="text-green-500" size={20} />
            My Active Tasks
          </h2>
          <button className="text-sm font-bold text-green-500 hover:text-green-400 transition-colors">View All Tasks</button>
        </div>
        
        <div className="space-y-4">
          <TaskCard 
            title="Design system implementation for Admin Panel" 
            status="pending" 
            priority="high" 
            dueDate="May 30, 2026"
          />
          <TaskCard 
            title="Update inventory database for June arrivals" 
            status="completed" 
            priority="medium" 
            dueDate="May 25, 2026"
          />
          <TaskCard 
            title="Client meeting for custom office furniture" 
            status="pending" 
            priority="high" 
            dueDate="May 28, 2026"
          />
          <TaskCard 
            title="Prepare quarterly sales report" 
            status="pending" 
            priority="low" 
            dueDate="June 5, 2026"
          />
        </div>
      </div>
    </div>
  );
}
