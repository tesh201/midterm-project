<?php
include 'db.php';

$sql = "SELECT * FROM listings";
$result = $conn->query($sql);

$listings = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $listings[] = $row;
    }
}

echo json_encode($listings);

$conn->close();
