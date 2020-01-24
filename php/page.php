<?php

class Page{
    public $header = "";
    public $menu = "";
    public $body = "";
    public $footer = "";

    public function __construct(){
        $this->header = file_get_contents("html/header.html");
        $this->menu = file_get_contents("html/menu.html");
        $this->footer = file_get_contents("html/footer.html");
    }

    /** Set the title of the document */
    public function setTitle($title){
        $this->header = str_replace("<TITLE/>", $title, $this->header);
    }

    /** Add metatags */
    public function setMeta($meta){
        $this->header = str_replace("<META_TAGS/>",$meta,$this->header);
    }

    /** Change login button and menu entries */
    public function setLogged(){
        session_start();
        if(isset($_SESSION["userId"])){
            $login_r = '<a href="php/logout.php">Logout</a>';
            $menu_r = 
                '<li><a href="ingredients.php"><img src="img/icons/tool.svg" alt=""> Ingredients </a></li>'.
                '<li><a href="recipes.php"><img src="img/icons/tool.svg" alt=""> Recipes </a></li>';
        }
        else{
            $login_r = '<a href="login.php">Login</a>';
            $menu_r = "";
        }
        $this->header = str_replace("<LOGIN/>", $login_r, $this->header);
        $this->menu = str_replace("<MENU_LOGGED/>", $menu_r, $this->menu);
    }

    /** Sets the content of the body (require the html path) */
    public function setBodyPath($path){
        $this->body = file_get_contents($path);
    }

    public function noFooter(){
        $this->footer = "";
    }

    /** print the whole page with echo function */
    public function printHtml(){
        echo $this->header."\n".
            $this->menu."\n".
            $this->body."\n".
            $this->footer;
    }
}

?>