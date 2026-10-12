import { getIntlayer } from 'intlayer';
import { Metadata } from 'next';
import type { ReactNode } from 'react';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale?: string }>;
}): Promise<Metadata> => {
  const { locale = 'en' } = await params;
  const c = getIntlayer('metadata', locale);
  return {
    title: { default: String(c.cmsTitle), template: '%s' },
    description: String(c.cmsDescription),
  };
};

const SynolinkCmsLayout = ({ children }: { children: ReactNode }) => children;

export default SynolinkCmsLayout;
