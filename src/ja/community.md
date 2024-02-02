---
title: 加入社区
description: 加入社区
layout: doc
titleTemplate: 空荧酒馆
---

# 加入社区

## Discord Server

<LinkGrid :items="server" />

## QQ 交流群

1. [**原神地图 12 群(推荐)** 657416377](https://qm.qq.com/cgi-bin/qm/qr?k=ywsBJa1bgrLxgRWn7EfS6Kjve_74UaY5&jump_from=webapi "点击一键加入原神地图12群")
2. [**原神地图 13 群(推荐)** 670338986](https://qm.qq.com/cgi-bin/qm/qr?k=SSV94vBcOvHNfZl0joiHXz0RKEilCAKb&jump_from=webapi "点击一键加入原神地图13群")
3. [**原神地图 ⑨ 群(推荐)** 902221505](https://qm.qq.com/cgi-bin/qm/qr?k=uwMrGyjdb8BXBe3g0PjFkjv_W0Y6VmSA&jump_from=webapi "点击一键加入原神地图⑨群")
4. [**原神地图 10 群(推荐)** 781455797](https://qm.qq.com/cgi-bin/qm/qr?k=m79I_BhZswOY5DmpBN0gpqoRFhgNRehf&jump_from=webapi "点击一键加入原神地图10群") :::details 全部群聊（各群密码均为：123456）

1. **原神地图 ① 群(被封禁)** 765302904
1. 点击一键加入原神地图②群
1. 点击一键加入原神地图③群
1. 点击一键加入原神地图④群
1. **原神地图 ⑤ 群(被封禁)** 1012554070
1. 点击一键加入原神地图⑥群
1. [**原神地图 ⑦ 群** 726524364](https://qm.qq.com/cgi-bin/qm/qr?k=sDQXH18A-nbJT7y6PRM1GYM80qsvtWp7&jump_from=webapi "点击一键加入原神地图⑦群"){slide-enter}
1. **原神地图 ⑧ 群** 1012554070
1. [**原神地图 ⑨ 群** 902221505](https://qm.qq.com/cgi-bin/qm/qr?k=uwMrGyjdb8BXBe3g0PjFkjv_W0Y6VmSA&jump_from=webapi "点击一键加入原神地图⑨群")
1. **原神地图 10 群(推荐)** 781455797
1. [**原神地图 11 群(推荐)** 675165437](https://qm.qq.com/cgi-bin/qm/qr?k=vtEdBtKfhnwHpPVr1wTtiS6b_axepPmW&jump_from=webapi "点击一键加入原神地图11群")
1. [**原神地图 12 群(推荐)** 657416377](https://qm.qq.com/cgi-bin/qm/qr?k=ywsBJa1bgrLxgRWn7EfS6Kjve_74UaY5&jump_from=webapi "点击一键加入原神地图12群")
1. [**原神地图 13 群(推荐)** 670338986](https://qm.qq.com/cgi-bin/qm/qr?k=SSV94vBcOvHNfZl0joiHXz0RKEilCAKb&jump_from=webapi "点击一键加入原神地图13群")
1. [**原神地图 ④ 群(已满)** 1139510554](https://qm.qq.com/cgi-bin/qm/qr?k=g-By7txM78GfoPhk29d59Z5KkJV_Gt-z&jump_from=webapi "点击一键加入原神地图14群")
1. [**原神地图 15 群** 668424173](https://qm.qq.com/cgi-bin/qm/qr?k=qDLY3l2-A_zf2AW73X5S5PHuHcjicVbf&jump_from=webapi "点击一键加入原神地图15群")

---

:::tip
推荐加入人数较少的群。 请勿重复加群，由于群人数均衡原因，若重复加群将踢出「群人数较多的群」！
:::

请勿重复加群，由于群人数均衡原因，若<span style="color: red;">重复加群将踢出「群人数较多的群」！</span>
:::

:::details 空荧酒馆 • QQ 社群公约（加入即代表你已同意接受该公约）

- 点击一键加入原神地图交流①群
- 禁止发布血腥暴力、惊悚、色 情（含擦边）以及引起多数成员严重反感的任何内容。
- 严禁键政、讨论敏感话题（包括暗示等形式）
- 禁止任何影响正常群聊风气的行为，包括但不限于辱骂引战、人身攻击、恶意挂人、发表传播负面言论等。玩梗请适度。
- 请勿传播未经证实的信息，转发信息前请验明真实性。不传谣不信谣。一切以官方信息为准。
- 请勿谈论个人隐私信息。保护个人信息财产安全，个人账号安全。
- 禁止发送各种广告、二维码、不相关链接（包括但不限于代肝、游戏推广、拼单刷单、私服外挂等）
- 请勿恶意刷屏（1分钟内「相同内容」或「图片」超过3次则视为刷屏）
- 请勿发起或发送：群通话、小额群红包（低于0.5/10人）、语音/口令红包、群投票等对群员影响大的功能。
- 若违反群规，会视情况与次数，给予：警告禁言10分钟/禁言1小时/禁言12小时/踢出群聊等处理。

:::

<script setup>
import { useUrlSearchParams } from '@vueuse/core'
import { onMounted } from 'vue'
import { isNumber } from '../.vitepress/theme/utils'

const params = useUrlSearchParams('history')
const server = [
  { id: 'discord', name: 'Discord', target: '_blank', link: 'https://discord.com/invite/aFe57AKZUF', secondary: 'aFe57AKZUF', icon: 'i-logos-discord-icon' },
  {
    id: 'mys', name: '米游社', target: '_blank', secondary: 'VBFqyWV', link: 'https://webstatic.miyoushe.com/app/community-villa/toVilla.html?villa_id=3898&mhy_presentation_style=fullscreen', icon: '/imgs/mihoyo-a4504610.png'
  },
  {
    id: 'qq', name: 'QQ 频道', target: '_blank',
    secondary: 'f006fek0f', link: 'https://pd.qq.com/s/f006fek0f', icon: '/svg/qq-channel.svg'
  },
]

function jump() {
  if (Number(params.q) <= document.querySelectorAll('#VPContent > div > div > div.content > div > main > div > div > details:nth-child(6) > ol > li').length) {
    let link = document.querySelector(`#VPContent > div > div > div.content > div > main > div > div > details:nth-child(6) > ol > li:nth-child(${Number(params.q)
}) > a`).href
    if (link.includes(location.host)) return;
    location.href = link
  } else {
    const target = String(params.q).toLocaleLowerCase()

    server.forEach((val) => {
      if (val.id === target) {
        location.href = val.link
      }
    })
  }
}

onMounted(()=> {
  jump()
})
</script>

<style lang="scss" scoped>
ol::-webkit-scrollbar {
background: transparent;
height: 8px;
width: 8px;
}
ol::-webkit-scrollbar-corner {
width: 0;
}
ol::-webkit-scrollbar-thumb {
background-clip: content-box;
background-color: var(--vp-button-alt-bg);
border: 2px solid transparent;
border-radius: 4px;
}
ol::-webkit-scrollbar-track {
background-color: var(--vp-c-bg);
}

  ol {
    display: inherit;
    padding: 0;
    /* max-height: 475px; */
    display: flex;
    flex-direction: column;
    /* overflow-y: scroll; */
    
    li {
      cursor: pointer;
      display: inline-block;
      margin: 10px 0;
      width: 98%;
      font-size: 16px;
      border: 1.5px solid var(--vp-c-divider);
      border-radius: 5px;
      transition: all .3s;
      text-align: right;
      a {
        display: inline-block;
        position: relative;
        width: 100%;
        height: 100%;
        opacity: .8;
        padding: 10px 16px;
        box-sizing: border-box;
        transition: all .3s;
        text-decoration:none !important;
        strong {
          position: absolute;
          left: 25px;
        }
        &:hover{
          opacity: 1;
        }
      }
      &:hover{
        transform: translate3d(0, -2px, 0);
        box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
      }
    }
  }

// 被封禁的群
.custom-block.details {
  color: var(--vp-c-brand);
  ol > li:nth-child(1) > a strong,  ol > li:nth-child(5) > a strong {
    text-decoration: line-through !important;
    opacity: .7;
  }
}
</style>
