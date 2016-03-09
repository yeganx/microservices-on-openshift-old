from django.core.management import call_command

call_command('gunicorn','--bind','0.0.0.0:8080','sample:api')
