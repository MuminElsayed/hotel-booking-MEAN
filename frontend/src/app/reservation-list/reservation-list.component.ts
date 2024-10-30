import { Component, OnInit } from '@angular/core';
import { Reservation } from '../models/reservation';
import { ReservationService } from '../reservation/reservation.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css'],
})
export class ReservationListComponent implements OnInit {
  reservations: Reservation[] = [];

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.reservationService.getReservations().subscribe((reservs) => {
      this.reservations = reservs;
    });
  }

  deleteReservation(id: string): void {
    this.reservationService.deleteReservation(id).subscribe({
      next: () => {
        console.log(`Reservation ${id} deleted.`);
        this.reservations = this.reservations.filter((res) => res._id !== id);
      },
      error: (error) => {
        console.error('Error deleting reservation', error);
      },
    });
  }
}
