CREATE TABLE `prodotto` (
	`id` INT NOT NULL,
	`codice` varchar(50) NOT NULL UNIQUE,
	`titolo` varchar(50) NOT NULL,
	`descrizione` varchar(255) NOT NULL,
	`costo` FLOAT NOT NULL,
	`immagine` blob NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `categoria` (
	`id` INT NOT NULL,
	`codice` varchar(50) NOT NULL UNIQUE,
	`titolo` varchar(50) NOT NULL,
	`descrizione` varchar(255) NOT NULL,
	`immagine` varchar(255),
	PRIMARY KEY (`id`)
);

CREATE TABLE `prodotto_categoria` (
	`id` INT NOT NULL,
	`id_prodotto` INT NOT NULL,
	`id_categoria` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `utente` (
	`id` INT NOT NULL,
	`lotname` varchar(10) NOT NULL UNIQUE,
	`username` varchar(50) NOT NULL UNIQUE,
	`password` varchar(50) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `acquisto` (
	`id` INT NOT NULL,
	`data_acquisto` TIMESTAMP NOT NULL,
	`data_consegna` TIMESTAMP,
	`id_prodotto` INT NOT NULL,
	`id_utente` INT NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `prodotto_categoria` ADD CONSTRAINT `prodotto_categoria_fk0` FOREIGN KEY (`id_prodotto`) REFERENCES `prodotto`(`id`);

ALTER TABLE `prodotto_categoria` ADD CONSTRAINT `prodotto_categoria_fk1` FOREIGN KEY (`id_categoria`) REFERENCES `categoria`(`id`);

ALTER TABLE `acquisto` ADD CONSTRAINT `acquisto_fk0` FOREIGN KEY (`id_prodotto`) REFERENCES `prodotto`(`id`);

ALTER TABLE `acquisto` ADD CONSTRAINT `acquisto_fk1` FOREIGN KEY (`id_utente`) REFERENCES `utente`(`id`);

