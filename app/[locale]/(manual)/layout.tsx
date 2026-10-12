import Header from '@/components/common/layouts/header/Header';
import { ManualStepsProvider } from '@/components/manual/steps';
import { NextLayoutIntlayer } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';
import { IntlayerClientProvider } from 'next-intlayer';

/** Shared shell for the manual and the assembly booklets. */
const ManualLayout: NextLayoutIntlayer = async ({ children, params }) => {
  // intlayer types `params.locale` as optional; the route only matches with one.
  const { locale = 'en' } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <IntlayerClientProvider locale={locale}>
        <ManualStepsProvider>
          <Header />
          <main className="pt-14">{children}</main>
        </ManualStepsProvider>
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};

export default ManualLayout;
