import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { RequestOptions, RequestOptionsArgs } from "@angular/http";

import "core-js/es7/reflect";
@Injectable()
export class ApiService {
  password: any;
  private isUserLoggedIn;

  usernamenew = false;
  userData: any;
  userfirstname: void;
  public usergroup: any;
  constructor(private httpClient: HttpClient) {
    // this.isUserLoggedIn = false;
  }

  logoutuserstatus() {
    localStorage.setItem("localuserstatus", "false");
    // this.isUserLoggedIn = false;
  }

  setUserLoggedIn(data) {
    this.userData = data;
    console.log("this.userData", this.userData);
    this.isUserLoggedIn = true;
    console.log("this.userloggedstatus", this.isUserLoggedIn);
    this.usernamenew = data["data"].mobile;
    this.userfirstname = data["data"].firstName;
    this.usergroup = data["data"]["user"]["userGroup"][0]["name"];
    console.log("data of username", this.usernamenew);
    localStorage.setItem("localuserstatus", "true");
  }

  getUserData() {
    return this.userData;
  }

  getUserLoggedInStatus() {
    // console.log('Final status', this.isUserLoggedIn)

    // return this.isUserLoggedIn;
    return localStorage.getItem("localuserstatus") == "true" ? true : false;
  }

  getServerIp(): string {
    return "https://velvetthomestays.com:8002";
    //  return "http://139.59.91.19:8000"
    // return "http://192.168.0.17:8000"
    // return "http://192.168.0.44:8000"
  }

  getDataFromServer(Url: string, data) {
    console.log(this.getServerIp() + Url);
    return new Promise((resolve, reject) => {
      console.log(data);
      this.httpClient
        .post(this.getServerIp() + Url, data, { withCredentials: true })
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  registerUser(data) {
    let Url = "/user/register/";
    return new Promise((resolve, reject) => {
      console.log(data);
      this.httpClient.post(this.getServerIp() + Url, data).subscribe(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
}
