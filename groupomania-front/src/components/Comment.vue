<template>
  <div class="comment">
    <div class="comment__left">
      <p class="comment__author"> {{ author }}</p>
      <p v-if="modification === false" class="comment__content">
        {{ commentContent }}
      </p>

      
      <b-form-input v-if="modification === true"
        id="comment-modification"
        type="text"
        v-model="commentContent"
      >
      </b-form-input>  
      
    </div>
    <div class="comment__right" v-if="this.$store.state.isUserLoggedIn && (this.$store.state.user.id === this.$props.userId || this.$store.state.user.role === 'admin')">
      <div class="comment__right__remove">
        <b-icon @click="removeComment" icon="x-circle" scale="2" variant="danger"></b-icon>
      </div>
      <div class="comment__right__modify" v-if="this.$store.state.user.id === this.$props.userId">
        <b-icon v-if="modification === false"  @click="modifyOn" icon="pencil-square" scale="2" variant="black"></b-icon>
        <b-icon v-if="modification === true"  @click="modifyComment" icon="check-circle-fill" scale="2" variant="success"></b-icon>
      </div>
    </div>
  </div>
</template>

<script>
import CommentsService from '@/services/CommentsService'

export default {
  name: 'Post',
  props: {
    id: Number,
    content: String,
    createdAt: String,
    userId: Number,
    author: String
  },
  data() {
    return {
      modification: false,
      commentContent: this.$props.content
    }
  },
  methods: {
    async removeComment() {
      CommentsService.deleteComment(this.$props.id)
        .then(response => {
          console.log(response.data.message)
          this.$emit('comment-removed', {
            id: this.$props.id
          })
        })
        .catch(error => {
          console.log(error)
        })
    },

    modifyOn() {
      this.modification = true
    },

    async modifyComment() {
        CommentsService.modifyComment(this.$props.id, { 
          comment: {
            content: this.commentContent
          } 
          })
          .then(response => {
            console.log(response.data.message)
            this.modification = false 
          })
          .catch(error => {
            console.log(error)
          })
    }


  },
}
</script>

<style lang="scss">
  .comment {
    margin-bottom: 2rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 0.5rem;

    &__right {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 45px;


      svg:hover {
        cursor: pointer;
      }
    }

    &__author {
      color: #006594;
      margin: 0;
      font-size: 1.7rem;
      line-height: 1.7rem;
    }

    p {
      margin-bottom: 0 !important;
    }
  }
</style>
