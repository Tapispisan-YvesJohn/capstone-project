import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecordsService } from '../services/records.service';

@Component({
  selector: 'app-view-record',
  templateUrl: './view-record.component.html',
  styleUrls: ['./view-record.component.css']
})
export class ViewRecordComponent implements OnInit {
  student: any;

  constructor(private route: ActivatedRoute, private recordsService: RecordsService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.recordsService.getRecordById(id).subscribe({
      next: (record) => {
        this.student = record;
      },
      error: (error) => {
        console.error('Error fetching student record', error);
      }
    });
  }
}
