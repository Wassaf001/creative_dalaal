import React, { useState } from 'react';

interface SearchAreaProps {
  onFileUpload: (file: File) => void;
  onSearch: (word: string) => void;
}

function SearchArea({ onFileUpload, onSearch }: SearchAreaProps) {
  const [searchWord, setSearchWord] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(!event.target || !event.target.files) {return;}
    const file = event.target.files[0]; 
    if (file && file.type === 'text/plain') {
      onFileUpload(file);
    } else {
      alert('Please upload a .txt file.');
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchWord);
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSearchSubmit} className="row">
        <div className="col-md-4">
          <input type="file" accept=".txt" onChange={handleFileChange} className="form-control" />
        </div>
        <div className="col-md-4">
          <input type="text" placeholder="Search word" value={searchWord} onChange={handleSearchChange} className="form-control" />
        </div>
        <div className="col-md-4">
          <button type="submit" className="btn btn-primary">Search</button>
        </div>
      </form>
    </div>
  );
}

export default SearchArea;
