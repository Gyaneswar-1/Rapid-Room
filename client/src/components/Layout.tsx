// components/Layout.js
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { ThemeProvider } from "./TheamProvider";

const Layout = ({ children }:any) => {
  return (
    <ThemeProvider>


    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
    </ThemeProvider>
  );
};

export default Layout;
