<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");

$requestMethod = $_SERVER["REQUEST_METHOD"];
$postData = json_decode(file_get_contents("php://input"),true);
$call = isset($postData['call']) ? $postData['call'] : '';
$payload = isset($postData['payload']) ? $postData['payload'] : '';
require_once '../config.php';
require_once '../classes/authentication.php';
$auth = new Authenticator();

switch ($requestMethod) {
    case 'POST':
        switch ($call) {
            case 'login':
                $user = isset($payload["username"]) ? $payload["username"] : "";
                $password = isset($payload["password"]) ? $payload["password"] : "";
                $remember = isset($payload["rememberMe"]) ? $payload["rememberMe"] : "false";
                $auth->setUser($user,$password, $remember);
                $auth->login();
                break;
            case 'rememberMe':
                $auth->rememberMe();
                break;
            default:
                # code...
                break;
        }
        break;
    case 'DELETE':
        // $userGateway->deleteUser("test");
        break;
    default:
        // header("HTTP/1.1 404 Not Found");
        // exit();
        break;
}