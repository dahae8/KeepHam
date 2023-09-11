import pymysql

def get_mysql_connection():
    try:
        connection = pymysql.connect(
            host="localhost",
            user="root",
            password="",
            database=""
        )
        return connection
    except pymysql.Error as e:
        raise pymysql.Error(f"MySQL 연결 오류: {e}")
