<?php
require_once("php/page.php");
$html = new Page();
$html->setTitle("Register");
$html->setMeta("");
<<<<<<< HEAD
$html->setLogged();
=======
>>>>>>> develop
$html->setBodyPath("html/register.html");

//checks for errors in login
if(isset($_GET["err"])){
    if($_GET["err"]=="nameOrSurname"){
      $html->body = str_replace(
          "<ERROR/>",
<<<<<<< HEAD
          "<span>Invalid Name or Surname!</span>",
=======
          "<span class='error'>Invalid Name or Surname!</span>",
>>>>>>> develop
          $html->body);
    }
    else if($_GET["err"]=="pass"){
        $html->body = str_replace(
            "<ERROR/>",
<<<<<<< HEAD
            "<span>Wrong username or password!</span>",
=======
            "<span class='error'>Wrong username or password!</span>",
>>>>>>> develop
            $html->body);
    }
    else if($_GET["err"]=="email"){
        $html->body = str_replace(
            "<ERROR/>",
<<<<<<< HEAD
            "<span>Invalid email!</span>",
=======
            "<span class='error'>Invalid email!</span>",
>>>>>>> develop
            $html->body);
    }
    else if($_GET["err"]=="date"){
        $html->body = str_replace(
            "<ERROR/>",
<<<<<<< HEAD
            "<span>Invalid Date: use the formate yyyy/mm/dd</span>",
=======
            "<span class='error'>Invalid Date: use the formate yyyy/mm/dd</span>",
>>>>>>> develop
            $html->body);
    }
    else if($_GET["err"]=="password"){
        $html->body = str_replace(
            "<ERROR/>",
<<<<<<< HEAD
            "<span>Passwords don't match</span>",
=======
            "<span class='error'>Passwords don't match</span>",
>>>>>>> develop
            $html->body);
    }
    else if($_GET["err"]=="passwordFormat"){
        $html->body = str_replace(
            "<ERROR/>",
<<<<<<< HEAD
            "<span>Password must contain between 6 and 15 characters</span>",
=======
            "<span class='error'>Password must contain between 6 and 15 characters</span>",
>>>>>>> develop
            $html->body);
    }
    else if($_GET["err"]=="emailInUse"){
        $html->body = str_replace(
            "<ERROR/>",
<<<<<<< HEAD
            "<span>Email already used</span>",
=======
            "<span class='error'>Email already used</span>",
>>>>>>> develop
            $html->body);
    }
    else if($_GET["err"]=="onInsert"){
        $html->body = str_replace(
            "<ERROR/>",
<<<<<<< HEAD
            "<span>ERROR creating user</span>",
=======
            "<span class='error'>ERROR creating user</span>",
>>>>>>> develop
            $html->body);
    }
}
else{
    $html->body = str_replace("<ERROR/>","",$html->body);
}

<<<<<<< HEAD
=======
$html->toHtml5();
>>>>>>> develop
$html->printHtml();
?>
