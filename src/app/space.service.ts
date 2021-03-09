import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SpacesXService {
  url = "https://api.spacexdata.com/v3/launches?";

  constructor(private http: HttpClient) {}
  //it is used to get all launches data 
  getAllLaunches(): Observable<any> {
    return this.http.get(this.url);
  }
  // https://api.spacexdata.com/v3/launches?launch_success=true
  // getLaunches(param: any): Observable<any> {
  //   return this.http.get(this.url + "launch_success=" + param);
  // }

  // getLaunches_Land(param: any): Observable<any> {
  //   return this.http.get(this.url + "land_success=" + param);
  // }

  // getYear(param: any): Observable<any> {
  //   return this.http.get(this.url + "launch_year=" + param);
  // }
  getFilterData(queryFilters:any): Observable<any>{
    var queryString= this.getQueryString(queryFilters);
    var finalUrl= this.url + "limit=100&"+ queryString;
    console.log("get filetr data:",queryString);
    return this.http.get(
      finalUrl
    );
  }
  getQueryString(queryFilters:any){
    var queryString="";
    var subStringPostFix="&";
    
    Object.keys(queryFilters).forEach(function(key, index){
      console.log("index value is:",index);
     
      if(queryFilters[key]){
        queryString=queryString+key+"="+queryFilters[key]+ subStringPostFix
      }
    })
    queryString = queryString.slice(0, queryString.length - 1);
    return queryString;
  }

  // getAll(launchYear: any , launchSuccess: any, landSuccess: any): Observable<any> {
  //   return this.http.get(
  //     this.url +
  //       "launch_year=" +
  //       launchYear +
  //       "&launch_success=" +
  //       launchSuccess +
  //       "&land_success=" +
  //       landSuccess
  //   );
  // }

  // getLaunchLand(launchSuccess : any, landSuccess: any): Observable<any> {
  //   return this.http.get(
  //     this.url +
  //       "limit=100" +
  //       "&launch_success=" +
  //       launchSuccess +
  //       "&land_success=" +
  //       landSuccess
  //   );
  // }

  // getYearAndLandStatus(launchYear : any, landSuccess: any): Observable<any> {
  //   return this.http.get(
  //     this.url +
  //       "limit=100" +
  //       "&launch_year=" +
  //       launchYear +
  //       "&land_success=" +
  //       landSuccess
  //   );
  // }

  // getYearAndLaunchStatus(launchYear : any, launchSuccess : any,): Observable<any> {
  //   console.log("year and launch ", launchYear);
  //   console.log("launch a",launchSuccess)
  //   return this.http.get(

  //     //this.url+"limit=100"+"&launch_year="+launchYear+"&launch_success="+launchSuccess
  //     this.url +
  //       "limit=100" +
  //       "&launch_year=" +
  //       launchYear +
  //       "&launch_success=" +
  //       launchSuccess
  //   );
  // }
}
