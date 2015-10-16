# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_merge'),
    ]

    operations = [
        migrations.AlterField(
            model_name='calificacion',
            name='establecimiento',
            field=models.OneToOneField(related_name='calificaciones', to='api.Establecimiento'),
        ),
    ]
