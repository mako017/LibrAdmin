<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
$requestMethod = $_SERVER["REQUEST_METHOD"];
$postData = json_decode(file_get_contents("php://input"),true);
$call = isset($postData['call']) ? $postData['call'] : '';
$payload = isset($postData['payload']) ? $postData['payload'] : '';
require_once '../config.php';
require_once '../classes/catalogue.php';
$catalogueGateway = new CatalogueGateway();

switch ($requestMethod) {
    case 'GET':
        $items = $catalogueGateway->readAllItems();
        serverResponse("catalogueLoaded", $items);
        break;
    case 'POST':
        // var_dump($payload);
        $item = new CatalogueItem();
        $item->importJson($payload);
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