# 라이브러리 import 

import requests
import time 
import random 
import json
import cloudscraper
import pymysql
from mysql_connector import get_mysql_connection
from query_utils import create_store_table, create_menu_table, insert_data_into_store, update_store_data, insert_data_into_menu

# TODO: 가게 데이터 파싱 할 때 logo url,
# 메뉴 리스트 파싱 부분 수정
# lat 및 lng에 대한 변화
# 코드 분리
# 예외처리 출력 파트
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

key_list = ["id" , "name" , "address" , "estimated_delivery_time" ,"min_order_amount","delivery_fee_to_display", "lat", "lng"]
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



menu_url = 'https://www.yogiyo.co.kr/api/v1/restaurants/{restaurant_id}/menu/?add_photo_menu=android&add_one_dish_menu=true&order_serving_type=delivery'
scraper = cloudscraper.create_scraper()
  
## 메뉴 중 가장 큰 파트

# for store_id in store_id_list:
# for restaurant_id in store_id_list:
for i in range(1):
    menu_key_list = ['original_image', 'review_count', 'subtitle', 'description', 'price', 'slug', 'image', 'section', 'top_displayed_item_order', 'reorder_rate_message', 'menu_set_id', 'id', 'name']
    
    menu_url_formatted = menu_url.format(restaurant_id=1030874)
    res_menu = scraper.get(menu_url_formatted, headers=headers)
    menu_data = json.loads(res_menu.content)
   
    menu_list = []
    for restaurant in menu_data:
        restaurant = restaurant.get("items")
        for res in restaurant:
            menu_items_list = []
            for key in menu_key_list:
                menu_items_list.append(res.get(key))
            menu_list.append(menu_items_list)


# print(data_dict)
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
def save_or_update_store_data_to_mysql(data_list):
    try:
        # MySQL 서버에 연결
        connection = get_mysql_connection()
        create_store_table(connection)
        for data in data_list:
            store_id = int(data[1])
            # 데이터 삽입 또는 업데이트를 선택적으로 수행
            # store_id를 기준으로 store 테이블에 이미 데이터가 존재하는지 확인
            with connection.cursor() as cursor:
                select_query = "SELECT * FROM Store WHERE store_id = %s"
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


def insert_data_to_mysql(menu_list):
    try:
        connection = get_mysql_connection()
        create_menu_table(connection)

        for data in menu_list:
            with connection.cursor() as cursor:
                insert_data_into_menu(connection, data)
    
    except pymysql.Error as e:
        print("MySQL 연결 오류가 발생했습니다:", e)
    finally:
        if connection:
            connection.close()

# 데이터 삽입
# save_or_update_store_data_to_mysql(store_info_list)
# insert_data_to_mysql(menu_list)