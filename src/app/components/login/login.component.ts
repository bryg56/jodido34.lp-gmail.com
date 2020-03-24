import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiceReqresService } from 'src/app/services/service-reqres.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public formulario:FormGroup;
  public user={
    email:'',
    password:''
  }
  public token:Array<any>;
  
  constructor(private _serviceReqres:ServiceReqresService, private router:Router) { }

  ngOnInit() {
    this.crearFormulario();
  }
  public crearFormulario():void{
    this.formulario=new FormGroup({
      Email:new FormControl(null,[Validators.required,Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      pass:new FormControl(null,[Validators.required,Validators.minLength(3)])
    });
  }
  public logUser(){
    let Tokens;
    let existe;
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
    this._serviceReqres.logingUser(this.user).subscribe(
      (data:any)=>{
       
        this.token=data;
        console.log(this.token);
        
        // this.formulario.reset();
        // if(localStorage.getItem('Token')=== null){
        //   Tokens=[];
        // }else{
        //   console.log("Entre");
        //   Tokens=JSON.parse(localStorage.getItem('Token')); 
        // }
        // Tokens.forEach(function(Token,index){
        //   if(Token==data.token){
        //     existe=true;
        //   }
        // });
        // if(!existe){
          localStorage.setItem("Token", data.token);
        // }
        Toast.fire({
          icon: 'success',
          title: 'Guardado Correctamente'
        })
        this.router.navigateByUrl('/home');
    
    },
    (err:HttpErrorResponse)=>{
      
      console.log(err.status);
     if(err.status==400){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Parece ser que el usuario no existe existe :c, intetalo de nuevo`
        })
      }
    }
)

    
  }


  

}
