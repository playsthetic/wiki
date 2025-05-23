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
          { text: "Unreal Engine", link: "../guidelines/unreal-engine" },
          { text: "Playdate", link: "../guidelines/playdate" },
          { text: "Git", link: "../guidelines/git" },
        ],
      },
      {
        text: "Cheat sheets",
        items: [
          {
            text: "Optimizing Unreal Engine materials",
            link: "../cheat-sheets/optimizing-unreal-engine-materials",
          },
          {
            text: "Optimizing Niagara systems",
            link: "../cheat-sheets/optimizing-niagara-systems",
          },
          {
            text: "Unreal Engine version migration",
            link: "../cheat-sheets/migrating-unreal-engine-version",
          },
        ],
      },
      {
        text: "References",
        items: [
          {
            text: "Chevy Ray's Pixel Fonts sizes",
            link: "../references/chevy-rays-pixel-fonts-sizes",
          },
          {
            text: "Relevant resources",
            link: "../references/relevant-resources",
          },
          {
            text: "User license agreements",
            link: "../references/user-license-agreements",
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
