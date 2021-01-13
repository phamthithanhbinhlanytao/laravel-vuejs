<template>
  <div>
    <div class="container" style="padding-bottom: 250px">
      <div class="row">
        <!-- Blog Entries Column -->
        <div class="col-md-8">
          <h1 class="my-4">Add New Post</h1>

          <!-- Blog Post -->
          <div class="card mb-4">
            <div class="card-body">
              <div>

                <!-- <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                  <li v-for="(error,index) in errors" :key="index">{{ error }}</li>
                </ul>
              </p> -->
                <div class="form-group" >

                  <label>Title</label>
                  <input
                    class="form-control"
                    name="title"
                    v-model="post.title"
                    @input="setTitle($event.target.value)"
                  />
                </div>
                <div class="error" v-if="!$v.post.title.required">Field is required</div>
                <div class="error" v-if="!$v.post.title.minLength">Title must have at least {{$v.post.title.$params.minLength.min}} letters.</div>

                <div class="form-group">

                  <label>Content</label>
                  <textarea
                    class="form-control"
                    name="content"
                    v-model="post.content"
                    @input="setContent($event.target.value)"
                  ></textarea>
                </div>
                <div class="error" v-if="!$v.post.content.required">Field is required</div>
                <div class="error" v-if="!$v.post.content.minLength">Content must have at least {{$v.post.content.$params.minLength.min}} letters.</div>
                
                <div class="form-group">
                  <label>Category</label>
                  <select class="form-control" v-model="post.category_id">
                    <option
                      :value="category.id"
                      v-for="category in categories"
                      :key="category.id"
                    >
                      {{ category.name }}
                    </option>
                  </select>
                </div>

                <div class="form-group">
                  <label>Author</label>
                  <input
                    class="form-control"
                    name="author"
                    v-model="post.author"
                    @input="setAuthor($event.target.value)"
                  />
                </div>
                <div class="error" v-if="!$v.post.author.required">Field is required</div>
                <div class="error" v-if="!$v.post.author.minLength">Name author must have at least {{$v.post.author.$params.minLength.min}} letters.</div>
                
                <button @click="addnewPost()" :disabled="submitStatus === 'PENDING'" class="btn btn-success">
                  Add
                </button>
                  <p class="typo__p" v-if="submitStatus === 'OK'">Thanks for your submission!</p>
                  <p class="typo__p" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
                  <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar Widgets Column -->
        <div class="col-md-4"></div>
      </div>
      <!-- /.row -->
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import axios from "axios";
import Swal from "sweetalert2";
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      summitted: true,
      submitStatus: null,
      post: {
        title: "",
        content: "",
        category_id: "",
        author: "",
      },
    };
  },
  validations: {
    post: {
      title: { required, minLength: minLength(3) },
      content: { required, minLength: minLength(10) },
      author: { required, minLength: minLength(5) },
    },
  },
  mounted() {
    this.$store.dispatch("allCategories");
  },
  computed: {
    ...mapState({
      categories: (state) => state.categories,
    }),
  },
  methods: {
    setTitle(value) {
      this.post.title = value
      this.$v.post.title.$touch()
    },
    setContent(value) {
      this.post.content = value
      this.$v.post.content.$touch()
    },
    setAuthor(value) {
      this.post.author = value
      this.$v.post.author.$touch()
    },
    submit() {
      console.log('submit!')
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        // do your submit logic here
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
        }, 500)
      }
    },
    addnewPost() {

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      if (
        (this.post.title ) &&
        (this.post.author ) &&
        (this.post.content )
      ) {
        this.$store.dispatch("addPost", {
          category_id: this.post.category_id,
          title: this.post.title,
          content: this.post.content,
          author: this.post.author,
        });
        Toast.fire({
          icon: "success",
          title: "Addpost in successfully",
        });
        this.post.title = "";
        this.post.content = "";
        this.post.author = "";
      } else{
        alert('Please fill in the input box')
      }
    },
  },
};
</script>
<style>
.error {
  color: red;
}
</style>