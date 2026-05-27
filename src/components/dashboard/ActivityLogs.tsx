import React from 'react';
import { 
  History, 
  Search, 
  Download, 
  Filter, 
  Clock, 
  User, 
  Monitor, 
  Globe,
  Database,
  ArrowRight
} from 'lucide-react';

const logs = [
  { id: 1, user: 'Pranto Islam', action: 'Created new user', entity: 'User', entityId: 'USR-124', timestamp: '2 mins ago', ip: '192.168.1.1', type: 'create' },
  { id: 2, user: 'Al Amin', action: 'Updated order status', entity: 'Order', entityId: 'ORD-882', timestamp: '15 mins ago', ip: '192.168.1.5', type: 'update' },
  { id: 3, user: 'System', action: 'Database backup successful', entity: 'System', entityId: 'DB-BK', timestamp: '1 hour ago', ip: 'internal', type: 'system' },
  { id: 4, user: 'Tanvir Ahmed', action: 'Deleted task', entity: 'Task', entityId: 'TSK-092', timestamp: '3 hours ago', ip: '192.168.1.12', type: 'delete' },
  { id: 5, user: 'Pranto Islam', action: 'Modified permissions', entity: 'Role', entityId: 'ROLE-EMP', timestamp: '5 hours ago', ip: '192.168.1.1', type: 'security' },
];

const LogIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'create': return <div className="p-2 rounded-lg bg-green-500/10 text-green-500"><Plus size={16} /></div>;
    case 'delete': return <div className="p-2 rounded-lg bg-red-500/10 text-red-500"><Trash2 size={16} /></div>;
    case 'security': return <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500"><Shield size={16} /></div>;
    case 'system': return <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500"><Database size={16} /></div>;
    default: return <div className="p-2 rounded-lg bg-slate-500/10 text-slate-500"><History size={16} /></div>;
  }
};

import { Plus, Trash2, Shield } from 'lucide-react';

export default function ActivityLogs() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Activity Audit Logs</h1>
          <p className="text-slate-400 text-sm">Real-time tracking of all system modifications and access.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2.5 rounded-xl glass-dark border border-white/10 hover:bg-white/5 transition-all text-sm font-medium flex items-center gap-2 text-slate-300">
            <Download size={18} />
            Export CSV
          </button>
          <button className="btn-primary flex items-center gap-2 text-sm">
            <Filter size={18} />
            Advanced Search
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card flex items-center gap-4">
          <div className="p-3 rounded-xl bg-green-500/10 text-green-500"><Monitor size={24} /></div>
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Active Sessions</p>
            <p className="text-2xl font-bold">12</p>
          </div>
        </div>
        <div className="glass-card flex items-center gap-4">
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500"><Globe size={24} /></div>
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Geographic Reach</p>
            <p className="text-2xl font-bold">4 Countries</p>
          </div>
        </div>
        <div className="glass-card flex items-center gap-4">
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500"><Shield size={24} /></div>
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Security Alerts</p>
            <p className="text-2xl font-bold">0</p>
          </div>
        </div>
      </div>

      <div className="glass-dark rounded-[24px] border border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Filter logs by user or action..." 
              className="w-full bg-slate-800/30 border border-slate-700/50 rounded-xl py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-green-500/30 transition-all text-sm"
            />
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1.5"><Clock size={14} /> Real-time Update</span>
          </div>
        </div>

        <div className="divide-y divide-white/5">
          {logs.map((log) => (
            <div key={log.id} className="p-6 hover:bg-white/2 transition-colors group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <LogIcon type={log.type} />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-200">{log.user}</span>
                      <span className="text-slate-600 text-xs">•</span>
                      <span className="text-sm text-slate-400">{log.action}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1">
                        <User size={10} /> {log.entity}: {log.entityId}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600 flex items-center gap-1">
                        <Monitor size={10} /> {log.ip}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-slate-600 font-medium">{log.timestamp}</span>
                  <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-white/5 rounded-lg text-slate-500 transition-all">
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
