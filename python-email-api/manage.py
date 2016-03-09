from django.core.management import call_command

call_command('/usr/local/bin/gunicorn','--bind','0.0.0.0:8080','sample:api')