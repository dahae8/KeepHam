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
    # 'Content-Type': 'application/json; charset=utf-8',
    # "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
    # "Accept-Encoding" : "gzip",
    # "Accept" : "*/*",
    # "Connection" : "keep-alive",
    # "Sec-Fetch-Site" : "none",
    # "Accept-Language" : "ko-kr",
    # "Host" : "yogiyo.co.kr"
}

## 가게 부분
category_list = ["1인분주문", "프랜차이즈", "치킨", "피자양식", "중식", '한식', '일식돈까스', '족발보쌈', '야식', '분식', '카페디저트', '편의점', '테이크아웃']

key_list =["id" , "name" , "address" , "estimated_delivery_time" ,"min_order_amount","delivery_fee_to_display", "lat", "lng"]
df_list = []
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
        
        for key in key_list:
            if key == "name":
                if key in restaurant:
                    info_list.append(restaurant[key])
                else:
                    info_list.append(None)  # 또는 원하는 기본값으로 설정
            elif key == "delivery_fee_to_display":
                delivery_fee = restaurant.get(key)
                info_list.append(delivery_fee['basic'])
            else:
                info_list.append(restaurant.get(key))
        
        df_list.append(info_list)

# DataFrame으로 표출하기
# df = pd.DataFrame(df_list, columns=["category"] + key_list)
# print(df.head(10))
# for item in df_list:
#     restaurant_id = item[1]  # restaurant_id는 각 리스트의 첫 번째 요소입니다.
#     print(restaurant_id)

menu_url = 'https://www.yogiyo.co.kr/api/v1/restaurants/{restaurant_id}/menu/?add_photo_menu=android&add_one_dish_menu=true&order_serving_type=delivery'
scraper = cloudscraper.create_scraper()

## 메뉴 중 가장 큰 파트
menu_list = []
# for item in df_list:
    # restaurant_id = item[1]  # The "id" is the first element in the list
menu_url_formatted = menu_url.format(restaurant_id=577374)
res_menu = scraper.get(menu_url_formatted, headers=headers)
menu_data = json.loads(res_menu.content)
menu_list.append(menu_data)
menu_data = menu_list[0]  # menu_list에서 첫 번째 레스토랑의 메뉴 정보를 가져옵니다.
items = menu_data[0].get('items', [])
print(menu_list)
    
for item in items:
    subchoices = item.get('subchoices', [])  # 각 메뉴 아이템의 'subchoices'를 가져옵니다.
    ## 서브메뉴 파싱 파트
    ## 서브메뉴의 각 key로 값을 추출한다.
    subchoice_data_list = []
    for subchoice in subchoices:
        subchoice_data = {}
        for key in key_list:
            subchoice_data[key] = subchoice.get(key)
            subchoice_data_list.append(subchoice_data)
# print(subchoice_data.keys())
# print(subchoice_data_list)
    #     subchoice_subchoice_data_list = []
    #     subsubchoices = subchoice.get('subchoices', [])
    #     for subsubchoice in subsubchoices:
    #         # print(subsubchoice)
    #         subsubchoice_data = {}
    #         for key in key_list:
    #             subsubchoice_data[key] = subsubchoice.get(key)
    #         subchoice_subchoice_data_list.append(subsubchoice_data)


## 기본 가게 데이터 파싱
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
                `delivery_fee_to_display`	VARCHAR(255)	NULL,
                `lat` VARCHAR(255) NULL,
                `lng` VARCHAR(255) NULL,
                PRIMARY KEY (`index`)
            )
            """
            cursor.execute(create_table_query)
            
            # 데이터를 테이블에 삽입
            for data in data_list:
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

def save_to_submenu(data_list):
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
                `delivery_fee_to_display`	VARCHAR(255)	NULL,
                `lat` VARCHAR(255) NULL,
                `lng` VARCHAR(255) NULL,
                PRIMARY KEY (`index`)
            )
            """
            cursor.execute(create_table_query)
            
            # 데이터를 테이블에 삽입
            for data in data_list:
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