# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_auto_20151016_1442'),
    ]

    operations = [
        migrations.AlterField(
            model_name='calificacion',
            name='establecimiento',
            field=models.ForeignKey(related_name='calificaciones', to='api.Establecimiento'),
        ),
        migrations.AlterField(
            model_name='calificacion',
            name='usuario',
            field=models.ForeignKey(to='api.Usuario'),
        ),
    ]
