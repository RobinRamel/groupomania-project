<template>
  <b-container class="home">
    <h1> groupomania </h1>
    <div class="publish" v-if="this.$store.state.isUserLoggedIn">
      <div class="publish__header py-3">
        <h2>Mon Post</h2>
      </div>
      <b-form @submit="onSubmit" class="px-5 py-5">
        <b-form-group 
            id="image-section"
            label="Image"
            label-for="post-image"
        >
        
          <b-form-file
            id="post-image"
            :state="Boolean(post.image)"
            placeholder="Choisissez un fichier ou déposez le ici"
            v-model="post.image"
            drop-placeholder="Déposez ici..."
            browse-text="upload"
            required
            style="margin-bottom: 2rem;"
            accept="image/jpeg, image/jpg, image/png"
          >
          </b-form-file>
        </b-form-group>
        <b-form-group 
            id="title-section"
            label="Titre"
            label-for="post-title"
        >
        
          <b-form-input
            id="post-title"
            placeholder="Titre du post..."
            type="text"
            v-model="post.title"
            required
          >
          </b-form-input>
        </b-form-group>
        <b-form-group 
            id="content-section"
            label="Exprimez-vous"
            label-for="post-content"
        >
        
          <b-form-textarea
            id="post-content"
            placeholder="Partagez à tous, en écrivant ici..."
            type="text"
            rows="4"
            max-rows="15"
            v-model="post.content"
            required
          >
          </b-form-textarea>
        </b-form-group>
        <div class="submit-button-container">
          <b-button type="submit" variant="dark" class="publish__button">Publier</b-button>
        </div>
      </b-form>
    </div>
    <div class="wall">
        <post 
          @post-removed="updatePostList"
          v-for="(post, index) in allPosts"
          v-bind:key="index"
          v-bind:id="post.id"
          v-bind:title="post.title"
          v-bind:content="post.content"
          v-bind:image="post.image"
          v-bind:userId="post.UserId"
          v-bind:createdAt="post.createdAt"
          v-bind:updatedAt="post.updatedAt"
          v-bind:comments="post.Comments"
          v-bind:author="post.author"
        >

        </post>
    </div>

    <div class="errorMessage" v-html="error"></div>
  </b-container>
</template>

<script>
// @ is an alias to /src
import PostsService from '@/services/PostsService'
import Post from '../components/Post'

export default {
  components: { Post },
  name: 'Home',

  data () {
    return {
      allPosts: [],
      post: {
        title: '',
        content: '',
        image: null,
      },
      error: null
    }
  },
  created () {
    //à la création du composant
    this.getAllPosts()
  },
  methods: {
    async getAllPosts () {
       try {
        const { data } = await PostsService.getAllPosts()
         console.log(data)

        this.allPosts = data
       } catch (error) {
        this.error = error
        console.log(error)
       }
    },
    // // Update la liste de commentaire avec le payload d'event et on push dans le bon object sur la data allPosts
    // updateCommentList(payload) {
    //   this.allPosts.forEach((object) => {
    //     if (object.id === payload.postId) {
    //       object.Comments.push(payload.comment)
    //     }
    //   })
    // },
    
    updatePostList(payload) {
      //@TODO Refactior possible ? 
      console.log(payload)
      const updatedPostsList = this.allPosts.filter(element => element.id !== payload.id)
      console.log('updated list : ', updatedPostsList)
      this.allPosts = updatedPostsList
    },

    async onSubmit(event) {
      event.preventDefault()
      console.log(event)
      console.log(this.post.image)

      const formData = new FormData();

      formData.append('image' ,this.post.image)
      formData.append('title' , this.post.title)
      formData.append('content' , this.post.content)
      formData.append('userId' , this.$store.state.user.id)
      formData.append('author' , this.$store.state.user.username)

      console.log('file recup : ', formData.get('file'))
      console.log('file recup : ', formData.get('content'))
      console.log(formData)

      PostsService.createPost(formData)
      .then(response => {
        this.allPosts.unshift({
          ...response.data.post,
          Comments: []
        })

      })
      .catch(error => {
        console.log('el error : ', error)
        this.error = error 
      })
    }
  },
  computed: {
    
  }, 
  mounted () {
    
  }
}
</script>

<style scoped lang="scss">
  .publish {
    text-align: left;
    margin-bottom: 4rem;
    background-color: #B0B0B0;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 7px 30px -10px rgba(150,170,180,0.5);

    &__header {
      background-color: #343a40;
      color: white;
      width: 100%;
      position: relative;
      top:0;

      h2 {
        text-align: center;
        font-weight: bold;
        margin: 1rem 0 !important;
      }
    }


    textarea, input, #post-image {
      border-radius: 15px 15px 15px 15px !important;
      padding-left: 1rem;
      overflow: hidden !important;
    }

    textarea {
      border-radius: 5px 15px 15px 15px;
      padding-top: 0.5rem;
    }

    .submit-button-container {
      display: flex;
      width: 99%;
      justify-content: flex-end;
    }

    &__button {
      margin-left: auto;
    }
  }
</style>
