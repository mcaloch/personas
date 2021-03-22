import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

import { PersonasService } from './personas.service';
import { LocalStorageService } from './local-storage.service';
import { Persona } from './persona';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  constructor( private personaService: PersonasService, 
  				private fb: FormBuilder,
  				private localStorageService: LocalStorageService
  	) { }

  dataSource : Persona[];
  dataNew : Persona[];
  displayedColumns: string[];
  total: number;
  registroForm = this.fb.group({});

  ngOnInit(): void {
  	this.displayedColumns = ['first', 'last', 'email', 'address','created','balance'];
  	this.dataSource = [];
  	this.dataNew = [];
  	this.total = 0;
  	
  	this.registroForm = this.fb.group({
	  first : new FormControl(''),
	  last : new FormControl(''),
	  email : new FormControl(''),
	  created : new FormControl(''),
	  address : new FormControl(''),
	  balance : new FormControl('')
  	});

  	this.getPersonas();//get data web and local
  }

  getPersonas():void{
  	this.personaService.getPersonas().subscribe(dataSource => {
  		this.dataSource = dataSource;
  		let dataLocal = this.localStorageService.get("localData");
  		this.dataSource = this.dataSource.concat(dataLocal);
  		this.total = this.dataSource.length;
  	});
  }

  add(persona: Persona): void {
    this.personaService.addPersona(persona)
      .subscribe(persona => {
        this.dataSource.push(persona);
      });
  }

  onSubmit() {
	  let _first = this.registroForm.controls['first'].value;
	  let _last = this.registroForm.controls['last'].value;
	  let _email = this.registroForm.controls['email'].value;
	  let _created = this.registroForm.controls['created'].value;
	  let _address = this.registroForm.controls['address'].value;
	  let _balance = this.registroForm.controls['balance'].value;

	  let personaNueva = {
	  	first: _first,
	  	last: _last,
	  	email: _email,
	  	created: _created,
	  	address: _address,
	  	balance: _balance
	  };

	  this.dataNew.push(personaNueva);
	  this.localStorageService.set("localData", this.dataNew);
	}

}
