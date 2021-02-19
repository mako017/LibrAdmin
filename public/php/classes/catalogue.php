<?php

class CatalogueItem{
    private string $itemID = "";
    private string $title = "";
    private array $authors = [];
    private int $status = 0;
    private string $currentlyWith = "";
    private string $due = "";
    private string $abstract = "";
    private string $category1 = "";
    private string $category2 = "";
    private string $category3 = "";
    private string $category4 = "";
    private string $image = "";
    private string $publisher = "";
    private string $language = "";

}

class CatalogueGateway{
    private string $table = "catalogue";

    public function createItem(User $user){
        DB::insert($this->table,[
            "name" => $user->name,
            "password" => $user->password,
            "role" => $user->role,
        ]);
    }

    public function readAllItems(){
        $users = [];
        $result = DB::query("SELECT * FROM ". $this->table);
        foreach ($result as $row) {
            $users[] = new User($row["name"], $row["role"]);
        }
        return $users;
    }

    public function readSingleItem(string $userName){
        $row = DB::queryFirstRow("SELECT * FROM " . $this->table . " WHERE WHERE name=%s", $userName);
        return new User($row["name"], $row["role"]);
    }

    public function updateItem(User $user){
        DB::update($this->table,
        [
            "name" => $user->name,
            "password" => $user->password,
            "role" => $user->role,
        ],
        "name=%s", $user->name);
    }

    public function deleteItem(string $userName){
        DB::delete($this->table, 'name=%s', $userName);
    }
}