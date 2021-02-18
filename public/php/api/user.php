<?php
$requestMethod = $_SERVER["REQUEST_METHOD"];
require_once '../config.php';
require_once '../classes/user.php';
$userGateway = new UserGateway();

switch ($requestMethod) {
    case 'GET':
        var_dump($userGateway->readAllUsers());
        break;
    case 'POST':
        $user = new User("test","admin");
        $userGateway->createUser($user);
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