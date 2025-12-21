from django.urls import path
from . import views

urlpatterns = [
    path('', views.friend_list, name='friend_list'),
    path('requests/', views.friend_requests, name='friend_requests'),
]
