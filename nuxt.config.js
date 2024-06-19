import colors from 'vuetify/es5/util/colors'
import path from 'path'
import fs from 'fs'
export default {
  devtools: { enabled: true },

  // routeRules: {
  //     '/api/v1/**': {
  //         security: {
  //             corsHandler: {
  //                 origin: 'http://localhost:3000',
  //                 methods: '*',
  //                 credentials: true
  //             }
  //         }
  //     }
  // },

  devServer: {
    https: {
      key: 'localhost-key.pem',
      cert: 'localhost.pem'
    }
  },


  generate: {
    fallback: true,
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - vue-proj',
    title: 'vue-proj',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        src: "/libs/cinchy.js",
        type: "text/javascript",
      },
      {
        src: "/libs/cinchy-helper.js",
        type: "text/javascript",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: "~plugins/service.js",
      ssr: false,
    }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],
serverMiddleware:[
  '~plugins/cors.js'
],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios",
    '@nuxtjs/proxy',
    'cookie-universal-nuxt',

    // With options
    ['cookie-universal-nuxt', { alias: 'cookiz' }],
  ],
  axios: {
   proxy: true, // Can be also an object with default options
  //prefix: process.env.API_URL
  },


  proxy: {

    "/cinchy/": {
     target: "https://openwealth.network",
     // target:"http://openwealthfi.com/AssetManagement",
      pathRewrite: { "^/cinchy/": "/" },
    },
    },

  // },
  // proxy: {
  //   "/cinchy/": {
  //     target: "http://openwealthfi.com/AssetManagement",
  //     pathRewrite: { "^/cinchy/": "" },
  //   },
  // },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem'))
    }
  },

  ssr: false,

}
