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
  ClickFilterLand: string = "";
  clickFilterLaunch: string ="" ;
 // clickFilterLaunchFalse: boolean= false;

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
      console.log("inside get method", data);
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
    const filterLaunchValue= event.target.name;
   if(filterLaunchValue === "true"){
   this.clickFilterLaunch = "trueClicked";
   }else{
    this.clickFilterLaunch = "falseClicked";
   }
    if (this.landstatus != "" ||this.year == "") {
      console.log("year is present");
    }else if( this.landstatus == "" ||this.year != ""){
        console.log("landStatus is present");
    } else if(this.landstatus == "" ||this.year == ""){
        console.log("launch status is present");
    }  else if(this.landstatus != "" ||this.year != ""){
      console.log("launch status is present");
  }   
   
    this.launchStatus = event.target.textContent.toLowerCase();
    console.log("launch status inside :",this.launchStatus );
    this.router.navigate([""], {
      queryParams: { limit: 100, launch_status: this.launchStatus },
    });
    this.spacesXService.getLaunches(this.launchStatus).subscribe((data) => {
      this.launches = data;
      this.launchesCount = data.length;
    });
  }

  filter_land(event: any) {
    const filterLandValue= event.target.name;
     if(filterLandValue === "true"){
      this.ClickFilterLand = "trueClicked";
      }else{
      this.ClickFilterLand = "falseClicked";
      }
    this.landstatus = event.target.textContent.toLowerCase();
    console.log("filter land filter_land", this.landstatus);
    if (this.launchStatus != "" && this.landstatus != "" && this.year == "") {
      this.spacesXService
        .getLaunchLand(this.launchStatus, this.landstatus)
        .subscribe((data) => {
          this.launches = data;
          this.launchesCount = data.length;
          this.router.navigate([""], {
            queryParams: {
              limit: 100,
              launch_status: this.launchStatus,
              land_status: this.landstatus,
            },
          });
        });
    } else if (
      this.launchStatus != "" &&
      this.landstatus != "" &&
      this.year != ""
    ) {
      this.spacesXService
        .getAll(this.year, this.launchStatus, this.landstatus)
        .subscribe((data) => {
          this.launches = data;
          this.launchesCount = data.length;
          this.router.navigate([""], {
            queryParams: {
              limit: 100,
              launch_status: this.launchStatus,
              land_status: this.landstatus,
              launch_year: this.year,
            },
          });
          return;
        });
    } else {
      this.spacesXService
        .getLaunches_Land(this.landstatus)
        .subscribe((data) => {
          this.launches = data;
          this.launchesCount = data.length;
          return;
        });
    }
  }
  //to get the data acording to the filter chosen
  filterYear(year: any) {
    if (this.launchStatus != "" || this.landstatus != "" ) {
      console.log("year is present");
    }else if(this.launchStatus == "" || this.landstatus != "" ){
        console.log("landStatus is present");
    } else if(this.launchStatus != "" || this.landstatus == "" ){
        console.log("launch status is present");
    }else if(this.launchStatus == "" || this.landstatus == "" ){
    }
    this.clickFilterYear=year;
    this.year = year;
    this.router.navigate([""], {
      queryParams: { limit: 100, year: this.year },
    });
    this.spacesXService.getYear(this.year).subscribe((data) => {
      this.launches = data;
    });
  }
}
