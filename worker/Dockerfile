FROM python:3.10-slim-buster

ENV PYTHONUNBUFFERED=1

RUN pip install Pillow celery

WORKDIR /worker

COPY . /worker

RUN chmod +x /worker/entrypoint.sh

ENTRYPOINT ["sh", "/worker/entrypoint.sh"]
