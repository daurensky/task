<?php

require_once '../config.php';


function connect() {
  global $CFG;
  
  $conn = new mysqli(
    $CFG->server,
    $CFG->username,
    $CFG->password,
    $CFG->dbname
  );

  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  return $conn;
}