<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container">
      <a class="navbar-brand" href="index.html">Start Bootstrap</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
          <router-link to="/" class="nav-link"> Home </router-link>
          </li>
          <li class="nav-item">
          <router-link to="/add-post" class="nav-link"> Add Post</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/validate" class="nav-link"> Validate</router-link>
          </li>
          <li class="nav-item">
            
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
    export default {
        name: 'Header',
    }
</script>

<style>
</style>