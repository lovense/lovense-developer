import { defineUserConfig } from "vuepress"
import { defaultTheme } from "@vuepress/theme-default"

import markdownItInclude from "markdown-it-include"
import { registerComponentsPlugin } from "@vuepress/plugin-register-components"
import { getDirname, path } from "@vuepress/utils"
import dotenvFlow from "dotenv-flow"
import { searchPlugin } from '@vuepress/plugin-search'
const __dirname = getDirname(import.meta.url)
dotenvFlow.config()

export default defineUserConfig({
  dest: "dist",
  title: "Developer",
  head: [
    ["link", { rel: "icon", href: `https://www.lovense.com/favicon.ico` }],
  ],
  description: "Lovense Developer",
  base: process.env.BASE || "/",
  theme: defaultTheme({
    logo: "https://cdn.lovense-api.com/resources/images/logo_m.png",
    lastUpdated: false,
    navbar: [

      {
        text: "Documentation",
        link: "/docs",
        children: [
          {
            text: 'Standard Solutions',
            link: '/docs/standard-solutions'
          },
          {
            text: 'Cam Solutions',
            link: '/docs/cam-solutions'
          },
          {
            text: 'Native SDKs',
            link: '/docs/native-sdks'
          }
        ]
      },
      {
        text: "Forum",
        link: "https://forum.developer.lovense.com/",
      },
      {
        text: "Projects Library",
        link: "/projectsLibrary",
      },
      {
        text: "Support",
        link: "/docs/faq.html",
      }
    ],
    footer: [
      { text: 'Privacy Policy', link: '/' },
    ],
    sidebar: {
      "/docs/standard-solutions": [
        {
          text: "Standard Solutions (with Lovense Remote)",
          children: [
            "/docs/standard-solutions",
            "/docs/standard-solutions/standard-api",
            "/docs/standard-solutions/standard-js-sdk",
            "/docs/standard-solutions/socket-api"
          ],
        }
      ],
      "/docs/cam-solutions": [
        {
          text: "Cam Solutions (with Lovense Connect)",
          children: [
            "/docs/cam-solutions",
            "/docs/cam-solutions/cam-extension-for-chrome",
            "/docs/cam-solutions/cam-kit-for-web",
            "/docs/cam-solutions/display-panel",
            "/docs/cam-solutions/basic-api",
            "/docs/cam-solutions/basic-js-sdk",
            "/docs/cam-solutions/socket-api"
          ],
        }
      ],
      "/docs/native-sdks": [
        {
          text: "Native SDKs",
          children: [
            "/docs/native-sdks",
            "/docs/native-sdks/ios-native-sdk",
            "/docs/native-sdks/android-native-sdk",
            "/docs/native-sdks/windows-native-sdk",
          ],
        }
      ],
      "/docs/faq": [
        "/docs/faq"
      ],
    },
    contributors: false,
    themePlugins: {
      mediumZoom: false
    },
    colorModeSwitch: false,
    frontmatter: false
  }),
  // markdown: {
  //   extractHeaders: { level: [2, 3] },
  // },
  plugins: [
    // docsearchPlugin({}),
    searchPlugin({
      isSearchable: (page) => page.path !== '/',
    }),
    registerComponentsPlugin({
      components: {
        Mermaid: path.resolve(__dirname, "./components/Mermaid.vue"),
        LightBox: path.resolve(__dirname, "./components/LightBox.vue"),
        Navbar: path.resolve(__dirname, "./components/Navbar.vue"),
        Home: path.resolve(__dirname, "./view/Home.vue"),
        ProjectsLibrary: path.resolve(__dirname, "./view/ProjectsLibrary.vue"),
        RightMenu: path.resolve(__dirname, "./components/RightMenu.vue"),
        Footer: path.resolve(__dirname, "./components/Footer.vue")
      },
    }),
  ],
  alias: {
    "@assets": path.resolve(__dirname, "../assets"),
  },
  extendsMarkdown: (md) => {
    // use more markdown-it plugins!
    md.use(markdownItInclude)
  },
})
