
-- Table users

CREATE TABLE `world`.`users` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_name` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `user_name_UNIQUE` (`user_name` ASC) VISIBLE);


-- Table Series
    ALTER TABLE `world`.`series` 
    ADD CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `world`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;


-- Table Seasons
CREATE TABLE `world`.`seasons` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `season_name` VARCHAR(255) NULL,
    `vote_count` INT NULL,
    `user_id` INT NULL,
    `serie_id` INT NULL,
    PRIMARY KEY (`id`),
    INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
    INDEX `serie_id_idx` (`serie_id` ASC) VISIBLE,
    CONSTRAINT `user_id`
        FOREIGN KEY (`user_id`)
        REFERENCES `world`.`users` (`id`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
    CONSTRAINT `serie_id`
        FOREIGN KEY (`serie_id`)
        REFERENCES `world`.`series` (`id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE);