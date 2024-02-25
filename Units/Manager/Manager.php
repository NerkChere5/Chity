<?php

require_once '../../Api/Units/Rest/Rest.php';
require_once '../../Api/Units/Db/Db.php';


class Manager {
    public $_db = null;


    public function __construct() {
        $charset = 'utf8';
        $db_name = 'Chity';
        $host = 'localhost';
        $dsn = "mysql:host=$host;dbname=$db_name;charset=$charset";
        $opts = [
            // PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            // PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            // PDO::ATTR_EMULATE_PREPARES => false,
        ];
        $user_name = 'root';
        $user_password = '';

        $this->_db = new Db($dsn, $opts, $user_name, $user_password);
        $this->_db->sql_dir = './Storage';
    }

    public final function sensorValues__get($timestamp_begin = 0, $timestamp_end = 0) {
        // $timestamp_begin = $timestamp_begin ?: 0;
        // $timestamp_end = $timestamp_end ?: PHP_INT_MAX;

        $db_statement = $this->_db->prepare_sql('Docs');
        // $db_statement->execute([
        //     ':timestamp_end' => $timestamp_end,
        //     ':timestamp_begin' => $timestamp_begin,
        // ]);
        $data = $db_statement->fetchAll();

        return $data;
    }

    public final function client__init($token) {
        if (!$token) return;

        $data = file_get_contents("Storage/Menu.json");

        return $data;
    }

    public final function sensorValues__save($data) {
        $db_statement = $this->_db->prepare_sql('add');

        $this->_db->beginTransaction();
        $db_statement->execute(Db::sql_params__create($data));
        $this->_db->commit();

        return true;
    }
}


$manager = new Manager();
// $manager->sensorValues__get();
$rest = new Rest($manager);
$rest->run();
