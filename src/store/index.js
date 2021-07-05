import { createStore } from 'vuex'
import blog from './modules/blog'

export default createStore({
    modules: {
      blog
    }
  })