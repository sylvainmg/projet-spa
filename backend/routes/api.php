<?php

// routes/api.php
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\BankLoanController;
use App\Http\Controllers\LogController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    // protected rooutes
    Route::middleware('auth:sanctum')->group(function () {
        // auth
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);
    });
});

// resources
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('prets', BankLoanController::class)
        ->parameters(['prets' => 'numCompte'])
        ->except(['show']);
    Route::get('/historique', [LogController::class, 'index']);
});

Route::get("/", function () {
    return response()->json(['status' => 'ok']);
});