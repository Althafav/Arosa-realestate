import React, { useEffect } from "react";
import MenuComponent from "./MenuComponent";
import FooterComponent from "./FooterComponent";
import { useRouter } from "next/router";

export default function LayoutComponent({ children }: any) {
  const { locale } = useRouter();
  useEffect(() => {
    if (locale) {
      document.documentElement.lang = locale;
      document.documentElement.dir = locale.startsWith("ar") ? "rtl" : "ltr";
    }
  }, [locale]);

  return (
    <React.Fragment>
      <MenuComponent />
      {children}
      <FooterComponent />
    </React.Fragment>
  );
}
