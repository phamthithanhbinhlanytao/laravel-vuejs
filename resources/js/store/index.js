import axios from 'axios'
export default {
    state:{
        posts:[],
        post:[],
        categories:[],
        comments: []

    },
    getters:{

    },
    actions:{
        getblogPost({commit }){
            axios.get('/api/posts')
                .then((response)=>{
                    console.log(response.data)
                    commit('setPosts', response.data.posts)
                })
        },
        getDelTemporary({dispatch},data){
            axios.get('api/all-post/del-temporary/' + data.id,data)
                .then((res) => {
                    console.log(res.data)
                    dispatch('getPost',res.data)
                })
        },
        getPost({commit }){
            axios.get('/api/all-post')
                .then((response)=>{
                    console.log(response.data)
                    commit('Posts', response.data.posts)
                })
        },
        getPostById({commit }, postId){
            axios.get('/api/singlepost/' + postId)
                .then((response)=>{
                    console.log(response.data)
                    commit('setPost', response.data.post)
                })
        },
        allCategories({commit }){
            axios.get('/api/categories')
                .then((response)=>{
                    commit('setCategories', response.data.categories)
                })
        },
        getPostByCatId({commit },categoryId){
            axios.get('/api/categorypost/'+categoryId)
                .then((response)=>{
                    console.log(response.data.posts)
                    commit('setPostByCatId',response.data.posts)
                })
        },
        getComment({commit},postId){
            axios.get('/api/comments/'+postId)
            .then((response)=>{
                console.log(response.data.comments)
                commit('setComment',response.data.comments)
            })
        },
        postComment({dispatch}, data){
            axios.post('/api/comment/'+data.id, data)
            .then((response)=>{
                console.log(response.data)
                dispatch('getPostById',data.id)
            })
        },
        addPost({ dispatch }, data){
            axios.post('/api/addpost',data)
                .then((response) => {
                    console.log(response.data)
                    dispatch('getblogPost')
                })
                .catch((e) => {
                    alert("addpost no successfully")
                })
        }
    },
    mutations:{
        setPosts(state, payload){
            state.posts = payload
        },
        Posts(state, payload){
            state.posts = payload
        },
        setPost (state, post){
            state.post = post
        },
        setCategories(state,payload){
            state.categories = payload
        },
        setAddPost(state,addpost){
            state.posts = addpost
        },
        setPostByCatId(state,categoryId){
            state.posts = categoryId
        },
        getSearchPost(state,data){
            state.posts = data
        },
        setComment(state,data){
            state.post.comments = data
        },
       


    }
}