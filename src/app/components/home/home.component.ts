import { Component, OnInit } from '@angular/core';
import { ServiceReqresService } from 'src/app/services/service-reqres.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import{debounceTime,map} from 'rxjs/operators'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public persons:Array<any>;
  public persons2:Array<any>;
  public person3:Array<any>;
  search:FormControl;
  formulario: FormGroup;
  closeResult: string;
  public red:boolean
  constructor(private _serviceReqres:ServiceReqresService, private modalService:NgbModal, private FormBuilder:FormBuilder) {
    this._serviceReqres.getUsers().subscribe((users:any)=>{
      this.persons=users.data;
      this.persons2=users.data;
      this.person3=users.data;
      // console.log(this.persons);
    })
   }
    
  ngOnInit() {
    this.inicializarForm();
  }
  public inicializarForm(){ 
    this.search=new FormControl(null,Validators.pattern(/^[a-zA-Z\s]*$/));
    this.search.valueChanges.pipe(
      debounceTime(2000),
      map(
        (termino:string) => termino != "" ? this.persons.filter(User=>User.first_name.toLowerCase().indexOf(termino.toLocaleLowerCase()) >-1) : this.persons2)
    ).subscribe((data)=>{
      this.persons=data;
    })
    this.formulario=this.FormBuilder.group({
      userName: [null, [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      job: [null, [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]]
    })
    
  }
  // open(content,from,id){
  //   this.formulario.reset();
  //   this.modalService.open(content,{ariaLabelledBy:'modal-basic-title'}).result.then((result)=>{
  //     if(from) console.log("entre")
  //   })
  // }
  open(content,from,id) {
    this.red=from
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
      if(from){
        console.log("update");
        this._serviceReqres.updateUsers(id,this.formulario.value).subscribe(data=>console.log(data));
      }else{
        console.log("otro");
        this._serviceReqres.addUser(this.formulario.value).subscribe(data=>console.log(data));
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}


