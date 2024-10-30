import express from "express";
import Reservation from "../models/Reservation.js";

const router = express.Router();

// GET all reservations
router.get("/reservations", async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
    console.log("Got: " + JSON.stringify(reservations));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single reservation by ID
router.get("/reservation/:id", async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.json(reservation);
    console.log("Got: " + JSON.stringify(reservation));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new reservation
router.post("/reservation", async (req, res) => {
  const reservation = new Reservation({
    checkInDate: req.body.checkInDate,
    checkOutDate: req.body.checkOutDate,
    guestName: req.body.guestName,
    guestEmail: req.body.guestEmail,
    roomNumber: req.body.roomNumber,
  });
  try {
    const newReservation = await reservation.save();
    res.status(201).json(newReservation);
    console.log("Added: " + JSON.stringify(reservation));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a reservation by ID
router.delete("/reservation/:id", async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    console.log("Reservation found: ", reservation);
    await reservation.deleteOne();
    res.json({ message: "Reservation deleted successfully" });
  } catch (err) {
    console.error("Error deleting reservation:", err);
    res
      .status(500)
      .json({ message: "Failed to delete reservation", error: err.message });
  }
});

// PUT (update) a reservation by ID
router.put("/reservation/:id", async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    // Update fields
    reservation.checkInDate = req.body.checkInDate ?? reservation.checkInDate;
    reservation.checkOutDate =
      req.body.checkOutDate ?? reservation.checkOutDate;
    reservation.guestName = req.body.guestName ?? reservation.guestName;
    reservation.guestEmail = req.body.guestEmail ?? reservation.guestEmail;
    reservation.roomNumber = req.body.roomNumber ?? reservation.roomNumber;

    const updatedReservation = await reservation.save();
    res.json(updatedReservation);
    console.log("Updated: " + JSON.stringify(reservation));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
