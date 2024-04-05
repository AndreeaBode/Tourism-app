from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Destinatii, Reservation
from .models import Destination, User
from .models import Calatorii


class DestinationAdmin(admin.ModelAdmin):
    list_display = ('id', 'location', 'price_per_night', 'available_seats', 'offer_percentage', 'imageUrl')
    search_fields = ('location',)
    list_filter = ('price_per_night', 'available_seats', 'offer_percentage')
    list_per_page = 20

admin.site.register(Destination, DestinationAdmin)

class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'username', 'password', 'first_name', 'last_name', 'userRole']

admin.site.register(User, UserAdmin)

class CalatoriiAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price', 'location', 'description', 'image_url', 'has_offer')
    search_fields = ('name', 'location')
    list_filter = ('price', 'has_offer')
    list_per_page = 20

admin.site.register(Calatorii, CalatoriiAdmin)


class DestinatiiAdmin(admin.ModelAdmin):
    list_display = ('name', 'current_price')  
    search_fields = ('name',)  
    list_filter = ('current_price',)  

class ReservationAdmin(admin.ModelAdmin):
    list_display = ('destination', 'reservation_date', 'start_date', 'end_date', 'total_cost')
    search_fields = ('destination__id', 'reservation_date')  # Folosește id-ul destinației în loc de nume
    list_filter = ('start_date', 'end_date')

admin.site.register(Destinatii, DestinatiiAdmin)
admin.site.register(Reservation, ReservationAdmin)



