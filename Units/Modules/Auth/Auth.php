<?php

require_once '../Db.php';
require_once '../Rest/Rest.php';

class Auth {
    protected $_db;




    protected function _add_user($user_data) {
        $statement = $this->_db->prepare('
            insert into `Users` (`name`, `password`)
            values
            (:name, :password)
        ');

        $statement->execute([
            ':name' => $user_data['user_name'],
            ':password' => $user_data['user_password'],
        ]);
    }


    protected function _create_token($data) {
        $hash = md5($data->id . $data->name . $data->password . date('l') . rand(0, 2e5));
        $key = md5(date('c') . time() . rand(0, 2e6));
        $method = "AES-192-CBC";
        $token = openssl_encrypt($hash, $method, $key);

        return [$token, $key];
    }


    protected function _db_open() {
        $charset = 'utf8';
        $db_name = 'Chity_sayt';
        $host = 'localhost';
        $dsn = "mysql:host=$host;dbname=$db_name;charset=$charset";
        $opts = [
            // PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            // PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            // PDO::ATTR_EMULATE_PREPARES => false,
        ];
        $user_name = 'root';
        $user_password = 'usbw';

        $this->_db = new Db($dsn, $opts, $user_name, $user_password);
    }


    protected function _get_date_token($token) {
        $statement = $this->_db->prepare('
            select `date`
            from `Tokens`
            where `token` = ?;
        ');

        $statement->execute([$token]);

        $date_token = $statement->fetchAll();

        return $date_token;
    }


    protected function _get_user($user_data) {
        $statement = $this->_db->prepare('
            select *
            from `Users`
            where `name` = :user_name and `password` = :user_password;
        ');

        $statement->execute([
            ':user_name' => $user_data['user_name'],
            ':user_password' => $user_data['user_password'],
        ]);

        $data = $statement->fetchAll();

        return $data;
    }


    protected function _remove_token($token) {
        $statement = $this->_db->prepare('
            delete from `Tokens`
            where `token` = ?
        ');
    
        $statement->execute([$token]);
    }


    protected function _set_token($request_data) {
        // if (!$request_data) return;

        $statement = $this->_db->prepare('
            insert into `Tokens` (`user_id`, `token`, `key_token`)
            values
            (:id, :token, :key)
        ');

        $statement->execute([
            ':id' => $request_data['id'],
            ':key' => $request_data['key'],
            ':token' => $request_data['token'],
        ]);
    }





    final public function check_validaty_token($token) {
        $date_token = $this->_get_date_token($token);

        if (!$date_token) return false;

        return ((time() - $date_token['date']) < 26e8);
    }
    
    
    final public function clear_non_active() {
        $statement = $this->_db->exec('
            delete from `Tokens`
            where (current_timestamp() - `date`) > 26e8
        ');
        
        return 'ok';
    }
    
    
    public function init() {
        $this->_db_open();
    }


    final public function logIn($user_data) {
        // if (!$user_data) return;
        
        $data_raw = $this->_get_user($user_data);

        if (!$data_raw) return;

        $data = new stdClass();
        $data->id = $data_raw[0]['id'];
        $data->name = $data_raw[0]['name'];
        $data->password = $data_raw[0]['password'];

        [$token, $key] = $this->_create_token($data);
        $request_data = [
            'id' => $data->id,
            'key' => $key,
            'token' => $token,
        ];

        $this->_set_token($request_data);

        return $token;
    }


    final public function logOut($token) {
        // if (!$token) return;
        
        $this->_remove_token($token);

        return 'ok';
    }


    final public function logUp($user_data) {
        // if (!$user_data) return;
        
        $duble = $this->_get_user($user_data);
        
        if ($duble) return;

        $this->_add_user($user_data);

        return 'ok';
    }
}




$auth = new Auth();
$auth->init();

(new Rest($auth))->run();
