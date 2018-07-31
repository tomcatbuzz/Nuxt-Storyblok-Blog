const pkg = require('./package')
const axios = require('axios')

const nodeExternals = require('webpack-node-externals')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Nuxt and Storyblok Blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Awesome Blog about Tech, built with Nuxt and Storyblok' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lato:400,700|Material+Icons' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#FFFFFF' },

  /*
  ** Global CSS
  */
  css: [
    'vuetify/src/stylus/main.styl'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vuetify'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    [
      'storyblok-nuxt',
      {
        accessToken: process.env.NODE_ENV == 'production'
          ? 'gc4hYmOLpo0KHWuXFr6GVwtt'
          : '5Grb7oSQEyhlRAZDGgQ0Ngtt', cacheProvider: 'memory'}
    ]
  ],

  generate: {
    routes: function() {
      return axios.get('https://api.storyblok.com/v1/cdn/stories?version=published&token=gc4hYmOLpo0KHWuXFr6GVwtt&starts_with=blog&cv=' + Math.floor(Date.now() / 1e3)
      )
      .then(res => {
        const blogPosts = res.data.stories.map(bp => bp.full_slug)
        return [
          '/',
          '/blog',
          '/about',
          ...blogPosts
        ]
      })
    }
  },
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    ADDED cssSourceMap: false (get rid of 404 statusCode: 404,
    path: '/assets/styles/app.css.map',
    message: 'This page could not be found')
    */
    cssSourceMap: false,
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      if (ctx.isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ]
      }
    }
  }
}
