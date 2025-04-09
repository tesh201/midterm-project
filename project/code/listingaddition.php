<?php
include 'listing.php';

$address = $_POST['address'];
$title = $_POST['title'];
$category = $_POST['category'];
$description = $_POST['description'];
$price = $_POST['price'];
$features = $_POST['features'];
$image = $_POST['image'];

$sql = "INSERT INTO listings (address, title, category, description, price, features, image)
VALUES ('$address', '$title', '$category', '$description', '$price', '$features', '$image')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["message" => "Listing added successfully"]);
} else {
    echo json_encode(["message" => "Error: " . $sql . "<br>" . $conn->error]);
}

$conn->close();

