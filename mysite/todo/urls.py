from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    # path('<int:question_id>/', views.detail, name='detail'),
    # # ex: /polls/5/results/
    # path('<int:question_id>/results/', views.results, name='results'),
    # ex: /polls/5/vote/
    # path('<int:question_id>/vote/', views.vote, name='vote'),
    path('todos', views.get_todos, name='getTodos'),
    path('buckets', views.get_buckets, name='buckets'),
    path('addTodo', views.add_todo, name='addTodos'),
    path('addBucket', views.add_bucket, name='addBucket'),
    path('updateTodo/<int:todo_id>/', views.update_todo, name='updateBucket'),
    path('deleteTodo/<int:todo_id>',views.delete_todo, name = 'deleteTodo'),
    path('saveUserInfo',views.save_userInfo, name = 'SaveUserInfo')

]



















