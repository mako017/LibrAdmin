<?php

class PermissionManager 
{
    private $permissions = [];

    function __construct() {
        $this->permissions[] = "read tests";
    }

    function getPermissionsByRole(string $role)
    {
        switch ($role) {
            case 'admin':
                $newPermissions = ["manage activeUser","read activeUser","manage activeUser","read activeUser","manage activeUser","read activeUser","manage activeUser","read activeUser"];
                break;
            case 'mod':
                $newPermissions = ["manage activeUser","read activeUser","manage activeUser","read activeUser","manage activeUser","read activeUser","manage activeUser","read activeUser"];
                break;
            case 'user':
                $newPermissions = ["manage activeUser","read activeUser","read tests", "read articles"];
                break;
            default:
                $newPermissions = [];
                break;
        }
        $this->permissions = array_merge($this->permissions, $newPermissions);
    }

    function can(string $permission)
    {
        return in_array($permission, $this->permissions, true);
        header("HTTP/1.1 403 Forbidden" );
        exit("Insufficient Permissions");
    }
    static function handleSessionPermission(string $permission)
    {
        if (!isset($_SESSION["userPermissions"])) return false;
        return unserialize($_SESSION["userPermissions"])->can($permission);
    }
}
