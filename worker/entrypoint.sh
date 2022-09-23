#!bin/bash

celery -A main worker --loglevel=INFO
