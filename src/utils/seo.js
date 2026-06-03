import { SITE } from '../config/site';

const abs = (pathOrUrl) =>
  pathOrUrl?.startsWith('http') ? pathOrUrl : `${SITE.url}${pathOrUrl || ''}`;

function upsertMeta(attr, key, content) {
  if (content == null) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

// Update <title>, description, Open Graph and Twitter tags for the current page.
export function applyPageMeta({ title, description, image, path }) {
  if (title) {
    document.title = title;
    upsertMeta('property', 'og:title', title);
    upsertMeta('name', 'twitter:title', title);
  }
  if (description) {
    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:description', description);
    upsertMeta('name', 'twitter:description', description);
  }
  if (image) {
    upsertMeta('property', 'og:image', abs(image));
    upsertMeta('name', 'twitter:image', abs(image));
  }
  if (path) upsertMeta('property', 'og:url', abs(path));
}

// Inject (or clear) a per-page JSON-LD block. Pass an object or array of objects.
export function setPageJsonLd(data) {
  const id = 'page-jsonld';
  let s = document.getElementById(id);
  if (!data) {
    if (s) s.remove();
    return;
  }
  if (!s) {
    s = document.createElement('script');
    s.id = id;
    s.type = 'application/ld+json';
    document.head.appendChild(s);
  }
  s.textContent = JSON.stringify(data);
}

// Convenience builders
export function productJsonLd(product, categoryLabel) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.title,
      image: abs(product.image),
      description: product.desc,
      category: product.category,
      brand: { '@type': 'Brand', name: SITE.brand },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url: abs(`/product/${product.id}`),
        seller: { '@type': 'Organization', name: SITE.brand }
      }
    },
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: categoryLabel, path: `/collection/${product.category}` },
      { name: product.title }
    ])
  ];
}

export function breadcrumbJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      ...(it.path ? { item: abs(it.path) } : {})
    }))
  };
}
