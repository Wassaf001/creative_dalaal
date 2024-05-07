import { Component, ViewEncapsulation } from '@angular/core';

// Component Decorator
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  encapsulation: ViewEncapsulation.None // to define the css as global so that it can affect the component's template
})
export class AppComponent {
  uploadedText: string = ''; // for file content
  totalOccurrences: number = 0; // for total occurences of searched term
  totalWords: number = 0; // total words in the file
  highlightedContent: string = ''; // for highlighted file content

  onFileChange(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.uploadedText = event.target.result;
      this.updateTotalWords();
      this.highlightText('');
    };
    reader.readAsText(file);
  }

  onSearchInput(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.highlightText(searchTerm);
    if (searchTerm.length != 0) {
      this.updateOccurrences();
    }
    else {
      this.totalOccurrences = 0;
    }
  }


  highlightText(searchTerm: string): void {
    // trimming any space besides the search term
    if (searchTerm.trim() === '') {
      this.highlightedContent = this.uploadedText;
      return;
    }
    // creating regex for searching the pattern by removing special characters  
    const regex = new RegExp(searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    // replacing the matched regex in the uploaded text and storing it in highlighted text 
    this.highlightedContent = this.uploadedText.replace(regex, match => `<span class="highlight">${match}</span>`);
  }



  updateOccurrences(): void {
    // taking user input from html as inputelement here
    const searchTerm = (document.getElementById('searchInput') as HTMLInputElement).value;
    // creating regex for searchTerm, with g as global search and not first search and i for case-insensitive
    const regex = new RegExp(searchTerm, 'gi');
    // matching the regex in the uploaded text
    const matches = this.uploadedText.match(regex);
    this.totalOccurrences = matches ? matches.length : 0;
  }

  updateTotalWords(): void {
    // counting total words
    const words = this.uploadedText.split(/\s+/).filter(word => word !== '');
    this.totalWords = words.length;
  }
}
