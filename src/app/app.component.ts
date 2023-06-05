import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'angulartest';
  basicForm!:FormGroup;
  basicSalaryStep!:number;
  stepBasicSalary!:number;
  data!:any;
  mAPercentage!:number;
  totalRemainAmount:number=0;
  totalAmount:number[]=[];
  addAndRemoveCardStatus:boolean=true;
  addItems={
    type:'',
    percentage:'0',
    value:0,
    amount:0
  }
  array = [
    {
      type: '',
      percentage: '0',
      value: 0,
      amount: 0,
    },
  ];
  constructor(){}
  ngOnInit(): void {
    this.basicForm=new FormGroup({
      name:new FormControl(null,Validators.required),
      grossSalary:new FormControl(null,Validators.required),
      address:new FormControl(null),
    });
    this.onLocal();
  }
  onLocal(){
    this.data=JSON.parse(localStorage.getItem('emp')||'{}');
    console.log(this.data);
  }
  onSubmit(){
    console.log(this.basicForm);
    let grossSalary=parseInt(this.basicForm.get('grossSalary')?.value);
    if(grossSalary%1000==0){
      localStorage.setItem('emp',JSON.stringify(this.basicForm.value));
      document.getElementById("step1")?.classList.replace("d-block", "d-none");
      document.getElementById("step2")?.classList.replace("d-none", "d-block");
      this.onLocal();
      this.totalRemainAmount=this.data.grossSalary;
    }
  }
  onSelect(index:any,value:any){
    console.log(value);

    for(let obj of this.array){
      if(value==obj.type){
        window.alert('This is already selected');
        this.array.splice(index,1);
      }
    }

    this.onLocal();
    for(let i=0;i<this.array.length;i++){
      if(i==index){
        this.array[i].type=value;
      }
    }
    if(value=='Basic_Salary'){
      // this.basicSalaryStep=(parseInt(this.data.grossSalary)/100);
      this.onLocal();
      let x= this.data.grossSalary/100;
      for(let i=1;i<=10;i++){
        if((x*i)%100==0){
          this.stepBasicSalary=i;
          break;
        }
      }
    }
    if(value=='Medical_Allowance'){
      let percent=(12000*100)/this.data.grossSalary;
      console.log(percent);
      this.mAPercentage=percent
    }
    if(value=='Convenience_Allowance'){
      this.onLocal();
      this.array[index].percentage=((1200*100)/this.data.grossSalary).toString();
      this.array[index].amount=2000;
      this.calculateRemainingAmount(index);
    }
  }
  calculateRemainingAmount(index:any){
    this.addAndRemoveCardStatus=true;

    let totalAmount=0;
    for(let obj of this.array){
      totalAmount+= obj.amount;
    }
    this.onLocal();
    this.totalRemainAmount=this.data.grossSalary-totalAmount;
    console.log(this.totalRemainAmount);
    if(this.totalRemainAmount<0){
      this.array.splice(index,1);
      this.calculateRemainingAmount(index-1);
    }
    if(this.totalRemainAmount==0){
      this.addAndRemoveCardStatus=false;
    }
  }
  onRange(index:any,value:any,type:any){
    console.log(value);
    switch(type){
      case 'Basic_Salary':
        this.array[index].percentage=value;
        this.onLocal();
        this.array[index].amount=(parseInt(this.data.grossSalary) * parseInt(this.array[index].percentage))/100;
        this.calculateRemainingAmount(index);
        break;
      case 'House_Rent_Allowance':
        this.array[index].percentage=value;
        this.onLocal();
        this.array[index].amount=(parseInt(this.data.grossSalary) * parseInt(this.array[index].percentage))/100;
        this.calculateRemainingAmount(index);
      break;
      case 'Medical_Allowance':
          this.onLocal();
          this.array[index].percentage=value;
          this.array[index].amount=(parseInt(this.data.grossSalary) * parseInt(this.array[index].percentage))/100;
          this.calculateRemainingAmount(index);
          break;
      case 'Convenience_Allowance'
:
      break;
      case 'Skill_Allowance':
        this.array[index].percentage=value;
        this.onLocal();
        this.array[index].amount=(parseInt(this.data.grossSalary) * parseInt(this.array[index].percentage))/100;
        this.calculateRemainingAmount(index);

        break;
      case 'Other_Allowance':
        this.array[index].percentage=value;
        this.onLocal();
        this.array[index].amount=(parseInt(this.data.grossSalary) * parseInt(this.array[index].percentage))/100;
        this.calculateRemainingAmount(index);

        break;
    }
  }
  onAddItem(){
    this.array.push(this.addItems);
    this.addItems={...this.addItems}
    console.log(this.addItems);
  }
  onRemoveItem(index:any){
    this.array.splice(index, 1);
    this.calculateRemainingAmount(index);
  }
}