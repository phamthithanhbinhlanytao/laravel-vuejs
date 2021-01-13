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
               <button @click="remove(post.id)">remove temporary</button>
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

          <!-- Categories Widget -->
          <div class="card my-4">
            <h5 class="card-header">Categories</h5>
            <div class="card-body">
              <div class="row">
                <div class="col-lg-6">
                  <ul
                    class="list-unstyled mb-0"
                  >
                    <li>
                      <i class="icon-folder-open"></i
                      >Restore <input type="text" placeholder="id back-up">
                    </li>
                    <li>
                      <i class="icon-folder-open"></i
                      >view data deleting
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
  name: "Posts",
  data(){
    return{
     searchQuery: null
    }
  },
  mounted() {
    this.$store.dispatch("getPost");
    this.$store.dispatch("allCategories");
  },
  methods:{
      remove(e) {
        this.$store.dispatch("getDelTemporary",e)
      }
  },
  computed: {
    ...mapState({
      posts: state => state.posts,
      categories: state => state.categories
    }),
  }
}
</script>