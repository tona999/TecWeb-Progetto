INSERT INTO User (Id, Name, Surname, Email, Password, Birthdate) VALUES
(1, 'Mario', 'Rossi', 'mariorossi@gmail.com', 'password', '1999-05-24'),
(2, 'Luigi', 'Verdi', 'luigiverdi87@gmail.com', 'password2', '1987-09-01'),
(3, 'Guido', 'LaVespa', 'guido.veloce@libero.it', 'passwordComplessa', '1969-11-19'),
(4, 'Ben', 'Solo', 'kyloren@gmail.com', 'nasoGrosso', '1991-03-30');

INSERT INTO Ingredient (Id, UserId, Name, GramsProduct, GramsCarbs) VALUES
(1, 1, 'Pasta', 100, 75),
(2, 1, 'Sugo al pomodoro', 100, 7),
(3, 1, 'Fette Biscottate', 100, 82.3),
(4, 1, 'Kiwi', 100, 9),
(5, 1, 'Latte', 100, 5),
(6, 1, 'Pancetta', 100, 0.5),
(7, 2, 'Piselli', 100, 14),
(8, 2, 'Panna', 100, 3.7),
(9, 2, 'Caffè', 100, 1.7),
(10, 2, 'Cornetto', 100, 46),
(11, 2, 'Pasta', 100, 75),
(12, 3, 'Farina 00', 100, 73),
(13, 3, 'Mele', 100, 14),
(14, 3, 'Cannella', 100, 80),
(15, 3, 'Confettura di fragole', 100, 44),
(16, 3, 'Succo di mirtillo puro', 100, 14),
(17, 4, 'Farina 00', 100, 73),
(18, 4, 'Biscotti Pan di Stelle', 100, 65),
(19, 4, 'Latte', 100, 5),
(20, 4, 'Budino al cioccolato', 100, 18.8),

INSERT INTO Recipe (Id, UserId, Name) VALUES
(1, 1, 'Pasta al pomodoro'),
(2, 1, 'Colazione'),
(3, 2, 'Pasta con pancetta e piselli'),
(4, 3, 'Torta di mele'),
(5, 4, 'Torta con i Pan Di Stelle');

INSERT INTO Contains (RecipeId, IngredientId, GramsIngredient, Units, Pieces) VALUES
(1, 1, 100, 1, 1),
(1, 2, 50, 1, 1),
(2, 3, 50, 1, 1),
(2, 4, 50, 1, 1),
(2, 5, 50, 1, 1),
(3, 7, 50, 1, 1),
(3, 8, 50, 1, 1),
(3, 11, 50, 1, 1),
(4, 12, 50, 1, 1),
(4, 13, 50, 1, 1),
(4, 14, 50, 1, 1),
(5, 17, 50, 1, 1),
(5, 18, 50, 1, 1),
(5, 19, 50, 1, 1),
(5, 20, 50, 1, 1);