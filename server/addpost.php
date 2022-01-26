<?php

include "connect.php";

$author = filter_input(INPUT_GET, "author", FILTER_SANITIZE_SPECIAL_CHARS);
$role = filter_input(INPUT_GET, "role", FILTER_SANITIZE_SPECIAL_CHARS);
$seeking = filter_input(INPUT_GET, "seeking", FILTER_SANITIZE_SPECIAL_CHARS);
$idea = filter_input(INPUT_GET, "idea", FILTER_SANITIZE_SPECIAL_CHARS);
$body = filter_input(INPUT_GET, "body", FILTER_SANITIZE_SPECIAL_CHARS);

$command = "INSERT INTO postings (author, role, seeking, idea, posted, body) VALUES (?, ?, ?, ?, CURDATE(), ?)";
$stmt = $dbh->prepare($command);
$params = [$author, $role, $seeking, $idea, $body];
$success = $stmt->execute($params);

if ($success) {
    echo "success";
} else {
    echo "failure";
}