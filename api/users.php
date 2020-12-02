<?php
require_once '../config.php';
require_once './connect.php';

$conn = connect();
$query = $conn->query("SELECT * FROM $CFG->tablename ORDER BY id DESC");
$data = [];

foreach ($query as $result_row) {
    $data[] = $result_row;
}

echo json_encode($data, JSON_UNESCAPED_UNICODE);