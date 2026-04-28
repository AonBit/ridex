export default {
  site: {
    exploreCars: "探索車款",
    profile: "個人資料",
    carModelLabel: "車型、品牌或關鍵字",
    carModelPlaceholder: "請輸入想找的車款",
    monthlyPaymentLabel: "每月預算上限",
    monthlyPaymentPlaceholder: "請輸入金額",
    makeYearLabel: "最低年份",
    makeYearPlaceholder: "請輸入最少年份",
    search: "搜尋",
    viewMore: "查看更多",
    getStartedTitle: "4 個步驟快速開始",
    getStartedCta: "立即開始",
    peopleSuffix: "人",
    perMonth: "/ 月",
    rentNow: "立即租車",
    addToFavourite: "加入收藏",
    companyTitle: "公司資訊",
    supportTitle: "支援",
    footerRegionFallbackTitle: "日本熱門據點",
    companyLinks: ["關於我們", "方案價格", "部落格", "聯絡我們"],
    supportLinks: ["幫助中心", "我要提問", "隱私政策", "服務條款"],
    toggleMenuAriaLabel: "切換選單",
    logoAlt: "Ridex 標誌",
    blogFallbackCategory: "公司資訊",
    footerFallbackDescription:
      "在日本搜尋優惠租車方案。Ridex 提供多元車隊，給你彈性又實用的選擇。",
    steps: [
      {
        title: "建立帳號",
        text: "填寫基本資料，快速建立您的帳號。"
      },
      {
        title: "選擇想要的車",
        text: "依需求選擇車型、條件與租期。"
      },
      {
        title: "與客服確認方案",
        text: "確認庫存、價格與租賃條款。"
      },
      {
        title: "完成簽約取車",
        text: "確認內容後完成簽約並安排取車。"
      }
    ]
  },
  admin: {
    title: "後台管理",
    overview: "總覽",
    brand: "品牌",
    theme: "主題",
    homepage: "首頁",
    cars: "車輛",
    blog: "部落格",
    faq: "常見問題",
    navigation: "導覽",
    media: "媒體",
    legal: "法務頁面",
    company: "公司資訊",
    signIn: "登入",
    signOut: "登出",
    invalidCredentials: "帳號或密碼錯誤。",
    signedInAs: "目前登入帳號",
    loginHint: "請使用預設管理員帳號登入設定後台。",
    emailLabel: "電子郵件",
    passwordLabel: "密碼",
    dashboard: {
      title: "設定儀表板",
      subtitle: "以下內容都可依每個部署獨立編輯。",
      reset: "還原 Ridex 預設快照",
      cards: ["車輛", "文章", "FAQ", "媒體", "導覽"]
    },
    brandPage: {
      title: "品牌設定",
      desc: "管理公司識別與聯絡資訊。",
      companyName: "公司名稱",
      tagline: "標語",
      phone: "電話",
      email: "電子郵件",
      whatsapp: "WhatsApp / WeChat",
      businessHours: "營業時間",
      address: "地址",
      footerCopyright: "頁尾版權",
      legalNotice: "法務聲明 / 備案資訊",
      save: "儲存"
    },
    themePage: {
      title: "主題設定",
      desc: "調整 UI 色彩與樣式參數。",
      save: "儲存",
      fields: ["主色", "次色", "強調色", "背景色", "表面色", "文字色", "成功色", "警示色", "錯誤色"],
      borderRadius: "圓角",
      shadowStyle: "卡片陰影",
      fontHeading: "標題字體",
      fontBody: "內文字體"
    },
    contentPage: {
      title: "首頁內容",
      desc: "編輯 Hero 文案、段落標題與 SEO。",
      heroTitle: "Hero 標題",
      heroSubtitle: "Hero 副標",
      heroCtaText: "CTA 文字",
      heroCtaLink: "CTA 連結",
      sectionFeaturedTitle: "車輛區塊標題",
      sectionWhyUsTitle: "步驟區塊標題",
      sectionBlogTitle: "部落格標題",
      sectionFaqTitle: "FAQ 標題",
      showWhyUs: "顯示步驟區塊",
      showTestimonials: "顯示評價區塊",
      showFaq: "顯示 FAQ",
      showBlog: "顯示部落格",
      seoTitle: "SEO 標題",
      seoDescription: "SEO 描述",
      save: "儲存"
    },
    carsPage: {
      title: "車輛管理",
      desc: "新增並列表已發布車輛。",
      name: "名稱",
      brand: "品牌",
      year: "年份",
      seats: "座位",
      fuelType: "燃料",
      transmission: "變速",
      priceLabel: "價格標籤",
      mileageLabel: "里程標籤",
      coverImagePath: "封面路徑",
      sortOrder: "排序",
      featured: "精選",
      published: "已發布",
      add: "新增車輛",
      existing: "現有車輛",
      empty: "尚無車輛。"
    },
    blogPage: {
      title: "部落格管理",
      desc: "選配內容營運模組。",
      postTitle: "標題",
      coverPath: "封面路徑",
      excerpt: "摘要",
      body: "內文",
      published: "已發布",
      create: "建立文章",
      existing: "現有文章",
      empty: "尚無文章。"
    },
    faqPage: {
      title: "FAQ 設定",
      desc: "管理常見問題區塊。",
      question: "問題",
      answer: "回答",
      sortOrder: "排序",
      add: "新增 FAQ",
      list: "FAQ 列表",
      empty: "尚無 FAQ。"
    },
    navigationPage: {
      title: "導覽",
      desc: "目前版本僅展示現有導覽項目。",
      visible: "顯示",
      hidden: "隱藏"
    },
    mediaPage: {
      title: "媒體庫",
      desc: "請透過 /api/upload 上傳並引用回傳路徑。",
      hint: "目前採用本地磁碟儲存並寫入 SQLite 中繼資料。",
      usedBy: "使用於",
      empty: "尚無上傳檔案。",
      bytes: "bytes"
    },
    legalPage: {
      title: "法務內容",
      desc: "可依語言管理法務頁面，借渡約款支援 Markdown。",
      titleSuffix: "標題",
      markdownContent: "Markdown 內容",
      content: "內容",
      preview: "預覽",
      save: "儲存"
    },
    companyPage: {
      title: "公司資訊",
      desc: "管理法務揭露所需的多語公司資訊。",
      saveCompany: "儲存公司資訊",
      footerTitle: "Footer 區域標題",
      footerItems: "Footer 站點列表（每行一項）",
      saveFooter: "儲存 Footer 站點"
    }
  },
  company: {
    fieldCompanyName: "公司名稱",
    fieldRepresentative: "代表人",
    fieldRegistrationNo: "登記號碼",
    fieldPostalCode: "郵遞區號",
    fieldAddress: "地址",
    fieldPhone: "電話",
    fieldEmail: "電子郵件",
    fieldBusinessHours: "營業時間",
    fieldSupportHours: "客服時間"
  },
  legal: {
    tokushoho: "特定商取引法揭示",
    privacy: "個人資訊與隱私政策",
    antiSocialPolicy: "反社會勢力基本方針",
    rentalTerms: "租車借渡約款",
    company: "公司資訊",
    sectionLabel: "法務資訊"
  }
} as const;
