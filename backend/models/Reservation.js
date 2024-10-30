import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema({
  id: { type: String, required: false },
  checkInDate: { type: String, required: true },
  checkOutDate: { type: String, required: true },
  guestName: { type: String, required: true },
  guestEmail: { type: String, required: true },
  roomNumber: { type: Number, required: true },
});

const Reservation = mongoose.model("Reservation", ReservationSchema);
export default Reservation;
