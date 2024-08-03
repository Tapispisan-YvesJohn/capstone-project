import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  students = [
    { name: 'Despe, Reymond Christian A.', id: '2021-00166-TG-0', course: 'BSIT' },
    { name: 'Jalipa, Reanne Rylle C.', id: '2021-00177-TG-0', course: 'BSIT' },
    { name: 'Tapispisan, Yves John B.', id: '2021-00196-TG-0', course: 'BSIT' }
  ];

  constructor() { }

  ngOnInit(): void { }
}
