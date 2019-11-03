from django.shortcuts import render
from .models import Question

# Create your views here.
from django.http import HttpResponse


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


def detail(request, question_id):
    return HttpResponse("You're looking at question %s." % question_id)

def results(request, question_id):
    response = "You're looking at the results of question %s."
    return HttpResponse(response % question_id)

def vote(request, question_id):
    return HttpResponse("You're voting on question %s." % question_id)



#This is the simplest view possible in Django. To call the view, we need to map it to a URL - and for this we need a URLconf.

#To create a URLconf in the polls directory, create a file called urls.py

















