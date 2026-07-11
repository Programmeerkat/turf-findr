-- @block
CREATE TABLE Users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    bio TEXT,
    country VARCHAR(2)
);

-- @block
INSERT INTO Users (email, bio, country)
VALUES 
    ('daniel@email.com', 'Developer','NL');

-- @block
INSERT INTO Users (email, bio, country)
VALUES 
    ('Tippi@email.com', 'Giraf','AF');

-- @block
SELECT * FROM Users;

-- @block
SELECT email 
FROM Users
WHERE country = 'NL' OR country = 'BE'
ORDER BY email ASC 
LIMIT 20;

-- @block
CREATE INDEX email_index ON Users(email);

-- @block
CREATE TABLE Rooms (
    id INT AUTO_INCREMENT,
    street VARCHAR(255),
    owner_id INT, 
    PRIMARY KEY (id),
    FOREIGN KEY (owner_id) REFERENCES Users(id)
);

-- @block
INSERT INTO Rooms (owner_id, street)
VALUES
    (NULL, 'Lege straat')
;

-- @block
SELECT * FROM Rooms;

-- @block
SELECT 
    Rooms.id as room_id,
    Users.id as user_id
FROM Users
INNER JOIN Rooms 
ON Rooms.owner_id = Users.id;

-- @block
SELECT * FROM Rooms WHERE owner_id = NULL;

-- @block
CREATE TABLE Bookings (
    id INT AUTO_INCREMENT,
    guest_id INT NOT NULL,
    room_id INT NOT NULL,
    check_in DATETIME,
    PRIMARY KEY (id),
    FOREIGN KEY (guest_id) REFERENCES Users(id),
    FOREIGN KEY (room_id) REFERENCES Rooms(id)
)

-- @block
ALTER TABLE Bookings ADD check_out DATETIME;

-- @block
INSERT INTO Bookings (guest_id, room_id, check_in, check_out)
VALUES
    (3, 1, '2026-07-13 14:00:00', '2026-07-15 14:00:00');

-- @block
SELECT * FROM Bookings;

-- @block
UPDATE Bookings 
SET check_out = '2026-07-12 14:00:00'
WHERE id = 1;

-- @block
DELETE FROM Bookings WHERE id = 4;

-- @block users who have booked a room
SELECT * 
FROM Users 
WHERE id IN (SELECT guest_id FROM Bookings);

-- @block inactive users (dont own rooms and never booked rooms)
SELECT * FROM Users
WHERE id NOT IN (SELECT guest_id FROM Bookings)
AND id NOT IN (SELECT owner_id FROM Rooms WHERE owner_id IS NOT NULL);

-- @block ALL GUESTS WHO STAYED IN ROOM 1
SELECT Users.email FROM Bookings
INNER JOIN Users ON Users.id = guest_id
WHERE room_id = 1;

-- @block 
SELECT country, COUNT(*) as total
FROM Users
GROUP BY country;

-- @block 
SELECT COUNT(DISTINCT country) as total_countries
FROM Users;


-- @block
ALTER TABLE Rooms ADD country VARCHAR(2);

-- @block
INSERT INTO Rooms (owner_id, country, city, street, title, description)
VALUES
    (1, 'NL', 'Urecht', 'Utrechtsestraatweg 1', 'Knus huisje', 'Dit is echt een heel heel erg knus klein huisje')
;