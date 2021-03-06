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
            $login_r = '<button id="hamburger" onclick="hideMenu();" title="Profile">User</button>';    //hamburger button
            $menu_r = 
                '<ul id="profileMenu" class="menu hidden">'."\n".  //profile menu (dark blue)
                '   <li><a href="profile.php">PROFILE</a></li>'."\n".
                '   <li><a href="ingredients.php">INGREDIENTS</a></li>'."\n".
                '   <li><a href="recipes.php">RECIPES</a></li>'."\n".
                '   <li><a href="php/logout.php">LOGOUT</a></li>'."\n".
                '</ul>';
            $this->header = str_replace('</head>',
                "<script type='text/javascript' src='js/Hamburger.js'></script>\n</head>",     //import hamburger script before </head>
                $this->header);
        }
        else{
            $login_r = '<a class="btn" id="aLogin" href="login.php">LOGIN</a>';
            $menu_r = "";
        }
        $this->header = str_replace("<LOGIN/>", $login_r, $this->header);
        $this->menu = str_replace("<MENU_LOGGED/>", $menu_r, $this->menu);
    } 

    /** Setup breadcrumb and remove the menu link*/
    public function setCurrent($entry){
        switch($entry){

            // HOME
            case "home":
                $this->menu = str_replace( 
                    '<li><a href="index.php"><img src="img/icons/home.svg" alt="" />HOME</a></li>',
                    '<li class="disabled"><a><img src="img/icons/home.svg" alt="" />HOME</a></li>',
                    $this->menu
                );
                $this->menu = str_replace('<_PATH/>',
                '<span class="path"> Home </span>', 
                $this->menu);
                break;

            // INFO
            case "info":
                $this->menu = str_replace(
                    '<li><a href="info.php"><img src="img/icons/info.svg" alt="" />INFO</a></li>',
                    '<li class="disabled"><a><img src="img/icons/info.svg" alt="" />INFO</a></li>',
                    $this->menu
                );
                $this->menu = str_replace('<_PATH/>',
                '<a href="index.php" class="path"> Home</a> &gt; <span class="path"> Info </span>', 
                $this->menu);
                break;

            // CALCULATOR
            case "calculator":
                $this->menu = str_replace(
                    '<li><a href="calculator.php"><img src="img/icons/tool.svg" alt="" />CALCULATOR</a></li>',
                    '<li class="disabled"><a><img src="img/icons/tool.svg" alt="" />CALCULATOR</a></li>',
                    $this->menu
                );
                $this->menu = str_replace('<_PATH/>',
                '<a href="index.php" class="path"> Home</a> &gt; <span class="path"> Calculator </span>', 
                $this->menu);
                break;

            // RECIPES
            case "your recipes":
                $this->menu = str_replace(
                    '<li><a href="recipes.php">RECIPES</a></li>',
                    '<li class="disabled"><a>RECIPES</a></li>',
                    $this->menu
                );
                $this->menu = str_replace('<_PATH/>',
                '<a href="index.php" class="path"> Home</a> &gt; <a href="profile.php" class="path"> Profile</a> &gt; <span class="path"> Recipes </span>', 
                $this->menu);
                break;

            // INGREDIENTS
            case "your ingredients":
                $this->menu = str_replace(
                    '<li><a href="ingredients.php">INGREDIENTS</a></li>',
                    '<li class="disabled"><a>INGREDIENTS</a></li>',
                    $this->menu
                );
                $this->menu = str_replace('<_PATH/>',
                '<a href="index.php" class="path"> Home</a> &gt; <a href="profile.php" class="path"> Profile</a> &gt; <span class="path"> Ingredients </span>', 
                $this->menu);
                break;

            // LOGIN
            case "login":
                $this->header = str_replace(
                    '<a class="btn" id="aLogin" href="login.php">LOGIN</a>',
                    '',
                    $this->header
                );
                $this->menu = str_replace(
                    '<li><a href="calculator.php"><img src="img/icons/tool.svg" alt="" />CALCULATOR</a></li>',
                    '<li class="disabled"><a><img src="img/icons/tool.svg" alt="" />CALCULATOR</a></li>',
                    $this->menu
                );
                $this->menu = str_replace('<_PATH/>',
                '<a href="index.php" class="path"> Home</a> &gt; <span class="path"> Login </span>', 
                $this->menu);
                break;

            // PROFILE
            case "profile":
                $this->menu = str_replace(
                    '<li><a href="profile.php">PROFILE</a></li>',
                    '<li class="disabled"><a>PROFILE</a></li>',
                    $this->menu
                );
                $this->menu = str_replace('<_PATH/>',
                '<a href="index.php" class="path"> Home</a> &gt; <span class="path"> Profile </span>', 
                $this->menu);
                break;

            // REGISTRATION 
            case "register":
                $this->menu = str_replace('<_PATH/>',
                '<a href="index.php" class="path"> Home</a> &gt; <span class="path"> Register </span>', 
                $this->menu);
                break;

            // FAQ
            case "faq":
                $this->menu = str_replace('<_PATH/>',
                '<a href="index.php" class="path"> Home</a> &gt; <span class="path"> FAQ </span>', 
                $this->menu);
                break;

            // 404
            case "page not found":
                $this->menu = str_replace('<_PATH/>',
                '<a href="index.php" class="path"> Home</a> &gt; <span class="path"> Nowhere </span>', 
                $this->menu);
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

    public function toHtml5(){ 
        $this->header = str_replace(
'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">', 
            '<!DOCTYPE html>
<html lang="en">', 
            $this->header);
    }
    
    /** Redirects to Login page if the current page requires Login */
    public function requireLogin() {
        if (!isset($_SESSION['userId'])) {
            header("location: login.php");
        }
    }

    /** print the whole page with echo function */
    public function printHtml(){
        echo $this->header."\n".
            $this->menu."\n".
            $this->body."\n".
            $this->footer;
    }
}
