const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === "development",
})

module.exports = withPWA({
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'ja'],
    defaultLocale: 'ja',
  },
})