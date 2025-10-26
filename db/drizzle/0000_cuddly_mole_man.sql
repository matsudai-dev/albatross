CREATE TABLE `birds_locations` (
	`bird_id` integer NOT NULL,
	`location_id` integer NOT NULL,
	`created_by` text DEFAULT 'system' NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_by` text DEFAULT 'system' NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	`deleted_by` text,
	`deleted_at` integer,
	PRIMARY KEY(`bird_id`, `location_id`),
	FOREIGN KEY (`bird_id`) REFERENCES `birds`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`location_id`) REFERENCES `locations`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `birds` (
	`id` integer PRIMARY KEY NOT NULL,
	`latin_name` text NOT NULL,
	`name_ja` text NOT NULL,
	`name_en` text NOT NULL,
	`created_by` text DEFAULT 'system' NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_by` text DEFAULT 'system' NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	`deleted_by` text,
	`deleted_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `birds_latin_name_unique` ON `birds` (`latin_name`);--> statement-breakpoint
CREATE INDEX `birds_id_index` ON `birds` (`id`);--> statement-breakpoint
CREATE INDEX `birds_latin_name_index` ON `birds` (`latin_name`);--> statement-breakpoint
CREATE INDEX `birds_name_ja_index` ON `birds` (`name_ja`);--> statement-breakpoint
CREATE INDEX `birds_name_en_index` ON `birds` (`name_en`);--> statement-breakpoint
CREATE TABLE `locations` (
	`id` integer PRIMARY KEY NOT NULL,
	`name_ja` text NOT NULL,
	`created_by` text DEFAULT 'system' NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_by` text DEFAULT 'system' NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	`deleted_by` text,
	`deleted_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `locations_name_ja_unique` ON `locations` (`name_ja`);--> statement-breakpoint
CREATE INDEX `locations_id_index` ON `locations` (`id`);--> statement-breakpoint
CREATE INDEX `locations_name_ja_index` ON `locations` (`name_ja`);