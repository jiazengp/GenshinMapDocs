import { baseHelper } from '../theme/utils';
import { socialList } from '../theme/composables/socialList';
import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress';
import type { CustomConfig } from './types';
export const META_URL = 'https://yuanshen.site/docs/';
export const META_TITLE = "原神マップ";
export const META_DESCRIPTION = "空蛍酒場は開発している資源、任務など攻略全般掲載するマップ";
export const META_KEYWORDS = "原神マップ, テイワットマップ, 空蛍酒場, yuanshenmap, Genshin Impact Map, Kongying Map";
export const META_IMAGE = 'https://yuanshen.site/docs/imgs/cover.jpg';
export const LOCAL_CODE = "ja-JP";
export const LOCAL_BASE = '';
export const zhConfig: LocaleSpecificConfig<DefaultTheme.Config & CustomConfig> = {
  titleTemplate: '空荧酒馆',
  description: META_DESCRIPTION,
  head: [['meta', {
    property: 'og:site_name',
    content: META_TITLE
  }], ['meta', {
    property: 'og:locale',
    content: LOCAL_CODE
  }]],
  themeConfig: {
    siteTitle: '原神地图',
    keyword: META_KEYWORDS,
    description: META_DESCRIPTION,
    image: META_IMAGE,
    outlineTitle: '本页目录',
    logo: '/imgs/logo_256.png',
    lastUpdatedText: '更新日期',
    returnToTopLabel: '回到顶部',
    langMenuLabel: '更改语言',
    notFound: {
      title: '这个页面找不到了',
      quote: '可能跟温迪一起出游了吧',
      linkLabel: '回到首页'
    },
    team: {
      title: '关于团队',
      desc: '地图的背后是一个基本来自中国的团队，以下是部分成员的个人信息。',
      coreMember: {
        title: '核心团队成员',
        desc: '核心团队成员是那些积极长期参与维护一个或多个核心项目的人。 他们对空荧酒馆的生态系统做出了重大贡献。'
      },
      emeritiMember: {
        title: '名誉核心团队',
        desc: '我们在此致敬过去曾做出过突出贡献的不再活跃的团队成员。'
      },
      partnerMember: {
        title: '社区伙伴',
        desc: '我们与这些主要合作伙伴建立了更加亲密的关系，经常与他们就即将到来的功能展开合作。'
      }
    },
    socialLinks: [{
      icon: 'github',
      link: 'https://github.com/kongying-tavern/'
    }, {
      icon: 'discord',
      link: 'https://discord.gg/aFe57AKZUF'
    }, {
      icon: 'twitter',
      link: 'https://twitter.com/KongyingTavern'
    }, {
      icon: {
        svg: socialList.bilibili.icon
      },
      link: 'https://space.bilibili.com/518076785',
      ariaLabel: 'bilibili'
    }],
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    payment: {
      wechatpay: {
        name: '微信支付',
        address: 'wxp://f2f0dd1rszrnqJc_gnlwV_lRX5dlZ1Dtn9rp'
      },
      alipay: {
        name: '支付宝',
        address: 'https://qr.alipay.com/tsx11609thmpw9odmvdlxd6'
      },
      qqpay: {
        name: 'QQ 支付',
        address: 'https://i.qianbao.qq.com/wallet/sqrcode.htm?m=tenpay&a=1&u=790489566&ac=CAEQ3tP3-AIY0v2k_AU%3D_xxx_sign&n=AAAAAAAA&f=wallet'
      },
      paypal: {
        name: 'Paypal',
        address: 'https://www.paypal.com/paypalme/yuanshenditu'
      },
      bilibili: {
        name: 'bilibili',
        address: 'https://space.bilibili.com/518076785'
      }
    },
    editLink: {
      pattern: 'https://github.com/kongying-tavern/docs/edit/main/src/:path',
      text: '报告错误'
    },
    sidebar: baseHelper(sidebar(), LOCAL_BASE),
    footer: baseHelper(footer(), LOCAL_BASE),
    nav: baseHelper(nav(), LOCAL_BASE)
  }
};

