from django.db import migrations
from api.user.models import CustomUser

class Migration(migrations.Migration):
    
    def seed_data(apps, schema_editor):
        user= CustomUser(name="Yukti",
        email= "bhattyukti5@gmail.com",
        is_staff= True,
        is_superuser= True,
        phone="9848995288",
        gender="Female"
        )

        user.set_password("12345")
        user.save()

    dependencies = [

    ]

    operations = [
        migrations.RunPython(seed_data),


    ]
