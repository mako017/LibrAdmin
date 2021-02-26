<?php
$requestMethod = $_SERVER["REQUEST_METHOD"];
$postData = json_decode(file_get_contents("php://input"),true);
$call = isset($postData['call']) ? $postData['call'] : '';
$payload = isset($postData['payload']) ? $postData['payload'] : '';
require_once '../config.php';
require_once '../classes/catalogue.php';
$catalogueGateway = new CatalogueGateway();

switch ($requestMethod) {
    case 'GET':
        var_dump($catalogueGateway->readAllItems());
        // var_dump($userGateway->readAllUsers());
        break;
    case 'POST':
        $item = new CatalogueItem($payload);
        $catalogueGateway->createItem($item);
        break;
    case 'PUT':
        // $user = new User("test","user");
        // $userGateway->updateUser($user);
        break;
    case 'DELETE':
        // $userGateway->deleteUser("test");
        break;
    default:
        header("HTTP/1.1 404 Not Found");
        exit();
        break;
}