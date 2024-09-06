<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/login', [UserController::class, 'login']);
Route::post('/register', [UserController::class, 'register']);



Route::group(['middleware' => ['auth:sanctum']], function(){
//  Route::post('/auth/register', [AuthController::class, 'register'])->middleware('restrictRole:admin');
// Route::get('/users', [PostController::class, 'show'])->middleware('restrictRole:admin');
// Route::put('/users/{id}', [PostController::class, 'update'])->middleware('restrictRole:moderator');

    Route::post('/logout', [UserController::class, 'logout']);
    Route::get('/users', [UserController::class, 'index']);
    Route::put('/users/{id}', [UserController::class, 'edit']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);

    Route::post('/task', [TaskController::class, 'store']);
    Route::get('/task', [TaskController::class, 'index']);
    Route::put('/task/{id}', [TaskController::class, 'update']);
    Route::delete('/task/{id}', [TaskController::class, 'destroy']);

});