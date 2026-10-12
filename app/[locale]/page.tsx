import { MainContainer } from './_components/main-container';
import { IntlayerServerProvider } from 'next-intlayer/server';
import { IntlayerClientProvider, NextPageIntlayer } from 'next-intlayer';

const Home: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <IntlayerClientProvider locale={locale}>
        <main>
          <MainContainer />
        </main>
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};

export default Home;
