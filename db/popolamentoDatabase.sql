INSERT INTO user (id, name, surname, email, password_hash, admin, birthdate) VALUES
(1, 'Admin', 'Admin', 'admin@admin.com', 'f865b53623b121fd34ee5426c792e5c33af8c227', true, '1998-02-03'),
(2, 'Mario', 'Rossi', 'mariorossi@gmail.com', 'f865b53623b121fd34ee5426c792e5c33af8c227', false, '1999-05-24'),
(3, 'Luigi', 'Verdi', 'luigiverdi87@gmail.com', 'f865b53623b121fd34ee5426c792e5c33af8c227', false, '1987-09-01'),
(4, 'Guido', 'LaVespa', 'guido.veloce@libero.it', 'f865b53623b121fd34ee5426c792e5c33af8c227', false, '1969-11-19'),
(5, 'Ben', 'Solo', 'kyloren@gmail.com', 'f865b53623b121fd34ee5426c792e5c33af8c227', false, '1991-03-30');

INSERT INTO ingredient (id, userId, name, gramsProduct, gramsCarbs) VALUES
(1, 1, 'Pasta', 100, 75),
(2, 1, 'Sugo al pomodoro', 100, 7),
(3, 1, 'Fette Biscottate', 100, 82),
(4, 1, 'Kiwi', 100, 9),
(5, 1, 'Latte', 100, 5),
(6, 1, 'Pancetta', 100, 1),
(7, 2, 'Piselli', 100, 14),
(8, 2, 'Panna', 100, 4),
(9, 2, 'Caffè', 100, 2),
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
(20, 4, 'Budino al cioccolato', 100, 19);

INSERT INTO recipe (id, userId, name) VALUES
(1, 1, 'Pasta al pomodoro'),
(2, 1, 'Colazione'),
(3, 2, 'Pasta con pancetta e piselli'),
(4, 3, 'Torta di mele'),
(5, 4, 'Torta con i Pan Di Stelle');

INSERT INTO contains (recipeId, ingredientId, gramsIngredient) VALUES
(1, 1, 100),
(1, 2, 50),
(2, 3, 50),
(2, 4, 50),
(2, 5, 50),
(3, 7, 50),
(3, 8, 50),
(3, 11, 50),
(4, 12, 50),
(4, 13, 50),
(4, 14, 50),
(5, 17, 50),
(5, 18, 50),
(5, 19, 50),
(5, 20, 50);