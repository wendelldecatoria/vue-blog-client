<template>
    <div class="container">
        <div class="content">
          <div class="post">
            <div>
              <h1>{{ post.title }}</h1>
              <h5>{{ post.author }}</h5>
              <p>{{ post.body }}</p>

              <hr>
              <h3>Comments</h3>

              <div class="add-comment">
                <p v-if="name_error" class="error">*Name is required</p>
                <input v-model="user" placeholder="Name" class="input">
                <br>
                <p v-if="description_error" class="error">*Description is required</p>
                <textarea v-model="description" placeholder="Description"></textarea>
                <button class="button" @click="createComment()">Add Comment</button>
                <br><br>
                <hr>
              </div>

              <span v-if="post.comments">
              <div v-for="comment in post.comments" :key="comment.id" class="comment">
                <h4><b>{{ comment.name }}</b></h4>
                <p class="description">{{ comment.description }}</p>

                <button v-if="!reply" @click="showReplyDialog(comment.id)" class="button">Reply</button>

                <div v-if="reply" class="add-reply">
                  <p v-if="name_error" class="error">*Name is required</p>
                  <input v-model="user" placeholder="Name" class="input">
                  <br>
                  <p v-if="description_error" class="error">*Description is required</p>
                  <textarea v-model="description" placeholder="Description"></textarea>
                  <button class="button" @click="submitReply()">Submit</button>
                  <button class="button" @click="cancelReply()">Cancel</button>
                  <br><br>
                  <hr>
                </div>

                <div v-for="reply0 in comment.replies" :key="reply0.id" class="reply0">
                  <h3><b>{{ reply0.name }}</b></h3>
                  <p class="description">{{ reply0.description }}</p>

                  <button v-if="!reply" @click="showReplyDialog(reply0.id)" class="button">Reply</button>

                  <div v-if="reply" class="add-reply">
                    <p v-if="name_error" class="error">*Name is required</p>
                    <input v-model="user" placeholder="Name" class="input">
                    <br>
                    <p v-if="description_error" class="error">*Description is required</p>
                    <textarea v-model="description" placeholder="Description"></textarea>
                    <button class="button" @click="submitReply()">Submit</button>
                    <button class="button" @click="cancelReply()">Cancel</button>
                    <br><br>
                    <hr>
                  </div>

                  <span v-if="reply0.replies">
                  <div v-for="reply1 in reply0.replies" :key="reply1.id" class="reply1">
                    <h3><b>{{ reply1.name }}</b></h3>
                    <p class="description">{{ reply1.description }}</p>
                  </div>
                  </span>

                </div>
              </div>
              </span>
            </div>
          </div>
        </div>
    </div>
</template>

<script>

import { mapState, mapActions } from 'vuex'

export default {
  name: 'BlogComponent',
  data() {
    return {
      user: '',
      description: '',
      parent_id: null,
      name_error: true,
      description_error: true,
      reply: false
    } 
  },
  created() {
    this.fetchPosts()
  },
  computed: {
    ...mapState({
        post: state => state.blog.post,
        parent_id: state => state.blog.parent_id
    }),

  },
  watch: {
    user() {
      if(this.user.length > 0) {
        this.name_error = false
        this.setUser(this.user)
      } else {
        this.name_error = true
      }
    },
    description() {
        if(this.description.length > 0) {
          this.description_error = false
          this.setDescription(this.description)
        } else {
          this.description_error = true;
        }
    },
  },
  methods: {
    ...mapActions('blog', [
        'setUser', 
        'setDescription',
        'setParentId'
    ]),
    fetchPosts() {
      this.$store.dispatch('blog/getPosts')
      .then(() => {    
      
      }).catch(e => {
        // TODO: setup error handling
        console.log(e)
      })
    },
    createComment() {
      if(this.user.length > 0 && this.description.length > 0) {
        this.$store.dispatch('blog/createComment')
        .then(() => {    
          this.fetchPosts()
          this.user = ''
          this.description = ''
          this.name_error = true
          this.description_error = true
        }).catch(e => {
          // TODO: setup error handling
          console.log(e)
        })
      }
    },
    showReplyDialog(parent_id){
      this.reply = true
      this.setParentId(parent_id)
    },
    cancelReply(){
      this.reply = false
      this.setParentId = null
    },
    submitReply(){
      if(this.user.length > 0 && this.description.length > 0) {
        this.$store.dispatch('blog/createComment')
        .then(() => {    
          this.fetchPosts()
          this.user = ''
          this.description = ''
          this.name_error = true
          this.description_error = true
          this.reply = false
        }).catch(e => {
          // TODO: setup error handling
          console.log(e)
        })
      }
    }
  }
}
</script>

<style scoped>
.content {
  text-align: left;
}

.post {
  margin-left: 25%;
  margin-right: 25%;
  font-size: 15pt;
  background-color: #FFF;
  padding: 15px;
  border-left: 1px solid #A0A0A0;
  border-right: 1px solid #A0A0A0;
}

.comment {
  font-size: 15px;
  margin: 5px 0px 5px 0px;
  padding: 10px;
}

.reply0 {
  margin-left: 15px;
}

.reply1 {
  margin-left: 30px;
}

.description {
  margin-left: 10px;  
}

.button {
    width: 120px;
    height: 30px;
    background-color: #353A40;
    color: #FFF;
    border-radius: 3px;
    border: 0px;
    margin: 0px 10px 0px 10px;
}

button:active {
    background-color: #F7F7F7;
    color: #353A40;
}

.input {
    width: 90%;
    height: 30px;
    border-radius: 3px;
    border: 1px solid #A0A0A0;
    margin: 5px 10px 5px 10px;
    padding: 5px;
}

textarea {
  width: 90%;
  height: 100px;
  border-radius: 3px;
  border: 1px solid #A0A0A0;
  margin: 5px 10px 5px 10px;
  padding: 5px;
}

hr {
  border: 1px solid #A0A0A0;
}

.add-comment {
  margin: 10px;
}

.error {
  font-size: 9px;
  font-weight: bold;
  color: #E04A4A;
}

</style>