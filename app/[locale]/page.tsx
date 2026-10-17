import { JsonLd } from '@/components/seo/json-ld';
import {
  graph,
  pageMetadata,
  PERSON_ID,
  personNode,
  webPageNode,
  websiteNode,
} from '@/lib/seo';
import { getIntlayer } from 'intlayer';
import type { Metadata } from 'next';
import { IntlayerClientProvider, NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';
import { MainContainer } from './_components/main-container';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale?: string }>;
}): Promise<Metadata> => {
  const { locale = 'en' } = await params;
  const c = getIntlayer('metadata', locale);
  return pageMetadata({
    locale,
    path: '',
    title: String(c.title),
    description: String(c.description),
  });
};

const Home: NextPageIntlayer = async ({ params }) => {
  const { locale = 'en' } = await params;
  const c = getIntlayer('metadata', locale);

  return (
    <IntlayerServerProvider locale={locale}>
      <IntlayerClientProvider locale={locale}>
        <JsonLd
          data={graph(
            websiteNode(),
            personNode(locale),
            webPageNode({
              locale,
              path: '',
              name: String(c.title),
              description: String(c.description),
              about: { '@id': PERSON_ID },
            })
          )}
        />
        <main>
          <MainContainer />
        </main>
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};

export default Home;
