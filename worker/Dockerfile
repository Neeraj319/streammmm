FROM python:3.10-slim-buster

ENV PYTHONUNBUFFERED=1

RUN pip install Pillow celery

WORKDIR /app

COPY . /app

RUN chmod +x /app/entrypoint.sh

ENTRYPOINT ["sh", "/app/entrypoint.sh"]
