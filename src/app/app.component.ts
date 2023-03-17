import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Amazon-User-Project';
  constructor(private translateService: TranslateService){

  }
  ngOnInit(): void {
    let rootElement = document.getElementById("window_html")
    this.translateService.onLangChange.subscribe((param)=>{
      if(param.lang=='ar'){
        rootElement!.dir = 'rtl'
        rootElement!.lang = 'ar'
      }else{
        rootElement!.dir = 'ltr'
        rootElement!.lang = 'en'
      }
    })
  }
}
