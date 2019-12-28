SELECT Name, GramsProduct, GramsCarbs
FROM Ingredient
WHERE UserId = 1 /*{$_SESSION['id']}*/;
--Dovrebbe essere ok

SELECT R.Name, I.Name, C.GramsIngredient
FROM Recipe as R, Ingredient as I, Contains as C
WHERE C.RecipeId = R.Id AND C.IngredientId = I.Id AND R.UserId = I.UserId = 1  /*{$_SESSION['id']}*/:;
--Non del tutto adatta, da rivedere, viene ripetuto il nome della recipe ma dato il numero variabile di ingredienti risulta più complesso farla altrimenti.

SELECT Name
FROM User
WHERE Email = 'admin@admin.com' /*{$_SESSION['email']}*/ AND Password = 'admin' /*{$_SESSION['password']}*/;

INSERT INTO User (Id, Name, Surname, Email, Password_hash, Birthdate) VALUES
(6, 'test', 'test', 'test@test.com', 'adawwd', '1999-05-24');

--SELECT Name, GramsProduct, GramsCarbs, GramsIngredient, Units, Pieces