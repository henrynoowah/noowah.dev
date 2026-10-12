import type { MetadataRoute } from 'next';
import { locales } from '@/intlayer.config';

const BASE_URL = 'https://noowah.dev';
const routes = ['', '/about', '/work/synolink-cms', '/work/side-projects'];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}${route}`,
      lastModified: new Date(),
    }))
  );
}
