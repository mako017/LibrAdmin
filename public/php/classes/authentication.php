<?php
require_once '../config.php';
require_once 'user.php';

$auth = new Authenticator();

class Authenticator {
    private string $SECRET_KEY = "015514d3f7df22eec03193d0a0df8e53";
    private string $TOKEN_TABLE = "logintokens";

    private string $userName;
    private string $password;
    private bool $keepMe;

    public function setUser(string $userName, string $password, string $keepMe = "false") {
        $this->userName = $userName;
        $this->password = $password;
        $this->keepMe = ($keepMe==="true") ? true : false;
    }

    private function generateRandomToken(){
        try {
            $string = random_bytes(16);
        } catch (Exception $e) {
            die("Could not generate a random string. Is our OS secure?");
        }
        return bin2hex($string);
    }

    private function storeToken($token)
    {
        if($this->fetchTokenByUserName() !== NULL){
            DB::delete($this->TOKEN_TABLE, "userName=%s", $this->userName);
        } 
        DB::insert($this->TOKEN_TABLE,[
            "userName" => $this->userName,
            "token" => $token
        ]);

    }

    private function fetchTokenByUserName()
    {
        return DB::queryFirstField("SELECT `token` FROM `" . $this->TOKEN_TABLE . "` WHERE `userName` = %s", $this->userName);
    }

    private function authentifyUser()
    {
        $userGate = new UserGateway();
        $user = $userGate->readSingleUser($this->userName);
        serverResponse("login", $user);
    }

    public function login()
    {
        $result = DB::queryFirstRow('SELECT `password` FROM `users` WHERE `name` = %s', $this->userName);
        if (!password_verify($this->password, $result["password"])){
            serverResponse("passwordMismatch");
            return;
        }
        else{
            $this->authentifyUser();
            if ($this->keepMe) {
                $this->keepLogin();
            }
        }
    }

    public function logout(){
        setcookie("rememberme", "", time() - 3600);
    }

    public function keepLogin()
    {
        $token = $this->generateRandomToken();
        $this->storeToken($token);
        $cookie = $this->userName . ':' . $token;
        $mac = hash_hmac('sha256', $cookie, $this->SECRET_KEY);
        $cookie .= ':' . $mac;
        setcookie('rememberme', $cookie, time()+60*60*24*14,"","", true, false); //set to true for production
    }

    public function rememberMe() 
    {
        $cookie = isset($_COOKIE['rememberme']) ? $_COOKIE['rememberme'] : '';
        if ($cookie) {
            list($user, $token, $mac) = explode(':', $cookie);
            $this->userName = $user;
            if (!hash_equals(hash_hmac('sha256', $user . ':' . $token, $this->SECRET_KEY), $mac)) {
                return false;
            }
            $usertoken = $this->fetchTokenByUserName($user);
            if (hash_equals($usertoken, $token)) {
                $this->authentifyUser();
            }
        }
    }
}