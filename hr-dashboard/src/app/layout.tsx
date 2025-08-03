"use client";

import LeftPanel from "@/components/LeftPanel";
import Providers from "@/lib/Provider";
import "./globals.css";
import ClientLayout from "@/components/clientLayout";

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>
          <div className="body-container">
            <ClientLayout>{children}</ClientLayout>
          </div>
        </Providers>
      </body>
    </html>
  );
}
