import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../Services/service.service';
import { saveAs as importedSaveAs } from 'file-saver';
@Component({
  selector: 'app-tradelist',
  templateUrl: './tradelist.component.html',
  styleUrls: ['./tradelist.component.css'],
})
export class TradelistComponent implements OnInit {
  constructor(private service: ServiceService) {}

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

  ngOnInit(): void {
    this.getTradeLevels();
    this.getLanguages();
    this.loadAllTrade();
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
    this.service.getDetails().subscribe((data: any) => {
      this.tradeList = data;
      this.copyTradeList = data;
    });
  }
  getTradeLevels() {
    this.service.getAll().subscribe((data: any) => {
      this.trades = data.trades;
    });
    console.log(this.trades);
  }
  openModal() {}

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

  clearSearch() {
    this.getTradeLevels();
    this.loadAllTrade();
    this.selectedTrade = 'Select Trade';
    this.selectedTradeLevel = 'Select Level';
  }
  retrieveTrade(ID: any) {
    alert(ID);
  }

  Delete(ID: number) {
    this.service.delete(ID).subscribe((r) => {
      alert(r);
      this.loadAllTrade();
    });
  }

  downloadPdfFile(data) {
    const PdfFileName = data;
    this.service.downloadFile(PdfFileName).subscribe((data) => {
      importedSaveAs(data, PdfFileName);
    });
  }
}
