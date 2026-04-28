import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@ridex.local";
  const password = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: { passwordHash, role: "OWNER" },
    create: {
      email,
      name: "Template Owner",
      passwordHash,
      role: "OWNER"
    }
  });

  await prisma.siteConfig.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      companyName: "Ridex",
      companyTagline: "Rent your favourite car",
      contactPhone: "8 800 234 56 78",
      contactEmail: "contact@ridex.local",
      whatsapp: "8 800 234 56 78",
      address: "Live in New York, New Jerset and Connecticut!",
      businessHours: "Mon - Sat: 9:00 am - 6:00 pm",
      logoPath: "/assets/images/logo.svg",
      faviconPath: "/favicon.svg",
      footerCopyright: "© 2022 codewithsadee. All Rights Reserved",
      legalNotice:
        "Search for cheap rental cars in New York. With a diverse fleet of 19,000 vehicles, Waydex offers its consumers an attractive and fun selection."
    }
  });

  await prisma.themeConfig.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      primaryColor: "hsl(204, 91%, 53%)",
      secondaryColor: "hsl(262, 60%, 57%)",
      accentColor: "hsl(329, 63%, 52%)",
      backgroundColor: "hsl(216, 75%, 97%)",
      surfaceColor: "hsl(0, 0%, 100%)",
      textColor: "hsl(240, 22%, 25%)",
      successColor: "hsl(152, 63%, 43%)",
      warningColor: "hsl(43, 96%, 56%)",
      errorColor: "hsl(0, 79%, 63%)",
      borderRadius: "10px",
      shadowStyle: "3px 3px 9px hsla(240, 14%, 69%, 0.2)",
      fontHeading: "Nunito",
      fontBody: "Open Sans"
    }
  });

  await prisma.pageContent.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      heroTitle: "The easy way to takeover a lease",
      heroSubtitle: "Live in New York, New Jerset and Connecticut!",
      heroCtaText: "Explore cars",
      heroCtaLink: "#featured-car",
      sectionFeaturedTitle: "Featured cars",
      sectionWhyUsTitle: "Get started with 4 simple steps",
      sectionBlogTitle: "Our Blog",
      sectionFaqTitle: "Frequently asked questions",
      showWhyUs: true,
      showTestimonials: false,
      showFaq: false,
      showBlog: true,
      seoTitle: "Ridex - Rent your favourite car",
      seoDescription: "Ridex is fully responsive car rental website."
    }
  });

  const navCount = await prisma.navItem.count();
  if (!navCount) {
    await prisma.navItem.createMany({
      data: [
        { label: "Home", href: "#home", sortOrder: 1 },
        { label: "Explore cars", href: "#featured-car", sortOrder: 2 },
        { label: "About us", href: "#", sortOrder: 3 },
        { label: "Blog", href: "#blog", sortOrder: 4 }
      ]
    });
  }

  const carCount = await prisma.fleetCar.count();
  if (!carCount) {
    await prisma.fleetCar.createMany({
      data: [
        {
          name: "Toyota RAV4",
          brand: "Toyota",
          year: 2021,
          seats: 4,
          fuelType: "Hybrid",
          transmission: "Automatic",
          priceLabel: "$440",
          mileageLabel: "6.1km / 1-litre",
          coverImagePath: "/assets/images/car-1.jpg",
          sortOrder: 1
        },
        {
          name: "BMW 3 Series",
          brand: "BMW",
          year: 2019,
          seats: 4,
          fuelType: "Gasoline",
          transmission: "Automatic",
          priceLabel: "$350",
          mileageLabel: "8.2km / 1-litre",
          coverImagePath: "/assets/images/car-2.jpg",
          sortOrder: 2
        },
        {
          name: "Volkswagen T-Cross",
          brand: "Volkswagen",
          year: 2020,
          seats: 4,
          fuelType: "Gasoline",
          transmission: "Automatic",
          priceLabel: "$400",
          mileageLabel: "5.3km / 1-litre",
          coverImagePath: "/assets/images/car-3.jpg",
          sortOrder: 3
        },
        {
          name: "Cadillac Escalade",
          brand: "Cadillac",
          year: 2020,
          seats: 4,
          fuelType: "Gasoline",
          transmission: "Automatic",
          priceLabel: "$620",
          mileageLabel: "7.7km / 1-litre",
          coverImagePath: "/assets/images/car-4.jpg",
          sortOrder: 4
        },
        {
          name: "BMW 4 Series GTI",
          brand: "BMW",
          year: 2021,
          seats: 4,
          fuelType: "Gasoline",
          transmission: "Automatic",
          priceLabel: "$530",
          mileageLabel: "7.6km / 1-litre",
          coverImagePath: "/assets/images/car-5.jpg",
          sortOrder: 5
        },
        {
          name: "BMW 4 Series",
          brand: "BMW",
          year: 2019,
          seats: 4,
          fuelType: "Gasoline",
          transmission: "Automatic",
          priceLabel: "$490",
          mileageLabel: "7.2km / 1-litre",
          coverImagePath: "/assets/images/car-6.jpg",
          sortOrder: 6
        }
      ]
    });
  }

  const blogCount = await prisma.blogPost.count();
  if (!blogCount) {
    await prisma.blogPost.createMany({
      data: [
        {
          title: "Opening of new offices of the company",
          slug: "opening-of-new-offices-of-the-company",
          excerpt: "Company",
          body: "Opening of new offices of the company",
          coverPath: "/assets/images/blog-1.jpg",
          isPublished: true,
          publishedAt: new Date("2022-01-14T00:00:00.000Z")
        },
        {
          title: "What cars are most vulnerable",
          slug: "what-cars-are-most-vulnerable",
          excerpt: "Repair",
          body: "What cars are most vulnerable",
          coverPath: "/assets/images/blog-2.jpg",
          isPublished: true,
          publishedAt: new Date("2022-01-14T00:00:00.000Z")
        },
        {
          title: "Statistics showed which average age",
          slug: "statistics-showed-which-average-age",
          excerpt: "Cars",
          body: "Statistics showed which average age",
          coverPath: "/assets/images/blog-3.jpg",
          isPublished: true,
          publishedAt: new Date("2022-01-14T00:00:00.000Z")
        },
        {
          title: "What´s required when renting a car?",
          slug: "whats-required-when-renting-a-car",
          excerpt: "Cars",
          body: "What´s required when renting a car?",
          coverPath: "/assets/images/blog-4.jpg",
          isPublished: true,
          publishedAt: new Date("2022-01-14T00:00:00.000Z")
        },
        {
          title: "New rules for handling our cars",
          slug: "new-rules-for-handling-our-cars",
          excerpt: "Company",
          body: "New rules for handling our cars",
          coverPath: "/assets/images/blog-5.jpg",
          isPublished: true,
          publishedAt: new Date("2022-01-14T00:00:00.000Z")
        }
      ]
    });
  }

  const whyUs = await prisma.whyUsItem.count();
  if (!whyUs) {
    await prisma.whyUsItem.createMany({
      data: [
        { title: "Create a profile", body: "If you are going to use a passage of Lorem Ipsum, you need to be sure.", icon: "person-add-outline", order: 1 },
        { title: "Tell us what car you want", body: "Various versions have evolved over the years, sometimes by accident, sometimes on purpose", icon: "car-outline", order: 2 },
        { title: "Match with seller", body: "It to make a type specimen book. It has survived not only five centuries, but also the leap into electronic", icon: "person-outline", order: 3 },
        { title: "Make a deal", body: "There are many variations of passages of Lorem available, but the majority have suffered alteration", icon: "card-outline", order: 4 }
      ]
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
