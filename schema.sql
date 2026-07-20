-- @block
CREATE TABLE Users(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  bio TEXT,
  country VARCHAR(2),
  password_hash VARCHAR(255) NOT NULL
);

-- @block
CREATE TABLE Sessions (
  id VARCHAR(36),
  user_id INT NOT NULL,
  expires_at DATETIME NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- @block
CREATE TABLE Rooms (
  id INT AUTO_INCREMENT,
  owner_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  price DECIMAL(10, 2) NOT NULL,
  country VARCHAR(2) NOT NULL,
  city VARCHAR(255) NOT NULL,
  street VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  img_src VARCHAR(255),
  PRIMARY KEY (id),
  FOREIGN KEY (owner_id) REFERENCES Users(id)
);

-- @block
CREATE TABLE Bookings (
  id INT AUTO_INCREMENT,
  booking_price DECIMAL(10, 2) NOT NULL,
  room_id INT NOT NULL,
  user_id INT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (room_id) REFERENCES Rooms(id),
  FOREIGN KEY (user_id) REFERENCES Users(id)
);

-- @block
CREATE TABLE Reviews (
  id INT AUTO_INCREMENT,
  booking_id INT NOT NULL UNIQUE,
  rating TINYINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  text TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (booking_id) REFERENCES Bookings(id)
);
