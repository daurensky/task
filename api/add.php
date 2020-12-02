<?php
require_once '../config.php';
require_once './connect.php';

$conn = connect();

$input_data = new stdClass();

foreach ($_POST as $key => $value) {
    $input_data->$key = $conn->real_escape_string($value);
}

$photo = $_FILES['photo'];

if ($photo['size'] > 0) {
    $photoExtension = substr($photo['name'], strpos($photo['name'], '.') + 1);
    $upload_path = "../uploads/$input_data->uin.$photoExtension";
    $db_photo_path = "/uploads/$input_data->uin.jpg";

    if (!move_uploaded_file($photo["tmp_name"], $upload_path)) {
        echo "[ошибка] Не удалось загрузить файл на сервер";
    }
} else {
    $db_photo_path = '';
}

$sql = "
    INSERT into $CFG->tablename (name, birthday, uin, phone, adress, photo)
    VALUES (
        '$input_data->name', '$input_data->birthday', '$input_data->uin',
        '$input_data->phone', '$input_data->adress', '$db_photo_path'
    )";

if ($conn->query($sql)) {
    echo "[успешно] Данные записаны в бд";
} else {
    echo "[ошибка] Не удалось записать данные в бд. Код: $conn->sqlstate\n";
}