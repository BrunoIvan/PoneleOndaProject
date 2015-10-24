# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_auto_20151021_2259'),
    ]

    operations = [
        migrations.AlterField(
            model_name='establecimiento',
            name='nombre',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterUniqueTogether(
            name='establecimiento',
            unique_together=set([('nombre', 'ciudad')]),
        ),
    ]
