CREATE DATABASE mydb;
USE mydb;
DROP TABLE IF EXISTS noteboard;
CREATE TABLE noteboard(
    id int not null auto_increment,
    title varchar(100) not null,
    body text not null,
    primary key(id)
);