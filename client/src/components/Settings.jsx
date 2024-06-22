import React, { useState } from 'react';
import './settings.css';

const Settings = () => {
  const [profileSettings, setProfileSettings] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: false,
    smsNotifications: false,
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings((prevSettings) => ({
      ...prevSettings,
      [name]: checked,
    }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // Handle profile settings submission
    console.log('Profile Settings:', profileSettings);
  };

  const handleNotificationSubmit = (e) => {
    e.preventDefault();
    // Handle notification settings submission
    console.log('Notification Settings:', notificationSettings);
  };

  return (
    <div className="settings-container">
      
      
      <form className="settings-form" onSubmit={handleProfileSubmit}>
        <h3 className="settings-subheader">Profile Settings</h3>
        <div className="settings-form-group">
          <label className="settings-label" htmlFor="username">Username:</label>
          <input
            className="settings-input"
            type="text"
            id="username"
            name="username"
            value={profileSettings.username}
            onChange={handleProfileChange}
          />
        </div>
    
        <div className="settings-form-group">
          <label className="settings-label" htmlFor="password">Password:</label>
          <input
            className="settings-input"
            type="password"
            id="password"
            name="password"
            value={profileSettings.password}
            onChange={handleProfileChange}
          />
        </div>
        <button className="settings-button" type="submit">Save Profile</button>
      </form>

     
    </div>
  );
};

export default Settings;
