<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Category;
use App\Models\Comment;

class PostController extends Controller
{
    public function  get_all_post(){
        $posts = Post::with('comments','category')->latest()->get();

        return response()->json([
            'posts' => $posts
        ],200);
    }

    public function  all_post(){
        $posts = Post::with('comments','category')->get();

        return response()->json([
            'posts' => $posts
        ],200);
    }

    public function del_temporary($id){
        $post = Post::where('id',$id)->delete();

        if($post){
            return $post = Post::all();
        } else {
            return false;
        }
    }

    public function view_data_del(){
        $posts = Post::onlyTrashed()->get();

        return $posts;
    }

    public function del_forever($id){
        $post = Post::withTrashed()->where('id', $id)->forceDelete();

        if($post){
            return $post = Post::all();
        } else {
            return false;
        }
    }

    public function back_up_post($id){
        $post = Post::withTrashed()->where('id', $id)->restore();

        if($post){
            return $post = Post::all();
        } else {
            return false;
        }
    }

    public function getpost_by_id($id){
        $post = Post::with('comments','category')->find($id);
        return response()->json([
            'post' => $post
        ],200);
    }

    public function get_all_category(){
        $categories = Category::all();
        return response()->json([
            'categories' => $categories
        ],200);
    }

    public function get_all_post_by_cat_id($id){
        $posts = Post::with('comments','category')->where('category_id',$id)->get();
        return response()->json([
            'posts'=>$posts
        ],200);
    }

    public function add_post(Request $request){

        $request->validate([
            'title'=>'required|min:4|max:50',
            'content'=>'required|min:10|max:1000',
            'author'=>'required|min:5|max:50'
        ]);
        $post = new Post();
        $post->title = $request->title;
        $post->content = $request->content;
        $post->category_id = $request->category_id;
        $post->author=$request->author;
        $post->save();

        return response()->json('success', 200);
    }

    public function get_comment($id){
        $comment = Comment::where('post_id',$id)->get();
        return response()->json([
            'comments'=>$comment
        ],200);
    }

    public function post_comment(Request $request,$id){
        $this->validate($request,[
            'name'=>'required|min:2|max:50',
            'content'=>'required|min:2|max:1000'
        ]);
        $comments = new Comment();
        $comments->name = $request->name;
        $comments->content = $request->content;
        $comments->post_id = $id;
        $comments->save();

        return response()->json('success', 200);
    }

}
