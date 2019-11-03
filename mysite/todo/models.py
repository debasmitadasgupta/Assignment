
# todo/models.py
      
from django.db import models
# Create your models here.

class Bucket(models.Model):
  bucket_name = models.CharField(max_length=100)


# add this
class Todo(models.Model):
  title = models.CharField(max_length=120)
  description = models.TextField()
  completed = models.BooleanField(default=False)
  bucket = models.ForeignKey(Bucket,on_delete=models.CASCADE)
      
class User(models.Model):
    email = models.CharField(max_length=120)
    password = models.TextField()
    browser =  models.TextField()