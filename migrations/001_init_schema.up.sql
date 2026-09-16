CREATE TABLE teams (
    id int PRIMARY KEY AUTO_INCREMENT,
    name varchar(25) NOT NULL,
    department varchar(50)
);

CREATE TABLE users (
    id int PRIMARY KEY AUTO_INCREMENT,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    email varchar(100) NOT NULL UNIQUE,
    team_id int REFERENCES teams(id)
);

CREATE TABLE rooms (
    id int PRIMARY KEY AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    floor int NOT NULL,
    capacity int NOT NULL
);

CREATE TABLE desks (
    id int PRIMARY KEY AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    floor int NOT NULL
);

CREATE TABLE bookings (
    id int PRIMARY KEY AUTO_INCREMENT,
    user_id int REFERENCES users(id),
    desk_id int REFERENCES desks(id),
    booking_date date NOT NULL,
    active boolean NOT NULL
);