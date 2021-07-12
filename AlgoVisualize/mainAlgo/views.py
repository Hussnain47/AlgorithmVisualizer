from django.shortcuts import render

def homepage(request):
    return render(request,'mainAlgo/Homepage.html')

def insertionsort(request):
    return render(request,'mainAlgo/Insertion_Sort.html')   

def bigIS(request):
    return render(request,'mainAlgo/BigIS.html')

def bubblesort(request):
    return render(request,'mainAlgo/Bubble_Sort.html')     

def mergesort(request):
    return render(request, 'mainAlgo/MS.html')    
