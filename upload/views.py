from django.shortcuts import render
from .forms import UploadForm
from django.http import JsonResponse
# Create your views here.
def index(request):
    return render(request,'base.html')

def home(request):
    form=UploadForm(request.POST or None,request.FILES or None)
    if request.is_ajax():
        if form.is_valid():
            form.save()
            return JsonResponse({'messsage':'Hell Yeah!'})

    context={'form':form}
    return render(request,'main.html',context)