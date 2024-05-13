import { useState } from 'react';

function NavBar() {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const handleClearHistory = () => {
    setSearchHistory([]);
  };

  // const handleAddToHistory = (word: string) => {
  //   if (!searchHistory.includes(word)) {
  //     setSearchHistory([word, ...searchHistory]);
  //   }
  // };

  const handleResetPage = () => {
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#" onClick={handleResetPage}>SearchIt</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#" onClick={handleResetPage}>Home</a>
            </li>
            <li className="nav-item d-flex">
              <a className="nav-link" href="#" onClick={handleClearHistory}>Clear</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                History
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {searchHistory.map((word, index) => (
                  <li key={index}><a className="dropdown-item" href="#">{word}</a></li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
