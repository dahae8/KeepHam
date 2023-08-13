from kafka import KafkaConsumer
import json

consumer = KafkaConsumer(
    "box-keyPad",
    bootstrap_servers=[
        "i9c104.p.ssafy.io:19092",
        "i9c104.p.ssafy.io:19093",
        "i9c104.p.ssafy.io:19094",
    ],
    enable_auto_commit=True,
    group_id="box_1",
    value_deserializer=lambda x: json.loads(x.decode("utf-8")),
    consumer_timeout_ms=1000,
)

while True:
    for message in consumer:
        print(
            "Topic %s, Partition: %d, Offset: %d, Key: %s, Value: %s"
            % (
                message.topic,
                message.partition,
                message.offset,
                message.key,
                message.value,
            )
        )

        msg = message.value
        print(msg["boxId"])
        print(msg["content"])

        if msg["type"] == "PASSWORD":
            print("비번설정")
