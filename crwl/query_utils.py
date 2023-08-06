import pymysql

def create_store_table(connection):
    try:
        with connection.cursor() as cursor:
            create_table_query = """
            CREATE TABLE IF NOT EXISTS store (
                `index` BIGINT NOT NULL AUTO_INCREMENT,
                `category` VARCHAR(255) NULL,
                `store_id` BIGINT NULL UNIQUE, -- 유니크 제약 조건 설정
                `name` VARCHAR(255) NULL,
                `address` VARCHAR(255) NULL,
                `estimated_delivery_time` VARCHAR(255) NULL,
                `min_order_amount` VARCHAR(255) NULL,
                `delivery_fee_to_display`   VARCHAR(255)   NULL,
                `lat` VARCHAR(255) NULL,
                `lng` VARCHAR(255) NULL,
                PRIMARY KEY (`index`)
            )
            """
            cursor.execute(create_table_query)
    except pymysql.Error as e:
        raise pymysql.Error(f"테이블 생성 오류: {e}")

def create_menu_table(connection):
    try:
        # 커서 생성
        with connection.cursor() as cursor:
            create_table_query = """
            CREATE TABLE IF NOT EXISTS menu (
                item_id INT AUTO_INCREMENT PRIMARY KEY,
                original_image TEXT,
                review_count INT,
                subtitle VARCHAR(200),
                description TEXT,
                price INT,
                slug VARCHAR(100),
                image TEXT,
                section VARCHAR(100),
                top_displayed_item_order INT,
                reorder_rate_message VARCHAR(100),
                menu_set_id INT,
                id INT,
                name VARCHAR(100)
            );
            """
            # 테이블 생성 실행
            cursor.execute(create_table_query)
    except pymysql.Error as e:
        raise pymysql.Error(f"테이블 생성 오류: {e}")

def insert_data_into_store(connection, data):
    try:
        with connection.cursor() as cursor:
            insert_query = """
            INSERT INTO store 
            (`category`, `store_id`,`name`,`address`, `estimated_delivery_time`, `delivery_fee_to_display`, `min_order_amount`, `lat`, `lng`) 
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            """
            cursor.execute(insert_query, (
                data[0],
                int(data[1]),
                data[2],
                data[3],
                data[4],
                data[5],
                data[6],
                float(data[7]),
                float(data[8])
            ))
        connection.commit()
    except pymysql.Error as e:
        raise pymysql.Error(f"데이터 삽입 오류: {e}")

def update_store_data(connection, store_id, data):
    try:
        with connection.cursor() as cursor:
            update_query = """
            UPDATE store
            SET
                category = %s,
                name = %s,
                address = %s,
                estimated_delivery_time = %s,
                delivery_fee_to_display = %s,
                min_order_amount = %s,
                lat = %s,
                lng = %s
            WHERE store_id = %s
            """
            cursor.execute(update_query, (
                data[0],
                data[2],
                data[3],
                data[4],
                data[5],
                data[6],
                float(data[7]),
                float(data[8]),
                int(store_id)
            ))
        connection.commit()
    except pymysql.Error as e:
        raise pymysql.Error(f"데이터 업데이트 오류: {e}")

def insert_data_into_menu(connection, data):
    print(data)
    try:
        with connection.cursor() as cursor:
            insert_query = """
            INSERT INTO menu
            (original_image, review_count, subtitle, description, price, slug, image, section, top_displayed_item_order, reorder_rate_message, menu_set_id, id, name)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
            """
            cursor.execute(insert_query, (
                data[0],
                int(data[1]),
                data[2],
                data[3],
                int(data[4]),
                data[5],
                data[6],
                data[7],
                data[8],
                data[9],
                data[10],
                data[11],
                data[12]
            ))
        connection.commit()
    except pymysql.Error as e:
        raise pymysql.Error(f"데이터 삽입 오류: {e}")