<?php
  if (!empty($_FILES)) {
    $tempPath = $_FILES['file']['tmp_name'];
    $randomstr = random_string(6);
    $filename = md5(time()).$randomstr;
    $uploadPath = 'students/'.$filename.'.png';
    $post = implode('', array_values($_POST));
    $name = htmlspecialchars(strip_tags($post), ENT_QUOTES);

    move_uploaded_file($tempPath, $uploadPath);

    include 'db.php';
    $p = mysqli_real_escape_string($con, $uploadPath);
    $n = mysqli_real_escape_string($con, $name);
    mysqli_query($con, "UPDATE students SET photo = '$p' WHERE name = '$n'");
    
    $answer = array('answer' => 'File transfer completed');
    $json = json_encode($answer);
    
    echo $json;
  }

  function random_string($length) {
    $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return substr(str_shuffle( $chars ), 0, $length);
  }