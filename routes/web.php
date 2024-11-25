<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\UserAuthController;

Route::get('/', function () {
    return view('App');
});

Route::get('/courses', [CourseController::class, 'index']);

Route::get('/about', function () {
    return view('App');
});

Route::get('/admin', function () {
    return view('App');
});

Route::get('/donor', function () {
    return view('App');
});

Route::get('/login', function () {
    return view('App');
});
Route::post('/login', [UserAuthController::class, 'login']);
Route::post('/logout', [UserAuthController::class, 'logout']);

Route::get('/unauthorized', function () {
    return view('App');
});