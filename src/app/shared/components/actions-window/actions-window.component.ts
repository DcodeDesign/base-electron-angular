import {Component, HostListener, Input, OnChanges, OnInit} from '@angular/core';
import {ElectronService} from '../../../core/services';

@Component({
  selector: 'app-actions-window',
  templateUrl: './actions-window.component.html',
  styleUrls: ['./actions-window.component.scss']
})
export class ActionsWindowComponent implements OnInit, OnChanges {
  @Input() titleView: string;
  public electronRemote = this.electronService.remote.getCurrentWindow();

  constructor(private electronService: ElectronService) {
    this.electronRemote = electronService.remote.getCurrentWindow();
  }

  ngOnInit(): void {
    this.electronRemote = this.electronService.remote.getCurrentWindow();
  }

  ngOnChanges(): void {
    this.electronRemote.removeAllListeners();
    this.electronRemote = this.electronService.remote.getCurrentWindow();
  }

}
