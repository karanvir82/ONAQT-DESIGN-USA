// Single source of truth for business contact details.
// Change the WhatsApp number / phone here and it updates across the whole site.
export const SITE = {
  brand: 'Satya Jewellers',
  logoHeaderDark: '/images/customer/logo_footer.png',
  logoHeaderLight: '/images/customer/logo_footer_light.png',
  logoFooterDark: '/images/customer/logo_footer.png',
  logoFooterLight: '/images/customer/logo_footer_light.png',
  url: 'https://satyajewellers.com', // production domain (used for canonical, OG, sitemap)
  whatsappNumber: '919816005000', // digits only, country code first (no +)
  phone: '+91 98160 05000',
  phoneAlt: '0177-2805808',
  email: 'satyajewellers@gmail.com',
  address: 'Shop No. 62, Satya Complex, The Mall, Shimla, HP 171001',
  instagram: 'https://instagram.com/'
};

// Build a WhatsApp chat link. Pass a plain (unencoded) message; it gets encoded here.
export function whatsappLink(message) {
  const base = `https://wa.me/${SITE.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
