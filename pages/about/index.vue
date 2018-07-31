<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card v-editable="blok">
        <v-card-title class="headline">{{ title }}</v-card-title>
        <v-card-text class="card_content">
          <p>{{ content }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat nuxt to="/">Continue</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  asyncData(context) {
    return context.app.$storyapi
    .get('cdn/stories/about', {
      version: context.isDev ? 'draft' : 'published'
    })
    .then(res => {
      return {
        blok: res.data.story.content,
        title: res.data.story.content.title,
        content: res.data.story.content.content
      }
    })
  },
  mounted() {
    this.$storyblok.init()
    this.$storyblok.on('change', () => {
      location.reload(true)
    })
  }
}
</script>

<style scoped>
.card_content {
  white-space: pre-line;
}
</style>

