FROM python:latest
RUN pip install gunicorn 
RUN pip install falcon
ADD . /code
WORKDIR /code
CMD gunicorn --bind 0.0.0.0:8080 sample:api 
