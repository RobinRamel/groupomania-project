import Api from '@/services/Api'

export default {
  // register (credentials) {
  //    return Api().post('register', credentials)
  // },
  getAllPosts() {
    return Api().get('');
  },

  createPost(post) {
    return Api().post('', post);
  },

  deletePost(postId) {
    return Api().delete(`${postId}`)
  },

  updatePost(postId, post) {
    return Api().put(`${postId}`, post)
  },

  getOnePost(postId) {
    return Api().get(`${postId}`)
  }
}
