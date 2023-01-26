import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-population',
  templateUrl: './population.component.html',
  styleUrls: ['./population.component.css']
})
export class PopulationComponent implements OnInit {
  constructor(private _route: ActivatedRoute, private dataService: DataService) {}

  ngOnInit(): void {
    this._route.data.subscribe(params => {
      this.dataService.searchData(params['continent']);
    });
  }
}
