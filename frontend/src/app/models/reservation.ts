export interface Reservation {
  _id: string;
  checkInDate: Date;
  checkOutDate: Date;
  guestName: string;
  guestEmail: string;
  roomNumber: number;
}
