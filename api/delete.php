<?php
require_once '../config.php';
require_once './connect.php';

$conn = connect();

$id = $_POST['id'];

$sql = "DELETE FROM $CFG->tablename WHERE id = $id";

if ($conn->query($sql)) {
    echo "строка $id удалена";
} else {
    printf("Ошибка: %s\n", $conn->sqlstate);
}