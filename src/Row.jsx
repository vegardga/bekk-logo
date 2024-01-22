import {useState, useEffect} from "react";
import Letter from "./Letter.jsx";

function RenderRow(props) {
  let delay = 0;
  let hideTimeout = props.removeWordTimeout;
  return (
      <p>{props.chars.map((it, index) => {
        if (!it.marginChar) {
          delay += 100;
          hideTimeout += 25;
        }
        return <Letter key={"char-"+index} char={it} timeout={delay} hideTimeout={hideTimeout} word={props.word} endWord={props.endWord}/>
      })}</p>
  );
}

function getVisibleCharacterIndexList(word) {
  let numChars = Math.max(2, Math.min(4, Math.floor(word.length / 2)));
  let possibleChars = [];
  let visibleCharacterList = [];
  for (let i = 0; i < Math.min(6, word.length); i++) {
    possibleChars.push(i);
  }
  for (let i = 0; i < numChars; i++) {
    visibleCharacterList.push(possibleChars.splice(Math.floor(Math.random()*possibleChars.length), 1)[0]);
  }
  return visibleCharacterList;
}

function getMarginCharacters(margin) {
  return new Array(margin).fill(0).map(it => {
    return {char: "#", show: false, shouldShow: false, transform: false, marginChar: true};
  });
}

function getRowClass(word, goldenWords) {
  if (goldenWords && goldenWords.indexOf(word) >= 0) {
    return 'golden';
  }
  return 'black';
}

export default function Row(props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, props.timeout);
    return () => clearTimeout(timer);
  }, []);

  if (show) {
    const rowClass = getRowClass(props.word, props.goldenWords);
    const visibleCharacterList = getVisibleCharacterIndexList(props.word);
    const chars = props.word.split('').map((it, index) => {
      return {char: it, show: false, shouldShow: (props.endWord || visibleCharacterList.indexOf(index) >= 0), transform: false, marginChar: false};
    });
    const word = {chars: getMarginCharacters(props.margin).concat(chars)};
    return (
        <div className={rowClass}><RenderRow chars={word.chars} word={props.word} endWord={props.endWord} removeWordTimeout={props.removeWordTimeout}/></div>
    );
  } else {
    return (
        <p></p>
    );
  }
}
