import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  title:String = 'Mermaid-IFIC';
  selected_url:String;
  display:boolean=false;
  clicked:String='0';
  url="https://dev-ificcmsshell.oss.net.bd/filepath/mermaidv2.json";

  constructor(){
  }

  ngOnInit(): void {
 
  }

  onClickButton(param:String){   
     if(param==='1'){
      this.selected_url='1';
      this.clicked='1';
      this.display=true;
      console.log("Executing 1");
    }
    
     if (param==='2'){
      this.selected_url='2';
      this.clicked='2';
      this.display=true;
      console.log("Executing 2");
    }
  }
}
