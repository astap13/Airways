import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {
  searchFormGroup!: FormGroup;

  ngOnInit() {
    this.searchFormGroup = new FormGroup({
      selectedWay: new FormControl(),
    });
  }

  submit() {
    console.log('this.submit');
  }
}
