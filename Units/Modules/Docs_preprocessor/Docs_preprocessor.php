<?php

require_once '../Db.php';
require_once '../Rest/Rest.php';


class Docs_preprocessor {
    protected $_db;




    protected function _db_open() {
        $charset = 'utf8';
        $db_name = 'Docs';
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
    }


    protected function _get__num_publick_prev() {
         $statement = $this->_db->query('
            select `num_public`
            from `Docs`
            order by id desc
            limit 1
        ');

        $data = $statement->fetch();

        return $data;
    }


    protected function _insert_doc($doc_data, $csv, $num_public, $date) {
        $statement = $this->_db->prepare('
            insert into `Docs` (`date`, `num`, `type`, `organ`, `name`, `num_public`, `date_public`, `csv`)
            values
            (:date, :num, :type, :organ, :name, :num_public, :date_public, :csv);
        ');

        $statement->execute([
            ':date' => $doc_data['doc_date'],
            ':num' => $doc_data['doc_num'],
            ':type' => $doc_data['doc_type'],
            ':organ' => $doc_data['doc_organ'],
            ':name' => $doc_data['doc_name'],
            ':num_public' => $num_public,
            ':date_public' => $date,
            ':csv' => $csv,
        ]);

        return [
            'date' => $doc_data['doc_date'],
            'num' => $doc_data['doc_num'],
            'type' => $doc_data['doc_type'],
            'organ' => $doc_data['doc_organ'],
            'name' => $doc_data['doc_name'],
            'num_public' => $num_public,
            'date_public' => $date,
            'csv' => $csv,
        ];
    }


    protected function _validaty__add_doc($doc_data) {
        $statement = $this->_db->prepare('
            select `num_public`
            from `Docs`
            where `date` = :date and
            `num` = :num and
            `type` = :type and
            `organ` = :organ;
        ');

        $statement->execute([
            ':date' => $doc_data['doc_date'],
            ':num' => $doc_data['doc_num'],
            ':type' => $doc_data['doc_type'],
            ':organ' => $doc_data['doc_organ'],
        ]);

        $data = $statement->fetchAll();

        return !count($data);
    }




    final function add_doc($doc_data) {
        $validaty = $this->_validaty__add_doc($doc_data);

        if (!$validaty) return;

        $csv = rand(1000, 9999);
        $date_raw = new DateTime();
        $date = $date_raw->format('Y-m-d');
        $num_public = $this->_get__num_publick_prev()['num_public'] + 1;
        $result = $this->_insert_doc($doc_data, $csv, $num_public, $date);

        return $result;
    }


    final function get_docs($docs_data) {
        $statement = $this->_db->prepare('
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
            ':date' => $docs_data['doc_date'],
            ':num' => $docs_data['doc_num'],
            ':type' => $docs_data['doc_type'],
            ':organ' => $docs_data['doc_organ'],
            ':name' => $docs_data['doc_name'],
            ':num_public' => $docs_data['doc_num_public'],
            ':date_public' => $docs_data['doc_date_public']
        ]);

        $data = $statement->fetchAll();

        return $data;
    }



    public function init() {
        $this->_db_open();
    }
}




$docs_preprocessor = new Docs_preprocessor();
$docs_preprocessor->init();

(new Rest($docs_preprocessor))->run();
