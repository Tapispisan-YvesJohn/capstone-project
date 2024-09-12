<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\StudentRecordController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\RBACController;
use App\Http\Middleware\CheckToken;

Route::get('/', function () {
    return view('welcome');
});

// Login
Route::get('/login', [LoginController::class, 'login'])->name('web.login');

// Student Records Routes
Route::get('/records', [StudentRecordController::class, 'index']);
Route::post('/records', [StudentRecordController::class, 'store']);
Route::get('/records/{id}', [StudentRecordController::class, 'show']);
Route::delete('/records/{id}', [StudentRecordController::class, 'destroy']);
Route::put('/records/{id}', [StudentRecordController::class, 'update']);
Route::get('/deleted-records', [StudentRecordController::class, 'getDeletedRecords']);
Route::post('/records/retrieve/{id}', [StudentRecordController::class, 'retrieveDeletedRecord']);
Route::delete('/records/permanently-delete/{id}', [StudentRecordController::class, 'deletePermanently']);

// Appointment Routes
Route::middleware([CheckToken::class])->group(function () {
    Route::get('/appointments', [AppointmentController::class, 'index']);
    Route::post('/appointments', [AppointmentController::class, 'store']);
    Route::delete('/appointments/{id}', [AppointmentController::class, 'destroy']);
    Route::post('/appointments/{id}/accept', [AppointmentController::class, 'accept']);
});

// Role-Based Access Control (RBAC) Routes
Route::middleware([CheckToken::class])->group(function () {
    Route::post('/roles', [RBACController::class, 'storeRole']);
    Route::post('/assign-role/{userId}', [RBACController::class, 'assignRole']);
});