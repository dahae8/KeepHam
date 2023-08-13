from kafka import KafkaProducer
import time
import json

producer = KafkaProducer(
    acks=0,  # 0 --> 전송속도 우선 / 1 --> 정확성 우선
    compression_type="gzip",
    bootstrap_servers=[
        "i9c104.p.ssafy.io:19092",
        "i9c104.p.ssafy.io:19093",
        "i9c104.p.ssafy.io:19094",
    ],
    value_serializer=lambda v: json.dumps(v).encode("utf-8"),
)

start = time.time()

for i in range(10000):
    data = input("sendMessage >> ")
    producer.send("test", value=data)  # queue에 데이터 저장
    producer.flush()  # queue 데이터 전송

print("elapsed:", time.time() - start)
