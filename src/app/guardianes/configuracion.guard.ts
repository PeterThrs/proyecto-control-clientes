import { AngularFireAuth } from "@angular/fire/compat/auth";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map } from "rxjs";
import { ConfiguracionServicio } from "../servicios/configuracion.service";
import { Injectable } from "@angular/core";

@Injectable()
export class ConfiguracionGuard {

    constructor( 
        private router: Router,
        private afAuth: AngularFireAuth,
        private configuracionServicio: ConfiguracionServicio,
    ){

    }
    canActivate(): Observable<boolean>{
        return this.configuracionServicio.getConfiguracion().pipe(
            map( configuracion => {
                if(configuracion.permitirRegistro){
                    return true as any;
                }else {
                    this.router.navigate(['/']);
                    return false;
                }
            })
        )
    }

}