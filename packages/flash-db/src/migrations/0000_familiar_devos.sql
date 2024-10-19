CREATE TABLE `answers` (
	`id` integer PRIMARY KEY NOT NULL,
	`left` real NOT NULL,
	`right` real NOT NULL,
	`operation` text NOT NULL,
	`entry` real NOT NULL,
	`user_id` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
