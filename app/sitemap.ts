import type { MetadataRoute } from 'next';
import { locales } from '@/intlayer.config';
import { languageAlternates, localeUrl } from '@/lib/seo';

const routes = [
  { path: '', priority: 1 },
  { path: '/about', priority: 0.8 },
  { path: '/work/synolink-cms', priority: 0.7 },
  { path: '/work/side-projects', priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap(({ path, priority }) =>
    locales.map((locale) => ({
      url: localeUrl(locale, path),
      lastModified: new Date(),
      priority,
      alternates: { languages: languageAlternates(path) },
    }))
  );
}
