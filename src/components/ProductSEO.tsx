import { Helmet } from "react-helmet-async";

interface ProductSEOProps {
  title: string;
  description: string;
  price: string;
  url: string;
  image?: string;
  specs?: { label: string; value: string }[];
}

export default function ProductSEO({ title, description, price, url, image, specs }: ProductSEOProps) {
  const numericPrice = price.replace(/[^\d]/g, "");
  const fullTitle = `${title} — купить у производителя HAGL`;
  const fullUrl = `https://hagl-iron.ru${url}`;
  const imageUrl = image || "https://hagl-iron.ru/viking-icon.png";
  const specsText = specs?.map(s => `${s.label}: ${s.value}`).join(". ") || "";
  const metaDesc = `${description.slice(0, 120)}${specsText ? ` ${specsText.slice(0, 40)}` : ""}. Купить с доставкой по России.`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: title,
    description,
    brand: { "@type": "Brand", name: "HAGL" },
    url: fullUrl,
    image: imageUrl,
    offers: {
      "@type": "Offer",
      priceCurrency: "RUB",
      price: numericPrice,
      availability: "https://schema.org/InStock",
      url: fullUrl,
      seller: { "@type": "Organization", name: "HAGL" },
    },
    ...(specs && {
      additionalProperty: specs.map(s => ({
        "@type": "PropertyValue",
        name: s.label,
        value: s.value,
      })),
    }),
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      <link rel="canonical" href={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:type" content="product" />
      <meta property="og:locale" content="ru_RU" />
      <meta property="product:price:amount" content={numericPrice} />
      <meta property="product:price:currency" content="RUB" />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}
