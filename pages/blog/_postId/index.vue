<template>
<v-container>
  <v-layout justify-center>
    <v-flex xs12 sm6 md8 lg10>
      <v-card color="info" v-editable="blok">
        <v-card-media
          class="post-preview-thumbnail"
          :style="{ backgroundImage: 'url(' + image + ')' }"
          width= "100%"
          height= "300px">
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <div class="headline">{{ title }}</div>
            <span class="grey--text">{{ summary }}</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat>Share</v-btn>
          <v-btn
            raised
            color="accent"
            to="/">Home</v-btn>
          <v-spacer></v-spacer>
          <v-btn outline color="accent" icon @click="show = !show">
            <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-slide-y-transition>
          <v-card-text v-show="show" class="post-preview-content">
            {{ content }}
          </v-card-text>
        </v-slide-y-transition>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  },
  asyncData(context) {
    return context.app.$storyapi.get('cdn/stories/blog/' + context.params.postId, {
      version: process.env.NODE_ENV == 'production' ? 'published' : 'draft'
    })
    .then(res => {
      console.log(res.data)
      return {
        blok: res.data.story.content,
        image: res.data.story.content.thumbnail,
        title: res.data.story.content.title,
        summary: res.data.story.content.summary,
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
.post-preview-thumbnail {
  background-size: cover;
  background-position: center;
}
.post-preview-content {
  white-space: pre-line;
}
</style>

