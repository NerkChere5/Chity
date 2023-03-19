<?php

// 13.04.2022




require_once __dir__ . '/../Json.php';




class Rest {
  public $_method_args = [];
  public $_method_name = '';
  public $_object = null;
  
  
  
  
  public function _request_parse() {
    $request_body = file_get_contents('php://input');
    $request_data = Json::parse($request_body);
    $this->_method_args = $request_data['args'];
    $this->_method_name = $request_data['method'];
  }
  
  
  
  
  public function __construct($object = null) {
    $this->_object = $object ?? $this;
  }
  
  
  public function run() {
    $result = null;
    
    try {
      $this->_request_parse();
      $reflectionMethod = new ReflectionMethod($this->_object, $this->_method_name);
      
      if (!$reflectionMethod->isFinal()) {
        throw new Error();
      }
      
      $data = $this->_object->{$this->_method_name}(...$this->_method_args);
      $result = ['data' => $data];
    }
    catch (Error $error) {
      $result = ['error' => $error->getMessage()];
    }
    catch (Exception $exception) {
      $result = ['exception' => $exception->getMessage()];
    }
    
    echo Json::stringify($result);
  }
}
