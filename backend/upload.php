<?php
  if (!empty($_FILES)) {
    $tempPath = $_FILES['file']['tmp_name'];
    $uploadPath = dirname(__FILE__).DIRECTORY_SEPARATOR.'students'.DIRECTORY_SEPARATOR.$_FILES['file']['name'];
    move_uploaded_file($tempPath, $uploadPath);
    $answer = array('answer' => 'File transfer completed');
    $json = json_encode($answer);
    
    echo $json;
  } else if (isset($_POST['name'])) {
    $name = $_POST['name'];
    $photo = 'students/'.$_POST['img'];
    
    include 'db.php';
    $p = mysqli_real_escape_string($con, $photo);
    $n = mysqli_real_escape_string($con, $name);
    mysqli_query($con,"UPDATE students SET photo = '$p' WHERE name = '$n'");
  }