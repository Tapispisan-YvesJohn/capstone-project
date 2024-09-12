<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\CheckToken;

Route::get('/', function () {
    return view('welcome');
});

// Appointment Routes
Route::middleware([CheckToken::class])->group(function () {
    Route::get('/login', function () {
        return view ('welcome');
    });

    Route::get('/appointments', function () {
        return view ('welcome');
    });

    Route::get('/student-records', function () {
        return view ('welcome');
    });

    Route::get('/review-applicants', function () {
        return view ('welcome');
    });

    Route::get('/create-record', function () {
        return view ('welcome');
    });

    Route::get('/history', function () {
        return view ('welcome');
    });

    Route::get('/application-status', function () {
        return view ('welcome');
    });
});
