import { DitherCursor } from '@/components/manual/dither-cursor';
import { ThemeProvider } from '@/providers/theme-provider';
import { SITE_NAME, SITE_URL } from '@/lib/seo';
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

  return {
    metadataBase: new URL(SITE_URL),
    applicationName: SITE_NAME,
    authors: [{ name: 'Hawoon Joh', url: SITE_URL }],
    creator: 'Hawoon Joh',
    icons: {
      icon: [
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      ],
      apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
    },
    manifest: '/site.webmanifest',
    // Fallback only. Each page sets its own canonical, hreflang, and share
    // card through pageMetadata, so a route that forgets cannot claim to be
    // the cover.
    title: String(c.title),
    description: String(c.description),
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
