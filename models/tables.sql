
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
