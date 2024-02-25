<?php

require_once '../../Api/Units/Db.php';


class Db_process extends Db {
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
}
