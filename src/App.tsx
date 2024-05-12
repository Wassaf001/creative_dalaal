// App.tsx
import React, { useState } from 'react';
import NavBar from './Components/NavBar';
import SearchArea from './Components/SearchArea';
import Para from './Components/Para';
import Footer from './Components/Footer';

function App() {
  const [textContent, setTextContent] = useState<string>('');
  const [highlightedContent, setHighlightedContent] = useState<string>('');
  const [totalWords, setTotalWords] = useState<number>(0);
  const [searchWord, setSearchWord] = useState<string>('');

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target) {
        const content = event.target.result;
        setTextContent(content as string);
        setTotalWords(countWords(content as string));
        setHighlightedContent(content as string);
      }
    };
    reader.readAsText(file);
  };

  const countWords = (text: string) => {
    if (!text.trim()) return 0;
    const words = text.trim().split(/\s+/);
    return words.length;
  };

  const handleSearch = (word: string) => {
    setSearchWord(word);
    const regex = new RegExp(`(${word})`, 'gi');
    const count = (textContent.match(regex) || []).length;
    setTotalWords(countWords(textContent));
    setHighlightedContent(textContent.replace(regex, '<span class="highlight">$1</span>'));
    setSearchWordCount(count);
  };

  const [searchWordCount, setSearchWordCount] = useState<number>(0);

  return (
    <div className="container-fluid">
      <NavBar />
      <SearchArea onFileUpload={handleFileUpload} onSearch={handleSearch} />
      {(textContent || searchWord) && (
        <div className="row justify-content-center mt-4">
          <div className="col-md-8">
            <Para textContent={highlightedContent} />
            <Footer totalWords={totalWords} searchWordCount={searchWordCount} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
