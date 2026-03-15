import { Helmet } from "react-helmet-async";

interface PageSEOProps {
  title: string;
  description: string;
  path: string;
  type?: string;
}

export default function PageSEO({ title, description, path, type = "website" }: PageSEOProps) {
  const fullUrl = `https://hagl-iron.ru${path}`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="ru_RU" />
    </Helmet>
  );
}
