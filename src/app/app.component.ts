  import { Component, ViewEncapsulation } from '@angular/core';
  import { SearchHistoryService } from './services/search-history.service';
  import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    encapsulation: ViewEncapsulation.None
  })
  export class AppComponent {
    uploadedText: string = '';
    totalOccurrences: number = 0;
    totalWords: number = 0;
    highlightedContent: string = '';
    searchHistory: string[] = [];

   // constructor(private searchHistoryService: SearchHistoryService) {}
    //constructor(private sanitizer: DomSanitizer) {}

    onFileChange(event: any): void {
      const file = event.target.files[0];
      const reader = new FileReader();
    
      reader.onload = (event: any) => {
        this.uploadedText = event.target.result;
        // this.updateOccurrences('');
        this.updateTotalWords();
        this.highlightText(''); 
      };
    
      reader.readAsText(file);
    }

    onSearchInput(event: Event): void {
      const searchTerm = (event.target as HTMLInputElement).value;
      this.highlightText(searchTerm);
      this.updateOccurrences();
    }
    

    highlightText(searchTerm: string): void {
      if (searchTerm.trim() === '') {
        this.highlightedContent = this.uploadedText;
        return;
      }
    
      const regex = new RegExp(searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      this.highlightedContent = this.uploadedText.replace(regex, match => `<span class="highlight">${match}</span>`);
      console.log(this.highlightedContent);
    }
    
       

    updateOccurrences(): void {
      const searchTerm = (document.getElementById('searchInput') as HTMLInputElement).value;
      const regex = new RegExp(searchTerm, 'gi');
      const matches = this.uploadedText.match(regex);
      this.totalOccurrences = matches ? matches.length : 0;
    }

    updateTotalWords(): void {
      const words = this.uploadedText.split(/\s+/).filter(word => word !== '');
      this.totalWords = words.length;
    }
  }
