import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Reservation } from '../models/reservation'; // Ensure this import

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css'],
  providers: [],
})
export class ReservationFormComponent implements OnInit {
  reservationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    // Initialize reservationForm in the constructor
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.reservationService.getReservation(id).subscribe((reservation) => {
        if (reservation) {
          this.reservationForm.patchValue(reservation);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.reservationForm.valid) {
      let res: Reservation = this.reservationForm.value;
      let id = this.activatedRoute.snapshot.paramMap.get('id');
      const navigateToList = () => {
        this.router.navigate(['/list']);
      };
      if (id) {
        this.reservationService.updateReservation(id, res).subscribe(() => {
          console.log(`Reservation ${id} updated`);
          this.reservationService
            .getReservations()
            .subscribe((updatedReservations) => {
              console.log('Updated Reservations:', updatedReservations);
            });
          navigateToList();
        });
      } else {
        this.reservationService.addReservation(res).subscribe({
          next: () => {
            console.log(`Reservation added.`);
            navigateToList();
          },
          error: (error) => {
            console.error('Error adding reservation', error);
          },
        });
      }
    }
  }
}
