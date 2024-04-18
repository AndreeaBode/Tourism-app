export class Destination {
  id: number;
  location: string;
  price_per_night: number; 
  available_seats: number; 
  offer_percentage: number; 
  offer_price: number;
  imageUrl: string;

  constructor(
    id: number = 0,
    location: string = '',
    price_per_night: number = 0,
    available_seats: number = 0,
    offer_percentage: number = 0,
    offer_price: number = 0,
    imageUrl: string = ''
  ) {
    this.id = id;
    this.location = location;
    this.price_per_night = price_per_night;
    this.available_seats = available_seats;
    this.offer_percentage = offer_percentage;
    this.offer_price = offer_price;
    this.imageUrl = imageUrl;
  }
}