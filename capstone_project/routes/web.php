<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('landing');
})->name('landing.index');

Route::get('/student/dashboard', function () {
    return view('student.dashboard');
})->name('student.dashboard');

Route::get('/admin/dashboard', function () {
    return view('admin.dashboard');
})->name('admin.dashboard');
