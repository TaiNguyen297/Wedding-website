import React, { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <div id="primary" className="content-area pt-0">
        <main id="main" className="site-main mt-[0px]" role="main">
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;