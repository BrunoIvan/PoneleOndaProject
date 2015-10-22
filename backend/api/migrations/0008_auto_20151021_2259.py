# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_auto_20151017_2347'),
    ]

    operations = [
        migrations.AlterField(
            model_name='establecimiento',
            name='nombre',
            field=models.CharField(unique=True, max_length=200),
        ),
    ]
