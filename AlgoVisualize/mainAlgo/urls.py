
from django.urls import path
from . import views

urlpatterns = [
    path('', views.homepage,name = 'algo-home'),
    path('Insertion_sort/', views.insertionsort,name = 'insertion-sort'),
    path('Bubble_sort/', views.bubblesort,name = 'bubble-sort'),
]
