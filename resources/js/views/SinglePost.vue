<template>
  <div>
    <div class="container">
      <div class="row">
        <!-- Post Content Column -->
        <div class="col-lg-8">
          <!-- Title -->
          <h1 class="mt-4">{{ post.title }}</h1>

          <!-- Author -->
          <p class="lead">
            by
            <a href="#">{{ post.author }}</a>
          </p>

          <hr />

          <!-- Date/Time -->
          <p>Posted on {{ post.created_at }}</p>

          <hr />

          <!-- Post Content -->
          <p class="lead">{{ post.content }}</p>

          <hr />

          <!-- Comments Form -->
          <div class="card my-4">
            <h5 class="card-header">Leave a Comment:</h5>
            <div class="card-body">
              <div>
                <div class="form-group">
                  <input class="form-control" placeholder="name" v-model="comment.name" required>
                </div>
                <div class="form-group">
                  <textarea class="form-control" rows="3" v-model="comment.content" required></textarea>
                </div>
                <button @click="addComment()" class="btn btn-primary" v-if="comment.name && comment.content">Submit</button>
              </div>
            </div>
          </div>

          <!-- Single Comment -->
          <div class="media mb-4" v-for="(comment,index) in post.comments" :key="index">
            <img
              class="d-flex mr-3 rounded-circle"
              src="http://placehold.it/50x50"
              alt=""
            />
            <div class="media-body">
              <h5 class="mt-0"> {{comment.name}} </h5>
              {{comment.content}}
            </div>
          </div>
        </div>

        <!-- Sidebar Widgets Column -->
        <div class="col-md-4">
          <!-- Categories Widget -->
          <div class="card my-4">
            <h5 class="card-header">Categories</h5>
            <div class="card-body">
              <div class="row">
                <div class="col-lg-6" v-for="(category, index) in categories"
                    :key="index">
                  <ul class="list-unstyled mb-0">
                    <li>
                      <router-link :to="`/category/${category.id}`">{{category.name}}</router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /.row -->
    </div>
  </div>
</template>
<script>
import Axios from 'axios';
  import { mapState } from "vuex"

  export default {
    data(){
      return{
        comment:{
          name:"",
          content:""
        }
      }
    },
    methods:{
      addComment() {
        this.$store.dispatch("postComment", {
          id: this.$route.params.id,
          name: this.comment.name,
          content:this.comment.content
        })
        this.comment.name = "";
        this.comment.content = "";
      }
    },
    computed: {
      ...mapState({
        post: state => state.post,
        categories: state => state.categories
      })
    },
    async mounted() {
      await this.$store.dispatch("getPostById", this.$route.params.id)
      await this.$store.dispatch("allCategories")
    },
  }
</script>
