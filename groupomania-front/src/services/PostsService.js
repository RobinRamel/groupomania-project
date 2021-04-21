import Api from '@/services/Api'

export default {
  // register (credentials) {
  //    return Api().post('register', credentials)
  // },
  getAllPosts() {
    return Api().get('');
  },

  createPost(formData) {
    return Api().post('', formData);
  },

  deletePost(postId) {
    return Api().delete(`${postId}`)
  },

  updatePost(postId, formData) {
    return Api().put(`${postId}`, formData)
  },

  getOnePost(postId) {
    return Api().get(`${postId}`)
  }
}
