const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://alankj.vercel.app";
const parsedSiteUrl = new URL(configuredSiteUrl);

if (parsedSiteUrl.protocol !== "https:" && parsedSiteUrl.protocol !== "http:") {
  throw new Error("NEXT_PUBLIC_SITE_URL must use the http or https protocol.");
}

export const siteUrl = new URL("/", parsedSiteUrl);
