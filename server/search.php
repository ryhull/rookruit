<?php

include "connect.php";

$role = filter_input(INPUT_GET, "role", FILTER_SANITIZE_SPECIAL_CHARS);
$seeking = filter_input(INPUT_GET, "seeking", FILTER_SANITIZE_SPECIAL_CHARS);
$idea = filter_input(INPUT_GET, "idea", FILTER_SANITIZE_SPECIAL_CHARS);

$posts = [];

// Ensuring "Show All" returns any value within its respective column
if ($role == "all")
    $role = "%";
if ($seeking == "all")
    $seeking = "%";
if ($idea == "all")
    $idea = "%";

$command = "SELECT * FROM postings WHERE role LIKE ? AND seeking LIKE ? AND idea LIKE ? ORDER BY postid DESC LIMIT 15";
$stmt = $dbh->prepare($command);
$params = [$role, $seeking, $idea];
$success = $stmt->execute($params);

if ($success) {
    while ($row = $stmt->fetch())
        array_push($posts, ["author"=>$row["author"], "role"=>$row["role"], "seeking"=>$row["seeking"], "idea"=>$row["idea"], "date"=>$row["posted"], "body"=>$row["body"]]);
    echo json_encode($posts);
}