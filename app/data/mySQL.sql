CREATE DATABASE IF NOT EXISTS dbserver1;
USE dbserver1;

DROP TABLE IF EXISTS referees;
CREATE TABLE referees (
refereeid int PRIMARY KEY AUTO_INCREMENT, 
refereeFirst varchar(25) not null,
refereeLast varchar(25) not null, 
age number(2) default 15,
);

INSERT INTO referees (refereeid,refereeFirst, refereeLast, age) VALUES
(101, 'John', 'Doe', 24),
(101, 'John', 'Doe', 24),
(101, 'John', 'Doe', 24);

DROP TABLE IF EXISTS games;
CREATE TABLE games (
gameid int PRIMARY KEY AUTO_INCREMENT, 
gameHost varchar(25) not null,
gameVisitor varchar(25) not null, 
gameDate number(2) default 15,
refereeid int
);

INSERT INTO games (gameid,gameHost,gameVisitor, gameDate, refereeid) VALUES
(1, 'IU', 'Maryland',05/20/21,101),
(1, 'IU', 'Maryland',05/20/21,101),
(1, 'IU', 'Maryland',05/20/21,101);

DROP TABLE IF EXISTS users;
CREATE TABLE users (
userid int PRIMARY KEY AUTO_INCREMENT, 
userFirst varchar(25) not null,
userLast varchar(25) not null, 
);

INSERT INTO users (userid,userFirst,userLast) VALUES
(1, 'Zac', 'Olvera'),
(2, 'Zac', 'Olvera'),
(3, 'Zac', 'Olvera');

-- COMMIT;