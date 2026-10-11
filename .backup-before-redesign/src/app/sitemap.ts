import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const routes = [
    { url: '/', changeFrequency: 'weekly' as const, priority: 1 },
    { url: '/hakkimda', changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: '/calisma-alanlarim', changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: '/yetiskinlerle-calisma', changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: '/ergenlerle-calisma', changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: '/ciftlerle-calisma', changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: '/online-gorusmeler', changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: '/psikodrama', changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: '/atolyeler', changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: '/expat-psychologist', changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: '/transformational-breath', changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: '/blog', changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: '/iletisim', changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: '/randevu', changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: '/gizlilik-politikasi', changeFrequency: 'yearly' as const, priority: 0.5 },
    { url: '/kvkk', changeFrequency: 'yearly' as const, priority: 0.5 },
    { url: '/cerez-politikasi', changeFrequency: 'yearly' as const, priority: 0.5 },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
