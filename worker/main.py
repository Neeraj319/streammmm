import time
from celery import Celery
from kombu import Queue, Exchange
import os
from PIL import Image

time.sleep(5)
app = Celery("worker", broker=os.environ.get("BROKER_URL"))

app.conf.task_queues = (
    Queue("image", routing_key="image#", exchange=Exchange("image", type="direct")),
)
app.conf.task_default_exchange = "image"


@app.task(serializer="json", name="resize_image", queue="image", exchange="image")
def resize_image(file_name):
    img = Image.open("uploads/" + file_name)
    img = img.resize((80, 80))
    img.save(file_name)
    print("done resizing", file_name)
