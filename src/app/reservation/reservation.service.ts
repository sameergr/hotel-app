import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservations: Reservation[] = [];
  private counter: number = 1;
  private appUrl = "http://localhost:3001";

  constructor(private httpClient: HttpClient){

  }

  // CRUD
  getReservations(): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(this.appUrl + "/reservations");
  }

  getReservation(id: string): Reservation | undefined{
    return this.reservations.find(res => res.id === id);
  }

  addReservation(reservation: Reservation): void {
    reservation.id = "" + this.counter++;
    this.reservations.push(reservation);
  }

  deleteReservation(id: string): void {
    let idx = this.reservations.findIndex(res => res.id === id);
    this.reservations.splice(idx, 1);
  }

  updateReservation(id: string, updatedReservation: Reservation): void {
    let idx = this.reservations.findIndex(res => res.id === id);
    this.reservations[idx] = updatedReservation;
  }

}
