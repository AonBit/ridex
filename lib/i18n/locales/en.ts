export default {
  site: {
    exploreCars: "Explore cars",
    profile: "Profile",
    carModelLabel: "Car, model, or brand",
    carModelPlaceholder: "What car are you looking for?",
    monthlyPaymentLabel: "Max. monthly payment",
    monthlyPaymentPlaceholder: "Add an amount in $",
    makeYearLabel: "Make year",
    makeYearPlaceholder: "Add a minimal make year",
    search: "Search",
    viewMore: "View more",
    getStartedTitle: "Get started with 4 simple steps",
    getStartedCta: "Get started",
    peopleSuffix: "People",
    perDay: "/ day",
    rentNow: "Rent now",
    addToFavourite: "Add to favourite list",
    companyTitle: "Company",
    supportTitle: "Support",
    footerRegionFallbackTitle: "Neighborhoods in Japan",
    companyLinks: ["About us", "Pricing plans", "Our blog", "Contacts"],
    supportLinks: ["Help center", "Ask a question", "Privacy policy", "Terms & conditions"],
    toggleMenuAriaLabel: "Toggle menu",
    logoAlt: "Ridex logo",
    blogFallbackCategory: "Company",
    footerFallbackDescription:
      "Search for cheap rental cars in Japan. With a diverse fleet, Ridex offers an attractive and flexible selection.",
    steps: [
      {
        title: "Create a profile",
        text: "Fill in essential information to set up your account."
      },
      {
        title: "Tell us what car you want",
        text: "Choose the type of vehicle and rental conditions you need."
      },
      {
        title: "Match with seller",
        text: "Confirm availability, pricing, and rental terms."
      },
      {
        title: "Make a deal",
        text: "Finalize the contract and pick up your car."
      }
    ]
  },
  admin: {
    title: "Admin",
    overview: "Overview",
    brand: "Brand",
    theme: "Theme",
    homepage: "Homepage",
    cars: "Cars",
    blog: "Blog",
    faq: "FAQ",
    navigation: "Navigation",
    media: "Media",
    legal: "Legal",
    company: "Company Info",
    siteInfo: "Site Info",
    signIn: "Sign in",
    signOut: "Sign out",
    invalidCredentials: "Invalid email or password.",
    signedInAs: "Signed in as",
    loginHint: "Use seeded owner credentials to access settings.",
    emailLabel: "Email",
    passwordLabel: "Password",
    dashboard: {
      title: "Configuration Dashboard",
      subtitle: "Everything below is editable for each deployment.",
      reset: "Restore Ridex default snapshot",
      cards: ["Cars", "Blog Posts", "FAQ Items", "Media Assets", "Navigation"]
    },
    brandPage: {
      title: "Brand Settings",
      desc: "Manage company identity and contact details.",
      companyName: "Company name",
      tagline: "Tagline",
      phone: "Phone",
      email: "Email",
      whatsapp: "WhatsApp / WeChat",
      businessHours: "Business hours",
      address: "Address",
      footerCopyright: "Footer copyright",
      legalNotice: "Legal notice / filing info",
      save: "Save"
    },
    themePage: {
      title: "Theme Settings",
      desc: "Adjust UI colors and style tokens.",
      save: "Save",
      fields: ["Primary color", "Secondary color", "Accent color", "Background color", "Surface color", "Text color", "Success color", "Warning color", "Error color"],
      borderRadius: "Border radius",
      shadowStyle: "Card shadow",
      fontHeading: "Heading font",
      fontBody: "Body font"
    },
    contentPage: {
      title: "Homepage Content",
      desc: "Edit hero copy, section headings, toggles, and SEO.",
      heroTitle: "Hero title",
      heroSubtitle: "Hero subtitle",
      heroCtaText: "Hero CTA text",
      heroCtaLink: "Hero CTA link",
      sectionFeaturedTitle: "Featured section title",
      sectionWhyUsTitle: "Why us section title",
      sectionBlogTitle: "Blog section title",
      sectionFaqTitle: "FAQ section title",
      showWhyUs: "Show Why us section",
      showTestimonials: "Show testimonials section",
      showFaq: "Show FAQ section",
      showBlog: "Show blog section",
      seoTitle: "SEO title",
      seoDescription: "SEO description",
      save: "Save"
    },
    carsPage: {
      title: "Fleet Cars",
      desc: "Add and list published vehicles.",
      name: "Name",
      brand: "Brand",
      year: "Year",
      seats: "Seats",
      fuelType: "Fuel type",
      transmission: "Transmission",
      priceLabel: "Price label",
      mileageLabel: "Mileage label",
      coverImagePath: "Cover image path",
      sortOrder: "Sort order",
      featured: "Featured",
      published: "Published",
      add: "Add car",
      existing: "Existing Cars",
      empty: "No cars yet.",
      save: "Save"
    },
    blogPage: {
      title: "Blog Management",
      desc: "Optional content operation module.",
      postTitle: "Title",
      coverPath: "Cover image path",
      excerpt: "Excerpt",
      body: "Body",
      published: "Published",
      create: "Create post",
      existing: "Existing Posts",
      empty: "No blog posts yet."
    },
    faqPage: {
      title: "FAQ Configuration",
      desc: "Manage frequently asked questions block.",
      question: "Question",
      answer: "Answer",
      sortOrder: "Sort order",
      add: "Add FAQ",
      list: "FAQ Items",
      empty: "No FAQ items yet."
    },
    navigationPage: {
      title: "Navigation",
      desc: "This MVP exposes current nav items.",
      visible: "Visible",
      hidden: "Hidden"
    },
    mediaPage: {
      title: "Media Library",
      desc: "Upload files via /api/upload and reference returned path.",
      hint: "Current implementation stores files on local disk and writes metadata to SQLite.",
      usedBy: "Used by",
      empty: "No uploaded files yet.",
      bytes: "bytes"
    },
    legalPage: {
      title: "Legal Content",
      desc: "Manage legal pages. Rental terms supports markdown.",
      titleSuffix: "Title",
      markdownContent: "Markdown Content",
      content: "Content",
      preview: "Preview",
      save: "Save"
    },
    companyPage: {
      title: "Company Information",
      desc: "Company details for legal disclosure.",
      siteInfoDesc: "Site information (supports 3 languages).",
      saveCompany: "Save Company Info",
      footerTitle: "Footer Region Title",
      footerItems: "Footer Region Items (one line per item)",
      saveFooter: "Save Footer Region"
    }
  },
  company: {
    fieldCompanyName: "Company Name",
    fieldRepresentative: "Representative",
    fieldRegistrationNo: "Registration Number",
    fieldPostalCode: "Postal Code",
    fieldAddress: "Address",
    fieldPhone: "Phone",
    fieldEmail: "Email",
    fieldBusinessHours: "Business Hours",
    fieldSupportHours: "Support Hours"
  },
  legal: {
    tokushoho: "Disclosure under the Act on Specified Commercial Transactions",
    privacy: "Privacy Policy",
    antiSocialPolicy: "Basic Policy Against Anti-Social Forces",
    rentalTerms: "Rental Terms and Conditions",
    company: "Company Information",
    sectionLabel: "Legal Information"
  }
} as const;
