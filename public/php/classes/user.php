<?php

class User{
    public $name = "";
    public $password = "";
    public $email = "";
    public $role = "";

    public function __construct(string $name, string $password = "", string $email = "", string $role = "") {
        $this->name = $name;
        $this->password = $password;
        $this->email = $email;
        $this->role = $role;
    }
}

class UserGateway{
    private function userExists(User $user)
    {
        $exists = DB::queryFirstRow("SELECT `name` FROM `users` WHERE `name`=%s", $user->name);
        if ($exists !== null) return true;
        return false;
    }

    public function signup(User $user){
        if($this->userExists($user)){
            serverResponse("nameTaken");
            return;
        }
        DB::insert("users",[
            "name" => $user->name,
            "password" => password_hash($user->password, PASSWORD_DEFAULT),
            "email" => $user->email,
            "role" => "user",
            "verified" => 0,
        ]);
        if (DB::affectedRows() > 0) {
            serverResponse("registered");
        }
        else{
            serverResponse("registrationFailed");
        }
    }

    public function readAllUsers(){
        $users = [];
        $result = DB::query("SELECT * FROM `users`");
        foreach ($result as $row) {
            $users[] = new User($row["name"], "", $row["email"], $row["role"]);
        }
        return $users;
    }

    public function readSingleUser(string $userName){
        $row = DB::queryFirstRow("SELECT * FROM `users` WHERE `name`=%s", $userName);
        return new User($row["name"], "", $row["email"], $row["role"]);
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