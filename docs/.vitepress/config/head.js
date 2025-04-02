import { metaData } from './constants.js';

export const head = [
  ['link', { rel: 'icon', href: '/favicon.ico' }],
  ['meta', { name: 'author', content: 'Charles7c' }],
  ['meta', { name: 'keywords', content: 'Manaphy的知识库, 知识库, 博客, Charles7c' }],

  ['meta', { name: 'HandheldFriendly', content: 'True' }],
  ['meta', { name: 'MobileOptimized', content: '320' }],
  ['meta', { name: 'theme-color', content: '#3c8772' }],

  ['meta', { property: 'og:type', content: 'website' }],
  ['meta', { property: 'og:locale', content: metaData.locale }],
  ['meta', { property: 'og:title', content: metaData.title }],
  ['meta', { property: 'og:description', content: metaData.description }],
  ['meta', { property: 'og:site', content: metaData.site }],
  ['meta', { property: 'og:site_name', content: metaData.title }],
  ['meta', { property: 'og:image', content: metaData.image }]
];
