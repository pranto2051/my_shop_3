'use client';

import React from 'react';

const AdminLogin = ({ password, setPassword, handleLogin, loginError, storeInfo }) => {
  return (
    <main className="admin-gate" suppressHydrationWarning>
      <div className="admin-login-card" suppressHydrationWarning>
        <div className="admin-login-icon" suppressHydrationWarning>
          <i className="fas fa-shield-alt"></i>
        </div>
        <h2 suppressHydrationWarning>{storeInfo.name}</h2>
        <p suppressHydrationWarning>অ্যাডমিন প্রবেশাধিকার</p>
        
        <div className="admin-login-form" suppressHydrationWarning>
          <div className="form-group" suppressHydrationWarning>
            <label suppressHydrationWarning>অ্যাডমিন পাসওয়ার্ড</label>
            <div className="input-wrap" suppressHydrationWarning>
              <i className="fas fa-key field-icon"></i>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="পাসওয়ার্ড লিখুন..." 
                className={`admin-pw-input ${loginError ? 'shake' : ''}`}
                suppressHydrationWarning
              />
            </div>
            {loginError && <p className="admin-login-error" suppressHydrationWarning>ভুল পাসওয়ার্ড! আবার চেষ্টা করুন।</p>}
          </div>
          
          <button className="admin-login-btn" onClick={handleLogin} suppressHydrationWarning>
            প্রবেশ করুন <i className="fas fa-sign-in-alt"></i>
          </button>
        </div>
      </div>
    </main>
  );
};

export default AdminLogin;
