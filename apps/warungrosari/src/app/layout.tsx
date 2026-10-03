import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/lib/context";

export const metadata: Metadata = {
  title: "Warung Rosari — Commerce OS",
  description: "Commerce OS for Indonesian MSMEs — products, orders, finance, ads. Warung Rosari by Zwart.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const META_PIXEL = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";
  const GOOGLE_ADS = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "";
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        {META_PIXEL && (
          <>
            <script dangerouslySetInnerHTML={{ __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL}');fbq('track','PageView');` }} />
            <noscript><img height="1" width="1" style={{display:"none"}} src={`https://www.facebook.com/tr?id=${META_PIXEL}&ev=PageView&noscript=1`} alt="" /></noscript>
          </>
        )}
        {GOOGLE_ADS && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS}`} />
            <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config','${GOOGLE_ADS}');` }} />
          </>
        )}
      </head>
      <body className="min-h-screen antialiased">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
