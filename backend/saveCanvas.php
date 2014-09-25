<?php
  define('UPLOAD_DIR', 'students/');
  $img = $_POST['img'];
  $name = $_POST['filename'];
  $img = str_replace('data:image/png;base64,', '', $img);
  $img = str_replace(' ', '+', $img);
  $data = base64_decode($img);
  $file = UPLOAD_DIR.$name.'.png';
  $success = file_put_contents($file, $data);
  print $success ? $file : 'Unable to save the file.';

  include 'db.php';
  $f = mysqli_real_escape_string($con, $file);
  $n = mysqli_real_escape_string($con, $name);
  mysqli_query($con,"UPDATE students SET photo = '$f' WHERE name = '$n'");