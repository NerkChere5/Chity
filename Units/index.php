<?php

$request_body = file_get_contents('php://input');
$request_data = json_decode($request_body);


$charset = 'utf8';
$db_name = 'Chity';
$db = "dbname=$db_name;";
$encoding = "charset=$charset";
$url = 'localhost';
$type = 'mysql:';
$host = "host=$url;";
$opt = [
  PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
  PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
  // PDO::ATTR_EMULATE_PREPARES => false,
];
$user_name = 'root';
$user_password = 'usbw';
$dsn = $type . $host . $db . $encoding;

$connect = new PDO($dsn, $user_name, $user_password, $opt);




function create_database() {
  global $connect, $db_name;
  
  $statement = $connect->exec("
    create database if not exists `$db_name`
    collate = `utf8_general_ci`
  ");
  
  echo json_encode('create_database');
}


function create_table() {
  global $connect;
  
  $statement = $connect->exec('
    create table if not exists `Players`(
      `id` int auto_increment,
      `surname` varchar (20),
      `name` varchar (15),
      `patronymic` varchar (20),
      `birthdate` datetime,
      `registration_number_tutor` int (11),
      `registration_number` int (11),
      `sex` varchar (7),
      `date_coming` datetime,
      
      primary key (id)
    )
  ');
  
  echo json_encode('create_table');
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
    select *
    from `Users`
    where `name` = :user_name;
  ');
  
  $statement->execute([
    ':user_name' => $request_data->user_name
  ]);
  
  $data = $statement->fetchAll();
  
  echo json_encode($data);
}


function clear_table() {
  global $connect;

  $statement = $connect->exec('truncate table `Users`;');

  echo json_encode('clear');
}


function delete_table() {
  global $connect;

  $statement = $connect->exec('drop table `Users`;');

  echo json_encode('delete');
}




// clear_table();
// create_database();
// create_record();
// create_table();
// delete_record();
// delete_table();
// get_records();
// update_record();
