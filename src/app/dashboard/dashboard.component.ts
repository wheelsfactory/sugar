import { BabyService } from './service/baby.service';
import {Component, OnInit} from '@angular/core';
import { Baby } from './model/Baby';

@Component({
  selector: 'sugar-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  babies: Baby[];

  constructor(private babyService: BabyService) {
  }

  ngOnInit() {
    this.babyService.getBabiesByUsername("admin@donut").subscribe(
      (result) => {
          this.babies = result;
      }
    );
  }

  loadBabyInfo() {
    
  }

}
