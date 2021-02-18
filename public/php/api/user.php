<?php
$requestMethod = $_SERVER["REQUEST_METHOD"];

switch ($requestMethod) {
    case 'GET':
        echo("Hello from GET");
        break;
    case 'POST':
        echo("Hello from POST");
        break;
    case 'PUT':
        echo("Hello from PUT");
        break;
    case 'DELETE':
        echo("Hello from DELETE");
        break;
    default:
        header("HTTP/1.1 404 Not Found");
        exit();
        break;
}