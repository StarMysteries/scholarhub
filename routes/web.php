<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\ScholarshipController;
use App\Http\Controllers\UserAuthController;

// Student's Homepage
Route::get('/', function () {
    return view('App');
});
// Course and Scholarships API
Route::get('/courses', [CourseController::class, 'index']);
Route::get('/scholarships', [ScholarshipController::class, 'index']);

// About Page
Route::get('/about', function () {
    return view('App');
});

// Scholarship Provider Pages
Route::get('/donor', function () {
    return view('App');
});
Route::get('/scholarship_form', function () {
    return view('App');
});
Route::get('/applicant_status', function () {
    return view('App');
});
Route::get('/declined_status', function () {
    return view('App');
});
Route::get('/accepted_status', function () {
    return view('App');
});
Route::get('/view_more', function () {
    return view('App');
});

// Login Page
Route::get('/login', function () {
    return view('App');
});
// Login & Logout API
Route::post('/login', [UserAuthController::class, 'login']);
Route::post('/logout', [UserAuthController::class, 'logout']);

// Unauthorized Page
Route::get('/unauthorized', function () {
    return view('App');
});