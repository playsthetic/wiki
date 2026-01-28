import { defineConfig } from "vitepress";

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

    sidebar: [
      {
        text: "Guidelines",
        items: [
          { text: "Unreal Engine", link: "/guidelines/unreal-engine" },
          { text: "Playdate", link: "/guidelines/playdate" },
          { text: "Git", link: "/guidelines/git" },
        ],
      },
      {
        text: "Cheat Sheets",
        items: [
          {
            text: "Optimizing Unreal Engine Materials",
            link: "/cheat-sheets/optimizing-unreal-engine-materials",
          },
          {
            text: "Optimizing Niagara Systems",
            link: "/cheat-sheets/optimizing-niagara-systems",
          },
          {
            text: "Migrating Unreal Engine Version",
            link: "/cheat-sheets/migrating-unreal-engine-version",
          },
        ],
      },
      {
        text: "References",
        items: [
          {
            text: "Chevy Ray's Pixel Fonts Sizes",
            link: "/references/chevy-rays-pixel-fonts-sizes",
          },
          {
            text: "Relevant Resources",
            link: "/references/relevant-resources",
          },
          {
            text: "User License Agreements",
            link: "/references/user-license-agreements",
          },
        ],
      },
    ],

    socialLinks: [
      {
        icon: "discord",
        link: "https://discord.com/channels/473635736332271626/",
      },
      { icon: "github", link: "https://github.com/playsthetic" },
    ],
  },
});
