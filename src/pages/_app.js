import "@/styles/globals.css";
import { Oswald } from "next/font/google";
import { SessionProvider } from "next-auth/react";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export default function App({ session, Component, pageProps }) {
  return (
    <SessionProvider session={session}>
      <div className={oswald.className}>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}
