# Generated by Django 5.0.3 on 2024-04-01 20:49

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tourism_app', '0003_destinatii_reservation'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reservation',
            name='destination',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tourism_app.calatorii'),
        ),
    ]
