<?php

// require_once '../Db_process/Db_process.php';
require_once '../../Api/Units/Rest/Rest.php';
require_once '../../Api/Units/Db.php';


class Docs_preprocessor {
    public $_db;


    public function __construct() {
        // $this->_db = new Db_process();
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
        $this->_db->sql_dir = './Sql';
    }




    // public function _db_open() {
    //     $charset = 'utf8';
    //     $db_name = 'Chity';
    //     $host = 'localhost';
    //     $dsn = "mysql:host=$host;dbname=$db_name;charset=$charset";
    //     $opts = [
    //         // PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    //         // PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    //         // PDO::ATTR_EMULATE_PREPARES => false,
    //     ];
    //     $user_name = 'root';
    //     $user_password = '';

    //     $this->_db = new Db($dsn, $opts, $user_name, $user_password);
    // }


    public function _get__num_publick_prev() {
        $_db_statement = $this->_db->query_sql('get__num_publick_prev');

        $data = $_db_statement->fetch();

        return $data;
    }


    public function _insert_doc($doc_data, $csv, $num_public, $date) {
        $_db_statement = $this->_db->prepare_sql('insert_doc');

        $_db_statement->execute([
            ':date' => $doc_data['doc_date'],
            ':num' => $doc_data['doc_num'],
            ':type' => $doc_data['doc_type'],
            ':organ' => $doc_data['doc_organ'],
            ':name' => $doc_data['doc_name'],
            ':num_public' => $num_public,
            ':date_public' => $date,
            ':csv' => $csv,
        ]);

        return true;
    }


    public function _validaty__add_doc($doc_data) {
        $_db_statement = $this->_db->prepare_sql('validaty__add_doc');
        $_db_statement->execute([
            ':date' => $doc_data['doc_date'],
            ':num' => $doc_data['doc_num'],
            ':type' => $doc_data['doc_type'],
            ':organ' => $doc_data['doc_organ'],
        ]);

        $data = $_db_statement->fetchAll();

        return !count($data);
    }




    public final function add_doc($doc_data) {
        $validaty = $this->_validaty__add_doc($doc_data);

        if (!$validaty) return;

        $csv = rand(1000, 9999);
        $date_raw = new DateTime();
        $date = $date_raw->format('Y-m-d');
        $num_public = $this->_get__num_publick_prev()['num_public'] + 1;
        $result = $this->_insert_doc($doc_data, $csv, $num_public, $date);

        return $result;
    }


    public final function get_docs($docs_data) {
        $_db_statement = $this->_db->prepare_sql('get_docs');
        $_db_statement->execute([
            ':date' => $docs_data['doc_date'],
            ':num' => $docs_data['doc_num'],
            ':type' => $docs_data['doc_type'],
            ':organ' => $docs_data['doc_organ'],
            ':name' => $docs_data['doc_name'],
            ':num_public' => $docs_data['doc_num_public'],
            ':date_public' => $docs_data['doc_date_public']
        ]);

        $data = $_db_statement->fetchAll();

        return $data;
    }



    // public function init() {
    //     $this->_db_open();
    // }
}




$docs_preprocessor = new Docs_preprocessor();
// $docs_preprocessor->init();
$rest = new Rest($docs_preprocessor);
$rest->run();

// (new Rest($docs_preprocessor))->run();
