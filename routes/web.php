<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'Home')->name('home');

Route::inertia('/shop', 'Shop')->name('shop');

Route::inertia('/products/{slug}', 'ProductDetail')->name('products.show');

Route::inertia('/checkout', 'Checkout')->name('checkout');

Route::inertia('/welcome', 'Welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('welcome');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'Dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
