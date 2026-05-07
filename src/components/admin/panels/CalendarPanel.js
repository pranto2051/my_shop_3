'use client';

import React, { useState } from 'react';
import { 
  FaCalendarDays, 
  FaPlus, 
  FaChevronLeft, 
  FaChevronRight,
  FaCheck,
  FaClock,
  FaCircleInfo,
  FaTrashCan,
  FaXmark,
  FaCalendarCheck
} from 'react-icons/fa6';
import { useAdmin, addTask, updateTask, deleteTask } from '@/app/context/AdminContext';

export default function CalendarPanel({ tasks: dbTasks = [] }) {
  const { dispatch } = useAdmin();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [newTask, setNewTask] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    time: '10:00',
    type: 'general'
  });

  const tasks = dbTasks;

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));

  const monthNames = ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"];
  const weekDays = ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহঃ", "শুক্র", "শনি"];

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.title) return;

    setIsSubmitting(true);
    const result = await addTask(dispatch, newTask);
    setIsSubmitting(false);

    if (result.success) {
      setShowAddModal(false);
      setNewTask({
        title: '',
        date: new Date().toISOString().split('T')[0],
        time: '10:00',
        type: 'general'
      });
    }
  };

  const handleToggleComplete = async (task) => {
    const updatedTask = { ...task, completed: !task.completed };
    await updateTask(dispatch, updatedTask);
  };

  const handleDeleteTask = async (taskId) => {
    if (confirm('আপনি কি এই কাজটি মুছে ফেলতে চান?')) {
      await deleteTask(dispatch, taskId);
    }
  };

  const getTasksForDate = (day, month, year) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return tasks.filter(t => t.date === dateStr);
  };

  const selectedDateTasks = tasks.filter(t => {
    const d = new Date(t.date);
    return d.getDate() === selectedDate.getDate() && 
           d.getMonth() === selectedDate.getMonth() && 
           d.getFullYear() === selectedDate.getFullYear();
  });

  return (
    <div className="calendar-panel">
      <div className="panel-header">
        <div className="header-title">
          <h2>Calendar & Tasks</h2>
          <p>আপনার প্রতিদিনের শিডিউল এবং গুরুত্বপূর্ণ কাজগুলো গুছিয়ে রাখুন</p>
        </div>
        <button className="add-task-btn" onClick={() => setShowAddModal(true)}>
          <FaPlus /> নতুন কাজ যোগ করুন
        </button>
      </div>

      <div className="calendar-grid-container">
        <div className="calendar-main">
          <div className="calendar-controls">
            <div className="month-year">
              <h3>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
              <span className="today-indicator" onClick={() => {
                setCurrentDate(new Date());
                setSelectedDate(new Date());
              }}>আজ</span>
            </div>
            <div className="control-btns">
              <button onClick={prevMonth} title="পূর্ববর্তী মাস"><FaChevronLeft /></button>
              <button onClick={nextMonth} title="পরবর্তী মাস"><FaChevronRight /></button>
            </div>
          </div>
          <div className="calendar-wrapper">
            <div className="weekdays-row">
              {weekDays.map(day => <div key={day} className="weekday">{day}</div>)}
            </div>
            <div className="days-grid">
              {[...Array(firstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth()))].map((_, i) => (
                <div key={`empty-${i}`} className="day empty"></div>
              ))}
              {[...Array(daysInMonth(currentDate.getFullYear(), currentDate.getMonth()))].map((_, i) => {
                const day = i + 1;
                const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                const isToday = date.toDateString() === new Date().toDateString();
                const isSelected = date.toDateString() === selectedDate.toDateString();
                const dayTasks = getTasksForDate(day, currentDate.getMonth(), currentDate.getFullYear());
                
                return (
                  <div 
                    key={day} 
                    className={`day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
                    onClick={() => setSelectedDate(date)}
                  >
                    <span className="day-num">{day}</span>
                    <div className="day-events">
                      {dayTasks.slice(0, 2).map((t, idx) => (
                        <div key={idx} className={`event-mini ${t.type} ${t.completed ? 'done' : ''}`}></div>
                      ))}
                      {dayTasks.length > 2 && <div className="more-events">+{dayTasks.length - 2}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="tasks-sidebar">
          <div className="sidebar-date-header">
            <div className="date-display">
              <span className="day-name">{weekDays[selectedDate.getDay()]}</span>
              <span className="full-date">{selectedDate.getDate()} {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}</span>
            </div>
          </div>

          <div className="section-header">
            <h3>কাজসমূহ</h3>
            <span className="task-count">{selectedDateTasks.filter(t => !t.completed).length}টি বাকি</span>
          </div>

          <div className="task-list">
            {selectedDateTasks.length > 0 ? (
              selectedDateTasks.map(task => (
                <div key={task.id} className={`task-card ${task.completed ? 'completed' : ''}`}>
                  <div className="task-status" onClick={() => handleToggleComplete(task)}>
                    {task.completed ? <div className="checked-circle"><FaCheck /></div> : <div className="circle" />}
                  </div>
                  <div className="task-info">
                    <h4>{task.title}</h4>
                    <div className="task-meta">
                      <span className="time"><FaClock /> {task.time}</span>
                      <span className={`tag ${task.type}`}>{task.type}</span>
                    </div>
                  </div>
                  <button className="delete-task" onClick={() => handleDeleteTask(task.id)}><FaTrashCan /></button>
                </div>
              ))
            ) : (
              <div className="empty-tasks">
                <FaCalendarCheck />
                <p>এই দিনে কোনো কাজ নেই</p>
                <button className="inline-add-btn" onClick={() => {
                  setNewTask({...newTask, date: selectedDate.toISOString().split('T')[0]});
                  setShowAddModal(true);
                }}>কাজ যোগ করুন</button>
              </div>
            )}
          </div>
          
          <div className="summary-box">
            <h4><FaCircleInfo /> নজরে রাখুন</h4>
            <p>আপনার প্রোফাইলে মোট {tasks.filter(t => !t.completed).length}টি কাজ পেন্ডিং আছে। সময়মতো সম্পন্ন করতে চেষ্টা করুন।</p>
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="task-modal">
            <div className="modal-header">
              <h3><FaPlus /> নতুন কাজ যোগ করুন</h3>
              <button className="close-modal" onClick={() => setShowAddModal(false)}><FaXmark /></button>
            </div>
            <form onSubmit={handleAddTask}>
              <div className="form-group">
                <label>কাজের বিবরণ</label>
                <input 
                  type="text" 
                  placeholder="যেমন: কাস্টমারকে কল দেয়া..." 
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>তারিখ</label>
                  <input 
                    type="date" 
                    value={newTask.date}
                    onChange={(e) => setNewTask({...newTask, date: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>সময়</label>
                  <input 
                    type="time" 
                    value={newTask.time}
                    onChange={(e) => setNewTask({...newTask, time: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>কাজের ধরন</label>
                <div className="type-selector">
                  <button 
                    type="button" 
                    className={newTask.type === 'general' ? 'active' : ''}
                    onClick={() => setNewTask({...newTask, type: 'general'})}
                  >সাধারণ</button>
                  <button 
                    type="button" 
                    className={newTask.type === 'delivery' ? 'active' : ''}
                    onClick={() => setNewTask({...newTask, type: 'delivery'})}
                  >ডেলিভারি</button>
                  <button 
                    type="button" 
                    className={newTask.type === 'payment' ? 'active' : ''}
                    onClick={() => setNewTask({...newTask, type: 'payment'})}
                  >পেমেন্ট</button>
                  <button 
                    type="button" 
                    className={newTask.type === 'call' ? 'active' : ''}
                    onClick={() => setNewTask({...newTask, type: 'call'})}
                  >কল</button>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="cancel-btn" onClick={() => setShowAddModal(false)}>বাতিল</button>
                <button type="submit" className="save-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'সেভ হচ্ছে...' : 'কাজ যোগ করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .calendar-panel { padding: 25px; background: #fff; border-radius: 15px; }
        .panel-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
        .header-title h2 { font-size: 26px; color: #2c3e50; font-family: 'Noto Sans Bengali', sans-serif; margin-bottom: 5px; }
        .header-title p { color: #7f8c8d; font-size: 15px; }
        .add-task-btn { display: flex; align-items: center; gap: 10px; padding: 12px 24px; background: #7C4B2A; color: white; border: none; border-radius: 12px; font-weight: 700; cursor: pointer; transition: 0.3s; box-shadow: 0 4px 15px rgba(124, 75, 42, 0.2); }
        .add-task-btn:hover { background: #5D3820; transform: translateY(-2px); }

        .calendar-grid-container { display: grid; grid-template-columns: 1fr 380px; gap: 30px; }
        
        .calendar-main { background: white; border-radius: 24px; border: 1px solid #f0f0f0; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.02); }
        .calendar-controls { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
        .month-year { display: flex; align-items: center; gap: 15px; }
        .calendar-controls h3 { font-size: 24px; color: #1a1a1a; font-weight: 800; }
        .today-indicator { background: #fef6e7; color: #7C4B2A; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; cursor: pointer; border: 1px solid #fde6c1; }
        
        .control-btns { display: flex; gap: 10px; }
        .control-btns button { width: 40px; height: 40px; border-radius: 12px; border: 1px solid #eee; background: white; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #2c3e50; transition: 0.2s; }
        .control-btns button:hover { background: #f8f9fa; border-color: #7C4B2A; color: #7C4B2A; }

        .weekdays-row { display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; margin-bottom: 20px; }
        .weekday { font-size: 14px; font-weight: 700; color: #adb5bd; }
        
        .days-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 10px; }
        .day { aspect-ratio: 1/1; border-radius: 16px; padding: 10px; border: 1px solid #f8f9fa; position: relative; transition: 0.3s; cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: space-between; }
        .day:not(.empty):hover { background: #fff9f0; border-color: #7C4B2A; transform: scale(1.02); }
        .day.today { background: #fef6e7; border-color: #7C4B2A; }
        .day.today .day-num { color: #7C4B2A; font-weight: 800; }
        .day.selected { background: #7C4B2A; color: white; border-color: #7C4B2A; box-shadow: 0 10px 20px rgba(124, 75, 42, 0.2); }
        .day.selected .day-num { color: white; }
        .day-num { font-weight: 600; font-size: 18px; color: #4b5563; }
        
        .day-events { display: flex; gap: 3px; }
        .event-mini { width: 6px; height: 6px; border-radius: 50%; background: #94a3b8; }
        .event-mini.delivery { background: #3b82f6; }
        .event-mini.payment { background: #10b981; }
        .event-mini.call { background: #f59e0b; }
        .event-mini.done { background: #d1d5db; }
        .more-events { font-size: 9px; font-weight: 700; color: #94a3b8; }
        .day.selected .more-events, .day.selected .event-mini { background: rgba(255,255,255,0.4); color: white; }

        .tasks-sidebar { background: #fcfcfc; border-radius: 24px; padding: 30px; display: flex; flex-direction: column; gap: 25px; border: 1px solid #f0f0f0; }
        .sidebar-date-header { text-align: center; padding-bottom: 20px; border-bottom: 1px solid #eee; }
        .day-name { display: block; font-size: 14px; font-weight: 800; color: #7C4B2A; text-transform: uppercase; margin-bottom: 5px; letter-spacing: 1px; }
        .full-date { font-size: 18px; font-weight: 700; color: #2c3e50; }

        .section-header { display: flex; justify-content: space-between; align-items: center; }
        .section-header h3 { font-size: 20px; color: #1a1a1a; font-weight: 800; }
        .task-count { font-size: 12px; font-weight: 700; color: #7C4B2A; background: #fff; padding: 5px 12px; border-radius: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }

        .task-list { display: flex; flex-direction: column; gap: 15px; min-height: 200px; }
        .task-card { background: white; border-radius: 16px; padding: 18px; display: flex; align-items: center; gap: 15px; border: 1px solid #f0f0f0; transition: 0.3s; box-shadow: 0 4px 6px rgba(0,0,0,0.02); }
        .task-card:hover { transform: translateX(5px); border-color: #e5e7eb; box-shadow: 0 10px 15px rgba(0,0,0,0.05); }
        .task-card.completed { opacity: 0.6; background: #f9fafb; }
        .task-card.completed h4 { text-decoration: line-through; color: #94a3b8; }
        
        .task-status { cursor: pointer; }
        .circle { width: 22px; height: 22px; border: 2px solid #d1d5db; border-radius: 50%; transition: 0.2s; }
        .task-card:hover .circle { border-color: #7C4B2A; }
        .checked-circle { width: 22px; height: 22px; background: #10b981; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; }
        
        .task-info { flex: 1; }
        .task-info h4 { margin: 0 0 6px 0; font-size: 15px; color: #1f2937; font-weight: 700; }
        .task-meta { display: flex; gap: 12px; align-items: center; }
        .time { font-size: 12px; color: #6b7280; display: flex; align-items: center; gap: 5px; font-weight: 500; }
        .tag { font-size: 10px; padding: 3px 10px; border-radius: 6px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; }
        .tag.general { background: #f3f4f6; color: #4b5563; }
        .tag.delivery { background: #eff6ff; color: #1d4ed8; }
        .tag.payment { background: #ecfdf5; color: #059669; }
        .tag.call { background: #fff7ed; color: #c2410c; }

        .delete-task { background: none; border: none; color: #d1d5db; cursor: pointer; font-size: 16px; transition: 0.2s; opacity: 0; }
        .task-card:hover .delete-task { opacity: 1; }
        .delete-task:hover { color: #ef4444; }

        .empty-tasks { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #94a3b8; gap: 15px; text-align: center; padding: 40px 0; }
        .empty-tasks :global(svg) { font-size: 48px; opacity: 0.3; }
        .inline-add-btn { background: #7C4B2A; color: white; border: none; padding: 8px 16px; border-radius: 8px; font-weight: 700; font-size: 13px; cursor: pointer; }

        .summary-box { background: #fff; padding: 20px; border-radius: 16px; border-left: 5px solid #f59e0b; box-shadow: 0 4px 6px rgba(0,0,0,0.02); }
        .summary-box h4 { display: flex; align-items: center; gap: 8px; color: #b45309; font-size: 15px; font-weight: 800; margin-bottom: 10px; }
        .summary-box p { font-size: 13px; color: #6b7280; line-height: 1.6; margin: 0; }

        /* Modal Styles */
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 2000; }
        .task-modal { background: white; width: 100%; max-width: 500px; border-radius: 24px; padding: 35px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); animation: modalSlideUp 0.3s ease-out; }
        @keyframes modalSlideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        
        .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
        .modal-header h3 { font-size: 22px; font-weight: 800; color: #1a1a1a; display: flex; align-items: center; gap: 12px; }
        .close-modal { background: #f3f4f6; border: none; width: 36px; height: 36px; border-radius: 12px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #6b7280; transition: 0.2s; }
        .close-modal:hover { background: #e5e7eb; color: #111827; }

        .form-group { margin-bottom: 20px; }
        .form-group label { display: block; font-size: 14px; font-weight: 700; color: #4b5563; margin-bottom: 8px; }
        .form-group input { width: 100%; padding: 12px 16px; border: 2px solid #f3f4f6; border-radius: 12px; font-size: 15px; outline: none; transition: 0.2s; }
        .form-group input:focus { border-color: #7C4B2A; background: #fff; }
        
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        
        .type-selector { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
        .type-selector button { padding: 10px; border: 2px solid #f3f4f6; background: #f9fafb; border-radius: 12px; font-size: 13px; font-weight: 700; color: #6b7280; cursor: pointer; transition: 0.2s; }
        .type-selector button.active { background: #fef6e7; border-color: #7C4B2A; color: #7C4B2A; }

        .modal-footer { display: flex; justify-content: flex-end; gap: 15px; margin-top: 30px; }
        .cancel-btn { padding: 12px 24px; border: none; background: #f3f4f6; color: #4b5563; border-radius: 12px; font-weight: 700; cursor: pointer; transition: 0.2s; }
        .save-btn { padding: 12px 24px; border: none; background: #7C4B2A; color: white; border-radius: 12px; font-weight: 700; cursor: pointer; transition: 0.3s; box-shadow: 0 4px 12px rgba(124, 75, 42, 0.2); }
        .save-btn:hover { background: #5D3820; transform: translateY(-2px); }
        .save-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

        @media (max-width: 1024px) {
          .calendar-grid-container { grid-template-columns: 1fr; }
          .tasks-sidebar { order: 2; }
        }
      `}</style>
    </div>
  );
}
