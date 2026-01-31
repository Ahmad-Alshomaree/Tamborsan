import { Inter } from 'next/font/google';
import './globals.css';
import ConditionalLayout from '../components/ConditionalLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Tambursan - Hoş Geldiniz',
  description: 'Tambursan Tambur Kaplama ve Kauçuk Kaplama İmalatı',
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  )
}
