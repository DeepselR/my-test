import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RestService } from '../service/rest.service';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit, OnDestroy {
  structureName: string;
  formStructure: Subject<{}> = new Subject();
  sub: Subscription;

  constructor(
    public activeModal: NgbActiveModal,
    private restService: RestService
  ) {}

  ngOnInit(): void {
    this.sub = this.restService
      .getStructure(this.structureName)
      .subscribe(structure => {
        this.formStructure.next(structure);
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
