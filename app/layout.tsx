import './ui/global.css';
import { montserrat } from './ui/fonts';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} antialiased`}
      >
        <header>
          <h2>Esto es parte del layout</h2>
        </header>
        {children}
        <footer className="flex justify-center p-4 text-gray-500 text-sm">
          <span>&copy;Hecho por la gente de vercel 💖</span>
        </footer>
      </body>
    </html>
  );
}
