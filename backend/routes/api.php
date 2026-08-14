<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

// Public routes
Route::post('/auth/unlock', [AuthController::class, 'unlock'])->middleware('throttle:5,15'); // 5 attempts per 15 minutes
Route::get('/auth/status', [AuthController::class, 'status']);
Route::post('/auth/lock', [AuthController::class, 'lock']);

// Protected routes
Route::middleware('ourspace')->group(function () {
    Route::get('/our-space/test', function () {
        return response()->json(['message' => 'success', 'data' => 'This is a protected area.']);
    });
});
