<template>
  <div class="post">
    <div class="post__head">
      <b-img :src="image" fluid-grow class="post__head__image"></b-img>
      <div class="post__head__title-author">
        <h3>{{ title }}</h3>
        <span class="author">
          {{ author }}
        </span>
      </div>
    </div>
    <div class="post__body">
      <p>
        {{ content }}
      </p>
      <div class="post__body__buttons" v-if="this.$store.state.isUserLoggedIn && this.$store.state.user.id === this.$props.userId">
          <b-button variant="primary" class="mr-3" :to="{ name: 'modifyPost', params: { postId: this.$props.id}}">Modifier</b-button> 
          <b-button variant="danger" @click="removePost">Supprimer</b-button>
      </div>
    </div>
    <div class="post__date">

    </div>
    <div class="post__comments">
      <div class="post__comments__count">
        {{numbersOfComments}} Commentaires
      </div>
      <!-- LISTE DES COMMENTAIRES -->
      <!-- @TODO Faire le chargement des comms par 5/10/15/20.... -->
      <div class="post__comments__list">
        <comment
          @comment-removed="updateCommentList"
          v-for="(comment, index) in commentList"
          v-bind:key="index"
          v-bind:id="comment.id"
          v-bind:content="comment.content"
          v-bind:createdAt="comment.createdAt"
          v-bind:userId="comment.UserId"
          v-bind:author="comment.author"
        >

        </comment>
      </div>

      <div class="post__comments__write">
        <b-form @submit="onSubmit" > 
          <b-form-group 
            id="commentaire-section"
            label="Commentez ce post :"
            label-for="commentaire"
          >
            <b-form-textarea
              id="commentaire"
              v-model="form.commentInput"
              type="text"
              rows="2"
              max-rows="4"
              required
            >
            </b-form-textarea>
          </b-form-group>

          <b-button type="submit" variant="primary">Envoie</b-button>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Comment from '../components/Comment'
import CommentsService from '@/services/CommentsService'
import PostsService from '@/services/PostsService'

export default {
  components: { Comment },
  name: 'Post',
  // make that props required ?? except for comments (it originally come without comments)
  props: {
    id: Number,
    title: String,
    content: String,
    image: String,
    userId: Number,
    createdAt: String,
    updatedAt: String,
    comments: Array,
    author: String
  },
  data () {
    return {
      form: {
        commentInput: ''
      },
      commentList: this.$props.comments,
      error: null
    }
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault()
      console.log(this.form.commentInput)

      CommentsService.createComment({
        comment: {
          content: this.form.commentInput,
          userId: this.$store.state.user.id,
          postId: this.$props.id,
          author: this.$store.state.user.username
        }
      })
        .then((response) => {
          console.log('response data comment ', response.data.comment)
          this.commentList.push(response.data.comment)
          this.form.commentInput = ''
        })
        .catch((error) => {
          this.error = error
          console.log(error)
        })
      },

      async removePost() {
        PostsService.deletePost(this.$props.id)
        .then(response => {
          console.log(response.data.message)
          this.$emit('post-removed', {
            id: this.$props.id
          })
        })
        .catch(error => {
          console.log(error)
          this.error = error 
        })
      },

      updateCommentList(payload) {
        console.log(payload)
        this.commentList = this.commentList.filter(element => element.id !== payload.id)
      }
  },
  computed: {
    numbersOfComments() {
      return this.commentList.length
    }
  },
  mounted () {
    
  }
}
</script>

<style lang="scss">
  .post {
    background-color: white;
    margin-bottom: 4rem; 
    border-radius: 10px 10px 0 0;
    overflow: hidden;
    box-shadow: 0 7px 30px -10px rgba(150,170,180,0.5);
    //border: 4px solid #383838;

    &__head {
      width: 100%;
      position: relative;
      //border-bottom: 4px solid #383838;

      &:after {
          content: "";
          position: absolute;
          background-color: rgba(0, 0, 0, 0.3);
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }

      &__image {
        z-index: 0;
        position: relative;
      }

      &__title-author {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;

        .author {
          color: white;
          font-size: 2rem;
          font-weight: 100;
        }
      }
    }

    &__body {
      padding: 3rem 12rem;

      &__buttons {
        display: flex;
      }
    }

    &__comments {
      background-color: #EDEDED;
      padding: 3rem 12rem;
      text-align: left;

      &__count {
        margin: 3rem 0;
        font-weight: bold;
        font-size: 2rem;
      }
    }
  }
</style>
