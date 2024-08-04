import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  students = [
    { name: 'Batumbakal, George', id: '2021-00166-TG-0', course: 'BSIT' },
    { name: 'Dimagiba, Arnold', id: '2021-00177-TG-0', course: 'BSIT' },
    { name: 'Tinambakan, James', id: '2021-00196-TG-0', course: 'BSIT' }
  ];

  constructor(private router: Router) { }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
