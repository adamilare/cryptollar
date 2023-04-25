const getValue = (num) => {
  const abbreviations = ['', 'K', 'M', 'B', 'T'];
  let abbreviationIndex = 0;

  let numDuplicate = num;

  while (numDuplicate >= 1000 && abbreviationIndex < abbreviations.length) {
    numDuplicate /= 1000;
    abbreviationIndex += 1;
  }

  const roundedNum = Math.round(numDuplicate * 100) / 100;
  const abbreviation = abbreviations[abbreviationIndex];

  return `${roundedNum}${abbreviation}`;
};

export default getValue;
