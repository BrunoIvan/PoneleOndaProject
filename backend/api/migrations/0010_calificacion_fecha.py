# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_auto_20151024_0057'),
    ]

    operations = [
        migrations.AddField(
            model_name='calificacion',
            name='fecha',
            field=models.DateTimeField(default=datetime.datetime(2015, 11, 6, 1, 18, 33, 953305, tzinfo=utc), auto_now=True),
            preserve_default=False,
        ),
    ]
