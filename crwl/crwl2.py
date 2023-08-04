# 라이브러리 import 
# from bs4 import BeautifulSoup
import requests
import time 
import random 
from tqdm import tqdm 
from collections import defaultdict 
import json
import pandas as pd
import cloudscraper
import pymysql

# 파라미터 및 관련 변수 설정
# 원하는 주소의 위 , 경도 주소가 필요!

url = 'https://www.yogiyo.co.kr/api/v1/restaurants-geo/'
api_key = "fe5183cc3dea12bd0ce299cf110a75a2"

headers = {
    "X-Apikey" : "iphoneap",
    "X-Apisecret":"fe5183cc3dea12bd0ce299cf110a75a2",
}

## 가게 부분
category_list = ["1인분주문", "프랜차이즈", "치킨", "피자양식", "중식", '한식', '일식돈까스', '족발보쌈', '야식', '분식', '카페디저트', '편의점', '테이크아웃']

key_list =["id" , "name" , "address" , "estimated_delivery_time" ,"min_order_amount","delivery_fee_to_display", "lat", "lng"]
store_info_list = []
store_id_list = []
for category_value in category_list:
    parameters = {
        "category": category_value,
        "lat": 37.5565050755347,
        "lng": 126.939656244325,
        "page": 0
    }
    res = requests.get(url, params=parameters, headers=headers)
    info = json.loads(res.content)

    
    for restaurant in info["restaurants"]:
        info_list = [category_value]  # 카테고리 값을 맨 앞에 추가
        # print(restaurant)
        for key in key_list:
            if key == "name":
                if key in restaurant:
                    info_list.append(restaurant[key])
                else:
                    info_list.append(None)  # 또는 원하는 기본값으로 설정
            elif key == "id":
                store_id_list.append(restaurant.get(key))
            elif key == "delivery_fee_to_display":
                delivery_fee = restaurant.get(key)
                info_list.append(delivery_fee['basic'])
            else:
                info_list.append(restaurant.get(key))
        store_info_list.append(info_list)


menu_url = 'https://www.yogiyo.co.kr/api/v1/restaurants/{restaurant_id}/menu/?add_photo_menu=android&add_one_dish_menu=true&order_serving_type=delivery'
scraper = cloudscraper.create_scraper()
  
menu_url_formatted = menu_url.format(restaurant_id=1100784)
res_menu = scraper.get(menu_url_formatted, headers=headers)
menu_data = json.loads(res_menu.content)

## 메뉴 중 가장 큰 파트

# for store_id in store_id_list:
for restaurant_id in store_id_list:
    menu_key_list = ['original_image', 'review_count', 'subtitle', 'description', 'price', 'slug', 'image', 'section', 'top_displayed_item_order', 'reorder_rate_message', 'menu_set_id', 'id', 'name']
    
    menu_url_formatted = menu_url.format(restaurant_id=restaurant_id)
    res_menu = scraper.get(menu_url_formatted, headers=headers)
    menu_data = json.loads(res_menu.content)
    menu_items_list = []
    data_dict = {}
    for restaurant in menu_data:
        restaurant = restaurant.get("items")
        for res in restaurant:
            for key in menu_key_list:
                if(key in res.keys()):
                    data_dict[key] = res.get(key)
        #         temp.append(menu_item)


    # no_subchoices_list = []
    # subchoices_list = []
    #     for key in menu_key_list:
    #         no_subchoices_list2 = []
    #         if restaurant[0].get(key) != 'subchoices':
    #             no_subchoices_list.append(restaurant[0].get(key))
    #         elif key == 'subchoices':
    #             subchoices_list.append(restaurant[0].get(key))
    #     no_subchoices_list2.append(no_subchoices_list)
    
    # subchoices_key_list = ['multiple', 'name', 'multiple_count', 'has_deposit', 'is_available_quantity', 'slug', 'subchoices', 'mandatory', 'id']
    # subchoices_subchoices_list = []
    # for restaurant in subchoices_list:
    #     for i in restaurant:
    #         i.get("subchoices")
    #         for key in subchoices_key_list:
    #             if key != 'subchoices':
    #                 subchoices_subchoices_list.append(res.get(key))
          
        
# print(no_subchoices_list)    


# 기본 가게 데이터 파싱
def save_to_mysql(data_list):
    try:
        # MySQL 서버에 연결
        connection = pymysql.connect(
            host="localhost", 
            user="root",
            password="ssafy", 
            database="pydb")
        
        with connection.cursor() as cursor:
            # 테이블이 없다면 새로 생성
            create_table_query = """
            CREATE TABLE IF NOT EXISTS Store (
                `index` BIGINT NOT NULL AUTO_INCREMENT,
                `category` VARCHAR(255) NULL,
                `store_id` BIGINT NULL,
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
            
            # 데이터를 테이블에 삽입
            for data in data_list:
                print(data)
                insert_query = """
                INSERT INTO Store 
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
            
            # 변경사항을 커밋하여 저장
            connection.commit()

    except Exception as e:
        print("Error:", e)
    finally:
        # 연결을 닫습니다.
        connection.close()

# print(menu_data)
# def save_json_to_file(data, file_path):
#     with open(file_path, 'w', encoding='utf-8') as f:
#         json.dump(data, f, ensure_ascii=False, indent=4)
# json_file_path = 'menu_data.json'

# # JSON 데이터를 파일로 저장합니다.
# save_json_to_file(menu_data, json_file_path)
def create_table_if_not_exists():
    # MySQL 연결 설정
    connection = pymysql.connect(
        host="localhost", 
            user="root",
            password="ssafy", 
            database="pydb"
    )

    try:
        # 커서 생성
        with connection.cursor() as cursor:
            # 테이블 생성 쿼리 작성
            create_table_query = """
            CREATE TABLE IF NOT EXISTS menu_items (
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

        # 변경사항을 커밋
        connection.commit()

    finally:
        # 연결 종료
        connection.close()

def insert_data_to_mysql(data_dict):
    # MySQL 연결 설정
    connection = pymysql.connect(
         host="localhost", 
            user="root",
            password="ssafy", 
            database="pydb"
    )

    try:
        # 커서 생성
        with connection.cursor() as cursor:
            # 데이터 삽입을 위한 SQL 쿼리 작성
            print(data_dict["reorder_rate_message"])
            insert_query = f"INSERT INTO menu_items (original_image, review_count, subtitle, description, price, slug, image, section, top_displayed_item_order,reorder_rate_message,menu_set_id, id, name) VALUES (%s, %s, %s, %s, %s, %s, %s,%s,%s,%s,%s,%s,%s);"
            # 데이터 삽입 실행
            cursor.execute(insert_query, (data_dict["original_image"], int(data_dict["review_count"]), data_dict["subtitle"], data_dict["description"],int(data_dict["price"]), data_dict["slug"],data_dict["image"], data_dict["section"],data_dict["top_displayed_item_order"],data_dict["reorder_rate_message"],data_dict["menu_set_id"], data_dict["id"], data_dict["name"]))
        # 변경사항을 커밋
        connection.commit()

    finally:
        # 연결 종료
        connection.close()
# print(data_dict)
create_table_if_not_exists()

# 데이터 삽입
insert_data_to_mysql(data_dict)

# print(data_dict["original_image"])