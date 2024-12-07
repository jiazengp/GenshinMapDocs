interface Info {
  title: string
  desc?: string
}

export interface CustomConfig {
  keyword: string
  description: string
  image: string
  footer: {
    qrcodeTitle: string
    qrcodeMessage: string
    qrcodeLink: string
    navigation: {
      title: string
      items: {
        text: string
        link: string
      }[]
    }[]
  }
  staff: {
    title: string
    desc: string
    clientStaff: Info
    webStaff: Info
    pinStaff: Info
    translateStaff: Info
    communityStaff: Info
  }
  team: {
    title: string
    desc: string
    coreMember: Info
    emeritiMember: Info
    partnerMember: Info
  }
  asideLinks: {
    title: string
    starOnGitHub: string
    contactUsText: string
    contactUsLink: string
    sponsor: string
    editLink: string
    translateThisPage: string
  }
  payment?: Record<
    string,
    {
      name: string
      address: string
    }
  >
  ui: {
    title: {
      templateMappings: {
        test: RegExp
        template: string
      }[]
    }
    banner: {
      wip: string
    }
    button: {
      submit: string
      cancel: string
      loading: string
    }
  }
  docsFeedback: {
    feedbackMsg: string
    good: string
    bad: string
    badFeedbackSuccessMsg: string
    feedbackFailMsg: string
    feedbackSuccessMsg: string
    form: {
      chooseIssues: string
      translationIssue: string
      typosIssue: string
      contentImgLinkIssue: string
      feedbackDetail: string
      feedbackTip: string
      otherIssue: string
      contactWay: string
      issueOptions: {
        label: string
        value: string
      }[]
    }
  }
  forum: {
    loadMore: string
    noMore: string
    loadError: string
    user: {
      myFeedback: {
        title: string
      }
    }
    topic: {
      official: string
      author: string
      state: {
        open: string
        closed: string
        rejected: string
        progressing: string
      }
      type: {
        suggest: string
        bug: string
        feat: string
        ann?: string
      }
      menu: {
        giteeLink: string
        hideFeedback: {
          text: string
          success: string
          fail: string
        }
        deleteComment: {
          text: string
          success: string
          fail: string
        }
        closeFeedback: {
          text: string
          success: string
          fail: string
        }
      }
    }
    auth: {
      login: string
      logout: string
      loginMsg: string
      logoutMsg: string
      loginTips: string
      jumpToGiteeTips: string
      loginSuccess: string
      loginFail: string
      loginAlert: string
      loginAlertMsg: string
    }
    aside: {
      contactUs: {
        title: string
        desc: string
        qrcodeLink: string
      }
      teamBlog: {
        title: string
        items: {
          cover?: string
          title: string
          link: string
        }[]
      }
      suggest: {
        title: string
        items: {
          title: string
          tag: string
          link: string
        }[]
      }
      info: {
        text: string
        link: string
      }[]
    }
    comment: {
      comment: string
      commentSuccess: string
      commentFail: string
      commentAfterLogin: string
      commentCount: string
      placeholder: string
      noMoreComment: string
      loadMoreComment: string
      noComment: string
      loadingComment: string
      reply: string
    }
    header: {
      sort: {
        created: string
        updated: string
        notesCount: string
      }
      search: {
        placeholder: string
        allRelatedContentCount: string
      }
      navigation: {
        allFeedback: string
        bugFeedback: string
        featFeedback: string
        faq: {
          title: string
          items: {
            text: string
            desc: string
            link: string
          }[]
        }
      }
    }
    publish: {
      title: string
      publishSuccess: string
      publishFail: string
      publishLoading: string
      type: {
        sug: string
        bug: string
        feat: string
        ann?: string
      }
      tagsInput: {
        searchTags: string
        maxTagsLimit: string
        noResultsFound: string
      }
      form: {
        title: {
          text: string
          placeholder: string
        }
        type: {
          text: string
          placeholder: string
        }
        content: {
          text: string
          placeholder: string
        }
      }
      tips: string[]
    }
  }
}

export interface CustomConstant {
  META_URL: string
  META_TITLE: string
  META_KEYWORDS: string
  META_DESCRIPTION: string
  META_IMAGE: string
  LOCAL_CODE: string
  LOCAL_BASE: string
}
