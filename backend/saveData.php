<?php
  include 'db.php';

  if (isset($_POST['anketa'])) {
    foreach ($_POST['anketa'] as $key => $value) {
      $data[$key] = htmlspecialchars(strip_tags($value), ENT_QUOTES);
    }

    $columns = implode(", ", array_keys($data));
    array_walk($data, function(&$string) use ($con) { 
      $string = mysqli_real_escape_string($con, $string);
    });
    $values = implode("', '", array_values($data));

    mysqli_query($con, "INSERT INTO `form` ($columns) VALUES ('$values')");
  }

  if (isset($_POST['mailtext'])) {
    $mail = mysqli_real_escape_string($con, htmlspecialchars(strip_tags($_POST['mailtext']), ENT_QUOTES));
    
    mysqli_query($con, "INSERT INTO `questions` (question) VALUES ('$mail')");
  }
  
  if (isset($_POST['student'])) {
    foreach ($_POST['student'] as $key => $value) {
      $data[$key] = htmlspecialchars(strip_tags($value), ENT_QUOTES);
    }

    if($data['english'] !== '') {
      $data['skypeCheck'] = 'Да';
      $data['gmailCheck'] = 'Да';
    }

    $columns = implode(", ", array_keys($data));
    array_walk($data, function(&$string) use ($con) { 
      $string = mysqli_real_escape_string($con, $string);
    });
    $values = implode("', '", array_values($data));

    mysqli_query($con, "INSERT INTO `students` ($columns) VALUES ('$values')");
  }