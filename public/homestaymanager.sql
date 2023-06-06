CREATE DATABASE HOMESTAYMANAGER;

USE HOMESTAYMANAGER;

CREATE TABLE HOMESTAY(
ID INT PRIMARY KEY AUTO_INCREMENT,
NAME VARCHAR(50),
CITY VARCHAR(50),
BEDROOM TINYINT,
RESTROOM TINYINT,
PRICE INT,
DES VARCHAR(1000)
);

INSERT INTO HOMESTAY(NAME, CITY, BEDROOM, RESTROOM, PRICE, DES)
VALUES ('Obsidian Cabin', 'Hà Nội', 10, 12, 1400, 'Obsidian Cabin resort near the beach'),
('Pacific Heirloom', 'Sa Pa', 8, 10, 980, 'Mountain view with pool and saunas'),
('Exalted Sanctum', 'Nam Định', 12, 8, 799, 'Large outdoor area with kids playground and gym'),
('Azure Court Hotel & Spa', 'HCM', 14, 10, 1680, 'Luxury services including spas, saunas and outdoor dining'),
('Exalted River', 'Hà Nội', 12, 9, 650, 'Affordable lake view homestay'),
('Windmill Resort', 'Sa Pa', 16, 20, 1050, 'Windmill themed homestay with beautiful scenery');