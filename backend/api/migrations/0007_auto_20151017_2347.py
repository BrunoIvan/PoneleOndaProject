# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_auto_20151016_1454'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='ciudad',
            options={'ordering': ('nombre',)},
        ),
        migrations.AlterModelOptions(
            name='rubro',
            options={'ordering': ('nombre',)},
        ),
        migrations.AlterUniqueTogether(
            name='calificacion',
            unique_together=set([('establecimiento', 'usuario')]),
        ),
        migrations.AlterUniqueTogether(
            name='ciudad',
            unique_together=set([('nombre', 'provincia')]),
        ),
    ]
