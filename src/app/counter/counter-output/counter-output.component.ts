import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { getCounter } from '../state/counter.selectors';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css']
})
export class CounterOutputComponent implements OnInit {

  // @Input() counter: any;
  counter: number = 0;
  counter$: Observable<number> = new Observable<number>;
  counterSubscription: Subscription | any;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    // this.counterSubscription = this.store.select(getCounter).subscribe(countValue =>{
    //   this.counter = countValue;
    // });

    this.counter$ = this.store.select(getCounter);
  }

  // ngInDestroy(){
  //   if(this.counterSubscription){
  //     this.counterSubscription.unsubscribe();
  //   }
  // }
}
