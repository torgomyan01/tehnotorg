<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ControllerProducts extends Controller
{

    /**
     * Handle the incoming request.
     *
     * @param Request $request
     * @return int
     */
    public function createProduct(Request $request)
    {

      $id = DB::table('products')->insertGetId([
        'name' => $request->name,
        'description' => $request->description,
        'created_at' => Carbon::now(),
        'updated_at'=> Carbon::now()
      ]);

      $table = $request->table;
      for ($i = 0; $i < count($table['address']); $i++){
        DB::table('product_info')->insert([
          'product_id' => $id,
          'address' => $table['address'][$i],
          'country' => $table['country'][$i],
          'price' => $table['price'][$i],
          'comment' => $table['comment'][$i],
          'created_at' => Carbon::now(),
          'updated_at' => Carbon::now()
        ]);
      }

      if($id){
        $files = $request->file();

        foreach ($files['files'] as $file){
          Storage::disk('public')->putFileAs(
            'products',
            $file,
            $file->hashName()
          );

          DB::table('products_images')->insert([
            'url' => $file->hashName(),
            'product_id' => $id,
            'created_at' => Carbon::now(),
            'updated_at'=> Carbon::now()
          ]);
        }
      }

      return 1;

    }

  /**
   * Handle remove address product
   *
   * @param Request $request
   * @return Collection
   */
  public function removeAddress(Request $request)
  {
    $productId = DB::table('product_info')->where('id', $request->id)->first()->product_id;
    DB::table('product_info')->where('id', $request->id)->delete();
    return DB::table('product_info')->where('product_id', $productId)->get();
  }

  /**
   * Change name product
   *
   * @param Request $request
   * @return int
   */
  public function changeNameProduct(Request $request)
  {
    $product = DB::table('products')->where('id', $request->id);
    $product->update(['name' => $request->value]);
    return 1;
  }

  /**
   * Change description product
   *
   * @param Request $request
   * @return int
   */
  public function changeDescriptionProduct(Request $request)
  {
    $product = DB::table('products')->where('id', $request->id);
    $product->update(['description' => $request->value]);
    return 1;
  }

  /**
   * create Address product
   *
   * @param Request $request
   * @return Collection
   */
  public function createAddressProduct(Request $request): Collection
  {
    DB::table('product_info')->insert([
      'product_id' => $request->product_id,
      'address' => 'New address',
      'country' => 'New country',
      'price' => 'New price',
      'comment' => 'New comment',
      'created_at' => Carbon::now(),
      'updated_at' => Carbon::now(),
    ]);
    return DB::table('product_info')->where('product_id', $request->product_id)->get();
  }


  /**
   * change info address
   *
   * @param Request $request
   * @return array
   */
  public function changeInfoAddress(Request $request): array
  {
    DB::table('product_info')->where('id', $request->id)->update([
      'address' => $request->address,
      'country' => $request->country,
      'price' => $request->price,
      'comment' => $request->comment,
      'updated_at' => Carbon::now(),
    ]);
    return [
      'address' => $request->address,
      'country' => $request->country,
      'price' => $request->price,
      'comment' => $request->comment,
      'updated_at' => Carbon::now(),
    ];
  }

  /**
   * upload file product
   *
   * @param Request $request
   * @return Collection
   */
  public function uploadFileProduct(Request $request)
  {
    $files = $request->file();

    foreach ($files['files'] as $file){
      Storage::disk('public')->putFileAs(
        'products',
        $file,
        $file->hashName()
      );

      DB::table('products_images')->insert([
        'url' => $file->hashName(),
        'product_id' => $request->product_id,
        'created_at' => Carbon::now(),
        'updated_at'=> Carbon::now()
      ]);
    }

    return DB::table('products_images')->where('product_id', $request->product_id)->get();
  }

  /**
   * Handle GET products
   *
   * @param Request $request
   * @return array
   */
  public function getProducts(Request $request)
  {
    $user = DB::table('users')->find($request->userID);

    if($user->status === 'terminal'){
      $address = DB::table('product_info')
        ->where('country', 'like', $request->country.'%')
        ->where('address', 'like', $user->email_or_address.'%')
        ->get();
    } else {
      $address = DB::table('product_info')->where('country', $request->country)->get();
    }

    $allProducts = [];
    foreach ($address as $add){
      $_products = DB::table('products')->where('id', $add->product_id)->orderBy('id', 'desc')->get();

      foreach ($_products as $_product){
        array_push($allProducts, [
          'productInfo' => $_product,
          'address' => DB::table('product_info')->where('product_id', $_product->id)->get(),
          'images' => DB::table('products_images')->where('product_id', $_product->id)->get()
        ]);
      }


    }

    return array_map('unserialize', array_values(array_unique(array_map('serialize', $allProducts))));

  }

  /**
   * Handle GET products for terminal and superUser
   *
   * @param Request $request
   * @return array
   */
  public function getProductsTerminalAndSuperUser(): array
  {
    $_products = DB::table('products')->orderBy('id', 'desc')->get();

    $allProducts = [];
    foreach ($_products as $_product){
      array_push($allProducts, [
        'productInfo' => $_product,
        'address' => DB::table('product_info')->where('product_id', $_product->id)->get(),
        'images' => DB::table('products_images')->where('product_id', $_product->id)->get()
      ]);
    }

    return $allProducts;

  }


  /**
   * Handle GET products
   *
   * @param Request $request
   * @return Collection
   */
  public function removeProductImage(Request $request): Collection
  {

    $image = DB::table('products_images')->where('id', $request->id)->first();

    $test = unlink(public_path('storage/products/'.$image->url));

    if($test){
      DB::table('products_images')->where('id', $request->id)->delete();
    }

    return DB::table('products_images')->where('product_id', $request->product_id)->get();

  }

  /**
   * Handle GET product
   *
   * @param Request $request
   * @return array
   */
  public function product(Request $request): array
  {
    $_product = DB::table('products')->find($request->id);


    return [
      'productInfo' => $_product,
      'address' => DB::table('product_info')->where('product_id', $_product->id)->get(),
      'images' => DB::table('products_images')->where('product_id', $_product->id)->get()
    ];

  }

  /**
   * Handle search product
   *
   * @param Request $request
   * @return array
   */
  public function searchProduct(Request $request)
  {
    if(is_numeric($request->value)){
      $_products = DB::table('products')
        ->where('id', '=', $request->value)
        ->get();
    } else {
      $_products = DB::table('products')
        ->where('name', 'like', '%'.$request->value.'%')
        ->get();
    }


    $products = [];
    foreach ($_products as $_product){
      array_push($products, [
        'productInfo' => $_product,
        'address' => DB::table('product_info')->where('product_id', $_product->id)->get(),
        'images' => DB::table('products_images')->where('product_id', $_product->id)->get()
      ]);
    }

    return $products;

  }

  /**
   * REMOVE PRODUCT
   *
   * @param Request $request
   * @return int
   */
  public function removeProduct(Request $request): int
  {
    $id = $request->id;
    DB::table('products')->where('id', $id)->delete();
    DB::table('product_info')->where('product_id', $id)->delete();
    $images = DB::table('products_images')->where('product_id', $id)->get();

    foreach ($images as $image) {
      Storage::delete($image->url);
    }

    DB::table('products_images')->where('product_id', $id)->delete();

    return 1;

  }
}
