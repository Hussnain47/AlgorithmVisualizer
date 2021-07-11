from django.shortcuts import render

def homepage(request):
    return render(request,'mainAlgo/Homepage.htm')

def insertionsort(request):
    return render(request,'mainAlgo/Insertion_Sort.htm')   

def bubblesort(request):
    return render(request,'mainAlgo/Bubble_Sort.htm')     
