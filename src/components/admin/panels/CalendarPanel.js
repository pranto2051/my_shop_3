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
  FaTrashCan
} from 'react-icons/fa6';

export default function CalendarPanel({ tasks: dbTasks = [] }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const tasks = dbTasks;

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));

  const monthNames = ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"];
  const weekDays = ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহঃ", "শুক্র", "শনি"];

  return (
    <div className="calendar-panel">
      <div className="panel-header">
        <div className="header-title">
          <h2>Calendar & Tasks</h2>
          <p>আপনার প্রতিদিনের শিডিউল এবং গুরুত্বপূর্ণ কাজগুলো গুছিয়ে রাখুন</p>
        </div>
        <button className="add-task-btn"><FaPlus /> নতুন কাজ</button>
      </div>

      <div className="calendar-grid-container">
        <div className="calendar-main">
          <div className="calendar-controls">
            <h3>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
            <div className="control-btns">
              <button onClick={prevMonth}><FaChevronLeft /></button>
              <button onClick={nextMonth}><FaChevronRight /></button>
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
                const isToday = day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth();
                return (
                  <div key={day} className={`day ${isToday ? 'today' : ''}`}>
                    <span className="day-num">{day}</span>
                    {day === 7 && <div className="event-dot"></div>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="tasks-sidebar">
          <div className="section-header">
            <h3>আজকের কাজসমূহ</h3>
            <span className="task-count">{tasks.filter(t => !t.completed).length}টি বাকি</span>
          </div>
          <div className="task-list">
            {tasks.map(task => (
              <div key={task.id} className={`task-card ${task.completed ? 'completed' : ''}`}>
                <div className="task-status" onClick={() => {}}>
                  {task.completed ? <FaCheck /> : <div className="circle" />}
                </div>
                <div className="task-info">
                  <h4>{task.title}</h4>
                  <div className="task-meta">
                    <span className="time"><FaClock /> {task.time}</span>
                    <span className={`tag ${task.type}`}>{task.type}</span>
                  </div>
                </div>
                <button className="delete-task"><FaTrashCan /></button>
              </div>
            ))}
          </div>
          <div className="upcoming-section">
            <h4><FaCircleInfo /> নজরে রাখুন</h4>
            <p>আগামীকাল আপনার ৩টি ডেলিভারি এবং ১টি কাস্টমার মিটিং আছে।</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .calendar-panel { padding: 20px; }
        .panel-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
        .header-title h2 { font-size: 24px; color: #2c3e50; font-family: 'Noto Sans Bengali', sans-serif; }
        .header-title p { color: #7f8c8d; font-size: 14px; }
        .add-task-btn { display: flex; align-items: center; gap: 8px; padding: 10px 20px; background: #7C4B2A; color: white; border: none; border-radius: 8px; font-weight: 700; cursor: pointer; }

        .calendar-grid-container { display: grid; grid-template-columns: 1fr 350px; gap: 30px; }
        
        .calendar-main { background: white; border-radius: 20px; border: 1px solid #eee; padding: 25px; }
        .calendar-controls { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
        .calendar-controls h3 { font-size: 20px; color: #2c3e50; }
        .control-btns { display: flex; gap: 10px; }
        .control-btns button { width: 35px; height: 35px; border-radius: 8px; border: 1px solid #eee; background: white; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #7f8c8d; }

        .weekdays-row { display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; margin-bottom: 15px; }
        .weekday { font-size: 13px; font-weight: 700; color: #95a5a6; text-transform: uppercase; }
        
        .days-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 5px; }
        .day { min-height: 100px; border-radius: 12px; padding: 12px; border: 1px solid #f8f9fa; position: relative; transition: 0.2s; }
        .day:not(.empty):hover { background: #fdf6e8; border-color: #7C4B2A; }
        .day.today { background: #7C4B2A; color: white; border-color: #7C4B2A; box-shadow: 0 10px 20px rgba(124, 75, 42, 0.2); }
        .day-num { font-weight: 700; font-size: 16px; }
        .event-dot { position: absolute; bottom: 15px; left: 50%; transform: translateX(-50%); width: 6px; height: 6px; background: #e67e22; border-radius: 50%; }
        .day.today .event-dot { background: white; }

        .tasks-sidebar { background: #f8f9fa; border-radius: 20px; padding: 25px; display: flex; flex-direction: column; gap: 20px; }
        .section-header { display: flex; justify-content: space-between; align-items: center; }
        .section-header h3 { font-size: 18px; color: #2c3e50; }
        .task-count { font-size: 12px; font-weight: 700; color: #7C4B2A; background: #fff; padding: 4px 10px; border-radius: 20px; }

        .task-list { display: flex; flex-direction: column; gap: 12px; }
        .task-card { background: white; border-radius: 12px; padding: 15px; display: flex; align-items: center; gap: 15px; border: 1px solid #eee; transition: 0.3s; }
        .task-card.completed { opacity: 0.6; }
        .task-card.completed h4 { text-decoration: line-through; color: #95a5a6; }
        
        .task-status { cursor: pointer; color: #27ae60; }
        .circle { width: 20px; height: 20px; border: 2px solid #ddd; border-radius: 50%; }
        
        .task-info { flex: 1; }
        .task-info h4 { margin: 0 0 5px 0; font-size: 14px; color: #2c3e50; }
        .task-meta { display: flex; gap: 10px; align-items: center; }
        .time { font-size: 11px; color: #95a5a6; display: flex; align-items: center; gap: 4px; }
        .tag { font-size: 10px; padding: 2px 8px; border-radius: 4px; font-weight: 800; text-transform: uppercase; }
        .tag.delivery { background: #e3f2fd; color: #1565c0; }
        .tag.payment { background: #e8f5e9; color: #2e7d32; }
        .tag.call { background: #fff3e0; color: #e65100; }

        .delete-task { background: none; border: none; color: #bdc3c7; cursor: pointer; font-size: 14px; transition: 0.2s; opacity: 0; }
        .task-card:hover .delete-task { opacity: 1; }
        .delete-task:hover { color: #e74c3c; }

        .upcoming-section { background: #fff; padding: 15px; border-radius: 12px; border-left: 4px solid #f1c40f; }
        .upcoming-section h4 { display: flex; align-items: center; gap: 8px; color: #f39c12; font-size: 14px; margin-bottom: 8px; }
        .upcoming-section p { font-size: 12px; color: #7f8c8d; line-height: 1.5; margin: 0; }
      `}</style>
    </div>
  );
}
