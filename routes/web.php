<?php

use App\Http\Controllers\data_controller;
use App\Http\Controllers\index_controller;
use App\Http\Controllers\api_controller;
use Illuminate\Support\Facades\Route;

Route::get('/load_dummy_data', [data_controller::class, 'load_dummy_data']);
Route::get('/', [index_controller::class, 'index']);
Route::get('/api/get_age_bracket', [api_controller::class, 'get_age_bracket']);
Route::get('/api/get_gender', [api_controller::class, 'get_gender']);
Route::get('/api/get_reason', [api_controller::class, 'get_reason']);
Route::get('/api/get_count', [api_controller::class, 'get_count']);