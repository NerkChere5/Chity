<?php

$request_body = file_get_contents('php://input');
$request_data = json_decode($request_body);


$db_name = 'Docs';
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




function create_database() {
  global $connect;

  $statement = $connect->exec('
    create database if not exists `test_1`
    collate = `utf8_general_ci`
  ');

  echo json_encode('create_database');
}


function create_table() {
  global $connect;

  $statement = $connect->exec('
    create table if not exists `Users`(
      `id` int auto_increment,
      `name` varchar (10),
      `password` varchar (30),

      primary key (id)
    )
  ');

  echo json_encode('succes');
}


function create_record() {
  global $connect, $request_data;

  if (!$request_data) return;

  $statement = $connect->prepare('
    insert into `Users` (`name`, `password`)
    values
      (:name, :password)
  ');

  $statement->execute([
    ':name' => $request_data->user_name,
    ':password' => $request_data->user_password,
  ]);

  echo json_encode('create_record');
}


function delete_record() {
  global $connect, $request_data;

  if (!$request_data) return;

  $statement = $connect->prepare('
    delete from `Users`
    where `name` = ?
  ');

  $statement->execute([$request_data->user_name]);

  echo json_encode('delete');
}


function update_record() {
  global $connect, $request_data;

  if (!$request_data) return;

  $statement = $connect->prepare('
    update `Users`
    set `name` = :value_update
    where `id` = :id;
  ');

  $statement->execute([
    ':value_update' => $request_data->value_update,
    ':id' => $request_data->user_id
  ]);

  echo json_encode('update');
}


function get_records() {
  global $connect, $request_data;

  if (!$request_data) return;

  $statement = $connect->prepare('
    select `num`, `type`, `organ`, `name`, `num_public`, `date_public`
    from `Docs`
    where `date` LIKE :date and
    `num` LIKE :num and
    `type` LIKE :type and
    `organ` LIKE :organ and
    `name` LIKE :name and
    `num_public` LIKE :num_public and
    `date_public` LIKE :date_public;
  ');

  $statement->execute([
    ':date' => $request_data->doc_date,
    ':num' => $request_data->doc_num,
    ':type' => $request_data->doc_type,
    ':organ' => $request_data->doc_organ,
    ':name' => $request_data->doc_name,
    ':num_public' => $request_data->doc_num_public,
    ':date_public' => $request_data->doc_date_public
  ]);

  $data = $statement->fetchAll();

  echo json_encode($data);
}


function clear_table() {
  global $connect;

  $statement = $connect->exec('truncate table `Users`;');

  echo json_encode('clear');
}




// clear_table();
// create_database();
// create_record();
// create_table();
// delete_record();
get_records();
// update_record();
