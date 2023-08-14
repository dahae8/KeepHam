from kafka import KafkaProducer
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

class MsgClass:
    def __init__(self, box_id, msgType):
        self.box_id = box_id
        self.type = msgType


def send(boxId):
    message1 = {"boxId": boxId, "type": "ARRIVE" }
    producer.send("box-arrive", value=message1)  # queue에 데이터 저장
    producer.flush()  # queue 데이터 전송