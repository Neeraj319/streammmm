from celery import Celery
from kombu import Queue, Exchange
import os
from PIL import Image

app = Celery("worker", broker=os.environ.get("RABBITMQ_CONNECTION_URI"))

app.conf.task_queues = (
    Queue("image", routing_key="image#", exchange=Exchange("image", type="direct")),
)
app.conf.task_default_exchange = "image"


@app.task(serializer="json", name="resize_image", queue="image", exchange="image")
def resize_image(file_name: str):
    img = Image.open("uploads/" + file_name)
    img: Image.Image = img.resize((80, 80)).save("uploads/" + file_name)
    print("done resizing")
