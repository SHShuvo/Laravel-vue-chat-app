<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Chat\ChatController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});


//Auth routes
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout'])->middleware('auth');

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/users', [LoginController::class, 'index']);
    Route::get('/messages/{friend_id}', [ChatController::class, 'index']);
    Route::post('/send-message', [ChatController::class, 'sendMessage']);
});


Route::get('/{any?}', function () {
    return view('welcome');
})->where('any', '^(?!api\/)[\/\w\.-]*');
