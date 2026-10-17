import { JsonLd } from '@/components/seo/json-ld';
import {
  breadcrumbNode,
  graph,
  pageMetadata,
  PERSON_ID,
  personNode,
  webPageNode,
} from '@/lib/seo';
import { getIntlayer } from 'intlayer';
import { Metadata } from 'next';
import type { NextLayoutIntlayer } from 'next-intlayer';

const PATH = '/work/synolink-cms';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale?: string }>;
}): Promise<Metadata> => {
  const { locale = 'en' } = await params;
  const c = getIntlayer('metadata', locale);
  return pageMetadata({
    locale,
    path: PATH,
    title: String(c.cmsTitle),
    description: String(c.cmsDescription),
  });
};

const SynolinkCmsLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale = 'en' } = await params;
  const c = getIntlayer('metadata', locale);
  const nav = getIntlayer('home-page', locale);
  const cms = getIntlayer('synolink-cms', locale);

  return (
    <>
      <JsonLd
        data={graph(
          webPageNode({
            locale,
            path: PATH,
            name: String(c.cmsTitle),
            description: String(c.cmsDescription),
            about: {
              '@type': 'SoftwareApplication',
              name: String(cms.product.name),
              url: String(cms.product.href),
              description: String(cms.product.summary),
              applicationCategory: 'DeveloperApplication',
              operatingSystem: 'Web',
              isPartOf: { '@type': 'WebSite', url: 'https://synolink.ai' },
              contributor: { '@id': PERSON_ID },
            },
          }),
          personNode(locale),
          breadcrumbNode(locale, PATH, [
            { name: String(nav.home.title), path: '' },
            { name: String(nav.about.title), path: '/about' },
            { name: String(cms.ui.title), path: PATH },
          ])
        )}
      />
      {children}
    </>
  );
};

export default SynolinkCmsLayout;
