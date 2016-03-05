
import falcon
import json
import smtplib

class EmailResource(object):
    def on_get(self, req, resp):
        """Handles GET requests"""
        resp.status = falcon.HTTP_200
        resp.body = 'Email API'
 
    def on_post(self, req, resp):
        """Handles POST requests"""
        try:
            raw_json = req.stream.read()
        except Exception as ex:
            raise falcon.HTTPError(falcon.HTTP_400,
                'Error',
                ex.message)
 
        try:
            email_req = json.loads(raw_json, encoding='utf-8')
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
        resp.body = json.dumps(email_req, encoding='utf-8')

api = falcon.API()
api.add_route('/email', EmailResource())
