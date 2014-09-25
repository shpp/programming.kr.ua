<?php
  $host = 'localhost';
  $user = 'root';
  $pass = '';
  $db = 'school';
  $con = mysqli_connect($host, $user, $pass, $db);
  
  mysqli_set_charset($con, "utf8");
