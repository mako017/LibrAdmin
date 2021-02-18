<?php

class User{
    public $name = "";
    public $password = "";
    public $role = "";

    public function __construct(string $name, string $role) {
        $this->name = $name;
        $this->role = $role;
    }
}

class UserGateway{
    public function createUser(User $user){
        DB::insert("users",[
            "name" => $user->name,
            "password" => $user->password,
            "role" => $user->role,
        ]);
    }

    public function readAllUsers(){
        $users = [];
        $result = DB::query("SELECT * FROM users");
        foreach ($result as $row) {
            $users[] = new User($row["name"], $row["role"]);
        }
        return $users;
    }

    public function readSingleUser(string $userName){
        $row = DB::queryFirstRow("SELECT * FROM users WHERE WHERE name=%s", $userName);
        return new User($row["name"], $row["role"]);
    }

    public function updateUser(User $user){
        DB::update('users',
        [
            "name" => $user->name,
            "password" => $user->password,
            "role" => $user->role,
        ],
        "name=%s", $user->name);
    }

    public function deleteUser(string $userName){
        DB::delete('users', 'name=%s', $userName);
    }

}