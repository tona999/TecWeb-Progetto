DROP TABLE IF EXISTS Contains;
DROP TABLE IF EXISTS Recipe;
DROP TABLE IF EXISTS Ingredient;
DROP TABLE IF EXISTS User;

CREATE TABLE User(
  Id int PRIMARY KEY AUTO_INCREMENT,
  Name varchar(50) NOT NULL,
  Surname varchar(50) NOT NULL,
  Email varchar(100) NOT NULL UNIQUE,
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
);