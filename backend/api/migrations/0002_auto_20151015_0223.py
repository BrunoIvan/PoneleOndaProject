# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuario',
            name='fb_id',
            field=models.CharField(max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='usuario',
            name='google_id',
            field=models.CharField(max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='usuario',
            name='tw_id',
            field=models.CharField(max_length=200, null=True),
        ),
    ]
