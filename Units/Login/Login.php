<?php

$request_body = file_get_contents('php://input');
$request_data = json_decode($request_body);


$db_name = 'Chity_sayt';
$charset = 'utf8';
$host = 'localhost';
$dsn = "mysql:host=$host;dbname=$db_name;charset=$charset";
$opt = [
  PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
  PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
  // PDO::ATTR_EMULATE_PREPARES => false,
];
$user_name = 'root';
$user_password = 'usbw';

$connect = new PDO($dsn, $user_name, $user_password, $opt);


$pdo_statement = $connect->prepare('
  select *
  from `Users`
  where `login` = :login and `password` = :password
');

$pdo_statement->execute([':login' => $request_data->users_login, ':password' => $request_data->users_password]);
$data = $pdo_statement->fetchAll();

echo json_encode($data);
