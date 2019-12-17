import React from 'react';
import s from './DashboardLayout.module.css'

const LayoutHeader = (content)=>
  <header className={s.Header}>
    <div className={s.Header_contentWrapper}>
      {content.children}
    </div>
  </header>

const LayoutMainContent = (content)=>
  <main className={s.Layout_contentwrapper}>
    {content.children}
  </main>

const Layout = (content)=>
  <div className={s.Layout}>
    {content.children}
  </div>


Layout.header = LayoutHeader;
Layout.main = LayoutMainContent;

export default Layout
