# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20151015_0223'),
    ]

    operations = [
        migrations.AlterField(
            model_name='calificacion',
            name='usuario',
            field=models.OneToOneField(to='api.Usuario'),
        ),
        migrations.AlterField(
            model_name='usuario',
            name='fb_id',
            field=models.CharField(max_length=200, unique=True, null=True),
        ),
        migrations.AlterField(
            model_name='usuario',
            name='google_id',
            field=models.CharField(max_length=200, unique=True, null=True),
        ),
        migrations.AlterField(
            model_name='usuario',
            name='tw_id',
            field=models.CharField(max_length=200, unique=True, null=True),
        ),
    ]
