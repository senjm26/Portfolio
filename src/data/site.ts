// Central site config. Edit values here — they propagate to Navbar, Hero,
// About, Contact, and Footer automatically.

export interface SiteConfig {
  name: string;
  monogram: string;
  discipline: string;
  location: string;
  email: string;
  resumeHref: string;
  linkedinUrl: string;
}

export const siteConfig: SiteConfig = {
  name: "Jay Sen",
  monogram: "Jay Sen",
  discipline: "Mechanical Engineering Student",
  location: "Pennsylvania, United States",
  email: "senjm@gmail.com",
  resumeHref: "/resume.pdf",
  linkedinUrl: "https://linkedin.com/in/jaymsen",
};
