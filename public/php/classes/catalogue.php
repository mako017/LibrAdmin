<?php
require_once '../classes/permissions.php';

class CatalogueItem{
    public $catalogueCounter = -1;
    public $itemID = "";
    public $abbreviation = "";
    public $title = "";
    public $authors = "";
    public $status = 0;
    public $currentlyWith = "";
    public $due = "";
    public $abstract = "";
    public $category1 = "";
    public $category2 = "";
    public $category3 = "";
    public $category4 = "";
    public $storageCode = "";
    public $image = "";
    public $publisher = "";
    public $language = "";

    public function __construct(Array $row = NULL) {
        if ($row !== NULL) {
            $this->catalogueCounter = $row["catalogueCounter"];
            $this->itemID = $row["itemID"];
            $this->abbreviation = $row["abbreviation"];
            $this->title = $row["title"];
            $this->authors = $row["authors"];
            $this->status = $row["status"];
            $this->currentlyWith = $row["currentlyWith"];
            $this->due = $row["due"];
            $this->abstract = $row["abstract"];
            $this->category1 = $row["category1"];
            $this->category2 = $row["category2"];
            $this->category3 = $row["category3"];
            $this->category4 = $row["category4"];
            $this->storageCode = $row["storageCode"];
            $this->image = $row["image"];
            $this->publisher = $row["publisher"];
            $this->language = $row["language"];
        }
    }

    public function importJson($payload)
    {
        $this->catalogueCounter = isset($payload["catalogueCounter"]) ? $payload["catalogueCounter"] : -1;
        $this->itemID =$payload["itemID"];
        $this->abbreviation = $payload["abbreviation"];
        $this->title = $payload["title"];
        $this->authors = $payload["authors"];
        $this->status = $payload["status"];
        $this->currentlyWith = $payload["currentlyWith"];
        $this->due = $payload["due"];
        $this->abstract = $payload["abstract"];
        $this->category1 = $payload["category1"];
        $this->category2 = $payload["category2"];
        $this->category3 = $payload["category3"];
        $this->category4 = $payload["category4"];
        $this->storageCode = $payload["storageCode"];
        $this->image = $payload["image"];
        $this->publisher = $payload["publisher"];
        $this->language = $payload["language"];
    }

}

class CatalogueGateway{
    private $table = "catalogue";

    public function createItem(CatalogueItem $item){
        if ( !PermissionManager::handleSessionPermission("manage tests")) {
            return;
        }
        DB::insert($this->table,[
            "itemID"=> $item->itemID,
            "abbreviation"=> $item->abbreviation,
            "title"=> $item->title,
            "authors"=> $item->authors,
            "status"=> $item->status,
            "currentlyWith"=> $item->currentlyWith,
            "due"=> $item->due,
            "abstract"=> $item->abstract,
            "category1"=> $item->category1,
            "category2"=> $item->category2,
            "category3"=> $item->category3,
            "category4"=> $item->category4,
            "storageCode"=> $item->storageCode,
            "image"=> $item->image,
            "publisher"=> $item->publisher,
            "language"=> $item->language
        ]);
        if (DB::affectedRows() > 0) {
            serverResponse("success");
        }
    }

    public function readAllItems(){
        $catalogue = [];
        $result = DB::query("SELECT * FROM ". $this->table);
        foreach ($result as $row) {
            $catalogue[] = new CatalogueItem($row);
        }
        return $catalogue;
    }

    public function readSingleItem(string $itemID){
        $row = DB::queryFirstRow("SELECT * FROM " . $this->table . " WHERE itemID=%s", $itemID);
        return new CatalogueItem($row);
    }

    public function updateItem(CatalogueItem $item){
        if ( !PermissionManager::handleSessionPermission("manage tests")) {
            return;
        }
        DB::update($this->table,
        [
            "itemID"=> $item->itemID,
            "abbreviation"=> $item->abbreviation,
            "title"=> $item->title,
            "authors"=> $item->authors,
            "status"=> $item->status,
            "currentlyWith"=> $item->currentlyWith,
            "due"=> $item->due,
            "abstract"=> $item->abstract,
            "category1"=> $item->category1,
            "category2"=> $item->category2,
            "category3"=> $item->category3,
            "category4"=> $item->category4,
            "storageCode"=> $item->storageCode,
            "image"=> $item->image,
            "publisher"=> $item->publisher,
            "language"=> $item->language
        ],
        "catalogueCounter=%i", $item->catalogueCounter);
    }

    public function deleteItem(string $itemID){
        if ( !PermissionManager::handleSessionPermission("manage tests")) {
            return;
        }
        DB::delete($this->table, 'catalogueCounter=%i', $itemID);
        if (DB::affectedRows()>0) {
            serverResponse("success");
            return;
        }
        serverResponse("Could not delete entry");
    }
}