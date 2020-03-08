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
            $login_r = '<button id="hamburger" onclick="hideMenu();"></button>';    //hamburger button
            $menu_r = 
                '<menu id="profileMenu" class="hidden">'."\n".  //profile menu (dark blue)
                '   <li><a href="profile.php">PROFILE</a></li>'."\n".
                '   <li><a href="ingredients.php">INGREDIENTS</a></li>'."\n".
                '   <li><a href="recipes.php">RECIPES</a></li>'."\n".
                '   <li><a href="php/logout.php">LOGOUT</a></li>'."\n".
                '</menu>';
            $this->header = str_replace('</head>',
                "<script src='js/Hamburger.js'></script>\n</head>",     //import hamburger script before </head>
                $this->header);
        }
        else{
            $login_r = '<a id="aLogin" href="login.php">LOGIN</a>';
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
                    '<li><a href="index.php"><img src="img/icons/home.svg" alt=""/>HOME</a></li>',
                    '<li class="disabled"><a><img src="img/icons/home.svg" alt=""/>HOME</a></li>',
                    $this->menu
                );
                break;
            case "info":
                $this->menu = str_replace(
                    '<li><a href="info.php"><img src="img/icons/info.svg" alt=""/>INFO</a></li>',
                    '<li class="disabled"><a><img src="img/icons/info.svg" alt=""/>INFO</a></li>',
                    $this->menu
                );
                break;
            case "calc":
                $this->menu = str_replace(
                    '<li><a href="calculator.php"><img src="img/icons/tool.svg" alt=""/>CALCULATOR</a></li>',
                    '<li class="disabled"><a><img src="img/icons/tool.svg" alt=""/>CALCULATOR</a></li>',
                    $this->menu
                );
                break;
            case "login":
                $this->header = str_replace(
                    '<a id="aLogin" href="login.php">LOGIN</a>',
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
