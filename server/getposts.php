<?php

include "connect.php";

$posts = [];

$command = "SELECT * FROM postings ORDER BY posted DESC LIMIT 15";
$stmt = $dbh->prepare($command);
$success = $stmt->execute();

if ($success) {
    while ($row = $stmt->fetch())
        array_push($posts, ["author"=>$row["author"], "role"=>$row["role"], "seeking"=>$row["seeking"], "idea"=>$row["idea"], "date"=>$row["posted"], "body"=>$row["body"]]);
    echo json_encode($posts);
}