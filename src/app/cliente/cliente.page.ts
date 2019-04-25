import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {

  dato: any;

  constructor(
    private router: ActivatedRoute,
    private route: Router
  ) {
    this.dato = JSON.parse(this.router.snapshot.paramMap.get('data'));
  }

  ngOnInit() {
  }

  irA(dato: any) {
    this.route.navigate(['viajar', JSON.stringify(dato)]);
  }

}
