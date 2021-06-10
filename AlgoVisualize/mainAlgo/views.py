from django.shortcuts import render

def homepage(request):
    return render(request,'mainAlgo/Homepage.htm')

def insertionsort(request):
    return render(request,'mainAlgo/Insertion_Sort.htm')    
