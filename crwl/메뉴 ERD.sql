CREATE TABLE `Store` (
	`index`	VARCHAR(255)	NOT NULL,
	`category`	VARCHAR(255)	NULL,
	`store_id`	VARCHAR(255)	NULL,
	`name`	VARCHAR(255)	NULL,
	`address`	VARCHAR(255)	NULL,
	`estimated_delivery_time`	VARCHAR(255)	NULL,
	`min_order_amount`	VARCHAR(255)	NULL,
	`delivery_fee_to_display`	VARCHAR(255)	NULL,
	`lat`	VARCHAR(255)	NULL,
	`lng`	VARCHAR(255)	NULL
);

CREATE TABLE `Menu` (
	`index`	VARCHAR(255)	NOT NULL,
	`store_id`	VARCHAR(255)	NOT NULL,
	`original_image`	VARCHAR(255)	NULL,
	`subtitle`	VARCHAR(255)	NULL,
	`description`	VARCHAR(255)	NULL,
	`price`	VARCHAR(255)	NULL,
	`industrial_info`	VARCHAR(255)	NULL,
	`top_displayed_item_order`	VARCHAR(255)	NULL,
	`soldout`	VARCHAR(255)	NULL,
	`menu_set_id`	VARCHAR(255)	NULL,
	`slug`	VARCHAR(255)	NULL,
	`review_count`	VARCHAR(255)	NULL,
	`name`	VARCHAR(255)	NULL,
	`section`	VARCHAR(255)	NULL,
	`reorder_rate_message`	VARCHAR(255)	NULL,
	`menu_id`	VARCHAR(255)	NULL,
	`one_dish`	VARCHAR(255)	NULL,
	`is_available_order`	VARCHAR(255)	NULL,
	`image`	VARCHAR(255)	NULL
);

CREATE TABLE `Untitled4` (

);

CREATE TABLE `SubSubMenu` (
	`index`	VARCHAR(255)	NOT NULL,
	`sub_menu_id`	VARCHAR(255)	NOT NULL,
	`menu_set_id`	VARCHAR(255)	NOT NULL,
	`store_id`	VARCHAR(255)	NOT NULL,
	`price`	VARCHAR(255)	NULL,
	`is_deposit`	VARCHAR(255)	NULL,
	`soldout`	VARCHAR(255)	NULL,
	`name`	VARCHAR(255)	NULL,
	`deposit_description`	VARCHAR(255)	NULL,
	`deposit_price`	VARCHAR(255)	NULL,
	`description`	VARCHAR(255)	NULL,
	`sub_sub_menu_id`	VARCHAR(255)	NULL,
	`slug`	VARCHAR(255)	NULL
);

CREATE TABLE `SubMenu` (
	`index`	VARCHAR(255)	NOT NULL,
	`menu_set_id`	VARCHAR(255)	NOT NULL,
	`store_id`	VARCHAR(255)	NOT NULL,
	`mandatory`	VARCHAR(255)	NULL,
	`name`	VARCHAR(255)	NULL,
	`multiple_count`	VARCHAR(255)	NULL,
	`is_available_quantity`	VARCHAR(255)	NULL,
	`multiple`	VARCHAR(255)	NULL,
	`has_deposit`	VARCHAR(255)	NULL,
	`sub_menu_id`	VARCHAR(255)	NULL,
	`slug`	VARCHAR(255)	NULL
);

ALTER TABLE `Store` ADD CONSTRAINT `PK_STORE` PRIMARY KEY (
	`index`
);

ALTER TABLE `Menu` ADD CONSTRAINT `PK_MENU` PRIMARY KEY (
	`index`,
	`store_id`
);

ALTER TABLE `SubSubMenu` ADD CONSTRAINT `PK_SUBSUBMENU` PRIMARY KEY (
	`index`,
	`sub_menu_id`,
	`menu_set_id`,
	`store_id`
);

ALTER TABLE `SubMenu` ADD CONSTRAINT `PK_SUBMENU` PRIMARY KEY (
	`index`,
	`menu_set_id`,
	`store_id`
);

ALTER TABLE `Menu` ADD CONSTRAINT `FK_Store_TO_Menu_1` FOREIGN KEY (
	`store_id`
)
REFERENCES `Store` (
	`index`
);

ALTER TABLE `SubSubMenu` ADD CONSTRAINT `FK_SubMenu_TO_SubSubMenu_1` FOREIGN KEY (
	`sub_menu_id`
)
REFERENCES `SubMenu` (
	`index`
);

ALTER TABLE `SubSubMenu` ADD CONSTRAINT `FK_SubMenu_TO_SubSubMenu_2` FOREIGN KEY (
	`menu_set_id`
)
REFERENCES `SubMenu` (
	`menu_set_id`
);

ALTER TABLE `SubSubMenu` ADD CONSTRAINT `FK_SubMenu_TO_SubSubMenu_3` FOREIGN KEY (
	`store_id`
)
REFERENCES `SubMenu` (
	`store_id`
);

ALTER TABLE `SubMenu` ADD CONSTRAINT `FK_Menu_TO_SubMenu_1` FOREIGN KEY (
	`menu_set_id`
)
REFERENCES `Menu` (
	`index`
);

ALTER TABLE `SubMenu` ADD CONSTRAINT `FK_Menu_TO_SubMenu_2` FOREIGN KEY (
	`store_id`
)
REFERENCES `Menu` (
	`store_id`
);

