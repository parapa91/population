import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ResponseInterface } from "../interfaces/response.interface";
import { DataInterface } from '../interfaces/data.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _serviceUrl: string = 'https://restcountries.com/v3/all?fields=name,region,population';
  private _response: ResponseInterface[] = [];
  private _data: DataInterface[] = [];
  private _results: DataInterface[] = [];
  public names: string[] = [];
  public population: number[] = [];

  private _refreshRequired: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  get RefreshRequired() {
    return this._refreshRequired;
  }

  constructor(private httpClient: HttpClient) {}

  searchData(continent: string){
    if (this._response.length > 0) {
      this.filterByContinent(continent);
    } else {
      this.httpClient.get<ResponseInterface[]>(this._serviceUrl).subscribe((resp) => {
        this.initData(resp, continent);
      });
    }
  }

  initData(response: ResponseInterface[], continent: string) {
    this._response = response;
    this.filterByContinent(continent);
  }

  filterByContinent(continent: string) {
    const groupByContinent = this.groupBy(['region']);
    const continentsObject = groupByContinent(this._response);
    const continents = Object.keys(continentsObject);

    if(continent !== 'World') {
      this._data = this.getDataByContinent(continentsObject, continent);
    } else {
      this._data = this.getDataContinents(continentsObject, continents);
    }
    this._results = this.sortByName(this._data);
    this.getNamesAndPopulation(this._results);
    this.RefreshRequired.next(true);
  }

  getDataByContinent(continentsObject: Record<string, ResponseInterface[]>, continent: string): DataInterface[] {
    let data: DataInterface[] = [];
    continentsObject[continent].forEach(element => {
      let con: DataInterface = {
        name: element.name.common,
        population: element.population
      };
      data.push(con);
    });
    return data;
  }

  getDataContinents(continentsObject: Record<string, ResponseInterface[]>, continents: string[]) {
    let data: DataInterface[] = [];
    continents.forEach(element => {
      let initPop: number = 0;
      let pop: number = continentsObject[element].reduce(
        (acc, cur) => acc + cur.population, initPop
      );
      let con: DataInterface = {
        name: element,
        population: pop
      };
      data.push(con);
    });
    return data;
  }

  getNamesAndPopulation(results: DataInterface[]) {
    this.names = [];
    this.population = [];
    results.forEach(element => {
      this.names.push(element.name);
      this.population.push(element.population);
    });
  }

  searchByPopulation(population: number) {
    this._results = this._data.filter(rec => rec.population >= population);
    this.getNamesAndPopulation(this._results);
    this.RefreshRequired.next(true);
  }

  groupBy = (keys: (keyof ResponseInterface)[]) => (array: ResponseInterface[]): Record<string, ResponseInterface[]> =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = keys.map((key) => obj[key]).join('-');
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {} as Record<string, ResponseInterface[]>);

  sortByName(data: DataInterface[]): DataInterface[] {
    return data.sort((a, b) => {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    });
  }
}
