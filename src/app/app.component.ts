import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true  
})
export class AppComponent {
  uploadedText: string = '';
  totalOccurrences: number = 0;

  onFileChange(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event: any) => {
      this.uploadedText = event.target.result;
      this.updateOccurrences();
    };

    reader.readAsText(file);
  }

  onSearchInput(event: any): void {
    this.highlightText(event.target.value);
    this.updateOccurrences();
  }

  highlightText(searchTerm: string): void {
    const regex = new RegExp(searchTerm, 'gi');
    const highlightedText = this.uploadedText.replace(regex, match => `<span class="highlight">${match}</span>`);
    document.getElementById('fileContent')!.innerHTML = highlightedText;
  }

  updateOccurrences(): void {
    const searchTerm = (document.getElementById('searchInput') as HTMLInputElement).value;
    const regex = new RegExp(searchTerm, 'gi');
    const matches = this.uploadedText.match(regex);
    this.totalOccurrences = matches ? matches.length : 0;
  }
}
