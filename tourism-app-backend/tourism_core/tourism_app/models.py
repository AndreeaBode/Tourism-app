from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    userRole = models.CharField(max_length=20, choices=[('agent', 'Agent'), ('client', 'Client')])

class Destination(models.Model):
    location = models.CharField(max_length=100)
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2)
    available_seats = models.IntegerField()
    offer_percentage = models.DecimalField(max_digits=5, decimal_places=2)
    offer_price = models.DecimalField(max_digits=5, decimal_places=2)
    imageUrl = models.CharField(max_length=200)  

class Calatorii(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    location = models.CharField(max_length=100)
    description = models.TextField()
    image_url = models.URLField()
    has_offer = models.BooleanField(default=False)


class Destinatii(models.Model):
    name = models.CharField(max_length=100)
    current_price = models.FloatField()

class Reservation(models.Model):
    destination = models.ForeignKey(Calatorii, on_delete=models.CASCADE, to_field='id')
    reservation_date = models.DateField(auto_now_add=True)
    start_date = models.DateField()
    end_date = models.DateField()
    total_cost = models.FloatField()

    def __str__(self):
        return self.destination.location


