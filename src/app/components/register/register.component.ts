import { Component, OnInit } from '@angular/core';
import { ServiceReqresService } from '../../services/service-reqres.service';
import {FormGroup, FormControl, Validators, RequiredValidator} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public formulario:FormGroup;
  public user={
    email:'',
    password:''
  }
  public token:Array<any>;
  constructor(private _serviceReqres:ServiceReqresService) { }

  ngOnInit() {
   this.crearFormulario(); 
  }
  public crearFormulario():void{
    this.formulario=new FormGroup({
      Email:new FormControl(null,[Validators.required,Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      pass:new FormControl(null,[Validators.required,Validators.minLength(3)]),
      password2: new FormControl(null)
    });
    this.formulario.controls.password2.setValidators([this.MatchPassword.bind(this),Validators.required])
  }
  private MatchPassword(control:FormControl):{[key:string]:boolean}{
    
    // console.log(this.formulario.controls );
    if(control.value!=this.formulario.controls.pass.value)return{noIgual:true};
    return null;
  }
  public registerUser(){
    // console.log(this.formulario.controls.pass.value);
    this.user.email=this.formulario.controls.Email.value;
    this.user.password=this.formulario.controls.pass.value;
    // console.log(this.user);
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    })
    this._serviceReqres.registerUser(this.user).subscribe(
      (data:any)=>{
        Toast.fire({
          icon: 'success',
          title: 'Guardado Correctamente'
        })
        this.token=data;
        console.log(this.token);
        localStorage.setItem("Token", data.token);
        this.formulario.reset();
    })
  }

}
