import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PopulationComponent } from 'src/app/population/population.component';
const routes: Routes = [
  { path: "world", component: PopulationComponent, data: {continent: 'World'} },
  { path: "africa", component: PopulationComponent, data: {continent: 'Africa'}},
  { path: "americas", component: PopulationComponent, data: {continent: 'Americas'} },
  { path: "antarctic", component: PopulationComponent, data: {continent: 'Antarctic'} },
  { path: "asia", component: PopulationComponent, data: {continent: 'Asia'} },
  { path: "europe", component: PopulationComponent, data: {continent: 'Europe'} },
  { path: "oceania", component: PopulationComponent, data: {continent: 'Oceania'} },
  { path: "", redirectTo: "/world", pathMatch: "full" },
  { path: "**", redirectTo: "/world" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
