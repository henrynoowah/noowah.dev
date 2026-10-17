import { DitherCursor } from '@/components/manual/dither-cursor';
import { ThemeProvider } from '@/providers/theme-provider';
import { getHTMLTextDir, getIntlayer } from 'intlayer';
import { Metadata } from 'next';
import type { NextLayoutIntlayer } from 'next-intlayer';
import { Archivo, Noto_Sans_KR } from 'next/font/google';
import { ChatProvider } from './_components/chat-context';
import { FloatingChat } from './_components/floating-chat';

// Archivo carries the manual's voice: its width axis gives expanded step
// numerals and a condensed running head from one family. It has no Hangul, so
// Noto Sans KR sits second in the stack and picks up every Korean glyph.
const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  axes: ['wdth'],
});

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  variable: '--font-ko',
  weight: ['400', '500', '700', '900'],
});

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale?: string }>;
}): Promise<Metadata> => {
  const { locale = 'en' } = await params;
  const c = getIntlayer('metadata', locale);
  const title = String(c.title);
  const description = String(c.description);

  return {
    metadataBase: new URL('https://noowah.dev'),
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
};

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  // intlayer types `params.locale` as optional; the route only matches with one.
  const { locale = 'en' } = await params;

  return (
    <html
      suppressHydrationWarning={true}
      lang={locale}
      dir={getHTMLTextDir(locale)}
      className={`${archivo.variable} ${notoSansKR.variable} ${locale === 'ko' ? 'lang-ko' : ''}`}
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
        <DitherCursor />
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
