import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../Services/service.service';
import { Validators, FormBuilder } from '@angular/forms';
import { saveAs as importedSaveAs } from 'file-saver';
import { $ } from 'protractor';
@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css'],
})
export class TradeComponent implements OnInit {
  @ViewChild('syllabusInput', { static: true }) syllabusInput;
  @ViewChild('testplanInput', { static: true }) testplanInput;
  constructor(
    private service: ServiceService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.saveFileForm = this.formBuilder.group({});
    this.getTradeLevels();
    this.getLanguages();
    this.loadAllTrade();
  }

  selectedTrade: any = {
    ID: 0,
    Name: '',
  };
  selectedTradeLevel: any = {
    ID: 0,
    Name: '',
    TradeID: 0,
  };
  tradeData: any = {
    ID: 0,
    TradeLevel: {},
    TradeDetails: {},
    TradeName: '',
    Languages: [],
    ActiveDate: Date.now(),
    DevelopmentOfficer: '',
    Manager: '',
    SyllabusName: '',
  };
  tradeLevels: any;
  trades: any[] = [];
  languages: any;
  selectedFile: File = null;
  imageUrl: string;
  fileToUpload: File = null;
  saveFileForm: any;
  tradeList: any[] = [];
  copyTradeList: any[] = [];

  isSyllabus: boolean = false;
  isTestPlan: boolean = false;
  isActiveDate: boolean = false;
  isDevelopmentOfficer: boolean = false;
  isManager: boolean = false;
  isSyllabusName: boolean = false;
  islanguages: boolean = false;
  isTrade: boolean = false;
  isLevel: boolean = false;
  errrorMessage: string = '';

  downloadPdfFile(data) {
    const PdfFileName = data;
    this.service.downloadFile(PdfFileName).subscribe((data) => {
      importedSaveAs(data, PdfFileName);
    });
  }

  loadAllTrade() {
    this.service.getDetails().subscribe((data: any) => {
      this.tradeList = data;
      this.copyTradeList = data;
    });
  }
  getDate() {
    this.tradeData.ActiveDate = (<HTMLInputElement>(
      document.getElementById('datepicker')
    )).value;
  }
  onExpSubmit() {
    debugger;

    let formData = new FormData();
    formData.append(
      'TestPlanFileUpload',
      this.testplanInput.nativeElement.files[0]
    );
    formData.append(
      'SyllabusFileUpload',
      this.syllabusInput.nativeElement.files[0]
    );
    formData.append('TradeName', this.tradeData.TradeName);
    formData.append('TradeLevel', this.tradeData.TradeLevel);
    formData.append('Languages', this.tradeData.Languages);
    formData.append('ActiveDate', this.tradeData.ActiveDate);
    formData.append('DevelopmentOfficer', this.tradeData.DevelopmentOfficer);
    formData.append('DevelopmentOfficer', this.tradeData.SyllabusName);
    formData.append('Manager', this.tradeData.Manager);
    this.service.saveDetails(formData).subscribe((result) => {
      alert(result);
      this.loadAllTrade();
    });
  }
  getTradeLevels() {
    this.service.getAll().subscribe((data: any) => {
      this.trades = data.trades;
    });
    console.log(this.trades);
  }
  clearFields() {
    this.tradeData = {
      ID: 0,
      TradeLevel: {},
      TradeDetails: {},
      TradeName: '',
      Languages: [],
      ActiveDate: Date.now(),
      DevelopmentOfficer: '',
      Manager: '',
      SyllabusName: '',
    };
    (<HTMLInputElement>document.getElementById('syllabusInput')).value = null;
    (<HTMLInputElement>document.getElementById('testplanInput')).value = null;
    (<HTMLInputElement>document.getElementById('datepicker')).value = null;
    return;
  }
  getLanguages(): any {
    this.languages = [
      { ID: 1, Name: 'English', isSelected: false },
      { ID: 2, Name: 'Thai', isSelected: false },
      { ID: 3, Name: 'Korean', isSelected: false },
      { ID: 4, Name: 'Tamil', isSelected: false },
      { ID: 5, Name: 'Bangla', isSelected: false },
    ];
  }
  getData(event: any) {
    console.log(this.selectedTradeLevel);
    this.selectedTradeLevel = this.tradeLevels.find(
      (t: any) => t.ID == event.value
    );
    this.tradeData.TradeLevel = this.selectedTradeLevel.Name;
  }
  onSelect(event: any) {
    let tradeDetails = this.trades.find((t: any) => t.ID == event.value);
    this.tradeData.TradeName = tradeDetails.Name;
    this.selectedTrade = tradeDetails;
    this.service.getAll().subscribe((data: any) => {
      this.tradeLevels = data.tradeLevels.filter(
        (res: any) => res.TradeID == event.value
      );
    });
    console.log(this.tradeLevels);
  }
  onSelectFile(file: FileList) {
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }
  onCheckboxChange(event: any) {
    this.tradeData.Languages += event.value + ',';
    console.log('check box' + this.tradeData.Languages);
  }

  search(trade: any, level: any) {
    this.tradeList = this.copyTradeList;
    console.log(level);
    let val = [];
    console.log(this.tradeList);
    if (trade != null && level == null) {
      for (var i = 0; i < this.tradeList.length; i++) {
        if (trade.Name == this.tradeList[i].TradeName) {
          val.push(this.tradeList[i]);
        }
      }
      this.tradeList = val;
    }
    if (trade.Name != null && level.Name != null) {
      for (var i = 0; i < this.tradeList.length; i++) {
        let tradeName = this.tradeList[i].TradeName.toString();
        let tradeLevel = this.tradeList[i].TradeLevel.toString();
        if (trade.Name == tradeName && level.Name == tradeLevel) {
          val.push(this.tradeList[i]);
        }
      }
      this.tradeList = val;
    }
  }

  Delete(ID: number) {
    this.service.delete(ID).subscribe((r) => {
      alert(r);
      this.loadAllTrade();
    });
  }

  openModal(traded, event: any) {
    let val = <HTMLInputElement>document.getElementById('myModal');
    val.hidden = false;
  }

  clearSearch() {
    this.getTradeLevels();
    this.loadAllTrade();
    this.selectedTrade = 'Select Trade';
    this.selectedTradeLevel = 'Select Level';
  }
}
