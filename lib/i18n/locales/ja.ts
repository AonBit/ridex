export default {
  site: {
    exploreCars: "車両を見る",
    profile: "プロフィール",
    carModelLabel: "車名・モデル・ブランド",
    carModelPlaceholder: "探している車を入力してください",
    monthlyPaymentLabel: "月額予算",
    monthlyPaymentPlaceholder: "金額を入力（¥）",
    makeYearLabel: "年式",
    makeYearPlaceholder: "最小年式を入力",
    search: "検索",
    viewMore: "もっと見る",
    getStartedTitle: "4つのステップで開始",
    getStartedCta: "開始する",
    peopleSuffix: "人",
    perDay: "/ 日",
    rentNow: "今すぐ予約",
    addToFavourite: "お気に入りに追加",
    companyTitle: "会社情報",
    supportTitle: "サポート",
    footerRegionFallbackTitle: "日本の主要エリア",
    companyLinks: ["会社概要", "料金プラン", "ブログ", "お問い合わせ"],
    supportLinks: ["ヘルプセンター", "質問する", "プライバシー規約", "利用規約"],
    toggleMenuAriaLabel: "メニュー切替",
    logoAlt: "Ridex ロゴ",
    blogFallbackCategory: "会社情報",
    footerFallbackDescription:
      "日本でお得なレンタカーを検索。多様な車種ラインナップで、柔軟な選択肢をご提供します。",
    steps: [
      {
        title: "プロフィールを作成",
        text: "必要情報を入力してアカウントを作成します。"
      },
      {
        title: "希望の車種を選択",
        text: "利用目的に合う車種・条件を選びます。"
      },
      {
        title: "担当者と条件確認",
        text: "在庫・料金・利用条件を確認します。"
      },
      {
        title: "契約して出発",
        text: "内容確認後に契約し、受け取りへ進みます。"
      }
    ]
  },
  admin: {
    title: "管理画面",
    overview: "概要",
    brand: "ブランド",
    theme: "テーマ",
    homepage: "ホームページ",
    cars: "車両",
    blog: "ブログ",
    faq: "FAQ",
    navigation: "ナビゲーション",
    media: "メディア",
    legal: "法務ページ",
    company: "会社情報",
    siteInfo: "サイト情報",
    signIn: "ログイン",
    signOut: "ログアウト",
    invalidCredentials: "メールアドレスまたはパスワードが正しくありません。",
    signedInAs: "ログイン中",
    loginHint: "初期管理者アカウントで設定画面にログインしてください。",
    emailLabel: "メールアドレス",
    passwordLabel: "パスワード",
    dashboard: {
      title: "設定ダッシュボード",
      subtitle: "以下の内容はデプロイ先ごとに編集できます。",
      reset: "Ridex 初期スナップショットを復元",
      cards: ["車両", "ブログ記事", "FAQ", "メディア", "ナビゲーション"]
    },
    brandPage: {
      title: "ブランド設定",
      desc: "会社情報と連絡先を管理します。",
      companyName: "会社名",
      tagline: "タグライン",
      phone: "電話",
      email: "メール",
      whatsapp: "WhatsApp / WeChat",
      businessHours: "営業時間",
      address: "住所",
      footerCopyright: "フッター著作権",
      legalNotice: "法務表記",
      save: "保存"
    },
    themePage: {
      title: "テーマ設定",
      desc: "UI カラーとスタイルトークンを調整します。",
      save: "保存",
      fields: ["メインカラー", "セカンダリカラー", "アクセントカラー", "背景色", "サーフェス色", "文字色", "成功色", "警告色", "エラー色"],
      borderRadius: "角丸",
      shadowStyle: "カード影",
      fontHeading: "見出しフォント",
      fontBody: "本文フォント"
    },
    contentPage: {
      title: "ホームページ内容",
      desc: "ヒーロー文言・見出し・SEO を編集。",
      heroTitle: "ヒーロータイトル",
      heroSubtitle: "ヒーローサブタイトル",
      heroCtaText: "CTA テキスト",
      heroCtaLink: "CTA リンク",
      sectionFeaturedTitle: "車両セクション見出し",
      sectionWhyUsTitle: "ステップ見出し",
      sectionBlogTitle: "ブログ見出し",
      sectionFaqTitle: "FAQ 見出し",
      showWhyUs: "ステップ表示",
      showTestimonials: "レビュー表示",
      showFaq: "FAQ 表示",
      showBlog: "ブログ表示",
      seoTitle: "SEO タイトル",
      seoDescription: "SEO 説明",
      save: "保存"
    },
    carsPage: {
      title: "車両管理",
      desc: "公開車両を追加・一覧表示します。",
      name: "名称",
      brand: "ブランド",
      year: "年式",
      seats: "定員",
      fuelType: "燃料",
      transmission: "変速",
      priceLabel: "価格表示",
      mileageLabel: "燃費表示",
      coverImagePath: "画像パス",
      sortOrder: "表示順",
      featured: "注目",
      published: "公開",
      add: "車両を追加",
      existing: "既存車両",
      empty: "車両がありません。",
      save: "保存"
    },
    blogPage: {
      title: "ブログ管理",
      desc: "任意コンテンツ運用モジュール。",
      postTitle: "タイトル",
      coverPath: "画像パス",
      excerpt: "概要",
      body: "本文",
      published: "公開",
      create: "記事を作成",
      existing: "既存記事",
      empty: "記事がありません。"
    },
    faqPage: {
      title: "FAQ 設定",
      desc: "よくある質問ブロックを管理します。",
      question: "質問",
      answer: "回答",
      sortOrder: "並び順",
      add: "FAQ を追加",
      list: "FAQ 一覧",
      empty: "FAQ がありません。"
    },
    navigationPage: {
      title: "ナビゲーション",
      desc: "現行のナビ項目を表示します。",
      visible: "表示",
      hidden: "非表示"
    },
    mediaPage: {
      title: "メディアライブラリ",
      desc: "API /api/upload でアップロード後、返却パスを参照してください。",
      hint: "現在はローカルディスク保存 + SQLite メタデータ方式です。",
      usedBy: "使用先",
      empty: "アップロードされたファイルはありません。",
      bytes: "bytes"
    },
    legalPage: {
      title: "法務コンテンツ",
      desc: "法務ページを管理します。貸渡約款は Markdown 対応です。",
      titleSuffix: "タイトル",
      markdownContent: "Markdown 内容",
      content: "内容",
      preview: "プレビュー",
      save: "保存"
    },
    companyPage: {
      title: "会社情報",
      desc: "法務開示に必要な会社情報を管理します。",
      siteInfoDesc: "站点信息（支持三语言）",
      saveCompany: "会社情報を保存",
      footerTitle: "Footer エリア見出し",
      footerItems: "Footer 拠点一覧（1行1件）",
      saveFooter: "Footer 拠点を保存"
    }
  },
  company: {
    fieldCompanyName: "会社名",
    fieldRepresentative: "代表者",
    fieldRegistrationNo: "登録番号",
    fieldPostalCode: "郵便番号",
    fieldAddress: "所在地",
    fieldPhone: "電話番号",
    fieldEmail: "メール",
    fieldBusinessHours: "営業時間",
    fieldSupportHours: "サポート対応時間"
  },
  legal: {
    tokushoho: "特定商取引法に基づく表記",
    privacy: "個人情報とプライバシー規約",
    antiSocialPolicy: "反社会的勢力に対する基本方針",
    rentalTerms: "レンタカー貸渡約款",
    company: "会社情報",
    siteInfo: "站点信息",
    sectionLabel: "法務情報"
  }
} as const;
