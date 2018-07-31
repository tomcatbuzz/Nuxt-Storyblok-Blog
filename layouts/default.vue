<template>
  <v-app light>
  <div class="hide-overflow" style="position: relative;">
    <v-toolbar
      app
      absolute
      color="primary"
      scroll-off-screen
      scroll-target="#scrolling-techniques">
      <v-toolbar-side-icon @click="drawer = !drawer" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <nuxt-link to="/" tag="span" style="cursor: pointer">Nuxt Storyblok Blog</nuxt-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
        <v-icon left dark>{{ item.icon }}</v-icon>
        {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <div
      id="scrolling-techniques"
      class="scroll-y"
      style="max-height: 600px;">
      <v-content>
      <v-container style="height: 100%;">
        <nuxt />
      </v-container>
      </v-content>
      </div>
    </div>
      <v-navigation-drawer
       absolute
       temporary
       v-model="drawer">
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="text-xs-center">Nuxt Storyblok Blog</v-list-tile-title>
        </v-list-tile>
        <v-divider dark></v-divider>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
      </v-navigation-drawer>
      <v-footer :fixed="fixed" app>
        <span>&copy; 2018</span>
      </v-footer>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        drawer: false,
        fixed: false
      }
    },
    computed: {
      menuItems () {
        let menuItems = [
          { icon: 'bubble_chart', title: 'Home', link: '/' },
          { icon: 'apps', title: 'About', link: '/about' },
        ]
        return menuItems
      }
    }
  }
</script>




