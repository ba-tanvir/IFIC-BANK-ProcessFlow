import { Component, OnInit ,ViewChild,ElementRef, Input, OnChanges} from '@angular/core';
import  mermaid from "mermaid";
import {DomSanitizer, SafeValue} from '@angular/platform-browser';
import  DOMPurify from 'dompurify';
import { CurveFactory } from 'd3';
import { HttpClient } from  '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Mermaid } from 'src/Mermaid';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-json-mermaid',
  templateUrl: './json-mermaid.component.html',
  styleUrls: ['./json-mermaid.component.css']
})
export class JsonMermaidComponent implements OnInit {
    //Letter array is for mapping the steps to alphabet.
    letterarray="ABCDEFGHIJKLMNOPQRST";
    //Final string will be given to mermaid draw diagram function.
    finalstring="\tgraph LR\n\t\t";
    //After every node this is added
    append_end="\n\t\t";

    current_state:number=0;

    all_clicks:string="";
  
    mermaid_data=[
      {
        "name":"Pradip",
        "step":1,
        "currentState":false
      },
      {
        "name":"Mehedi",
        "step":2,
        "currentState":false,
      },
      {
        "name":"Sadiq",
        "step":3,
        "stepSeqAfterAction":1,
        "currentState":true,
        
      },
      {
        "name":"Emrul",
        "step":4,
        "currentState":false
      }
     
    ]
    data_length=this.mermaid_data.length;
    

  constructor() { }

  @ViewChild('mermaid',{static:true}) mermaidDiv!: ElementRef;

  config={
   startOnLoad:true,
   securityLevel: 'loose',
   flowchart:{
     htmlLabels:true,
     curve:'cardinal'
   }};


  ngOnInit(): void {
    mermaid.initialize(this.config);
    mermaid.init({
      'flowchart': {'curve': 'natural'},
      'theme': 'base',
      'themeVariables': {
      'primaryColor': '#fff', 
      'primaryTextColor': 'black',
      'primaryBorderColor': 'black',
      'lineColor': 'black',
      'fontSize':'18px',
      'fontFamily':'arial',
      'secondaryColor': '#fff', 
      'tertiaryColor': '#fff'
    }});
    

    //Looping through all the elements
    for( let i=0; i<this.mermaid_data.length;i++){
      let style="";
      let click="";
      //let click_two=`click ${this.letterarray[i]} X "Shafi Israfil Mustafiz kanon"`+this.append_end;
      if( i+1 != this.mermaid_data.length){
        let letter_one=this.letterarray[i];
        let part_one=`([${this.mermaid_data[i].name}])-->`;
        let letter_two=this.letterarray[i+1];
        let part_two=`([${this.mermaid_data[i+1].name}])`;
        let final_part=letter_one+part_one+letter_two+part_two+this.append_end;
        if(this.current_state===0){
        style=`style ${letter_one} fill:#55CE63,stroke:#55CE63,stroke-width:2px`+this.append_end;
        click=`click ${this.letterarray[i]} X "${this.mermaid_data[i].name} has approved"` + this.append_end;
        }
        if(this.current_state===1){
          style=`style ${letter_one} fill:#F62D51,stroke:#F62D51,stroke-width:2px`+this.append_end;
          click=`click ${this.letterarray[i]} X "${this.mermaid_data[i].name}'s approval is disabled"`+this.append_end;
        }
        if(this.mermaid_data[i].currentState===true){
         style=`style ${letter_one} fill:#FFBC34,stroke:#FFBC34,stroke-width:2px`+this.append_end;
         this.current_state=1;
         click=`click ${this.letterarray[i]} X "${this.mermaid_data[i].name}'s approval is pending"`+this.append_end;
        }
        this.all_clicks+=click;
        final_part+=style;
        this.finalstring+=final_part;
        if(this.mermaid_data[i].hasOwnProperty('stepSeqAfterAction')){
          let sequence=this.mermaid_data[i].stepSeqAfterAction;
          sequence=sequence!-1;
          let back_one=this.letterarray[i];
          let back_part_one=`${back_one}--> |back|`;
          let back_two=this.letterarray[sequence];
          let back_final=back_part_one+back_two+this.append_end;
          this.finalstring+=back_final;
        }
      }
      //Only if the final node has back property
      if(i==this.data_length-1){
        let letter=this.letterarray[i];
        let style_end="";
        let back_final="";
        //click_two=`click ${this.letterarray[i]} X "Shafi Israfil Mustafiz kanon"`+this.append_end;
        if(this.current_state===0){
          style_end=`style ${letter} fill:#55CE63,stroke:#55CE63,stroke-width:2px`+this.append_end;
          click=`click ${this.letterarray[i]} X "${this.mermaid_data[i].name} has approved"` + this.append_end;
        }
        if(this.current_state===1){
        style_end=`style ${letter} fill:#F62d51,stroke:#F62D51,stroke-width:2px`+this.append_end;
        click=`click ${this.letterarray[i]} X "${this.mermaid_data[i].name}'s approval is disabled"`+this.append_end;
        }
        if(this.mermaid_data[i].currentState===true){
          style_end=`style ${letter} fill:#FFBC34,stroke:#FFBC34,stroke-width:2px`+this.append_end;
          this.current_state=1;
          click=`click ${this.letterarray[i]} X "${this.mermaid_data[i].name}'s approval is pending"`+this.append_end;
        }
        if(this.mermaid_data[i].hasOwnProperty('stepSeqAfterAction')){
          let sequence=this.mermaid_data[i].stepSeqAfterAction;
          sequence=sequence!-1;
          console.log(sequence);
          let back_one=this.letterarray[i];
          let back_part_one=`${back_one}-.-o |back|`;
          let back_two=this.letterarray[sequence];
          back_final=back_part_one+back_two+this.append_end;
          this.finalstring+=back_final;
        }
        this.all_clicks+=click;
        this.finalstring+=style_end;
        this.finalstring+=this.all_clicks;
        console.log(this.finalstring);
      }
    }

    let drawDiagram = async  () => {
      const element: any = this.mermaidDiv.nativeElement;
      const graphDefinition=this.finalstring;
      const { svg, bindFunctions } = await mermaid.render('mermaid', graphDefinition);
      element.innerHTML = svg;
      if (bindFunctions) {
        bindFunctions(element);
      }
    }

    drawDiagram();
 
  }

}
