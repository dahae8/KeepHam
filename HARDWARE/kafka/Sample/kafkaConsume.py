from kafka import KafkaConsumer
import json

consumer = KafkaConsumer(
    "test",
    bootstrap_servers=[
        "i9c104.p.ssafy.io:19092",
        "i9c104.p.ssafy.io:19093",
        "i9c104.p.ssafy.io:19094",
    ],
    enable_auto_commit=True,
    group_id="rpi1",
    value_deserializer=lambda x: json.loads(x.decode("utf-8")),
    consumer_timeout_ms=1000,
)

print("[begin] get consumer list")


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
