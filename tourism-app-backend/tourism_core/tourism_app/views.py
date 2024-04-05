# views.py
from .models import User
from django.contrib.auth import authenticate, login
from django.middleware.csrf import get_token
from django.http import JsonResponse
from .models import Destination
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse
from .models import Calatorii, Destinatii, Reservation
from django.db.models.functions import ExtractMonth
from django.db.models import Count
from django.conf import settings
from datetime import datetime
import jwt
import json


@csrf_exempt
def register(request):
    if request.method == 'POST':
        print("HTTP request body:", request.body)

        data = json.loads(request.body)

        email = data.get('email')
        password = data.get('password')
        userRole = 'client'
        print("email", email)
        print("password", password)

        print("User data received:", {'email': email, 'password': password})
        if email is None or password is None:
            return JsonResponse({'error': 'Email or password missing'}, status=400)

        username, domain = email.split('@')

        if User.objects.filter(email=email).exists():
            return JsonResponse({'error': 'Email already in use'}, status=400)

        user = User.objects.create_user(username=username, email=email, password=password)
        print("User", user)
        user.userRole = userRole
        user.is_staff = True

        user.is_superuser=True
        user.save()
        user = authenticate(username = username, password=password)
        print("user222", user)
        return JsonResponse({'message': 'User registered successfully'})
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)


@csrf_exempt
def login_view(request):
    if request.method == 'POST':

        login_data = json.loads(request.body)
        email = login_data.get('email')
        password = login_data.get('password')

        print("email", email)
        print("password", password)

        username, _ = email.split('@')
        print("username", username)
        
        

        print("E", email)
        print("P", password)

        user = authenticate(username=username, password=password)

        print("user", user)

        if user is not None:
            token = generate_jwt_token(user)
            print("TOKEN", token)
            login(request, user)  
            return JsonResponse({'message': 'Login successful', 'token': token})
        else:

            return JsonResponse({'error': 'Invalid username or password'}, status=400)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)


SECRET_KEY = settings.SECRET_KEY

