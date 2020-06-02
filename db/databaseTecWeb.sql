DROP TABLE IF EXISTS contains;
DROP TABLE IF EXISTS recipe;
DROP TABLE IF EXISTS ingredient;
DROP TABLE IF EXISTS client;

CREATE TABLE client(
  id int PRIMARY KEY AUTO_INCREMENT,
  name varchar(50) NOT NULL,
  surname varchar(50) NOT NULL,
  email varchar(100) NOT NULL UNIQUE,
  password_hash varchar(100) NOT NULL,
  birthdate DATE NOT NULL
);

CREATE TABLE ingredient(
  id INT NOT NULL AUTO_INCREMENT,
  userId INT NOT NULL,
  name varchar(50) NOT NULL,
  gramsProduct INT NOT NULL,
  gramsCarbs INT NOT NULL,
  PRIMARY KEY (id, userId),

  CONSTRAINT fkIngredient
  FOREIGN KEY (userId)
  REFERENCES client(id)
  ON DELETE CASCADE
);

CREATE TABLE recipe(
  id INT NOT NULL AUTO_INCREMENT,
  userId INT NOT NULL,
  name varchar(50) NOT NULL,
  PRIMARY KEY (id, userId),

  CONSTRAINT fkRecipe
  FOREIGN KEY (userId)
  REFERENCES client(id)
  ON DELETE CASCADE
);

CREATE TABLE contains(
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
);
