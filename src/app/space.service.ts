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
  getLaunches(param: any): Observable<any> {
    return this.http.get(this.url + "launch_success=" + param);
  }

  getLaunches_Land(param: any): Observable<any> {
    return this.http.get(this.url + "land_success=" + param);
  }

  getYear(param: any): Observable<any> {
    return this.http.get(this.url + "launch_year=" + param);
  }

  getAll(launchYear: any , launchSuccess: any, landSuccess: any): Observable<any> {
    return this.http.get(
      this.url +
        "launch_year=" +
        launchYear +
        "&launch_success=" +
        launchSuccess +
        "&land_success=" +
        landSuccess
    );
  }

  getLaunchLand(launchSuccess : any, landSuccess: any): Observable<any> {
    return this.http.get(
      this.url +
        "limit=100" +
        "&launch_success=" +
        launchSuccess +
        "&land_success=" +
        landSuccess
    );
  }
}
