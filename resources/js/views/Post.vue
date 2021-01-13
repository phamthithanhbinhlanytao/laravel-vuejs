<template>
  <div>
    <div class="container">
      <div class="row">
        <!-- Blog Entries Column -->
        <div class="col-md-8">
          <h1 class="my-4">New Post Today</h1>

          <!-- Blog Post -->
          <div class="card mb-4" v-for="(post, index) in posts" :key="index">
            <div class="card-body">
              <h2 class="card-title">{{ post.title }}</h2>
              <p class="card-text">
                {{ post.content | truncate(100, '...') }}
              </p>
              <router-link :to="`/post/${post.id}`" class="btn btn-primary"
                > Read More &rarr;</router-link>
            </div>
            <div class="card-footer text-muted">
             <p> Posted on {{ post.created_at }} by {{post.author}}</p>
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
                <input type="text" v-model="searchQuery" placeholder="Search title.."/>
                <span class="input-group-append">
                  <button class="btn btn-secondary" type="button"  v-if="posts.length" >Go!</button>
                </span>
              </div>
              <ul v-for="item in resultQuery" :key="item.id">
                  <router-link :to="`/post/${item.id}`">{{item.title}}</router-link>
              </ul>
            </div>
          </div>

          <!-- Categories Widget -->
          <div class="card my-4">
            <h5 class="card-header">Categories</h5>
            <div class="card-body">
              <div class="row">
                <div class="col-lg-6">
                  <ul
                    class="list-unstyled mb-0"
                    v-for="(category, index) in categories"
                    :key="index"
                  >
                    <li>
                      <i class="icon-folder-open"></i
                      ><router-link :to="`/category/${category.id}`">{{ category.name }}</router-link>
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
import { mapState } from "vuex";

export default {
  name: "Post",
  data(){
    return{
     searchQuery: null
    }
  },
  mounted() {
    this.$store.dispatch("getblogPost");
    this.$store.dispatch("allCategories");
  },
  computed: {
    ...mapState({
      posts: state => state.posts,
      categories: state => state.categories
    }),
    resultQuery(){
      if(this.searchQuery){
      return this.posts.filter((item)=>{
        return this.searchQuery.toLowerCase().split(' ').every(v => item.title.toLowerCase().includes(v))
      })
      }else{
        return this.posts;
      }
    }
  }
}
</script>