import { Component, Inject, PLATFORM_ID, OnInit } from "@angular/core";
import { isPlatformBrowser, isPlatformServer } from "@angular/common";
import { SpacesXService } from "./space.service";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  launches: any;
  launchYear = [] as any;
  uniqueLaunchYear = [] as any;
  index = 0;
  launchesCount = 0;
  launchStatus: string = "";
  landstatus: string = "";
  year: any = "";
  clickFilterYear: string = "";
  clickFilterLand: string = "";
  clickFilterLaunch: string ="" ;
  queryFilters= {
    land_success: "",
    launch_success: "",
    launch_year:""
  }
 

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private router: Router,
    private location: Location,
    private spacesXService: SpacesXService,
    private title: Title,
    private meta: Meta
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.getMethod();
    }
  }
  ngOnInit() {
    this.title.setTitle("spacesX launch program");
    this.meta.addTag({ keywords: "angular8, ssr, single page application" });
    this.meta.addTag({
      description: "creating SPA in angular",
    });
  }

  getMethod() {
    this.spacesXService.getAllLaunches().subscribe((data) => {
      this.launches = data;
      this.launchesCount = data.length;
      for (let i = 0; i < this.launches.length; i++) {
        this.launchYear[i] = this.launches[i].launch_year;
      }
      this.launchYear.sort((a: any, b: any) => {
        return a - b;
      });
      for (let i = 0, j = 1; i < this.launchYear.length; i++, j++) {
        if (this.launchYear[i] != this.launchYear[j]) {
          this.uniqueLaunchYear[this.index] = this.launchYear[i];
          this.index++;
        }
      }
    });
  }

  filterLaunch(event: any) {
    this.launchStatus = event.target.textContent.toLowerCase();
    this.clickFilterLaunch = this.launchStatus;
    this.prepareQueryFilter();
    this.getFilterData(); 
  }

  filter_land(event: any) {
    this.landstatus = event.target.textContent.toLowerCase();
    this.clickFilterLand= this.landstatus;
    this.prepareQueryFilter();
    this.getFilterData();  
  }

  //To get the data acording to the filter chosen
  filterYear(year: any) {
    this.clickFilterYear=year;
    this.year = year;
    this.prepareQueryFilter();
    this.getFilterData();      
  }
  
  prepareQueryFilter(){
    if(this.year){
      this.queryFilters.launch_year = this.year;
    }
    if(this.launchStatus != "" ){
      this.queryFilters.launch_success = this.launchStatus;  
    }
    if(this.landstatus != "" ){
      this.queryFilters.land_success = this.landstatus;  
    }  
  }
  getFilterData(){
    this.spacesXService
    .getFilterData(this.queryFilters)
    .subscribe((data) => {
      this.launches = data;
      this.launchesCount = data.length;
      this.router.navigate([""], {
        queryParams: {
          limit: 100,
          queryFilters: this.queryFilters
          
        },
      });
      return;
    });
  }
  
}
