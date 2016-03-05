from django.core.management import call_command

call_command('gunicorn', 'sample:api')
