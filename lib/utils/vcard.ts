/**
 * vCard 3.0 Generator and Downloader
 * Generates standard electronic business card for recruiters
 */

export function generateVCard(): string {
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Utama;Ahmad;Issadurrofiq Jaya;',
    'FN:A. Issadurrofiq Jaya Utama',
    'ORG:Universitas Brawijaya',
    'TITLE:Frontend & Software Developer',
    'EMAIL;TYPE=INTERNET,WORK:ahmadissadurrofiq17@gmail.com',
    'URL;TYPE=WORK:https://ahmadissadurrofiq.vercel.app',
    'URL;TYPE=GITHUB:https://github.com/DevIssa-It',
    'URL;TYPE=LINKEDIN:https://linkedin.com/in/a-issadurrofiq-jaya-utama-6b559228a',
    'NOTE:Computer Science undergraduate at Universitas Brawijaya. Specializing in Next.js, React, TypeScript, and modern web applications.',
    'END:VCARD',
  ].join('\r\n')
}

export function downloadVCard(): void {
  if (typeof window === 'undefined') return
  const vcardData = generateVCard()
  const blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'Ahmad_Issadurrofiq_Contact.vcf')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
