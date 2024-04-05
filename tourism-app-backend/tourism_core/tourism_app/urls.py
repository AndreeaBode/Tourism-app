from django.contrib import admin
from django.urls import path
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt
from . import views


urlpatterns = [

    path('api/register/', views.register, name='register'),
    path('login/', views.login_view, name='login'),
    path('add/', views.add, name='add'),
    path('get/', views.get, name='get'),
    path('delete/<int:destination_id>/', views.delete, name='delete_destination'),
    path('update/<int:destination_id>/', views.update_destination, name='update_destination'),
    path('calatorii/', views.get_calatorii, name='get_calatorii'),
    path('check_availability/', views.check_availability, name='check_availability'),
    path('reservation/', views.reservation, name='reservation'),
    path('calatorii-availability', views.calatorii_availability, name='calatorii_availability'),
    path('reservations/<int:destination_id>/', views.get_reservations_for_destination, name='get_reservations_for_destination'),
    path('destination-statistics/<int:destination_id>/', views.destination_statistics, name='destination_statistics'),


]  

