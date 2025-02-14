<?php

use Illuminate\Support\Facades\Route;

Route::get('customers', [CustomerController::class, 'index']);
