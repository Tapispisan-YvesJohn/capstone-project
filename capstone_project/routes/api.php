<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\StudentRecordController;

Route::post('/login', [LoginController::class, 'login'])->name('api.login');

Route::post('/records', [StudentRecordController::class, 'store']);

Route::get('/records', [StudentRecordController::class, 'index']);

Route::delete('/records/{id}', [StudentRecordController::class, 'destroy']);

Route::get('/records/{id}', [StudentRecordController::class, 'show']);

Route::get('/deleted-records', [StudentRecordController::class, 'getDeletedRecords']);

