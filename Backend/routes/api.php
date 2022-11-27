<?php

use App\Http\Controllers\ControllerProducts;
use App\Http\Controllers\ControllerUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [ControllerUsers::class, 'register']);
Route::post('/register-admin', [ControllerUsers::class, 'registerUserAdmin']);
Route::post('/login', [ControllerUsers::class, 'loginUser']);
Route::get('/get-all-users', [ControllerUsers::class, 'getAllUsers']);

// FOR PRODUCTS
Route::get('/get-products/{country}/{userID}', [ControllerProducts::class, 'getProducts']);
Route::get('/get-products-terminal', [ControllerProducts::class, 'getProductsTerminalAndSuperUser']);
Route::get('/product/{id}', [ControllerProducts::class, 'product']);
Route::get('/search/{value}', [ControllerProducts::class, 'searchProduct']);
Route::post('/remove-product/{id}', [ControllerProducts::class, 'removeProduct']);
Route::post('/remove-image-product', [ControllerProducts::class, 'removeProductImage']);
Route::post('/change-product', [ControllerProducts::class, 'changeProduct']);
Route::post('/remove-address/{id}', [ControllerProducts::class, 'removeAddress']);
Route::post('/rename-product', [ControllerProducts::class, 'changeNameProduct']);
Route::post('/change-description-product', [ControllerProducts::class, 'changeDescriptionProduct']);
Route::post('/create-address-product', [ControllerProducts::class, 'createAddressProduct']);
Route::post('/change-address', [ControllerProducts::class, 'changeInfoAddress']);
Route::post('/upload-file-product', [ControllerProducts::class, 'uploadFileProduct']);

// FOR ADMIN HANDLES
Route::prefix('admin')->group(function (){
  Route::post('/change-user-info', [ControllerUsers::class, 'ChangeUserInfo']);
  Route::post('/remove-user', [ControllerUsers::class, 'removeUser']);
  Route::post('/create-product', [ControllerProducts::class, 'createProduct']);
});

