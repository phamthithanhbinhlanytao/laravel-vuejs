<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controller\PostController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/posts','PostController@get_all_post');
Route::get('/singlepost/{id}','PostController@getpost_by_id');
Route::get('/categories','PostController@get_all_category');
Route::get('/categorypost/{id}','PostController@get_all_post_by_cat_id');
Route::get('/search','PostController@search_post');
Route::post('/addpost','PostController@add_post');
Route::get('/comments/{id}','PostController@get_comment');
Route::post('/comment/{id}','PostController@post_comment');
Route::prefix('/all-post')->group(function(){
    Route::get('/','PostController@all_post');
    Route::get('/del-temporary/{id}','PostController@del_temporary');
    Route::get('/view-data-del','PostController@view_data_del');
    Route::get('/del-forever/{id}','PostController@del_forever');
    Route::get('/back-up-post/{id}','PostController@back_up_post');
});

