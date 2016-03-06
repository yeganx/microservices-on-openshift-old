FROM python:latest
RUN pip install gunicorn 
ADD . /code
WORKDIR /code
CMD gunicorn sample:api 
