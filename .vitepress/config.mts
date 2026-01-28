import { defineConfig } from "vitepress";
import { generateSidebar } from "./sidebar.mts";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Playsthetic",
  description: "Playsthetic's official wiki.",
  head: [["link", { rel: "icon", href: "/favicon.png" }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    search: {
      provider: "local",
    },

    editLink: {
      pattern: "https://github.com/playsthetic/wiki/edit/main/:path",
    },

    sidebar: generateSidebar(),

    socialLinks: [
      {
        icon: "discord",
        link: "https://discord.com/channels/473635736332271626/",
      },
      { icon: "github", link: "https://github.com/playsthetic" },
    ],
  },
});
