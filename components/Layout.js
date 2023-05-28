// components/Layout.js
import React from 'react';
import Sidebar from './Sidebar';
import layoutStyles from '../styles/Layout.module.css'

const Layout = ({ children }) => (
  <div className={layoutStyles.layout}>
    <div className={layoutStyles.banner}>
      <h1>BlindGPT</h1>
    </div>
    <Sidebar />
    <div className={layoutStyles.chatContainer}>
      {children}
    </div>
  </div>
);

export default Layout;
