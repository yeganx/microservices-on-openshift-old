
import falcon
import json
import smtplib
import codecs
import mysql.connector
import os
from datetime import datetime
from datetime import timedelta



class EmailResource(object):
    def on_get(self, req, resp):
        """Handles GET requests"""
        resp.status = falcon.HTTP_200
        resp.body = 'Email API 2'
    def on_post(self, req, resp):
        """Handles POST requests"""
        try:
            raw_json = req.stream.read().decode('utf-8')
        except Exception as ex:
            raise falcon.HTTPError(falcon.HTTP_400,
                'Error',
                ex.message)
 
        try:
            email_req = json.loads(raw_json)
        except ValueError:
            raise falcon.HTTPError(falcon.HTTP_400,
                'Malformed JSON',
                'Could not decode the request body. The '
                'JSON was incorrect.')
 
        resp.status = falcon.HTTP_202
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login("node2test@gmail.com", "Refresh@2015")
        msg = email_req['msg']
        server.sendmail("node2test@gmail.com", email_req['to'], msg)
        server.quit()
        config = {
          'user': os.getenv('MYSQL_USER', 'root'),
          'password': os.getenv('MYSQL_PASSWORD', ''),
          'host': os.getenv('MYSQL_SERVICE_HOST', 'localhost'),
          'database': os.getenv('MYSQL_DATABASE', 'microservices'),
          'raise_on_warnings': True,
        }
        cnx = mysql.connector.connect(**config)
        cursor = cnx.cursor()
        add_email = ("INSERT INTO emails "
                       "(from_add, to_add, subject, body, created_at) "
                       "VALUES (%s, %s, %s, %s, %s)")

        data_email = ('node2test@gmail.com', email_req['to'], 'New registration',msg, datetime.now())
        cursor.execute(add_email, data_email)
        cnx.commit()
        cursor.close()
        cnx.close()
        resp.body = json.dumps(email_req)

api = falcon.API()
api.add_route('/email', EmailResource())
