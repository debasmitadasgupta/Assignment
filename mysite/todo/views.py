
# todo/views.py

# from django.shortcuts import render
from rest_framework import viewsets          # add this
from .serializers import TodoSerializer,BucketSerializer      # add this
# from .models import Todo                     # add this
#
        # add this
#   queryset = Todo.objects.all()              # add this

from django.db import connection

from django.shortcuts import render
from .models import Todo,Bucket,User
from rest_framework import status
from rest_framework.decorators import api_view


# Create your views here.
from django.http import HttpResponse, HttpRequest
from django.core import serializers
import json


def index(request):
    return HttpResponse("Hello, world. You're at the todos index.")


def get_todos(request):
    qs=Todo.objects.raw("SELECT * FROM todo_todo")
    serializer = TodoSerializer(qs,many=True)
    # print(serializer.data)
    # qs_json = serializers.serialize('json', qs)
    output_dict = json.loads(json.dumps(serializer.data))
    print(output_dict)
    return HttpResponse(json.dumps(output_dict), 200)

def add_todo(request):
    params=json.loads(request.body)
    print(params)
    title = params['title']
    description =params['description']
    completed =params['completed']
    bucket_id =int(params['bucket_id'])
    with connection.cursor() as cursor:
        cursor.execute("INSERT INTO todo_todo (title,description,completed,bucket_id) VALUES ('{}','{}',{},{})".format(title,description,completed,bucket_id))
    return  HttpResponse("Success",200)


def get_buckets(request):
    qs=Bucket.objects.raw("SELECT * FROM todo_bucket")
    serializer = BucketSerializer(qs,many=True)
    output_dict = json.loads(json.dumps(serializer.data))
    print(output_dict)
    return HttpResponse(json.dumps(output_dict), 200)

@api_view(['POST'])
def add_bucket(request):
    params=json.loads(request.body)
    print(params)
    bucket_name = params['bucket_name']
    with connection.cursor() as cursor:
        cursor.execute("INSERT INTO todo_bucket (bucket_name) VALUES ('{}')".format(bucket_name))
    return  HttpResponse("Success",200)

@api_view((['PUT']))
def update_todo(request,todo_id):
    params=json.loads(request.body)
    print(params)
    title = params['title']
    description =params['description']
    completed =params['completed']
    bucket_id =int(params['bucket_id'])
    with connection.cursor() as cursor:
        cursor.execute("UPDATE todo_todo SET title= '{}',description= '{}',completed= {},bucket_id = {} WHERE id = {}".format(title,description,completed,bucket_id,todo_id))
    return  HttpResponse("Success",200)


@api_view(['DELETE'])
def delete_todo(request,todo_id):
    with connection.cursor() as cursor:
        cursor.execute("DELETE FROM todo_todo WHERE id = {}".format(todo_id))
    return  HttpResponse("Success",200)

@api_view(['POST'])
def save_userInfo(request):
    params = json.loads(request.body)
    print(params)
    email = params['email']
    password = params['password']
    browser = params['browser']
    with connection.cursor() as cursor:
        cursor.execute("INSERT INTO todo_user (email,password,browser) VALUES ('{}','{}','{}')".format(email,password,browser))
    return  HttpResponse("Success",200)














