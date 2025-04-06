
import "./globals.css";

export const metadata = {
  title: "K | Creative developer",
  description: "A creative developer with a passion for building beautiful and functional web applications.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
