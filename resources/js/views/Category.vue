<template>  
<div>
      <div class="container">

    <div class="row">

      <!-- Blog Entries Column -->
      <div class="col-md-8">

        <h1 class="my-4">New Post Today</h1>

        <!-- Blog Post -->
        <div class="card mb-4" v-for="(post,index) in posts" :key="index">
          <div class="card-body">
            <h2 class="card-title">{{post.title}}</h2>
            <p class="card-text">{{post.content | truncate(100, '...')}}</p>
            <router-link :to="`/post/${post.id}`" class="btn btn-primary"
                > Read More &rarr;</router-link>
          </div>
          <div class="card-footer text-muted">
            Posted on {{post.created_at}} by
            {{post.author}}
          </div>
        </div>

        <!-- Pagination -->
        <ul class="pagination justify-content-center mb-4">
          <li class="page-item">
            <a class="page-link" href="#">&larr; Older</a>
          </li>
          <li class="page-item disabled">
            <a class="page-link" href="#">Newer &rarr;</a>
          </li>
        </ul>

      </div>

      <!-- Sidebar Widgets Column -->
      <div class="col-md-4">

        <!-- Search Widget -->
        <div class="card my-4">
          <h5 class="card-header">Search</h5>
          <div class="card-body">
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Search for...">
              <span class="input-group-append">
                <button class="btn btn-secondary" type="button">Go!</button>
              </span>
            </div>
          </div>
        </div>

        <!-- Categories Widget -->
        <div class="card my-4">
          <h5 class="card-header">Categories</h5>
          <div class="card-body">
            <div class="row">
              <div class="col-lg-6" v-for="(category,index) in categories" :key="index">
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
import {mapState} from 'vuex'

 export default {
    computed: {
      ...mapState({
        posts: state => state.posts,
        categories: state => state.categories
      })
    },
    async mounted() {
      await this.$store.dispatch("getPostByCatId", this.$route.params.id)
      await this.$store.dispatch("allCategories")
    },
 } 
</script>
<style>  </style>