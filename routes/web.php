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

    Route::get('/register', function () {
        return view ('welcome');
    });

    Route::get('/records', function () {
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

    Route::get('/reports', function () {
        return view ('welcome');
    });

    Route::get('/reports/import', function () {
        return view ('welcome');
    });

    Route::get('/view-record/{student_id}', function ($student_id) {
        $print = request()->query('print', false); // Fetch query parameter "print"
        // Logic to fetch student record and pass to view
        return view('welcome', ['student_id' => $student_id, 'print' => $print]);
    });
});