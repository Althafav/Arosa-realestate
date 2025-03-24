import React from "react";
import MenuComponent from "./MenuComponent";
import FooterComponent from "./FooterComponent";

export default function LayoutComponent({ children }: any) {
  return (
    <React.Fragment>
      <MenuComponent />
      {children}
      <FooterComponent />
    </React.Fragment>
  );
}
