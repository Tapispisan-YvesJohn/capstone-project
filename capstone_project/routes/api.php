<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\StudentRecordController;

Route::post('/login', [LoginController::class, 'login'])->name('api.login');

Route::post('/records', [StudentRecordController::class, 'store']);
