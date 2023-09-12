import pymysql

def get_mysql_connection():
    try:
        connection = pymysql.connect(
            host="localhost",
            user="사용자명",
            password="암호",
            database=""
        )
        return connection
    except pymysql.Error as e:
        raise pymysql.Error(f"MySQL 연결 오류: {e}")