function nav(): DefaultTheme.NavItem[] {
  return [{
    text: "ダウンロード",
    link: '/download-client.md'
  }, {
    text: "コミュニティ",
    link: '/community.md'
  }, {
    text: "Support us",
    link: '/support-us.md'
  }, {
    text: "フィードバック",
    activeMatch: `^/manual/`,
    items: [{
      text: "マニュアル",
      link: 'manual/client-user-manual'
    }, {
      text: "フィートバック",
      link: 'https://support.qq.com/products/321980'
    }, {
      text: "機能紹介",
      link: 'https://support.qq.com/products/321980/faqs-more/?id=126362'
    }, {
      text: "ご要望",
      link: 'https://support.qq.com/products/321980/topic-detail/2016/'
    }]
  }, {
    text: "もっと知る",
    items: [{
      text: "私たちを知る",
      items: [{
        text: "開発に参画",
        link: '/join.md'
      }, {
        text: "チームを知る",
        link: '/team.md'
      }]
    }, {
      text: "アップデートログ",
      items: [{
        text: "Web版",
        link: 'https://support.qq.com/products/321980/blog/505810'
      }, {
        text: "Windows版",
        link: 'https://support.qq.com/products/321980/blog/772498'
      }]
    }, {
      text: "感謝",
      items: [{
        text: "技術提供",
        link: '/credits.md'
      }, {
        text: "貢献者感謝",
        link: '/contribution.md'
      }, {
        text: "寄付感謝",
        link: "/support-us.md#Sponsor%20Acknowledgements"
      }]
    }, {
      text: "法令について",
      items: [{
        text: "免責事項",
        link: '/disclaimer.md'
      }, {
        text: "プライバシーポリシー",
        link: '/privacy.md'
      }, {
        text: "利用規約",
        link: '/agreement.md'
      }]
    }, {
      text: "その他",
      items: [{
        text: "リンク集",
        link: '/friends-links.md'
      }]
    }]
  }];
}

function footer(): CustomConfig['footer'] {
  return {
    qrcodeTitle: "Discordサーバー",
    qrcodeMessage: "Contact us on discord",
    qrcodeLink: "https://discord.gg/aFe57AKZUF",
    navigation: [{
      title: "私たちについて",
      items: [{
        text: "仲間になる",
        link: '/join'
      }, {
        text: "Our team",
        link: "/team"
      }, {
        text: "スポンサー",
        link: "/support-us"
      }]
    }, {
      title: "法令について",
      items: [{
        text: "免責事項",
        link: '/disclaimer'
      }, {
        text: "プライバシーポリシー",
        link: '/privacy'
      }, {
        text: "利用規約",
        link: '/agreement'
      }]
    }, {
      title: "サポート",
      items: [{
        text: "ユーザマニュアル",
        link: 'manual/client-user-manual'
      }, {
        text: "フィードバック",
        link: "https://support.qq.com/products/321980"
      }, {
        text: "新機能",
        link: "https://support.qq.com/products/321980/topic-detail/2016/"
      }]
    }]
  };
}

function sidebar(): DefaultTheme.SidebarItem[] {
  return {
    // @ts-ignore
    '/manual': [{
      text: "目次",
      link: "/manual/client-user-manual"
    }, {
      text: "使い方ガイド",
      collapsed: false,
      items: [{
        text: "【オートトラッキング】",
        items: [{
          text: "機能紹介",
          link: "/manual/guide/auto-tracking/importantnotes"
        }, {
          text: "トラブルシューティング",
          link: "/manual/guide/auto-tracking/troubleshoot"
        }]
      }, {
        text: "【バックグラウンドユーセージ】フレームレート設定",
        link: "/manual/guide/bg/bgfrate"
      }, {
        text: "【一括選択】利用ガイド",
        link: "/manual/guide/batch-selection/instructions"
      }, {
        text: "【キャンバス】ルート計画機能紹介",
        link: "/manual/guide/canvas/guide"
      }, {
        text: '【彩蛋】查看历史版本内容',
        link: "/manual/guide/easter-egg/view"
      }, {
        text: "【表示】/【非表示】マーカー",
        link: "/manual/guide/hide-show-done/hidedoneshowdone"
      }, {
        text: "【オーバーレイモード】",
        items: [{
          text: "利用ガイド",
          link: "/manual/guide/overlay-mode/instructions"
        }, {
          text: "【ウィンドウ全画面】ゲーム起動",
          link: "/manual/guide/overlay-mode/fullscreen-windowed/launching"
        }]
      }, {
        text: "【セーブデータ】データ復元",
        link: "/manual/guide/restore-recover/progress"
      }]
    }, {
      text: "よくある質問",
      collapsed: false,
      items: [{
        text: "ゲームアカウントが凍結される可能性は？",
        link: "/manual/faq/accountsafety/acntban.md"
      }, {
        text: "【自動更新】自動更新されない",
        link: "/manual/faq/autoupdate/updater.md"
      }, {
        text: "【インストールできない】",
        items: [{
          text: "エラーコード 2503",
          link: "/manual/faq/instlerror/code2503.md"
        }, {
          text: "【インストールできない】.dll がないため",
          link: "/manual/faq/instlerror/missingdll.md"
        }]
      }, {
        text: "【アプリ開かない】",
        items: [{
          text: "画面真っ白またはプログレスバーが止まる",
          link: "/manual/faq/launcherror/emptydialog.md"
        }, {
          text: "「データクエリ失敗」「バージョンチェック失敗」",
          link: "/manual/faq/launcherror/versioncheck.md"
        }]
      }, {
        text: "ログイン",
        items: [{
          text: "【ログインできない】ログイン方法",
          link: "/manual/faq/login/accountlogin.md"
        }, {
          text: "【毎回ログインを求められる】",
          link: "/manual/faq/login/clientrepeatedly.md"
        }]
      }]
    }]
  };
}