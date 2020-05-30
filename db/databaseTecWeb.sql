<<<<<<< HEAD
DROP TABLE IF EXISTS contains;
DROP TABLE IF EXISTS recipe;
DROP TABLE IF EXISTS ingredient;
DROP TABLE IF EXISTS user;
=======
<<<<<<< HEAD:databaseTecWeb.sql
DROP TABLE IF EXISTS Contains;
DROP TABLE IF EXISTS Recipe;
DROP TABLE IF EXISTS Ingredient;
DROP TABLE IF EXISTS User;

CREATE TABLE User(
  Id int PRIMARY KEY AUTO_INCREMENT,
  Name varchar(50) NOT NULL,
  Surname varchar(50) NOT NULL,
  Email varchar(255) NOT NULL UNIQUE,
  Password_hash varchar(100) NOT NULL,
  Admin boolean NOT NULL,
  Birthdate DATE NOT NULL
);

CREATE TABLE Ingredient(
  Id INT NOT NULL AUTO_INCREMENT,
  UserId INT NOT NULL,
  Name varchar(50) NOT NULL,
  GramsProduct INT NOT NULL,
  GramsCarbs INT NOT NULL,
  PRIMARY KEY (Id, UserId),

  CONSTRAINT fkIngredient
  FOREIGN KEY (UserId)
  REFERENCES User(Id)
  ON DELETE CASCADE
);

CREATE TABLE Recipe(
  Id INT NOT NULL AUTO_INCREMENT,
  UserId INT NOT NULL,
  Name varchar(50) NOT NULL,
  PRIMARY KEY (Id, UserId),

  CONSTRAINT fkRecipe
  FOREIGN KEY (UserId)
  REFERENCES User(Id)
  ON DELETE CASCADE
);

CREATE TABLE Contains(
  RecipeId INT NOT NULL,
  IngredientId INT NOT NULL,
  GramsIngredient INT NOT NULL,
  Units DECIMAL(3,2) NOT NULL,
  Pieces INT NOT NULL,
  PRIMARY KEY (RecipeId,IngredientId),

  CONSTRAINT fkContains1
  FOREIGN KEY (RecipeId)
  REFERENCES Recipe(Id)
  ON DELETE CASCADE,

  CONSTRAINT fkContains2
  FOREIGN KEY (IngredientId)
  REFERENCES Ingredient(Id)
  ON DELETE CASCADE
=======
DROP TABLE IF EXISTS Contains;
DROP TABLE IF EXISTS Recipe;
DROP TABLE IF EXISTS Ingredient;
DROP TABLE IF EXISTS User;
>>>>>>> e0f0ac6c1c4e618eb19cea8ca1332f2763cf58df

CREATE TABLE User(
  id int PRIMARY KEY AUTO_INCREMENT,
  name varchar(50) NOT NULL,
  surname varchar(50) NOT NULL,
  email varchar(100) NOT NULL UNIQUE,
  password_hash varchar(100) NOT NULL,
  admin boolean NOT NULL,
  birthdate DATE NOT NULL
);

CREATE TABLE Ingredient(
  id INT NOT NULL AUTO_INCREMENT,
  userId INT NOT NULL,
  name varchar(50) NOT NULL,
  gramsProduct INT NOT NULL,
  gramsCarbs INT NOT NULL,
  PRIMARY KEY (id, userId),

  CONSTRAINT fkIngredient
  FOREIGN KEY (userId)
  REFERENCES user(id)
  ON DELETE CASCADE
);

CREATE TABLE Recipe(
  id INT NOT NULL AUTO_INCREMENT,
  userId INT NOT NULL,
  name varchar(50) NOT NULL,
  PRIMARY KEY (id, userId),

  CONSTRAINT fkRecipe
  FOREIGN KEY (userId)
  REFERENCES User(id)
  ON DELETE CASCADE
);

CREATE TABLE Contains(
  recipeId INT NOT NULL,
  ingredientId INT NOT NULL,
  gramsIngredient INT NOT NULL,
  PRIMARY KEY (recipeId, ingredientId),

  CONSTRAINT fkContains1
  FOREIGN KEY (recipeId)
  REFERENCES recipe(id)
  ON DELETE CASCADE,

  CONSTRAINT fkContains2
  FOREIGN KEY (ingredientId)
  REFERENCES ingredient(id)
  ON DELETE CASCADE
>>>>>>> develop:db/databaseTecWeb.sql
);