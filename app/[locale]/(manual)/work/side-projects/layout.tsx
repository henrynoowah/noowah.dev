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

const PATH = '/work/side-projects';

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
    title: String(c.sideTitle),
    description: String(c.sideDescription),
  });
};

const SideProjectsLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale = 'en' } = await params;
  const c = getIntlayer('metadata', locale);
  const nav = getIntlayer('home-page', locale);
  const side = getIntlayer('side-projects', locale);
  const { contentBuilder: cb, formBuilder: fb, prVersioning: pr } = side.items;

  const projects = [
    { item: cb, url: String(cb.demo) },
    { item: fb, url: String(fb.demo), codeRepository: String(fb.github) },
    { item: pr, url: String(pr.marketplace), codeRepository: String(pr.github) },
  ];

  return (
    <>
      <JsonLd
        data={graph(
          webPageNode({
            type: 'CollectionPage',
            locale,
            path: PATH,
            name: String(c.sideTitle),
            description: String(c.sideDescription),
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: projects.map(({ item, ...links }, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                item: {
                  '@type': 'SoftwareSourceCode',
                  name: String(item.title),
                  description: String(item.description),
                  author: { '@id': PERSON_ID },
                  ...links,
                },
              })),
            },
          }),
          personNode(locale),
          breadcrumbNode(locale, PATH, [
            { name: String(nav.home.title), path: '' },
            { name: String(nav.about.title), path: '/about' },
            { name: String(side.ui.title), path: PATH },
          ])
        )}
      />
      {children}
    </>
  );
};

export default SideProjectsLayout;
