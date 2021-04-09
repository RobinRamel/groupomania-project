import Api from '@/services/Api'

export default {
  
  createComment(comment) {
    return Api().post('comment', comment);
  },

  deleteComment(commentId) {
    return Api().delete(`/comment/${commentId}`)
  },

  modifyComment(commentId, comment) {
    return Api().put(`/comment/${commentId}`, comment)
  }
}
