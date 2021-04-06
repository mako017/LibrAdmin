<?php
$requestMethod = $_SERVER["REQUEST_METHOD"];
$postData = json_decode(urldecode(file_get_contents("php://input")),true);
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
        $item = new CatalogueItem();
        $item->importJson($payload);
        $catalogueGateway->createItem($item);
        break;
    case 'PUT':
        $item = new CatalogueItem();
        $item->importJson($payload);
        $catalogueGateway->updateItem($item);
        break;
    case 'DELETE':
        // $userGateway->deleteUser("test");
        break;
    default:
        header("HTTP/1.1 404 Not Found");
        exit();
        break;
}