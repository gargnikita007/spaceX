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
 
  getFilterData(queryFilters:any): Observable<any>{
    var queryString= this.getQueryString(queryFilters);
    var finalUrl= this.url + "limit=100&"+ queryString;
    return this.http.get(
      finalUrl
    );
  }
  getQueryString(queryFilters:any){
    var queryString="";
    var subStringPostFix="&";
    Object.keys(queryFilters).forEach(function(key, index){
    if(queryFilters[key]){
        queryString=queryString+key+"="+queryFilters[key]+ subStringPostFix
      }
    })
    queryString = queryString.slice(0, queryString.length - 1);
    return queryString;
  }  
}
