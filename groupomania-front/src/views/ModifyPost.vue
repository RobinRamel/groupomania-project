<template>
  <b-container class="postModify">
     <h2>Modifiez votre post</h2>
     <div class="thePost">
        <b-form @submit="onSubmit">
          <b-form-group
            id="post-image-group"
            label-for="post-image"
          >
            <b-img :src="image" fluid class="thePost__image"></b-img>
            <input type="file" @change="previewImage" accept="image/jpeg, image/jpg, image/png">
          </b-form-group>
          <b-form-group
            id="post-title-group"
            label="Titre du post :"
            label-for="post-title"
          >
            <b-form-input
              id="post-title"
              v-model="title"
              type="text"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="post-content-group"
            label="Contenu :"
            label-for="post-content"
          >
            <b-form-textarea
              id="post-content"
              v-model="content"
              type="text"
              rows="6"
              max-rows="8"
              required
            ></b-form-textarea>
          </b-form-group>
          <div class="thePost__button-row">
              <b-button type="submit" variant="primary">Modifier</b-button>
          </div>
        </b-form>
     </div>
     
     <div class="response" v-if="response">
       <p>{{ response }}</p>
       <b-button variant="primary" :to="{ name: 'home' }">Accueil</b-button>
     </div>
  </b-container>
</template>

<script>
import PostsService from '@/services/PostsService'

export default {
  name: 'modifyPost',
  props: {
    postId: Number
  },
  
  data() {
    return {
      title: '',
      content: '',
      image: '',
      newImage: null,
      error: null,
      response: null
    }
  },
  created() {
    this.getOnePost()
  },
  watch: {
    newImage: function() {
      console.log(this.newImage)
      this.image = this.newImage.name
    }
  },
  methods: {
    async getOnePost() {
      try {
        console.log(this.$props.postId )
        const { data } = await PostsService.getOnePost( this.$props.postId )
        
        console.log('One post : ', data.post)
        this.title = data.post.title
        this.content = data.post.content
        this.image = data.post.image

      } catch(error) {
        console.log(error)
        this.error = error
      }
    },

    async onSubmit(event) {
      event.preventDefault()
      console.log('this form :', this.title, this.content, this.image)

      const formData = new FormData();

      if(this.newImage !== null) {
        formData.append('image', this.newImage)
      }
      formData.append('content', this.content)
      formData.append('title', this.title)

      PostsService.updatePost(this.$props.postId, formData)
      .then(response => {
        this.response = response.data.message
      })
      .catch(error => {
        console.log(error)
        this.error = error
      })
    },

    previewImage(event) {
      let input = event.target
      let reader = new FileReader();

      this.newImage = input.files[0]

      console.log('input', input.files)

      reader.onload = (e) => {
        this.image = e.target.result
      }

      reader.readAsDataURL(input.files[0])
    }
  },
}
</script>

<style scoped lang="scss">
  .postModify {

    .thePost {
      background-color: #B0B0B0;
      padding: 3rem;
      border-radius: 10px;
      box-shadow: 0 7px 30px -10px rgba(150,170,180,0.5);
      text-align: left;
      margin-bottom: 10rem;

      &__button-row {
        display: flex;
        justify-content: flex-end;
      }

      &__image {
        width: 100%;
        border-radius: 5px;
      }
    }

    .response {
      position: absolute;
      width: 100%;
      height: 100%; 
      left: 0;
      top: 0;
      z-index: 10;
      background-color: aliceblue;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    
    }
    
  }
</style>
