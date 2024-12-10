<?php

use App\Http\Controllers\ApplicationsController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\DonorScholarshipController;
use App\Http\Controllers\ScholarshipController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\UserAuthController;
use App\Http\Controllers\ApplicantController;
use App\Http\Controllers\ProviderController;
use App\Http\Controllers\AddScholarshipController;


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

Route::get('/scholarship_form', function () {
    return view('App');
});

Route::get('/more_info', function () {
    return view('App');
});

Route::get('/scholarship', action: [ScholarshipController::class, 'getScholarshipDetails']);


Route::get('/applied_scholarships', function () {
    return view('App');
});

// Course and Scholarships API
Route::get('/courses', [CourseController::class, 'index']);
Route::get('/scholarships', [ScholarshipController::class, 'index']);
Route::get('/student/{user_id}', [StudentController::class, 'getStudentByUserId']);
Route::put('/student/update/{user_id}', [StudentController::class, 'updateStudent']);





// Scholarship Provider Pages
Route::get('/donor', function () {
    return view('App');
});

Route::get('/form', function () {
    return view('App');
});
Route::get('/application_status/{scholarshipId}', function () {
    return view('App');
});
// Provider/Donor API
Route::get('/donor_scholarships', [DonorScholarshipController::class, 'index'])->middleware('auth');

Route::get('/scholarship/{scholarshipId}', [ScholarshipController::class, 'getScholarshipbyId']);
Route::put('/scholarship/update/{scholarshipId}', [ScholarshipController::class, 'updateScholarship']);

Route::get('/applicant_status/{scholarshipId}', [ApplicantController::class, 'getApplicantsByScholarship']);
Route::get('/provider/{user_id}', [ProviderController::class, 'getProviderByUserId']);
Route::put('/provider/update/{user_id}', [ProviderController::class, 'updateProvider']);
Route::put('/scholarships/{id}/status', action: [ScholarshipController::class, 'updateStatus']);

Route::post('/create_scholarships', [AddScholarshipController::class, 'store'])->middleware('auth');
Route::get('/student_applications', [ApplicationsController::class, 'getStudentApplications'])->middleware('auth');

Route::get('/view_more', function () {
    return view('App');
});
Route::put('/applications/{application_id}', action: [ApplicantController::class, 'updateStatus']);
Route::get('/applicant/{application_id}', [ApplicantController::class, 'getApplicantDetails']);

Route::post('/submit-application', [ApplicationsController::class, 'submitApplication'])->middleware('auth');






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
Route::post('/register_student', [StudentController::class, 'registerStudent']);
Route::get('/signup_provider', function () {
    return view('App');
});
Route::post('/register_provider', [ProviderController::class, 'registerProvider']);

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
