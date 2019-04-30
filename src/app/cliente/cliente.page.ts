import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Plugins
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {

  dato: any;

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private callNumber: CallNumber
  ) {
    this.dato = JSON.parse(this.router.snapshot.paramMap.get('data'));
  }

  ngOnInit() {
  }

  irA(dato: any) {
    this.route.navigate(['viajar', JSON.stringify(dato)]);
  }

  llamar(dato: any) {
    console.log('Estoy llamando...' + dato.tel);
    this.callNumber.callNumber(dato.tel, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  enviarComentario() {
    this.route.navigate(['/modal', JSON.stringify(this.dato)]);
  }

}
