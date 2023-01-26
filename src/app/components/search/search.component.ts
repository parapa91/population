import { Component} from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  constructor( private dataService: DataService ) {}

  searchByPopulation(search: string) {
    const filter: number = parseInt(search);
    const value: number = filter ? filter : 0;
    this.dataService.searchByPopulation(value);
  }
}
