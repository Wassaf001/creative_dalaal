
interface FooterProps {
  totalWords: number;
  searchWordCount: number;
}

function Footer({ totalWords, searchWordCount }: FooterProps) {
  return (
    <div>
      <p>Total Number of Words: {totalWords}</p>
      <p>Occurrences of Searched Word: {searchWordCount}</p>
    </div>
  );
}

export default Footer;
