import aboutContent from '@/app/[locale]/(manual)/about/about.content';
import { locales } from '@/intlayer.config';
import { blogUrls } from '@/lib/blog';
import {
  getDictionary,
  getLocalizedUrl,
  Locales,
  type LocalesValues,
} from 'intlayer';
import type { Metadata } from 'next';

/**
 * One place for everything search engines read: canonical/hreflang URLs, the
 * share card, and the schema.org graph. Facts about the person come from the
 * about dictionary, the same source the page, the bot, and /llms.txt use.
 */

export const SITE_URL = 'https://noowah.dev';
export const SITE_NAME = 'NOOWAH';

const OG_LOCALE: Record<string, string> = {
  [Locales.ENGLISH]: 'en_US',
  [Locales.KOREAN]: 'ko_KR',
};

const SHARE_IMAGE = {
  url: '/twitter-card.png',
  width: 1200,
  height: 630,
  type: 'image/png',
};

/**
 * `path` is locale-less and starts with `/`, or is `''` for the cover. English
 * is served unprefixed (`/about`), Korean under `/ko`; getLocalizedUrl is what
 * the in-page links use, so the canonical matches the URL people land on.
 */
export const localeUrl = (locale: LocalesValues, path: string) =>
  `${SITE_URL}${getLocalizedUrl(path || '/', locale)}`;

/** hreflang map for a path; x-default points at the default (English) copy. */
export const languageAlternates = (path: string) => ({
  ...Object.fromEntries(locales.map(l => [l, localeUrl(l, path)])),
  'x-default': localeUrl(Locales.ENGLISH, path),
});

export function pageMetadata({
  locale,
  path,
  title,
  description,
  ogType = 'website',
}: {
  locale: LocalesValues;
  path: string;
  title: string;
  description: string;
  ogType?: 'website' | 'profile';
}): Metadata {
  const url = localeUrl(locale, path);
  // Next merges openGraph/twitter shallowly, so each page sets them in full;
  // otherwise subpages share the cover's card.
  return {
    title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: ogType,
      url,
      siteName: SITE_NAME,
      title,
      description,
      locale: OG_LOCALE[locale],
      alternateLocale: locales
        .filter(l => l !== locale)
        .map(l => OG_LOCALE[l]),
      images: SHARE_IMAGE,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: SHARE_IMAGE,
    },
  };
}

// schema.org --------------------------------------------------------------

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

type Node = Record<string, unknown>;

type AboutFacts = {
  meta: {
    name: string;
    nameKo: string;
    handle: string;
    title: string;
    email: string;
    github: string;
  };
  practice: { stack: Record<string, { items: string[] }> };
};

export function personNode(locale: LocalesValues): Node {
  const { meta, practice } = getDictionary(aboutContent, locale) as unknown as AboutFacts;
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: meta.name,
    alternateName: [meta.handle, meta.nameKo],
    jobTitle: meta.title,
    url: localeUrl(locale, '/about'),
    email: `mailto:${meta.email}`,
    image: `${SITE_URL}/android-chrome-512x512.png`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Seoul',
      addressCountry: 'KR',
    },
    worksFor: {
      '@type': 'Organization',
      name: 'CloudHospital',
      url: 'https://icloudhospital.com',
    },
    knowsAbout: Object.values(practice.stack).flatMap(g => g.items),
    knowsLanguage: ['en', 'ko'],
    sameAs: [`https://${meta.github}`, ...Object.values(blogUrls)],
  };
}

export const websiteNode = (): Node => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: locales,
  publisher: { '@id': PERSON_ID },
});

/** A page node tied to the site and the person, for any schema.org page type. */
export const webPageNode = ({
  type = 'WebPage',
  locale,
  path,
  name,
  description,
  ...rest
}: {
  type?: string;
  locale: LocalesValues;
  path: string;
  name: string;
  description: string;
} & Node): Node => ({
  '@type': type,
  '@id': `${localeUrl(locale, path)}#webpage`,
  url: localeUrl(locale, path),
  name,
  description,
  inLanguage: locale,
  isPartOf: { '@id': WEBSITE_ID },
  author: { '@id': PERSON_ID },
  breadcrumb: path ? { '@id': `${localeUrl(locale, path)}#breadcrumb` } : undefined,
  ...rest,
});

export const breadcrumbNode = (
  locale: LocalesValues,
  path: string,
  crumbs: Array<{ name: string; path: string }>
): Node => ({
  '@type': 'BreadcrumbList',
  '@id': `${localeUrl(locale, path)}#breadcrumb`,
  itemListElement: crumbs.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: localeUrl(locale, c.path),
  })),
});

export const graph = (...nodes: Node[]) => ({
  '@context': 'https://schema.org',
  '@graph': nodes,
});
