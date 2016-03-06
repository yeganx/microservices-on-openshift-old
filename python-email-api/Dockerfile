FROM python:latest
RUN pip install gunicorn 
ADD .
CMD gunicorn sample:api 
