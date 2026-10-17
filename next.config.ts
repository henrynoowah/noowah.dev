import { NextConfig } from 'next';
import { withIntlayer } from 'next-intlayer/server';

const nextConfig: NextConfig = {
  // English is unprefixed. intlayer's proxy answers /en/* with a redirect to
  // the same URL (it never strips the default locale), which loops forever.
  // Config redirects run before the proxy, so catch those URLs here.
  async redirects() {
    return [
      { source: '/en', destination: '/', permanent: true },
      { source: '/en/:path*', destination: '/:path*', permanent: true },
    ];
  },
  experimental: {
    viewTransition: true,
    inlineCss: true,
    optimizePackageImports: [
      'motion',
      'lucide-react',
      '@tabler/icons-react',
    ],
  },
};

export default withIntlayer(nextConfig);
