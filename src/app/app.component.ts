
import { importType } from '@angular/compiler/src/output/output_ast';
import { Component } from '@angular/core';
import{ GlobalConstants } from '@common/global-constants';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = GlobalConstants.siteTitle;
  
  constructor( ) { 
      console.log(GlobalConstants.apiURL);
      
  }
 
  ngOnInit() {
      console.log(this.title);
  }
}
