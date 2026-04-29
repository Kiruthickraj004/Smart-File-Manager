<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FileController;
use App\Http\Controllers\FolderController;

Route::get('/files', [FileController::class, 'index']);
Route::post('/upload', [FileController::class, 'store']);
Route::delete('/files/{id}', [FileController::class, 'destroy']);

Route::get('/folders', [FolderController::class, 'index']);
Route::post('/folders', [FolderController::class, 'store']);
