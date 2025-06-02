import mongoengine as me
from datetime import datetime

class Image(me.Document):
    id = me.SequenceField(primary_key=True)
    title = me.StringField(required=True, max_length=60)
    description = me.StringField(max_length=250)
    image = me.FileField(required=True)
    created_at = me.DateTimeField(required=True, default=lambda: datetime.utcnow())