<?php
  $host = '';
  $user = '';
  $pass = '';
  $db = '';
  $con = mysqli_connect($host, $user, $pass, $db);
  
  mysqli_set_charset($con, "utf8");
