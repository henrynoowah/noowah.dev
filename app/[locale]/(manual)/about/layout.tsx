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

const PATH = '/about';

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
    title: String(c.aboutTitle),
    description: String(c.aboutDescription),
    ogType: 'profile',
  });
};

const AboutLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale = 'en' } = await params;
  const c = getIntlayer('metadata', locale);
  const nav = getIntlayer('home-page', locale);

  return (
    <>
      <JsonLd
        data={graph(
          webPageNode({
            type: 'ProfilePage',
            locale,
            path: PATH,
            name: String(c.aboutTitle),
            description: String(c.aboutDescription),
            mainEntity: { '@id': PERSON_ID },
          }),
          personNode(locale),
          breadcrumbNode(locale, PATH, [
            { name: String(nav.home.title), path: '' },
            { name: String(nav.about.title), path: PATH },
          ])
        )}
      />
      {children}
    </>
  );
};

export default AboutLayout;
