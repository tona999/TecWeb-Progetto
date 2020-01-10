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
        $this->setLogged();
    }

    /** Set the title of the document */
    public function setTitle($title){
        $this->header = str_replace("<TITLE/>", $title, $this->header);
        $this->setCurrent(strtolower($title));
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

    /** Set current page and remove the menu link*/
    public function setCurrent($entry){
        switch($entry){
            case "home":
                $this->menu = str_replace(
                    '<a href="index.php"><img src="img/icons/home.svg" alt=""/>Home</a>',
                    '<img src="img/icons/home.svg" alt=""/>Home',
                    $this->menu
                );
                break;
            case "info":
                $this->menu = str_replace(
                    '<a href="info.php"><img src="img/icons/info.svg" alt=""/>Info</a>',
                    '<img src="img/icons/info.svg" alt=""/>Info',
                    $this->menu
                );
                break;
            case "calc":
                $this->menu = str_replace(
                    '<a href="calculator.php"><img src="img/icons/tool.svg" alt=""/>Calculator</a>',
                    '<img src="img/icons/tool.svg" alt=""/>Calculator',
                    $this->menu
                );
                break;
            case "login":
                $this->header = str_replace(
                    '<a href="login.php">Login</a>',
                    '',
                    $this->header
                );
                break;
        }
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