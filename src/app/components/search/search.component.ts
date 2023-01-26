import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  view: string = '';

  constructor(private _route: ActivatedRoute,  private dataService: DataService ) {}

  ngOnInit(): void {
    this._route.data.subscribe(params => {
      this.view = params['continent'];
    });
  }

  searchByPopulation(search: string) {
    const filter: number = parseInt(search);
    const value: number = filter ? filter : 0;
    this.dataService.searchByPopulation(value);
  }
}
