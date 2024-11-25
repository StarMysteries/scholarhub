<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\DonorScholarshipController;
use App\Http\Controllers\ScholarshipController;
use App\Http\Controllers\UserAuthController;

// About Page
Route::get('/about', function () {
    return view('App');
});



//Admin
Route::get('/admin', function () {
    return view('App');
});

// Student's Homepage
Route::get('/', function () {
    return view('App');
});

Route::get('/more_info', function () {
    return view('App');
});

// Course and Scholarships API
Route::get('/courses', [CourseController::class, 'index']);
Route::get('/scholarships', [ScholarshipController::class, 'index']);



// Scholarship Provider Pages
Route::get('/donor', function () {
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


// Provider/Donor API
Route::get('/donor_scholarships', [DonorScholarshipController::class, 'index'])->middleware('auth');

// Login Page
Route::get('/login', function () {
    return view('App');
});

Route::get('/signup', function () {
    return view('App');
});

Route::get('/signup_student', function () {
    return view('App');
});

Route::get('/signup_provider', function () {
    return view('App');
});


Route::get('/forgot_password', function () {
    return view('App');
});

// Login & Logout API
Route::post('/login', [UserAuthController::class, 'login']);
Route::post('/logout', [UserAuthController::class, 'logout']);

// Unauthorized Page
Route::get('/unauthorized', function () {
    return view('App');
});