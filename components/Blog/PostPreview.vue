<template>
<v-container align-content-center>
  <v-layout justify-center>
    <v-flex xs12 sm6 md8 lg10>
      <v-card color="info">
        <v-card-media
          class="post-preview-thumbnail"
          :style="{ backgroundImage: 'url(' + thumbnailImage + ')' }"
          width= "100%"
          height= "300px">
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <div class="headline">{{ title }}</div>
            <span class="grey--text">{{ exerpt }}</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat>Share</v-btn>
          <v-btn
            raised
            color="accent"
            :to="'/blog/' + id">Posts</v-btn>
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
  props: {
    title: {
      type: String,
      required: true
    },
    exerpt: {
      type: String,
      required: true
    },
    thumbnailImage: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      show: false
    }
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



