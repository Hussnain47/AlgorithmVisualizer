
from django.urls import path
from . import views

urlpatterns = [
    path('', views.homepage,name = 'algo-home'),
    path('Insertion_sort/', views.insertionsort,name = 'insertion-sort'),
    path('Bubble_sort/', views.bubblesort,name = 'bubble-sort'),
    path('BigIS/',views.bigIS,name= 'big-insertion-sort'),
    path('Merge_Sort/',views.mergesort,name= 'merge-sort'),
    path('Quick_Sort/',views.quicksort,name= 'quick-sort'),
    path('Linked_List/',views.linkedlist,name= 'linked-list'),
    path('Stack/',views.stack,name= 'stack'),
    path('Queue/',views.queue,name= 'queue'),
    path('BST/',views.bst,name= 'bst'),
]
