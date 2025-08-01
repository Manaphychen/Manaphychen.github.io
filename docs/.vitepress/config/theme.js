import { nav } from './nav.js';
import { sidebar } from './sidebar.js';
import { localSearchOptions } from './search/local-search.js';

export const themeConfig = {
  nav, // 导航栏配置
  sidebar, // 侧边栏配置

  logo: '/logo.png',
  outline: {
    level: 'deep', // 右侧大纲标题层级
    label: '目录', // 右侧大纲标题文本配置
  },
  darkModeSwitchLabel: '切换日光/暗黑模式',
  sidebarMenuLabel: '文章',
  returnToTopLabel: '返回顶部',
  lastUpdatedText: '最后更新', // 最后更新时间文本配置, 需先配置lastUpdated为true
  // 文档页脚文本配置
  docFooter: {
    prev: '上一篇',
    next: '下一篇'
  },
  // 搜索配置（二选一）
  search: {
    // 本地离线搜索
    provider: 'local',
    options: localSearchOptions
  },
  // 自定义扩展: 文章元数据配置
  articleMetadataConfig: {
    author: 'Manaphy', // 文章全局默认作者名称
  },
  // 自定义扩展: 页脚配置
  footerConfig: {
    showFooter: false, // 是否显示页脚
  }
}
