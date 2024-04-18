import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  submitForm(): void {
    if (this.contactForm.valid) {
      // Aici poți trimite datele către un serviciu pentru a le procesa sau le poți utiliza local
      console.log('Formularul este valid!');
      console.log('Nume:', this.contactForm.value.name);
      console.log('Email:', this.contactForm.value.email);
      console.log('Mesaj:', this.contactForm.value.message);
    } else {
      console.log('Formularul nu este valid! Verifică din nou.');
    }
  }
}
