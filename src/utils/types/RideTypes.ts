export interface IPassenger {
  user: {
    id: number;
    name: string;
    avatar: null;
    vehicle: null;
    rating: null;
    numberOfRides: null;
    reviews: null;
  };
  numberOfSeats: number;
  status: string;
}
export interface IRides {
  id: number;
  userInfo: {
    id: number;
    name: string;
    avatar: string;
    vehicle: string;
    rating: string;
    numberOfRides: number;
    reviews: [
      {
        id: number;
        comment: string;
        rating: number;
        reviewerId: number;
        reviewerName: string;
        reviewedUserId: number;
        commentDate: string;
        reviewerPicture: null;
      }
    ];
  };
  vehicle: {
    id: number;
    userId: number;
    brand: string;
    model: string;
    picture: string;
    plateNumber: string;
    seats: number;
    year: number;
    color: string;
    airCondition: true;
    usbCharging: true;
    music: true;
    comfortableSeats: true;
  };
  estimate: {
    estimatedArrivalTimes: string[];
  };
  fromLocation: string;
  toLocation: string;
  date: string;
  time: string;
  price: number;
  seatsAvailable: number;
  status: null;
  luggageSize: string;
  currency: string;
  waypoints: [];
  notes: string;
  passengerBookings: IPassenger[];
}
export interface IRidesData {
  driver: boolean;
  ride: IRides;
}
