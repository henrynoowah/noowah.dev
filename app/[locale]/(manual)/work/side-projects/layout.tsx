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
    title: { default: String(c.sideTitle), template: '%s' },
    description: String(c.sideDescription),
  };
};

const SideProjectsLayout = ({ children }: { children: ReactNode }) => children;

export default SideProjectsLayout;
