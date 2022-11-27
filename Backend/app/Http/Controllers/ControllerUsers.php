<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Dirape\Token\Token;
use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ControllerUsers extends Controller
{

  public function isValidEmail($email){
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
  }

  /**
   * Handle the register users
   *
   * @param Request $request
   * @return bool|JsonResponse
   * @throws Exception
   */
  public function register(Request $request)
  {
    $request->validate([
      'name' => 'required',
      'username' => 'required',
      'password' => 'required|min:6',
      'country' => 'required',
      'birthday' => 'required',
      'email' => 'required',
      'phone_number' => 'required',
    ]);

    $check = DB::table('users')->where('username', '=', $request->username)->first();
    if ($check) {
      return response()->json(['errors' => ['username' => ['Такой логин уже существует, попробуйте другой']]], 422);
    } else {
      $query = DB::table('users')->insert([
        'name' => $request->name,
        'username' => $request->username,
        'password' => Hash::make($request->password),
        'country' => $request->country,
        'email_or_address' => $request->email,
        'birthday' => $request->birthday,
        'status' => 'user',
        'phone_number' => $request->phone_number,
        'token' => (new Token())->unique('users', 'token', 64),
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ]);

      if ($query) {
        return true;
      } else {
        return false;
      }
    }

  }

  /**
   * Handle the register users for admin
   *
   * @param Request $request
   * @return bool|JsonResponse
   * @throws Exception
   */
  public function registerUserAdmin(Request $request)
  {
    $request->validate([
      'name' => 'required',
      'username' => 'required',
      'password' => 'required|min:6',
      'country' => 'required',
      'birthday' => 'required',
      'email' => 'required',
      'phone_number' => 'required',
      'status' => 'required'
    ]);

    $check = DB::table('users')->where('username', '=', $request->username)->first();
    if ($check) {
      return response()->json(['errors' => ['username' => ['Такой логин уже существует, попробуйте другой']]], 422);
    } else {
      $query = DB::table('users')->insert([
        'name' => $request->name,
        'username' => $request->username,
        'password' => Hash::make($request->password),
        'country' => $request->country,
        'email_or_address' => $request->email,
        'birthday' => $request->birthday,
        'status' => $request->status,
        'phone_number' => $request->phone_number,
        'token' => (new Token())->unique('users', 'token', 64),
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ]);

      if ($query) {
        return true;
      } else {
        return false;
      }
    }

  }


  /**
   * Handle the register users
   *
   * @param Request $request
   * @return array|int
   * @throws Exception
   */
  public function loginUser(Request $request)
  {
    $request->validate([
      'username' => 'required',
      'password' => 'required',
    ]);

    $query = DB::table('users')->where('username', '=', $request->username)->first();
    if ($query) {
      if (Hash::check($request->password, $query->password)) {
        return [
            'id' => $query->id,
            'email_or_address' => $query->email_or_address,
            'birthday' => $query->birthday,
            'country' => $query->country,
            'created_at' => $query->created_at,
            'name' => $query->name,
            'phone_number' => $query->phone_number,
            'status' => $query->status,
            'token' => $query->token,
            'updated_at' => $query->updated_at,
            'username' => $query->username,
        ];
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }


  /**
   * Change User Info
   *
   * @param Request $request
   * @return int
   * @throws Exception
   */
  public function ChangeUserInfo(Request $request): int
  {
    $query = DB::table('users')->where('id', $request->id);
    if($query){
      $query->update([
        'name' => $request->name,
        'username' => $request->username,
        'country' => $request->country,
        'email_or_address' => $request->email_or_address,
        'birthday' => $request->birthday,
        'status' => $request->status,
        'phone_number' => $request->phone_number,
        'updated_at' => Carbon::now(),
      ]);
      return 1;
    } else {
      return 0;
    }
  }

  /**
   * Remove user
   *
   * @param Request $request
   * @return int
   * @throws Exception
   */
  public function removeUser(Request $request): int
  {
    $query = DB::table('users')->where('id', $request->id);
    if($query){
      $query->delete();
      return 1;
    } else {
      return 0;
    }
  }

  /**
   * Handle the get all users
   *
   * @return Collection
   */
  public function getAllUsers()
  {
    return DB::table('users')->orderBy('id', 'desc')->get();
  }
}
