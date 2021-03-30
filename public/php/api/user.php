<?php
$requestMethod = $_SERVER["REQUEST_METHOD"];
require_once '../config.php';
require_once '../classes/user.php';
$postData = json_decode(urldecode(file_get_contents("php://input")),true);
$payload = isset($postData['payload']) ? $postData['payload'] : '';
$userGateway = new UserGateway();

switch ($requestMethod) {
    case 'GET':
        var_dump($userGateway->readAllUsers());
        break;
    case 'POST':
        $username = isset($payload["username"]) ? $payload["username"] : "";
        $password = isset($payload["password"]) ? $payload["password"] : "";
        $email = isset($payload["email"]) ? $payload["email"] : "";
        if ($username === "" | $password ==="" | $email ==="") {
            serverResponse("noCredentials");
            return;
        }
        $user = new User($username, $password, $email);
        $userGateway->signup($user);
        break;
    case 'PUT':
        $user = new User("test","user");
        $userGateway->updateUser($user);
        break;
    case 'DELETE':
        $userGateway->deleteUser("test");
        break;
    default:
        header("HTTP/1.1 404 Not Found");
        exit();
        break;
}