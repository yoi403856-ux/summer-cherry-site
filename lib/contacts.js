// Fallback contact details, used until real values are set in
// Sanity → Настройки сайта.
export const CONTACT_DEFAULTS = {
  phone: '+7 911 732-58-02',
  whatsapp: 'https://wa.me/79117325802',
  facebook: 'https://www.facebook.com/share/19UAQCUcGF/?mibextid=wwXIfr',
  vk: 'https://vk.ru/summercherryspb',
}

// merges Sanity settings over the defaults into a single {phone, tel,
// whatsapp, facebook, vk} shape used by ContactPopover / Footer
export function resolveContacts(settings) {
  const phone = settings?.phone || CONTACT_DEFAULTS.phone
  return {
    phone,
    tel: `tel:${phone.replace(/[^\d+]/g, '')}`,
    whatsapp: settings?.whatsapp || CONTACT_DEFAULTS.whatsapp,
    facebook: settings?.facebook || CONTACT_DEFAULTS.facebook,
    vk: settings?.vk || CONTACT_DEFAULTS.vk,
  }
}
