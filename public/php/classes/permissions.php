<?php

class PermissionManager 
{
    private $permissions = [];

    function __construct() {
        $this->permissions[] = "read tests";
        $this->permissions[] = "read articles";
    }

    function getPermissionsByRole(string $role)
    {
        switch ($role) {
            case 'admin':
                $newPermissions = ["manage activeUser","read activeUser","manage allUsers","read allUsers","manage tests","manage articles"];
                break;
            case 'mod':
                $newPermissions = ["manage activeUser","read activeUser","manage allUsers","read allUsers","manage tests","manage articles"];
                break;
            case 'user':
                $newPermissions = ["manage activeUser","read activeUser"];
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