def generate_jwt_token(user):
    payload = {
        'email': user.email,
        'id': user.id,
        'userRole': user.userRole 
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    return token

@csrf_exempt
def add(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        location = data.get('location')
        price_per_night = data.get('price_per_night')
        available_seats = data.get('available_seats')
        offer_percentage = data.get('offer_percentage')
        imageUrl = data.get('imageUrl')

        try:
            if offer_percentage != 0:
                offer_price = price_per_night - (offer_percentage / 100) * price_per_night
            else:
                offer_price = price_per_night

            destination = Destination.objects.create(
                location=location,
                price_per_night=price_per_night,
                available_seats=available_seats,
                offer_percentage=offer_percentage,
                offer_price=offer_price, 
                imageUrl=imageUrl
            )
            destination.save()
            return JsonResponse({'success': True, 'message': 'Destinația a fost adăugată cu succes!'})
        except Exception as e:
            return JsonResponse({'success': False, 'message': str(e)})

    return JsonResponse({'success': False, 'message': 'Cererea trebuie să fie de tip POST!'})



@csrf_exempt
def get(request):
    if request.method == 'GET':
    
        destinations = Destination.objects.all()
        destinations_list = []
        for destination in destinations:
            destination_dict = {
                'id': destination.id,
                'location': destination.location,
                'price_per_night': destination.price_per_night,
                'available_seats': destination.available_seats,
                'offer_percentage': destination.offer_percentage,
                'offer_price': destination.offer_price,
                'imageUrl': destination.imageUrl,
            }
            destinations_list.append(destination_dict)

        return JsonResponse(destinations_list, safe=False)

    return JsonResponse({'error': 'Cererea trebuie să fie de tip GET!'}, status=400)


@csrf_exempt
def delete(request, destination_id):
    try:
        destination = Destination.objects.get(pk=destination_id)
    except Destination.DoesNotExist:
        return JsonResponse({'success': False, 'message': 'Destinația nu există.'}, status=404)

    try:
        destination.delete()
        return JsonResponse({'success': True, 'message': 'Destinația a fost ștearsă cu succes!'})
    except Exception as e:
        return JsonResponse({'success': False, 'message': str(e)}, status=500)


@csrf_exempt
def update_destination(request, destination_id):
    try:
        destination = Destination.objects.get(id=destination_id)
    except Destination.DoesNotExist:
        return JsonResponse({'success': False, 'message': 'Destinația nu există'}, status=404)

    if request.method == 'PUT':
        data = json.loads(request.body)

        destination.location = data.get('location', destination.location)
        destination.price_per_night = data.get('price_per_night', destination.price_per_night)
        destination.available_seats = data.get('available_seats', destination.available_seats)
        destination.offer_percentage = data.get('offer_percentage', destination.offer_percentage)
        destination.imageUrl = data.get('imageUrl', destination.imageUrl)
        destination.save()
        return JsonResponse({'success': True, 'message': 'Destinația a fost actualizată cu succes'})
    else:
        return JsonResponse({'success': False, 'message': 'Metoda HTTP trebuie să fie PUT'}, status=400)


@csrf_exempt
def get_calatorii(request):
    if request.method == 'GET':
        calatorii = Calatorii.objects.all()

        calatorii_list = []
        for calatorie in calatorii:
            calatorie_dict = {
                'id': calatorie.id,
                'name': calatorie.name,
                'price': calatorie.price,
                'location': calatorie.location,
                'description': calatorie.description,
                'image_url': calatorie.image_url,
                'has_offer': calatorie.has_offer,
            }
            calatorii_list.append(calatorie_dict)

        return JsonResponse(calatorii_list, safe=False)

    return JsonResponse({'error': 'Request must be a GET request'}, status=400)


@csrf_exempt
def check_availability(request):
    if request.method == 'POST':

        data = json.loads(request.body)

        destination_id = data.get('destination')
        start_date_str = data.get('start_date')
        end_date_str = data.get('end_date')
        print("id", destination_id)
        print("start", start_date_str)
        print("end", end_date_str)

        if start_date_str is not None:
            start_date = datetime.strptime(start_date_str, '%Y-%m-%d')
        else:
            return JsonResponse({'error': 'Data de început lipsește'})

        if end_date_str is not None:
            end_date = datetime.strptime(end_date_str, '%Y-%m-%d')
        else:
            return JsonResponse({'error': 'Data de sfârșit lipsește'})

        reservations_exist = Reservation.objects.filter(destination__id=destination_id).exists()

        if not reservations_exist:
            destination = Calatorii.objects.get(pk=destination_id)
            nights = (end_date - start_date).days
            total_cost = nights * destination.price
            return JsonResponse({'available': True, 'totalCost': total_cost})

        reservations_overlap = Reservation.objects.filter(destination__id=destination_id, start_date__lte=end_date, end_date__gte=start_date).exists()

        if not reservations_overlap:
            destination = Calatorii.objects.get(pk=destination_id)
            nights = (end_date - start_date).days
            total_cost = nights * destination.price
            return JsonResponse({'available': True, 'totalCost': total_cost})
        else:
            return JsonResponse({'available': False})
    else:
        return JsonResponse({'error': 'Metoda HTTP trebuie să fie POST'})



@csrf_exempt
def reservation(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        destination_id = data.get('destinationId')
        start_date = data.get('start_date')
        end_date = data.get('end_date')
        total_cost = data.get('total_cost')

        try:
            destination = Calatorii.objects.get(pk=destination_id)
            reservation = Reservation(destination=destination, start_date=start_date, end_date=end_date, total_cost=total_cost)
            reservation.save()
            return JsonResponse({'message': 'Reservation created successfully.'})
        except Destination.DoesNotExist:
            return JsonResponse({'error': 'Destination not found'}, status=404)

    return HttpResponse(status=405)


@csrf_exempt
def calatorii_availability(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        start_date_str = data.get('startDate')
        end_date_str = data.get('endDate')

        if not start_date_str or not end_date_str:
            return JsonResponse({'error': 'Datele de început și/sau de sfârșit lipsesc.'}, status=400)

        start_date = datetime.strptime(start_date_str, '%Y-%m-%d')
        end_date = datetime.strptime(end_date_str, '%Y-%m-%d')

        available_calatorii = []

        try:
            calatorii = Calatorii.objects.all()

            for calatorie in calatorii:
                reservations_overlap = Reservation.objects.filter(
                    destination=calatorie,
                    start_date__lte=end_date,
                    end_date__gte=start_date
                ).exists()

                if not reservations_overlap:
                    calatorie_info = {
                        'id': calatorie.id,
                        'name': calatorie.name,
                        'price': calatorie.price,
                        'location': calatorie.location,
                        'description': calatorie.description,
                        'image_url': calatorie.image_url,
                        'has_offer': calatorie.has_offer
                    }
                    available_calatorii.append(calatorie_info)

            return JsonResponse({'available_calatorii': available_calatorii})

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Metoda HTTP trebuie să fie POST'}, status=405)


@csrf_exempt
def get_reservations_for_destination(request, destination_id):
    reservations = Reservation.objects.filter(destination_id=destination_id)
    print("Rez1",reservations)
    reservations_data = [{'start_date': reservation.start_date, 'end_date': reservation.end_date} for reservation in reservations]
    print("Rez2",reservations_data)
    return JsonResponse(reservations_data, safe=False)


@csrf_exempt
def destination_statistics(request, destination_id):
    monthly_statistics = Reservation.objects.filter(destination_id=destination_id) \
        .annotate(month=ExtractMonth('start_date')) \
        .values('month') \
        .annotate(reservations_count=Count('id')) \
        .order_by('month')

    statistics_data = [{
        'month': entry['month'],
        'reservations_count': entry['reservations_count']
    } for entry in monthly_statistics]

    return JsonResponse(statistics_data, safe=False)

