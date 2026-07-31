import { ThemeProvider } from '@/providers/theme-provider';
import { getHTMLTextDir } from 'intlayer';
import { Metadata } from 'next';
import type { NextLayoutIntlayer } from 'next-intlayer';
import { Syne, Outfit, Noto_Sans_KR } from 'next/font/google';
import { ChatProvider } from './_components/chat-context';
import { FloatingChat } from './_components/floating-chat';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600'],
});

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  variable: '--font-ko',
  weight: ['300', '400', '500', '700'],
});

const title = 'NoowaH Blog';
const description = "Welcome to NoowaH's blog";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: 'https://noowah.dev',
  },
  openGraph: {
    title,
    type: 'website',
    description,
    images: {
      url: `/twitter-card.png`,
      width: 1200,
      height: 630,
      type: 'image/png',
    },
  },
  twitter: {
    title,
    card: 'summary_large_image',
    description,
    images: {
      url: `/twitter-card.png`,
      width: 1200,
      height: 630,
      type: 'image/png',
    },
  },
};

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  // intlayer types `params.locale` as optional; the route only matches with one.
  const { locale = 'en' } = await params;

  return (
    <html
      suppressHydrationWarning={true}
      lang={locale}
      dir={getHTMLTextDir(locale)}
      className={`${syne.variable} ${outfit.variable} ${notoSansKR.variable} ${locale === 'ko' ? 'lang-ko' : ''}`}
    >
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="shortcut icon" href="#" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body suppressHydrationWarning={true}>
        <ThemeProvider attribute="class">
          <ChatProvider locale={locale}>
            <FloatingChat locale={locale} />
            {children}
          </ChatProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
