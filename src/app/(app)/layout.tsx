import React, { ReactNode } from "react";

function MainAppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full max-h-screen w-full flex-1 overflow-hidden">
      {/* <SideBar /> */}
      {children}
    </div>
  );
}

export default MainAppLayout;
