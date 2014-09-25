<?php
  define('UPLOAD_DIR', 'students/');
  $img = $_POST['img'];
  $randomstr = random_string(6);
  $imgname = md5(time()).$randomstr;

  $img = str_replace('data:image/png;base64,', '', $img);
  $img = str_replace(' ', '+', $img);
  $data = base64_decode($img);
  $file = UPLOAD_DIR.$imgname.'.png';
  $success = file_put_contents($file, $data);
  print $success ? $file : 'Unable to save the file.';

  include 'db.php';

  $f = mysqli_real_escape_string($con, $file);
  $n = mysqli_real_escape_string($con, htmlspecialchars(strip_tags($_POST['name']), ENT_QUOTES));
  mysqli_query($con, "UPDATE students SET photo = '$f' WHERE name = '$n'");

  function random_string($length) {
    $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return substr(str_shuffle( $chars ), 0, $length);
  }