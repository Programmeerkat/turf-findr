-- @block
CREATE TABLE Users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    bio TEXT,
    country VARCHAR(2)
);

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
CREATE TABLE Rooms (
    id INT AUTO_INCREMENT,
    owner_id INT NOT NULL, 
    country VARCHAR(2),
    city VARCHAR(255),
    street VARCHAR(255),
    title VARCHAR(255),
    description TEXT,
    PRIMARY KEY (id),
    FOREIGN KEY (owner_id) REFERENCES Users(id)
);

-- @block
INSERT INTO Rooms (owner_id, country, city, street, title, description)
VALUES
    (1, 'NL', 'Zeist', 'Hogestraat 1', 'Small cozy house', 'A small and very cozy house'),
    (1, 'NL', 'Zeist', 'Hogestraat 3', 'Luxurious house', 'A very luxurious house'),
    (2, 'BE', 'Antwerp', 'Antwerpsestraat 8', 'Cozy appartment', 'Located in the center of Antwerp is this cozy apartement')
;

-- @block
SELECT * FROM Rooms;
