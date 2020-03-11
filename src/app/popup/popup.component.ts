import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {RestService} from '../service/rest.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit, OnDestroy {

  structureName: string;
  sub: Subscription;

  constructor(public activeModal: NgbActiveModal, private restService: RestService) {
  }

  ngOnInit(): void {
    const sub = this.restService.getStructure(this.structureName).subscribe(structure => {

    });
    console.log(this.structureName);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
