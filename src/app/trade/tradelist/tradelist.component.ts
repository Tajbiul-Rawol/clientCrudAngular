import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../../Services/service.service';
import { saveAs as importedSaveAs } from 'file-saver';
import { Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-tradelist',
  templateUrl: './tradelist.component.html',
  styleUrls: ['./tradelist.component.css'],
})
export class TradelistComponent implements OnInit {
  @ViewChild('syllabusInput', { static: true }) syllabusInput;
  @ViewChild('testplanInput', { static: true }) testplanInput;
  constructor(
    private service: ServiceService,
    private formBuilder: FormBuilder
  ) {}

  selectedTrade: any = {
    ID: 0,
    Name: '',
  };
  selectedTradeLevel: any = {
    ID: 0,
    Name: '',
    TradeID: 0,
  };
  selectedModalTrade: any = {
    ID: 0,
    Name: '',
  };
  selectedModalTradeLevel: any = {
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
  modalTradeLevels: any;
  trades: any[] = [];
  modalTrades: any[] = [];
  languages: any;
  selectedFile: File = null;
  imageUrl: string;
  fileToUpload: File = null;
  editFileForm: any;
  tradeList: any[] = [];
  copyTradeList: any[] = [];
  checked: boolean = false;
  modalClicked: boolean = false;
  pageNumber: number = 1;
  pageSize: number = 10;
  pages:any[]= [];

  ngOnInit(): void {
    this.getTradeLevels();
    this.getLanguages();
    this.loadAllTrade();
    this.editFileForm = this.formBuilder.group({});
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

  loadAllTrade() {
    this.service
      .getDetails(this.pageNumber, this.pageSize)
      .subscribe((data: any) => {
        this.tradeList = data;
        this.copyTradeList = data;
        this.pages.length = this.tradeList.length;
      });
  }

  getTradeDetailsByPageNumber(page) {
    this.pageNumber = page;
    this.loadAllTrade();
  }

  getTradeLevels() {
    this.service.getAll().subscribe((data: any) => {
      this.trades = data.trades;
      this.modalTrades = data.trades;
    });
  }
  openModal(trade: any) {
    this.tradeData.ID = trade.ID;
    this.tradeData.TradeName = trade.TradeName;
    this.tradeData.TradeLevel = trade.TradeLevel;
    this.selectedModalTrade = this.modalTrades.find(
      (t) => t.Name == trade.TradeName
    );
    this.service.getAll().subscribe((data: any) => {
      this.modalTradeLevels = data.tradeLevels.filter(
        (res: any) => res.TradeID == this.selectedModalTrade.ID
      );
      this.selectedModalTradeLevel = this.modalTradeLevels.find(
        (l) => l.TradeID == this.selectedModalTrade.ID
      );
    });
    this.getSelectedLanguages(trade.Languages);
    this.tradeData.ActiveDate = trade.ActiveDate;
    (<HTMLInputElement>document.getElementById('datepicker')).value =
      this.tradeData.ActiveDate;
    this.tradeData.Languages = trade.Languages;
    this.tradeData.DevelopmentOfficer = trade.DevelopmentOfficer;
    this.tradeData.Manager = trade.Manager;
    this.tradeData.SyllabusName = trade.SyllabusName;
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

  getSelectedLanguages(language: string) {
    this.clearCheckBoxSelections();
    let languages = language.split(',');
    let langArr = [];
    for (let i = 0; i < languages.length; i++) {
      let name = languages[i];
      let language = this.languages.find((l) => l.Name === name);
      if (language) {
        language.isSelected = true;
      }
      let checkBox = <HTMLInputElement>(
        (<unknown>document.getElementsByName(name))
      );
      checkBox.value = languages[i];
      checkBox.checked = true;
      this.checked = true;
    }
  }
  clearCheckBoxSelections() {
    for (let i = 0; i < this.languages.length; i++) {
      let lang = this.languages[i];
      let language = this.languages.find((l) => l.Name === lang.Name);
      if (language) {
        language.isSelected = false;
      }
      let checkBox = <HTMLInputElement>(
        (<unknown>document.getElementsByName(lang.Name))
      );
      checkBox.value = this.languages[i];
      checkBox.checked = false;
      this.checked = false;
    }
  }

  onCheckboxChange(event: any) {
    this.tradeData.Languages += event.value + ',';
    console.log('check box' + this.tradeData.Languages);
  }

  onModalTradeSelect(event: any) {
    let modalTradeDetails = this.modalTrades.find(
      (t: any) => t.ID == event.value
    );
    this.tradeData.TradeName = modalTradeDetails.Name;
    this.selectedModalTrade = modalTradeDetails;
    this.service.getAll().subscribe((data: any) => {
      this.modalTradeLevels = data.tradeLevels.filter(
        (res: any) => res.TradeID == event.value
      );
      console.log(this.modalTradeLevels);
    });
  }

  getModalLevelData(event: any) {
    console.log(this.selectedModalTradeLevel);
    this.selectedModalTradeLevel = this.modalTradeLevels.find(
      (t: any) => t.ID == event.value
    );
    this.tradeData.TradeLevel = this.selectedModalTradeLevel.Name;
  }

  getData(event: any) {
    console.log(this.selectedTradeLevel);
    this.selectedTradeLevel = this.tradeLevels.find(
      (t: any) => t.ID == event.value
    );
    this.tradeData.TradeLevel = this.selectedTradeLevel.Name;
  }
  search(trade: any, level: any) {
    this.tradeList = this.copyTradeList;
    console.log(level);
    let val = [];
    console.log(this.tradeList);
    if (trade.Name != null && level.Name == null) {
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

  searchTrade(trade: any, level: any) {
    this.pageNumber = 1;
    this.pageSize = 1000;
    let val = [];
    this.loadAllTrade();
    setInterval(() => {
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
    }, 1000);
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
    (<HTMLInputElement>document.getElementById('trade')).value = '0';
    (<HTMLInputElement>document.getElementById('tradeLevel')).value = '0';
    this.clearCheckBoxSelections();
    this.modalClicked = true;
    this.clearSearch();
    return;
  }

  clearSearch() {
    this.getTradeLevels();
    if (this.modalClicked) {
      this.selectedModalTrade.Name = 'Select Trade';
      this.selectedModalTrade.ID = 0;
      this.selectedModalTradeLevel.Name = 'Select Level';
      this.selectedModalTradeLevel.ID = 0;
      this.modalClicked = false;
    } else {
      this.selectedTrade.Name = 'Select Trade';
      this.selectedTrade.ID = 0;
      this.selectedTradeLevel.Name = 'Select Level';
      this.selectedTradeLevel.ID = 0;
      this.pageNumber = 1;
      this.pageSize = 10;
    }
    this.loadAllTrade();
  }

  getDate() {
    this.tradeData.ActiveDate = (<HTMLInputElement>(
      document.getElementById('datepicker')
    )).value;
  }
  Delete(ID: number) {
    if (window.confirm('Are you sure you want to delete this trade?')) {
      this.service.delete(ID).subscribe((r) => {
        alert(r);
        this.loadAllTrade();
      });
    }
  }

  downloadPdfFile(data) {
    const PdfFileName = data;
    this.service.downloadFile(PdfFileName).subscribe((data) => {
      importedSaveAs(data, PdfFileName);
    });
  }

  onSubmit() {
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
    formData.append('ID', this.tradeData.ID);
    formData.append('TradeName', this.tradeData.TradeName);
    formData.append('TradeLevel', this.tradeData.TradeLevel);
    formData.append('Languages', this.tradeData.Languages);
    formData.append('ActiveDate', this.tradeData.ActiveDate);
    formData.append('DevelopmentOfficer', this.tradeData.DevelopmentOfficer);
    formData.append('SyllabusName', this.tradeData.SyllabusName);
    formData.append('Manager', this.tradeData.Manager);
    this.service.updateDetails(formData).subscribe((result) => {
      alert(result);
      this.loadAllTrade();
    });
  }
}
