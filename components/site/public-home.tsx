import Link from "next/link";
import type { AwaitedReturn } from "@/types/shared";
import { getPublicData } from "@/lib/data";
import { SiteBehavior } from "@/components/site/site-behavior";

type PublicData = AwaitedReturn<typeof getPublicData>;

const getStartSteps = [
  {
    iconClass: "icon-1",
    icon: "person-add-outline",
    title: "Create a profile",
    text: "If you are going to use a passage of Lorem Ipsum, you need to be sure.",
    hasLink: true
  },
  {
    iconClass: "icon-2",
    icon: "car-outline",
    title: "Tell us what car you want",
    text: "Various versions have evolved over the years, sometimes by accident, sometimes on purpose",
    hasLink: false
  },
  {
    iconClass: "icon-3",
    icon: "person-outline",
    title: "Match with seller",
    text: "It to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
    hasLink: false
  },
  {
    iconClass: "icon-4",
    icon: "card-outline",
    title: "Make a deal",
    text: "There are many variations of passages of Lorem available, but the majority have suffered alteration",
    hasLink: false
  }
];

const footerCompany = ["About us", "Pricing plans", "Our blog", "Contacts"];
const footerSupport = ["Help center", "Ask a question", "Privacy policy", "Terms & conditions"];
const footerNeighborhoods = [
  "Manhattan",
  "Central New York City",
  "Upper East Side",
  "Queens",
  "Theater District",
  "Midtown",
  "SoHo",
  "Chelsea"
];

export function PublicHome({ data }: { data: PublicData }) {
  const { site, page, navItems, cars, blogPosts } = data;

  return (
    <>
      <SiteBehavior />

      <header className="header" data-header>
        <div className="container">
          <div className="overlay" data-overlay></div>

          <Link href="#" className="logo">
            <img src={site?.logoPath || "/assets/images/logo.svg"} alt="Ridex logo" />
          </Link>

          <nav className="navbar" data-navbar>
            <ul className="navbar-list">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link href={item.href} className="navbar-link" data-nav-link>
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
              <span id="aria-label-txt">Explore cars</span>
            </Link>

            <a href="#" className="btn user-btn" aria-label="Profile">
              <ion-icon name="person-outline"></ion-icon>
            </a>

            <button className="nav-toggle-btn" data-nav-toggle-btn aria-label="Toggle Menu">
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
                    Car, model, or brand
                  </label>
                  <input type="text" name="car-model" id="input-1" className="input-field" placeholder="What car are you looking?" />
                </div>

                <div className="input-wrapper">
                  <label htmlFor="input-2" className="input-label">
                    Max. monthly payment
                  </label>
                  <input type="text" name="monthly-pay" id="input-2" className="input-field" placeholder="Add an amount in $" />
                </div>

                <div className="input-wrapper">
                  <label htmlFor="input-3" className="input-label">
                    Make Year
                  </label>
                  <input type="text" name="year" id="input-3" className="input-field" placeholder="Add a minimal make year" />
                </div>

                <button type="submit" className="btn">
                  Search
                </button>
              </form>
            </div>
          </section>

          <section className="section featured-car" id="featured-car">
            <div className="container">
              <div className="title-wrapper">
                <h2 className="h2 section-title">{page?.sectionFeaturedTitle}</h2>

                <a href="#" className="featured-car-link">
                  <span>View more</span>
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
                            <span className="card-item-text">{car.seats} People</span>
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
                            <strong>{car.priceLabel.replace(/\/.*/, "")}</strong> / month
                          </p>

                          <button className="btn fav-btn" aria-label="Add to favourite list" type="button">
                            <ion-icon name="heart-outline"></ion-icon>
                          </button>

                          <button className="btn" type="button">
                            Rent now
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
              <h2 className="h2 section-title">Get started with 4 simple steps</h2>

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
                          Get started
                        </a>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="section blog" id="blog">
            <div className="container">
              <h2 className="h2 section-title">{page?.sectionBlogTitle}</h2>

              <ul className="blog-list has-scrollbar">
                {blogPosts.map((post) => (
                  <li key={post.id}>
                    <div className="blog-card">
                      <figure className="card-banner">
                        <a href="#">
                          <img src={post.coverPath || "/assets/images/blog-1.jpg"} alt={post.title} loading="lazy" className="w-100" />
                        </a>

                        <a href="#" className="btn card-badge">
                          {post.excerpt || "Company"}
                        </a>
                      </figure>

                      <div className="card-content">
                        <h3 className="h3 card-title">
                          <a href="#">{post.title}</a>
                        </h3>

                        <div className="card-meta">
                          <div className="publish-date">
                            <ion-icon name="time-outline"></ion-icon>
                            <time dateTime={(post.publishedAt || post.createdAt).toISOString().slice(0, 10)}>
                              {(post.publishedAt || post.createdAt).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric"
                              })}
                            </time>
                          </div>

                          <div className="comments">
                            <ion-icon name="chatbubble-ellipses-outline"></ion-icon>
                            <data value="114">114</data>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </article>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <a href="#" className="logo">
                <img src={site?.logoPath || "/assets/images/logo.svg"} alt="Ridex logo" />
              </a>

              <p className="footer-text">
                {site?.legalNotice ||
                  "Search for cheap rental cars in New York. With a diverse fleet of 19,000 vehicles, Waydex offers its consumers an attractive and fun selection."}
              </p>
            </div>

            <ul className="footer-list">
              <li>
                <p className="footer-list-title">Company</p>
              </li>
              {footerCompany.map((item) => (
                <li key={item}>
                  <a href="#" className="footer-link">
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            <ul className="footer-list">
              <li>
                <p className="footer-list-title">Support</p>
              </li>
              {footerSupport.map((item) => (
                <li key={item}>
                  <a href="#" className="footer-link">
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            <ul className="footer-list">
              <li>
                <p className="footer-list-title">Neighborhoods in New York</p>
              </li>
              {footerNeighborhoods.map((item) => (
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
