import { brand, contact, faqs, services, socialLinks } from "@/lib/site-data";

export default function StructuredData() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.compactName,
    alternateName: brand.shortName,
    url: brand.url,
    logo: `${brand.url}logo.png`,
    description: brand.description,
    areaServed: "TR",
    sameAs: socialLinks.map((item) => item.href),
    contactPoint: {
      "@type": "ContactPoint",
      email: contact.email,
      telephone: contact.phone,
      contactType: "customer support",
      availableLanguage: ["Turkish", "English"],
    },
  };

  const serviceGraph = {
    "@context": "https://schema.org",
    "@graph": services.map((service) => ({
      "@type": "Service",
      name: service.title,
      provider: {
        "@type": "Organization",
        name: brand.compactName,
        url: brand.url,
      },
      areaServed: "TR",
      description: service.desc,
    })),
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      {[organization, serviceGraph, faqPage].map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  );
}
