
-- Table Series
    CREATE TABLE `series` (
        `id` int NOT NULL AUTO_INCREMENT,
        `title` varchar(255) NOT NULL,
        `description` varchar(255) DEFAULT NULL,
        `vote_count` int DEFAULT '0', 
        `link_url` varchar(255) DEFAULT NULL,
        `image` varchar(255) DEFAULT NULL,
        PRIMARY KEY (`id`)
    )

-- Table Seasons
    CREATE TABLE `seasons` (
        `id` int NOT NULL AUTO_INCREMENT,
        `season_number` int NOT NULL,
        `vote_count` int DEFAULT '0',
        `serie_id` int NOT NULL,
        `link` varchar(255) DEFAULT NULL,
        PRIMARY KEY (`id`),
        FOREIGN KEY (`serie_id`) REFERENCES `series` (`id`)
    ) 

-- Table Users
CREATE TABLE `world`.`users` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_name` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `role` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `user_name_UNIQUE` (`user_name` ASC) VISIBLE,
    UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);