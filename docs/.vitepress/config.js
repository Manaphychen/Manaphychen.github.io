import {defineConfig} from 'vitepress';
import {metaData} from './config/constants.js';
import {head} from './config/head.js';
import {themeConfig} from './config/theme.js';
import fg from 'fast-glob'
import matter from 'gray-matter'


const customElements = [
  'mjx-container',
  'mjx-assistive-mml',
  'math',
  'maction',
  'maligngroup',
  'malignmark',
  'menclose',
  'merror',
  'mfenced',
  'mfrac',
  'mi',
  'mlongdiv',
  'mmultiscripts',
  'mn',
  'mo',
  'mover',
  'mpadded',
  'mphantom',
  'mroot',
  'mrow',
  'ms',
  'mscarries',
  'mscarry',
  'mscarries',
  'msgroup',
  'mstack',
  'mlongdiv',
  'msline',
  'mstack',
  'mspace',
  'msqrt',
  'msrow',
  'mstack',
  'mstack',
  'mstyle',
  'msub',
  'msup',
  'msubsup',
  'mtable',
  'mtd',
  'mtext',
  'mtr',
  'munder',
  'munderover',
  'semantics',
  'math',
  'mi',
  'mn',
  'mo',
  'ms',
  'mspace',
  'mtext',
  'menclose',
  'merror',
  'mfenced',
  'mfrac',
  'mpadded',
  'mphantom',
  'mroot',
  'mrow',
  'msqrt',
  'mstyle',
  'mmultiscripts',
  'mover',
  'mprescripts',
  'msub',
  'msubsup',
  'msup',
  'munder',
  'munderover',
  'none',
  'maligngroup',
  'malignmark',
  'mtable',
  'mtd',
  'mtr',
  'mlongdiv',
  'mscarries',
  'mscarry',
  'msgroup',
  'msline',
  'msrow',
  'mstack',
  'maction',
  'semantics',
  'annotation',
  'annotation-xml',
];

const rewrites = {}
const pages = await fg('**/*.md', {ignore: ['node_modules/**']})
const usedPermalinks = new Set()
pages.map((page, index) => {
  const {permalink} = matter.read(page).data
  if (permalink && typeof permalink === 'string' && permalink.trim() !== '' && permalink !== '/') {
    // 移除开头的斜杠（如果有的话），因为 rewrites 不需要
    let cleanPermalink = permalink.startsWith('/') ? permalink.slice(1) : permalink
    // 验证permalink格式
    if (!cleanPermalink || cleanPermalink === '/') {
      console.warn(`[${index}] Invalid permalink for ${page}: "${permalink}"`)
      return
    }
    // 检查重复
    if (usedPermalinks.has(cleanPermalink)) {
      console.warn(`[${index}] Duplicate permalink "${cleanPermalink}" for ${page}`)
      return
    }
    usedPermalinks.add(cleanPermalink)
  }

})

export default defineConfig({
    lang: metaData.lang,
    title: metaData.title,
    description: metaData.description,

    ignoreDeadLinks: true,
    cleanUrls: true,
    lastUpdated: true,

    head,
    markdown: {
      math: true,
      container: {
        tipLabel: '提示',
        warningLabel: '警告',
        dangerLabel: '危险',
        infoLabel: '信息',
        detailsLabel: '详细信息'
      }
    },
    vue: {
      template: {
        compilerOptions: {
          isCustomElement: (tag) => customElements.includes(tag),
        },
      },
    },
    themeConfig,
  }
)
