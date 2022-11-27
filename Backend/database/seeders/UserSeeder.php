<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Dirape\Token\Token;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   * @throws \Exception
   */
  public function run()
  {
    $peoples = [
      "Harry", "Ross",
      "Bruce", "Cook",
      "Carolyn", "Morgan",
      "Albert", "Walker",
      "Randy", "Reed",
      "Larry", "Barnes",
      "Lois", "Wilson",
      "Jesse", "Campbell",
      "Ernest", "Rogers",
      "Theresa", "Patterson",
      "Henry", "Simmons",
      "Michelle", "Perry",
      "Frank", "Butler",
      "Shirley"
    ];

    $users = [];
    foreach ($peoples as $people){
      array_push($users, [
        'name' => $people,
        'username' => $people.Str::random(2),
        'password' => Hash::make('password'),
        'country' => Str::random(10),
        'address' => Str::random(10),
        'birthday' => Str::random(10),
        'status' => Str::random(10),
        'phone_number' => Str::random(10),
        'token' => (new Token())->unique('users', 'token', 64),
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ]);
    }

    DB::table('users')->insert($users);

  }
}
