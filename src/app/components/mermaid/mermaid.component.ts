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
  selector: 'app-mermaid',
  templateUrl: './mermaid.component.html',
  styleUrls: ['./mermaid.component.css']
})
export class MermaidComponent implements OnChanges,OnInit {

  letterarray="ABCDEFGHIJKLMNOPQRST";
  finalstring="\tgraph LR\n\t\t";
  append_end="\n\t\t";

  mermaid_data=[
    {
      "name":"Step1",
      "step":1
    },
    {
      "name":"Step2",
      "step":2,
      
    },
    {
      "name":"Step3",
      "step":3,
      "stepSeqAfterAction":1
      
    },
    {
      "name":"Step4",
      "step":4
    }
  ]

  //Input variables
    @Input()
    selected_url:String;

  //Spinner
  loading:boolean=false;
   
  //Contains actual https data
   data:any;
   definition:string;
  //Url based on the button clicked
   url1="https://dev-ificcmsshell.oss.net.bd/filepath/mermaidv1.json";
   url2="https://dev-ificcmsshell.oss.net.bd/filepath/mermaidv2.json";
   url="https://dev-ificcmsshell.oss.net.bd/filepath/mermaidv2.json";
  constructor(private http:HttpClient) { }

  @ViewChild('mermaid',{static:true}) mermaidDiv!: ElementRef;

   config={
    startOnLoad:true,
    theme:"base",
    flowchart:{
      htmlLabels:true,
      curve:'cardinal'
    }
  };

  ngOnInit(): void {
    for( let i=0; i<this.mermaid_data.length;i++){
      if( i+1 != this.mermaid_data.length){
        let letter_one=this.letterarray[i];
        let part_one=`[${this.mermaid_data[i].name}]-->`;
        let letter_two=this.letterarray[i+1];
        let part_two=`[${this.mermaid_data[i+1].name}]`;
        let final_part=letter_one+part_one+letter_two+part_two+this.append_end;
        this.finalstring+=final_part;
        
        if(this.mermaid_data[i].hasOwnProperty('stepSeqAfterAction')){
          let sequence=this.mermaid_data[i].stepSeqAfterAction;
          sequence=sequence!-1;
          console.log(sequence);
          let back_one=this.letterarray[i];
          let back_part_one=`${back_one}-->`;
          let back_two=this.letterarray[sequence];
          let back_final=back_part_one+back_two+this.append_end;
          this.finalstring+=back_final;
          console.log(back_final);
        }
      }
    }

    
  }
     
  ngOnChanges(): void {
    this.loading=true;
    if(this.selected_url==='1'){
      console.log(this.selected_url);
      this.url=this.url1;
      this.loading=true;
    }
    if(this.selected_url==='2'){
      this.url=this.url2;
      this.loading=true;
    }
    
    //Initializing mermaid graph with config and custom theme
    mermaid.initialize(this.config);
    mermaid.init({
      'themeVariables': {
      'primaryColor': '#000',
     'primaryTextColor': '#fff',
      'primaryBorderColor': '#701EF6',
      'lineColor': '#5E00F6',
      'secondaryColor': '#FF0000',
      'tertiaryColor': '#FF0000',
        'fontSize':'22px'
    }});
    

    //Http always gets called last even after all asynchronous functions
    this.http.get<Mermaid>(this.url).subscribe(
      
      (data)=>{
        this.data=data;
        this.definition=this.data.processDiagram;
        this.definition=this.definition.replaceAll("→","-->");
        this.definition=this.definition.replace("graphTD\n","graph TD\n");
        console.log(this.definition);
        //Calling the Mermaid Api function after 1.5 seconds
        setTimeout(drawDiagram,1500);
      }
    );

    //Loader function makes the loading value false
      let loader=():void=>{
        this.loading=false;
      }
      //Mermaid API functions for drawing SVG and Rendering 
      let drawDiagram = async  () => {
      loader();
      const element: any = this.mermaidDiv.nativeElement;
      console.log(this.definition);
      const graphDefinition=this.definition;
      const { svg, bindFunctions } = await mermaid.render('mermaid', graphDefinition);
      element.innerHTML = svg;
      if (bindFunctions) {
        bindFunctions(element);
      }
    }
    
  }


  }
  


  