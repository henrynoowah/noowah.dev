import { NextConfig } from 'next';
import { withIntlayer } from 'next-intlayer/server';

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
    inlineCss: true,
    optimizePackageImports: [
      'motion',
      'lucide-react',
      '@tabler/icons-react',
      'lodash',
    ],
  },
};

export default withIntlayer(nextConfig);
