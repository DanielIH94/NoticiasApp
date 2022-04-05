import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav-item',
  templateUrl: './side-nav-item.component.html',
  styleUrls: ['./side-nav-item.component.sass']
})
export class SideNavItemComponent implements OnInit {

  @Input() icon!:string;
  @Input() text!:string;

  constructor() { }

  ngOnInit(): void {
  }

}
