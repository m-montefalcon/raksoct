<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Login');
});

Route::get('/register', function () {
    return Inertia::render('Register');
});



Route::get('/admin/home', function () {
    return Inertia::render('AdminHome');
});


Route::get('/manager/home', function () {
    return Inertia::render('ManagerHome');
});


Route::get('/user/home', function () {
    return Inertia::render('UserHome');
});