import React from "react";
import Footer from "./Footer";
import Header from "./Header";


const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
    
      <Footer />
    </div>

  );
};

export default ClientLayout;
