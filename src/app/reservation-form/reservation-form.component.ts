import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  standalone: false,
  
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute){

  }

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required],
    });

    let id = this.activatedRoute.snapshot.paramMap.get("id");
    if(id){
      let reservationById = this.reservationService.getReservation(id);
      if(reservationById){
        this.reservationForm.patchValue(reservationById);
      }
    }
  }

  reservationForm: FormGroup = new FormGroup({});

  onSubmit(): void {
    if(this.reservationForm.valid){
      let reservation: Reservation = this.reservationForm.value;
      let id = this.activatedRoute.snapshot.paramMap.get("id");
      if(id){
        this.reservationService.updateReservation(id, reservation);
      } else {
        this.reservationService.addReservation(reservation);
      }
      this.router.navigate(['/list']);
    }
  }


}
