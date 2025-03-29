import type { DefaultTheme } from 'vitepress';

export const nav: DefaultTheme.Config['nav'] = [
  {
    text: '后端',
    items: [
      { text: 'Spring', link: 'java/Spring/01.Spring6', activeMatch: '/java/Spring/' },
      { text: '数据库', link: '/database/MySQL/00.MySQL基础', activeMatch: '/database/MySQL/' },
      { text: 'JVM', link: 'jvm/01.JVM内存/00.JVM与Java体系结构', activeMatch: '/jvm/01.JVM内存/' }
    ],
    activeMatch: '/courses/'
  },
  {
    text: '运维',
    items: [
      { text: 'Linux', link: '/ops/Linux/01.Linux常用指令', activeMatch: '/book/Linux/' },
      { text: 'Docker', link: '/ops/Docker/01.Docker', activeMatch: '/ops/Docker/' },
      { text: '其他', link: '/ops/其他/00.运维笔记', activeMatch: '/ops/其他/' },
    ],
    activeMatch: '/book/'
  },
  {
    text: '其他',
    items: [
      { text: '前端', link: '/other/前端/Vue基础', activeMatch: '/other/前端/' }
    ],
    activeMatch: '/categories/'
  },
  {
    text: '书籍',
    items: [
      { text: '设计模式', link: '/book/设计模式/00.设计模式汇总', activeMatch: '/book/设计模式/' },
      { text: '高效Java', link: '/book/高效Java/00.章节介绍', activeMatch: '/book/高效Java/' },
      { text: 'Hello算法', link: '/book/Hello算法/01.初识算法', activeMatch: '/book/Hello算法/' },
      { text: 'ES6教程', link: '/book/ES6教程/01.ECMAScript6简介', activeMatch: '/book/ES6教程/' }
    ],
    activeMatch: '/book/'
  },
  {
    text: '我的标签',
    link: '/tags',
    activeMatch: '/tags'
  },
  {
    text: '关于',
    items: [
      { text: '关于知识库', link: '/about/index', activeMatch: '/about/index' },
      { text: '关于我', link: '/about/me', activeMatch: '/about/me' }
    ],
    activeMatch: '/about/' // // 当前页面处于匹配路径下时, 对应导航菜单将突出显示
  },
];
