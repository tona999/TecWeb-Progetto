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
                '<menu id="profileMenu">'.  //profile menu (dark blue)
                '<a href="profile.php"><li>PROFILE</li></a>'.
                '<a href="ingredients.php"><li>INGREDIENTS</li></a>'.
                '<a href="recipes.php"><li>RECIPES</li></a>'.
                '<a href="php/logout.php"><li>LOGOUT</li></a>'.
                '</menu>';
            $this->header = str_replace('</head>',
                "<script src='js/Hamburger.js'></script>\n</head>",     //import hamburger script before </head>
                $this->header);
            $this->header = str_replace('<body>','<body onload="hideMenu();">',$this->header);   //automatically hide menu on load
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
                    '<a href="index.php"><li><img src="img/icons/home.svg" alt=""/>HOME</li></a>',
                    '<li><img src="img/icons/home.svg" alt=""/>HOME</li>',
                    $this->menu
                );
                break;
            case "info":
                $this->menu = str_replace(
                    '<a href="info.php"><li><img src="img/icons/info.svg" alt=""/>INFO</li></a>',
                    '<li><img src="img/icons/info.svg" alt=""/>INFO</li>',
                    $this->menu
                );
                break;
            case "calc":
                $this->menu = str_replace(
                    '<a href="calculator.php"><li><img src="img/icons/tool.svg" alt=""/>CALC</li></a>',
                    '<li><img src="img/icons/tool.svg" alt=""/>CALC</li>',
                    $this->menu
                );
                break;
            case "login":
                $this->header = str_replace(
                    '<a href="login.php">LOGIN</a>',
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