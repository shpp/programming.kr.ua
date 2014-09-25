<?php
  include 'db.php';

  $data = array();
  
  if (isset($_POST['news'])) {
    $result = mysqli_query($con, "SELECT * FROM news");
    
    while($row = mysqli_fetch_assoc($result)) {
      $row['photo'] = explode(", ", $row['photo']);
      array_push($data, $row);
    }
    
    $data = json_encode($data);
    echo $data;
  }


  
