<template>
  <v-container align-content-center height= "100%">
    <PostPreview
      v-for="post in posts"
      :key="post.id"
      :title="post.title"
      :exerpt="post.previewText"
      :content="post.content"
      :thumbnailImage="post.thumbnailUrl"
      :id="post.id" />
  </v-container>
</template>

<script>
import PostPreview from '@/components/Blog/PostPreview'
export default {
  components: {
    PostPreview
  },
  asyncData(context) {
    return context.app.$storyapi
    .get('cdn/stories', {
      version: context.isDev ? 'draft' : 'published',
      starts_with: 'blog/'
    })
    .then(res => {
      return {
        posts: res.data.stories.map(bp => {
        return {
          id: bp.slug,
          title: bp.content.title,
          previewText: bp.content.summary,
          thumbnailUrl: bp.content.thumbnail,
          content: bp.content.content
        }
      })
      }
    })
  }
  // data () {
  //   return {
  //     posts: [
  //       {
  //         title: 'A New Beginning',
  //         previewText: 'This will be awesome, don\'t miss it',
  //         thumbnailUrl: 'https://images.pexels.com/photos/688559/pexels-photo-688559.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  //         id: 'a new beginning'
  //       },
  //       {
  //         title: 'A New Beginning',
  //         previewText: 'This will be awesome, don\'t miss it',
  //         thumbnailUrl: 'https://images.pexels.com/photos/688559/pexels-photo-688559.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  //         id: 'a new beginning'
  //       }
  //     ]
  //   }
  // }
}
</script>
