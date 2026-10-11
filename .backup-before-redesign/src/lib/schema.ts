export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Zeynep Koçak - Uzm. Psikolog',
    description: 'Yetişkin, ergen ve çiftlerle çalışan profesyonel psikoloji hizmetleri',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    telephone: '+90-XXX-XXX-XXXX',
    email: 'info@zeynepkocak.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Bağdat Caddesi',
      addressLocality: 'İstanbul',
      addressCountry: 'TR',
    },
    image: '/instagram/profile.jpg',
    sameAs: [
      'https://www.instagram.com/zeynepleyolarkadasi/',
    ],
    priceRange: '$$',
    areaServed: ['TR', 'Worldwide'],
    serviceType: ['Psychotherapy', 'Counseling', 'Group Workshops'],
  };
}

export function getProfessionalSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Zeynep Koçak',
    jobTitle: 'Uzm. Psikolog (Specialist Psychologist)',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    image: '/instagram/profile.jpg',
    sameAs: [
      'https://www.instagram.com/zeynepleyolarkadasi/',
    ],
    knowsAbout: [
      'Psychotherapy',
      'Counseling',
      'Psychodrama',
      'Group Therapy',
      'Couples Therapy',
      'Adolescent Therapy',
      'Transformational Breath',
    ],
  };
}

export function getServiceSchema(serviceName: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Zeynep Koçak - Uzm. Psikolog',
    },
    areaServed: ['TR', 'Worldwide'],
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    },
  };
}
