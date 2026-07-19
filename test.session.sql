-- @block
CREATE TABLE Users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    bio TEXT,
    country VARCHAR(2)
);

-- @block
ALTER TABLE Users ADD COLUMN password_hash VARCHAR(255) NOT NULL;

-- @block
ALTER TABLE Users DROP COLUMN imgSrc;

-- @block
INSERT INTO Users (name, email, bio, country)
VALUES 
    ('daniel', 'daniel@email.com', 'Developer', 'NL');

-- @block
INSERT INTO Users (name, email, bio, country)
VALUES 
    ('Tippi', 'tippi@gmail.com', 'Supercozy giraf','BE');

-- @block
SELECT * FROM Users;

-- @block
DELETE FROM Users WHERE id = 12;

-- @block
UPDATE Users SET name = 'Daniel' WHERE id = 10;







-- @block
CREATE TABLE Sessions (
  id VARCHAR(36) PRIMARY KEY,
  user_id INT NOT NULL,
  expires_at DATETIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);


-- @block
SELECT * FROM Sessions;

-- @block
DELETE FROM Sessions WHERE 1 = 1;










-- @block
CREATE TABLE Rooms (
    id INT AUTO_INCREMENT,
    owner_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    price DECIMAL(10, 2) NOT NULL,
    country VARCHAR(2),
    city VARCHAR(255),
    street VARCHAR(255),
    title VARCHAR(255),
    description TEXT,
    img_src VARCHAR(255),
    PRIMARY KEY (id),
    FOREIGN KEY (owner_id) REFERENCES Users(id)
);

-- @block
ALTER TABLE Rooms ADD COLUMN imgSrc VARCHAR(255);

-- @block
INSERT INTO Rooms (owner_id, price, country, city, street, title, description, img_src)
VALUES
    (10, 80.00, 'NL', 'Zeist', 'Hogestraat 1', 'Small cozy house in Zeist', 'A small and very cozy house', 'https://placehold.co/320x240'),
    (10, 80.00, 'NL', 'Zeist', 'Hogestraat 3', 'Luxurious house in Zeist', 'A very luxurious house', 'https://placehold.co/320x240'),
    (10, 80.00, 'BE', 'Antwerp', 'Antwerpsestraat 8', 'Cozy appartment in Antwerp', 'Located in the center of Antwerp is this cozy apartement', 'https://placehold.co/320x240'),
    (10, 100.00, 'DE', 'Koln', 'Strasse 1', 'Small cozy house', 'A small and very cozy house in Koln', 'https://placehold.co/320x240'),
    (10, 110.00, 'DE', 'Koln', 'Strasse 2', 'Luxurious house', 'A very luxurious house in Koln', 'https://placehold.co/320x240'),
    (10, 90.00, 'DE', 'Stuttgard', 'Stuttgardstrasse 8', 'Cozy appartment in Stuttgard', 'Located in the center of Stuttgard is this cozy apartement', 'https://placehold.co/320x240'),
    (10, 50.00, 'ES', 'Barcelona', 'Calle 1', 'Small cozy house', 'Small Spanish apartment 1', 'https://placehold.co/320x240'),
    (10, 51.00, 'ES', 'Barcelona', 'Calle 2', 'Luxurious house', 'Small Spanish apartment 2', 'https://placehold.co/320x240'),
    (10, 52.00, 'ES', 'Barcelona', 'Calle 3', 'Cozy appartment in Barcelona', 'Small Spanish apartment 3', 'https://placehold.co/320x240')
;

-- @block
UPDATE Rooms SET title = 'Small cozy appartment in Barcelona' WHERE id = 9;

-- @block
SELECT * FROM Rooms;

-- @block
DELETE FROM Rooms WHERE 1= 1;

-- @block
DROP TABLE Rooms;






-- @block
CREATE TABLE Reviews (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  user_id     INT NOT NULL,
  room_id     INT NOT NULL,
  rating      TINYINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  text        TEXT,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(id),
  FOREIGN KEY (room_id) REFERENCES Rooms(id)
);

-- @block
DROP TABLE Reviews;
















-- @block
CREATE TABLE Bookings (
    id INT AUTO_INCREMENT,
    room_id INT NOT NULL,
    user_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (room_id) REFERENCES Rooms(id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

-- @block
INSERT INTO Bookings (room_id, user_id, start_date, end_date)
VALUES 
    (1, 13, '2026-01-01', '2026-01-04'),
    (1, 13, '2026-07-04', '2026-07-06'),
    (1, 13, '2026-07-18', '2026-07-21')
;

-- @block
SELECT * FROM Bookings;

-- @block
SELECT r.*, COUNT(b.id) AS booking_count
FROM Rooms r
JOIN Bookings b ON b.room_id = r.id
GROUP BY r.id
ORDER BY booking_count DESC
LIMIT 3;

-- @block
DELETE FROM Users WHERE id = 12;

-- @block
UPDATE Users SET name = 'Daniel' WHERE id = 10;
