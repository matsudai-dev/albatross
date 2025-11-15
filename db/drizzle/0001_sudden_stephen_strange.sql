ALTER TABLE `birds_locations` RENAME TO `birds_habitats`;--> statement-breakpoint
ALTER TABLE `locations` RENAME TO `habitats`;--> statement-breakpoint
ALTER TABLE `birds_habitats` RENAME COLUMN "location_id" TO "habitat_id";--> statement-breakpoint
CREATE TABLE `bird_migration_types_regions` (
	`bird_id` integer NOT NULL,
	`region_id` integer NOT NULL,
	`migration_type_id` integer NOT NULL,
	`start_month` integer NOT NULL,
	`end_month` integer NOT NULL,
	`created_by` text DEFAULT 'system' NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_by` text DEFAULT 'system' NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	`deleted_by` text,
	`deleted_at` integer,
	PRIMARY KEY(`bird_id`, `region_id`),
	FOREIGN KEY (`bird_id`) REFERENCES `birds`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`region_id`) REFERENCES `regions`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`migration_type_id`) REFERENCES `migration_types`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "bird_migration_types_regions_start_month_check" CHECK("bird_migration_types_regions"."start_month" BETWEEN 1 AND 12),
	CONSTRAINT "bird_migration_types_regions_end_month_check" CHECK("bird_migration_types_regions"."end_month" BETWEEN 1 AND 12)
);
--> statement-breakpoint
CREATE INDEX `bird_migration_types_regions_bird_id_index` ON `bird_migration_types_regions` (`bird_id`);--> statement-breakpoint
CREATE INDEX `bird_migration_types_regions_region_id_index` ON `bird_migration_types_regions` (`region_id`);--> statement-breakpoint
CREATE INDEX `bird_migration_types_regions_migration_type_id_index` ON `bird_migration_types_regions` (`migration_type_id`);--> statement-breakpoint
CREATE TABLE `birds_regions` (
	`bird_id` integer NOT NULL,
	`region_id` integer NOT NULL,
	`created_by` text DEFAULT 'system' NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_by` text DEFAULT 'system' NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	`deleted_by` text,
	`deleted_at` integer,
	PRIMARY KEY(`bird_id`, `region_id`),
	FOREIGN KEY (`bird_id`) REFERENCES `birds`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`region_id`) REFERENCES `regions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `birds_regions_bird_id_index` ON `birds_regions` (`bird_id`);--> statement-breakpoint
CREATE INDEX `birds_regions_region_id_index` ON `birds_regions` (`region_id`);--> statement-breakpoint
CREATE TABLE `migration_types` (
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
CREATE UNIQUE INDEX `migration_types_name_ja_unique` ON `migration_types` (`name_ja`);--> statement-breakpoint
CREATE INDEX `migration_types_id_index` ON `migration_types` (`id`);--> statement-breakpoint
CREATE INDEX `migration_types_name_ja_index` ON `migration_types` (`name_ja`);--> statement-breakpoint
CREATE TABLE `regions` (
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
CREATE UNIQUE INDEX `regions_name_ja_unique` ON `regions` (`name_ja`);--> statement-breakpoint
CREATE INDEX `regions_id_index` ON `regions` (`id`);--> statement-breakpoint
CREATE INDEX `regions_name_ja_index` ON `regions` (`name_ja`);--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_birds_habitats` (
	`bird_id` integer NOT NULL,
	`habitat_id` integer NOT NULL,
	`created_by` text DEFAULT 'system' NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_by` text DEFAULT 'system' NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	`deleted_by` text,
	`deleted_at` integer,
	PRIMARY KEY(`bird_id`, `habitat_id`),
	FOREIGN KEY (`bird_id`) REFERENCES `birds`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`habitat_id`) REFERENCES `habitats`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_birds_habitats`("bird_id", "habitat_id", "created_by", "created_at", "updated_by", "updated_at", "deleted_by", "deleted_at") SELECT "bird_id", "habitat_id", "created_by", "created_at", "updated_by", "updated_at", "deleted_by", "deleted_at" FROM `birds_habitats`;--> statement-breakpoint
DROP TABLE `birds_habitats`;--> statement-breakpoint
ALTER TABLE `__new_birds_habitats` RENAME TO `birds_habitats`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
DROP INDEX `locations_name_ja_unique`;--> statement-breakpoint
DROP INDEX `locations_id_index`;--> statement-breakpoint
DROP INDEX `locations_name_ja_index`;--> statement-breakpoint
CREATE UNIQUE INDEX `habitats_name_ja_unique` ON `habitats` (`name_ja`);--> statement-breakpoint
CREATE INDEX `habitats_id_index` ON `habitats` (`id`);--> statement-breakpoint
CREATE INDEX `habitats_name_ja_index` ON `habitats` (`name_ja`);