import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpParams } from '@angular/common/http';

import { WrapperRequestService } from "../../wrapper.request.service";
import { PermissionModel } from "../../user-action-module/user-requests/permission.model";
import { Base } from "../../../environments/base";


@Injectable()
export class RequestsService {
    baseUri = Base.baseUri;
    constructor(private http: HttpClient, private wrapperService: WrapperRequestService) { }

    getPermissions(){
        
        let currentLogInUser = this.wrapperService.getCurrentUser();
        let params = new HttpParams();
        params = params.append('login', currentLogInUser.login);
        return this.http.get<any>(`${this.baseUri}/provisioned`,{params:params});
    }

}