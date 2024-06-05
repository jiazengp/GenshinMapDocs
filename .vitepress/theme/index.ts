import { onMounted, watch, nextTick, defineAsyncComponent, h } from 'vue'
import { useRoute, useData, withBase } from 'vitepress'
import { VPBadge } from 'vitepress/theme-without-fonts'
import mediumZoom from 'medium-zoom'
import DefaultTheme from 'vitepress/theme-without-fonts'
import Link from './components/Link.vue'
import Coins from './components/Coins.vue'
import googleAnalytics from '../plugins/googleAnalytics'
import Card from '../theme/components/Card.vue'
import LinkGrid from '../theme/components/LinkGrid.vue'
import { createPinia } from 'pinia'
import DocAside from './components/DocAside.vue'
import DocHeader from './components/DocHeader.vue'
import DocInfo from './components/DocInfo.vue'
import DocFeedback from './components/DocFeedback.vue'
import { NolebaseInlineLinkPreviewPlugin } from '@nolebase/vitepress-plugin-inline-link-preview/client'
import {
  InjectionKey,
  NolebaseGitChangelog,
  NolebaseGitContributors,
} from '@nolebase/vitepress-plugin-git-changelog/client'

import type { Theme } from 'vitepress'

import 'uno.css'
import './styles/vars.css'
import './styles/main.css'
import './styles/ui.css'
import './styles/timeline.css'
import './styles/kbd.css'
import '@nolebase/vitepress-plugin-inline-link-preview/client/style.css'
import '@nolebase/vitepress-plugin-git-changelog/client/style.css'

const pinia = createPinia()

export default {
  ...DefaultTheme,

  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-top': () =>
        h(defineAsyncComponent(() => import('./components/Banner.vue'))),
      'doc-before': () => h(DocHeader),
      'doc-footer-before': () => h(DocInfo),
      'doc-after': () => h(DocFeedback),
      'aside-outline-after': () => h(DocAside),
    })
  },
  enhanceApp({ app }) {
    googleAnalytics({
      id: 'G-Q2K9DXZCEY',
      debug: false,
    })
    app.use(pinia)
    app.use(NolebaseInlineLinkPreviewPlugin)

    app.component('Link', Link)
    app.component('Coins', Coins)
    app.component('Card', Card)
    app.component('LinkGrid', LinkGrid)
    app.component('Badge', VPBadge)
    app.component('Changelog', NolebaseGitChangelog)
    app.component('Contributors', NolebaseGitContributors)

    app.provide(InjectionKey, {
      locales: {},
      mapAuthors: [
        {
          name: 'Hyouka',
          username: 'jiazengp',
          mapByEmailAliases: ['jiazengp@gmail.com'],
        },
      ],
    })
  },
  setup() {
    const route = useRoute()

    onMounted(() => {
      initZoom()
      loadFont()
    })
    watch(
      () => route.path,
      () =>
        nextTick(() => {
          initZoom()
        }),
    )
  },
} satisfies Theme

const loadFont = () => {
  const font = new FontFace(
    'zh-cn-full',
    `url(${withBase('/fonts/HYWenHei-85W-zh-full.woff2')})`,
    {
      display: 'swap',
    },
  )

  document.fonts.add(font)

  font.load().then((e) => {
    document.documentElement.classList.toggle('font-full')
  })
}

const initZoom = () => {
  mediumZoom('.main img:not(.no-zoomable)', {
    background: 'var(--vp-c-bg)',
  })
}
