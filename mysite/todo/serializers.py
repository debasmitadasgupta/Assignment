
# todo/serializers.py

from rest_framework import serializers
from .models import Todo,Bucket
      
class TodoSerializer(serializers.ModelSerializer):
  class Meta:
    model = Todo
    fields = ['id', 'title', 'description', 'completed','bucket_id']

class BucketSerializer(serializers.ModelSerializer):
  class Meta:
    model = Bucket
    fields = ['id','bucket_name']