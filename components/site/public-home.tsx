import Link from "next/link";
import type { AwaitedReturn } from "@/types/shared";
import { getPublicData } from "@/lib/data";
import { SiteBehavior } from "@/components/site/site-behavior";
import { getMessages } from "@/lib/i18n";

type PublicData = AwaitedReturn<typeof getPublicData>;

const footerNeighborhoods = [
  "Tokyo",
  "Shinjuku",
  "Shibuya",
  "Ginza",
  "Ueno",
  "Yokohama",
  "Osaka",
  "Kyoto"
];

export function PublicHome({ data, locale }: { data: PublicData; locale: string }) {
  const { site, page, navItems, cars, localizedTexts } = data;
  const messages = getMessages(data.locale);
  const companyName = site?.companyName?.trim() || "Ridex";
  const visibleNavItems = navItems.filter((item) => item.href !== "#blog");
  const getStartSteps = [
    { iconClass: "icon-1", icon: "person-add-outline", ...messages.site.steps[0], hasLink: true },
    { iconClass: "icon-2", icon: "car-outline", ...messages.site.steps[1], hasLink: false },
    { iconClass: "icon-3", icon: "person-outline", ...messages.site.steps[2], hasLink: false },
    { iconClass: "icon-4", icon: "card-outline", ...messages.site.steps[3], hasLink: false }
  ];
  const localizedMap = new Map<string, string>(
    localizedTexts.map((entry: { key: string; value: string }) => [entry.key, entry.value])
  );
  const footerRegionTitle = localizedMap.get("footer.region.title") || messages.site.footerRegionFallbackTitle;
  const footerRegionItems: string[] = (localizedMap.get("footer.region.items") || footerNeighborhoods.join("\n"))
    .split("\n")
    .map((item: string) => item.trim())
    .filter(Boolean);

  return (
    <>
      <SiteBehavior />

      <header className="header" data-header>
        <div className="container">
          <div className="overlay" data-overlay></div>

          <Link href="#" className="logo">
            <span className="text-3xl font-extrabold tracking-wide text-[var(--space-cadet)] md:text-4xl">{companyName}</span>
          </Link>

          <nav className="navbar" data-navbar>
            <ul className="navbar-list">
              {visibleNavItems.map((item) => (
                <li key={item.id}>
                  <Link href={item.href.startsWith("#") ? `/${locale}${item.href}` : item.href} className="navbar-link" data-nav-link>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-actions">
            <div className="header-contact">
              <a href={`tel:${(site?.contactPhone || "").replace(/\s+/g, "")}`} className="contact-link">
                {site?.contactPhone}
              </a>
              <span className="contact-time">{site?.businessHours}</span>
            </div>

            <Link href="#featured-car" className="btn" aria-labelledby="aria-label-txt">
              <ion-icon name="car-outline"></ion-icon>
              <span id="aria-label-txt">{messages.site.exploreCars}</span>
            </Link>

            <a href="#" className="btn user-btn" aria-label={messages.site.profile}>
              <ion-icon name="person-outline"></ion-icon>
            </a>

            <button className="nav-toggle-btn" data-nav-toggle-btn aria-label={messages.site.toggleMenuAriaLabel}>
              <span className="one"></span>
              <span className="two"></span>
              <span className="three"></span>
            </button>
          </div>
        </div>
      </header>

      <main>
        <article>
          <section className="section hero" id="home">
            <div className="container">
              <div className="hero-content">
                <h2 className="h1 hero-title">{page?.heroTitle}</h2>
                <p className="hero-text">{page?.heroSubtitle}</p>
              </div>

              <div className="hero-banner"></div>

              <form action="" className="hero-form">
                <div className="input-wrapper">
                  <label htmlFor="input-1" className="input-label">
                    {messages.site.carModelLabel}
                  </label>
                  <input type="text" name="car-model" id="input-1" className="input-field" placeholder={messages.site.carModelPlaceholder} />
                </div>

                <div className="input-wrapper">
                  <label htmlFor="input-2" className="input-label">
                    {messages.site.monthlyPaymentLabel}
                  </label>
                  <input type="text" name="monthly-pay" id="input-2" className="input-field" placeholder={messages.site.monthlyPaymentPlaceholder} />
                </div>

                <div className="input-wrapper">
                  <label htmlFor="input-3" className="input-label">
                    {messages.site.makeYearLabel}
                  </label>
                  <input type="text" name="year" id="input-3" className="input-field" placeholder={messages.site.makeYearPlaceholder} />
                </div>

                <button type="submit" className="btn">
                  {messages.site.search}
                </button>
              </form>
            </div>
          </section>

          <section className="section featured-car" id="featured-car">
            <div className="container">
              <div className="title-wrapper">
                <h2 className="h2 section-title">{page?.sectionFeaturedTitle}</h2>

                <a href="#" className="featured-car-link">
                  <span>{messages.site.viewMore}</span>
                  <ion-icon name="arrow-forward-outline"></ion-icon>
                </a>
              </div>

              <ul className="featured-car-list">
                {cars.map((car) => (
                  <li key={car.id}>
                    <div className="featured-car-card">
                      <figure className="card-banner">
                        <img src={car.coverImagePath} alt={`${car.name} ${car.year}`} loading="lazy" width="440" height="300" className="w-100" />
                      </figure>

                      <div className="card-content">
                        <div className="card-title-wrapper">
                          <h3 className="h3 card-title">
                            <a href="#">{car.name}</a>
                          </h3>

                          <data className="year" value={car.year}>
                            {car.year}
                          </data>
                        </div>

                        <ul className="card-list">
                          <li className="card-list-item">
                            <ion-icon name="people-outline"></ion-icon>
                            <span className="card-item-text">
                              {car.seats} {messages.site.peopleSuffix}
                            </span>
                          </li>
                          <li className="card-list-item">
                            <ion-icon name="flash-outline"></ion-icon>
                            <span className="card-item-text">{car.fuelType}</span>
                          </li>
                          <li className="card-list-item">
                            <ion-icon name="speedometer-outline"></ion-icon>
                            <span className="card-item-text">{car.mileageLabel}</span>
                          </li>
                          <li className="card-list-item">
                            <ion-icon name="hardware-chip-outline"></ion-icon>
                            <span className="card-item-text">{car.transmission}</span>
                          </li>
                        </ul>

                        <div className="card-price-wrapper">
                          <p className="card-price">
                            <strong>{car.priceLabel.replace(/\/.*/, "")}</strong> {messages.site.perDay}
                          </p>

                          <button className="btn fav-btn" aria-label={messages.site.addToFavourite} type="button">
                            <ion-icon name="heart-outline"></ion-icon>
                          </button>

                          <button className="btn" type="button">
                            {messages.site.rentNow}
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="section get-start">
            <div className="container">
              <h2 className="h2 section-title">{messages.site.getStartedTitle}</h2>

              <ul className="get-start-list">
                {getStartSteps.map((step) => (
                  <li key={step.title}>
                    <div className="get-start-card">
                      <div className={`card-icon ${step.iconClass}`}>
                        <ion-icon name={step.icon}></ion-icon>
                      </div>

                      <h3 className="card-title">{step.title}</h3>

                      <p className="card-text">{step.text}</p>

                      {step.hasLink ? (
                        <a href="#" className="card-link">
                          {messages.site.getStartedCta}
                        </a>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Blog section entry hidden by product requirement */}
        </article>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <a href="#" className="logo">
                <span className="text-3xl font-extrabold tracking-wide text-[var(--space-cadet)] md:text-4xl">{companyName}</span>
              </a>

              <p className="footer-text">
                {site?.legalNotice || messages.site.footerFallbackDescription}
              </p>
            </div>

            <ul className="footer-list">
              <li>
                <p className="footer-list-title">{messages.site.companyTitle}</p>
              </li>
              {messages.site.companyLinks.map((item) => (
                <li key={item}>
                  <a href="#" className="footer-link">
                    {item}
                  </a>
                </li>
              ))}
              <li>
                <Link href={`/${locale}/legal/tokushoho`} className="footer-link">
                  {messages.legal.tokushoho}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/company`} className="footer-link">
                  {messages.legal.company}
                </Link>
              </li>
            </ul>

            <ul className="footer-list">
              <li>
                <p className="footer-list-title">{messages.site.supportTitle}</p>
              </li>
              {messages.site.supportLinks.map((item) => (
                <li key={item}>
                  <a href="#" className="footer-link">
                    {item}
                  </a>
                </li>
              ))}
              <li>
                <Link href={`/${locale}/legal/privacy`} className="footer-link">
                  {messages.legal.privacy}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/legal/anti-social-policy`} className="footer-link">
                  {messages.legal.antiSocialPolicy}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/legal/rental-terms`} className="footer-link">
                  {messages.legal.rentalTerms}
                </Link>
              </li>
            </ul>

            <ul className="footer-list">
              <li>
                <p className="footer-list-title">{footerRegionTitle}</p>
              </li>
              {footerRegionItems.map((item) => (
                <li key={item}>
                  <a href="#" className="footer-link">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-bottom">
            <ul className="social-list">
              {[
                "logo-facebook",
                "logo-instagram",
                "logo-twitter",
                "logo-linkedin",
                "logo-skype",
                "mail-outline"
              ].map((social) => (
                <li key={social}>
                  <a href="#" className="social-link">
                    <ion-icon name={social}></ion-icon>
                  </a>
                </li>
              ))}
            </ul>

            <p className="copyright">{site?.footerCopyright}</p>
          </div>
        </div>
      </footer>
    </>
  );
}
