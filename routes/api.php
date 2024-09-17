<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\StudentRecordController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\RBACController;

Route::post('/login', [LoginController::class, 'login'])->name('api.login');

Route::post('/records', [StudentRecordController::class, 'store']);

Route::get('/records', [StudentRecordController::class, 'index']);

Route::delete('/records/{id}', [StudentRecordController::class, 'destroy']);

Route::get('/records/{id}', [StudentRecordController::class, 'show']);

Route::get('/deleted-records', [StudentRecordController::class, 'getDeletedRecords']);

Route::post('/records/retrieve/{id}', [StudentRecordController::class, 'retrieveDeletedRecord']);

Route::delete('/records/permanently-delete/{id}', [StudentRecordController::class, 'deletePermanently']);

Route::put('/records/{id}', [StudentRecordController::class, 'update']);

Route::middleware(['auth:api'])->group(function () {
    Route::get('/appointments', [AppointmentController::class, 'index']);
    Route::post('/appointments', [AppointmentController::class, 'store']);
    Route::delete('/appointments/{id}', [AppointmentController::class, 'destroy']);
    Route::post('/appointments/{id}/accept', [AppointmentController::class, 'accept']);
});

Route::middleware(['auth:api'])->group(function () {
    Route::post('/roles', [RBACController::class, 'storeRole']);
    Route::post('/assign-role/{userId}', [RBACController::class, 'assignRole']);
});

Route::get('/retrieve/{id}&{email}', [LoginController::class, 'retrieve']);