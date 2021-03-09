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
  const filterLaunchValue= event.target.name;
   if(filterLaunchValue === "true"){
   this.clickFilterLaunch = "trueClicked";
   }else{
    this.clickFilterLaunch = "falseClicked";
   }
   this.launchStatus = event.target.textContent.toLowerCase();
    // if (this.landstatus != "" && this.year == "") {
    //       this.checkLaunchLandStatus();
    // }else if( this.landstatus == "" && this.year != ""){
    //     this.getYearAndLaunchStatusData();
    // }else if(this.landstatus != "" && this.year != ""){
    //         this.getAllDataTogether();
    // }else if(this.landstatus == "" && this.year == ""){
    //     this.router.navigate([""], {
    //   queryParams: { limit: 100, launch_status: this.launchStatus },
    // });
    // this.spacesXService.getLaunches(this.launchStatus).subscribe((data) => {
    //   this.launches = data;
    //   this.launchesCount = data.length;
    // });

    this.prepareQueryFilter();
    this.getFilterData();  
  
  }

  filter_land(event: any) {
    const filterLandValue= event.target.name;
     if(filterLandValue === "true"){
      this.ClickFilterLand = "trueClicked";
      }else{
      this.ClickFilterLand = "falseClicked";
      }
    this.landstatus = event.target.textContent.toLowerCase();
    //   if (this.launchStatus != "" && this.year == "") {
    //   this.checkLaunchLandStatus();
    // } else if (this.launchStatus != "" && this.year != "") {
    //   this.getAllDataTogether();
    // }else if (this.launchStatus == "" && this.year != "") {
    //   this.getYearAndLandStatusData();
    // } else if(this.launchStatus =="" && this.year ==""){
    //   this.spacesXService
    //     .getLaunches_Land(this.landstatus)
    //     .subscribe((data) => {5
    //       this.launches = data;
    //       this.launchesCount = data.length;
    //       return;
    //     });
    this.prepareQueryFilter();
    this.getFilterData();  
    
  }

  //To get the data acording to the filter chosen
  filterYear(year: any) {
    this.clickFilterYear=year;
    this.year = year;
    // if (this.launchStatus != "" && this.landstatus != "" ) {
    //     this.getAllDataTogether();
    // }else if(this.launchStatus == "" && this.landstatus != "" ){
    //     this.getYearAndLandStatusData();
    // } else if(this.launchStatus != "" && this.landstatus == "" ){
    //     this.getYearAndLaunchStatusData();
    // }else if(this.launchStatus == "" && this.landstatus == "" ){
    //   this.router.navigate([""], {
    //     queryParams: { limit: 100, year: this.year },
    //   });
    //   this.spacesXService.getYear(this.year).subscribe((data) => {
    //     this.launches = data;
    //   });
    // } 
    // this.queryFilters.year="";
    // this.queryFilters.launchStatus ="";
    // this.queryFilters.landstatus="";
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
  

  //Getting the launch, land and year data 
  // getAllDataTogether(){
  //     this.spacesXService
  //       .getAll(this.year, this.launchStatus, this.landstatus)
  //       .subscribe((data) => {
  //         this.launches = data;
  //         this.launchesCount = data.length;
  //         this.router.navigate([""], {
  //           queryParams: {
  //             limit: 100,
  //             launch_status: this.launchStatus,
  //             land_status: this.landstatus,
  //             launch_year: this.year,
  //           },
  //         });
  //         return;
  //       });
  //     }
      //Getting the data for launch and land
      // checkLaunchLandStatus(){
      //   this.spacesXService
      //   .getLaunchLand(this.launchStatus, this.landstatus)
      //   .subscribe((data) => {
      //     this.launches = data;
      //     this.launchesCount = data.length;
      //     this.router.navigate([""], {
      //       queryParams: {
      //         limit: 100,
      //         launch_status: this.launchStatus,
      //         land_status: this.landstatus,
      //       },
      //     });
      //   });
      // }  

      //Getting the data for year and land 
      // getYearAndLandStatusData(){
      //   this.spacesXService
      //   .getYearAndLandStatus(this.year, this.landstatus)
      //   .subscribe((data) => {
      //     this.launches = data;
      //     this.launchesCount = data.length;
      //     this.router.navigate([""], {
      //       queryParams: {
      //         limit: 100,
      //         launch_year: this.year,
      //         land_status: this.landstatus,
      //       },
      //     });
      //   });
      // }  
      //Getting the data for year and launch
      // getYearAndLaunchStatusData(){
      //   this.spacesXService
      //   .getYearAndLaunchStatus(this.year, this.launchStatus)
      //   .subscribe((data) => {
      //     this.launches = data;
      //     this.launchesCount = data.length;
      //     this.router.navigate([""], {
      //       queryParams: {
      //         limit: 100,
      //         launch_year: this.year,
      //         launch_status: this.launchStatus,
      //       },
      //     });
      //   });
      // }
}
