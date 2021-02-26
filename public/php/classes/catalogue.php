<?php

class CatalogueItem{
    private int $catalogueCounter = -1;
    private string $itemID = "";
    private string $abbreviation = "";
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

    public function __construct(Array $row) {
        $this->catalogueCounter = $row["catalogueCounter"];
        $this->itemID = $row["itemID"];
        $this->abbreviation = $row["abbreviation"];
        $this->title = $row["title"];
        $this->authors = explode(";",$row["authors"]);
        $this->status = $row["status"];
        $this->currentlyWith = $row["currentlyWith"];
        $this->due = $row["due"];
        $this->abstract = $row["abstract"];
        $this->category1 = $row["category1"];
        $this->category2 = $row["category2"];
        $this->category3 = $row["category3"];
        $this->category4 = $row["category4"];
        $this->image = $row["image"];
        $this->publisher = $row["publisher"];
        $this->language = $row["language"];
    }

}

class CatalogueGateway{
    private string $table = "catalogue";

    public function createItem(CatalogueItem $item){
        DB::insert($this->table,[
            "itemID"=> $item->itemID,
            "abbreviation"=> $item->abbreviation,
            "title"=> $item->title,
            "authors"=> implode(";", $item->authors),
            "status"=> $item->status,
            "currentlyWith"=> $item->currentlyWith,
            "due"=> $item->due,
            "abstract"=> $item->abstract,
            "category1"=> $item->category1,
            "category2"=> $item->category2,
            "category3"=> $item->category3,
            "category4"=> $item->category4,
            "image"=> $item->image,
            "publisher"=> $item->publisher,
            "language"=> $item->language
        ]);
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
        DB::update($this->table,
        [
            "abbreviation"=> $item->abbreviation,
            "title"=> $item->title,
            "authors"=> implode(";", $item->authors),
            "status"=> $item->status,
            "currentlyWith"=> $item->currentlyWith,
            "due"=> $item->due,
            "abstract"=> $item->abstract,
            "category1"=> $item->category1,
            "category2"=> $item->category2,
            "category3"=> $item->category3,
            "category4"=> $item->category4,
            "image"=> $item->image,
            "publisher"=> $item->publisher,
            "language"=> $item->language
        ],
        "itemID=%s", $item->itemId);
    }

    public function deleteItem(string $userName){
        DB::delete($this->table, 'name=%s', $userName);
    }
}