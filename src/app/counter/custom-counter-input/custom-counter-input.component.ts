import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterState } from '../state/counter.state';
import { customincrement, changeChannelName } from '../state/counter.actions';
import { getChannelName } from '../state/counter.selectors';
import { observable, Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.css']
})
export class CustomCounterInputComponent implements OnInit {

  value: number = 0;
  channelName: string = '';
  channelName$: Observable<string> = new Observable<string>();

  constructor(private store: Store<AppState>) {

  }

  ngOnInit(): void {
    // this.store.select(getChannelName).subscribe(channelName => {
    //   this.channelName = channelName;
    // })

    this.channelName$ = this.store.select(getChannelName);
  }

  onCounterInput(){
    // this.increment.emit();
    this.store.dispatch(customincrement({count: this.value}));
  }

  onChangeChannelName(){
    this.store.dispatch(changeChannelName());
  }
}


