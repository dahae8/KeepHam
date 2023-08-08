# 라이브러리 import 

import requests
import time 
import random 
import json
import cloudscraper
import pymysql
from mysql_connector import get_mysql_connection
from query_utils import create_store_table, create_menu_table, insert_data_into_store, update_store_data, insert_data_into_menu, update_menu_data

# TODO:
# 메뉴 리스트 파싱 부분 수정
# lat 및 lng에 대한 변화
# 슬랙 호출
# 가게 데이터 카테고리즈 파싱 고민


# 파라미터 및 관련 변수 설정
# 원하는 주소의 위 , 경도 주소가 필요!

url = 'https://www.yogiyo.co.kr/api/v1/restaurants-geo/'
headers = {
    "X-Apikey" : "iphoneap",
    "X-Apisecret":"fe5183cc3dea12bd0ce299cf110a75a2",
}

## 가게 부분
category_list = ["1인분주문", "프랜차이즈", "치킨", "피자양식", "중식", '한식', '일식돈까스', '족발보쌈', '야식', '분식', '카페디저트', '편의점', '테이크아웃']
key_list = ["id" , "name" , "address" , "estimated_delivery_time" ,"min_order_amount","delivery_fee_to_display", "logo_url", "thumbnail_url","lat", "lng"]

store_info_list = []
store_id_list = []
for category_value in category_list:
    parameters = {
        "category": category_value,
        "lat": 37.5565050755347,
        "items": 20,
        "lng": 126.939656244325,
        "page": 0
    }
    response = requests.get(url, params=parameters, headers=headers)
    store_info = json.loads(response.content)

    for restaurant in store_info["restaurants"]:
        store_id = restaurant.get('id')
        if store_id:
            store_id_list.append(store_id)
        
        info_list = [category_value]  # 카테고리 값을 맨 앞에 추가
        for key in key_list:
            if key == "delivery_fee_to_display":
                info_list.append(restaurant.get(key)['basic'])
            else:
                info_list.append(restaurant.get(key))
        store_info_list.append(info_list)


## 메뉴 중 가장 큰 파트
menu_url = 'https://www.yogiyo.co.kr/api/v1/restaurants/{store_id}/menu/?add_photo_menu=android&add_one_dish_menu=true&order_serving_type=delivery'
menu_key_list = ['original_image', 'review_count', 'subtitle', 'description', 'price', 'slug', 'image', 'section', 'top_displayed_item_order', 'reorder_rate_message', 'menu_set_id', 'id', 'name']
subchoices_key_list = ['multiple', 'name', 'multiple_count', 'has_deposit', 'is_available_quantity', 'slug', 'subchoices', 'mandatory', 'id']

menu_list = []
for store_id in store_id_list:
    scraper = cloudscraper.create_scraper()
    menu_url_formatted = menu_url.format(store_id=store_id)
    res_menu = scraper.get(menu_url_formatted, headers=headers)
    menu_data = json.loads(res_menu.content)
   
    subchoices_items = []
    for restaurant in menu_data:
        restaurant = restaurant.get("items")
        for res in restaurant:
            if res.get('subchoices'):
                subchoices_items.append(res.get('subchoices'))
            menu_items_list = [store_id]
            for key in menu_key_list:
                menu_items_list.append(res.get(key))
            menu_list.append(menu_items_list)

# 기본 가게 데이터 파싱
def insert_or_update_store_data_to_mysql(store_info_list):
    try:
        # MySQL 서버에 연결
        connection = get_mysql_connection()
        create_store_table(connection)
        for data in store_info_list:
            store_id = int(data[1])
            # 데이터 삽입 또는 업데이트를 선택적으로 수행
            # store_id를 기준으로 store 테이블에 이미 데이터가 존재하는지 확인
            with connection.cursor() as cursor:
                select_query = "SELECT * FROM store WHERE store_id = %s"
                cursor.execute(select_query, (store_id,))
                result = cursor.fetchone()

            if result:
                # 이미 존재하는 데이터의 경우, 데이터를 업데이트
                update_store_data(connection, store_id, data)
            else:
                # 존재하지 않는 데이터의 경우, 데이터를 삽입
                insert_data_into_store(connection, data)
    
    except pymysql.Error as e:
        print("MySQL 연결 오류가 발생했습니다:", e)
    finally:
        if connection:
            connection.close()

def insert_or_update_menu_data_to_mysql(menu_list):
    try:
        connection = get_mysql_connection()
        create_menu_table(connection)

        for data in menu_list:
            # menu_set_id가 없으므로 새로운 레코드를 삽입합니다.
            insert_data_into_menu(connection, data)
    
    except pymysql.Error as e:
        print("MySQL 연결 오류가 발생했습니다:", e)
    finally:
        if connection:
            connection.close()

# 데이터 삽입
# insert_or_update_store_data_to_mysql(store_info_list)
insert_or_update_menu_data_to_mysql(menu_list)