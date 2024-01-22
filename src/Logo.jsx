import { useSearchParams } from "react-router-dom";
import {useState, useEffect} from "react";
import Row from "./Row.jsx"

function getDefaultWords() {
  return [
    {word: "Teknologi", margin: 5},
    {word: "Design", margin: 5},
    {word: "Faggruppe", margin: 5},
    {word: "Produktledelse", margin: 4},
    {word: "Management consulting", margin: 0},
    {word: "Fagkveld", margin: 3},
    {word: "Kompetanse", margin: 4},
    {word: "Fellesskap", margin: 0},
    {word: "Nysgjerrighet", margin: 3},
    {word: "Bærekraft", margin: 4},
    {word: "Fagmiljø", margin: 4},
    {word: "Sikkerhet", margin: 5},
    {word: "Strategi", margin: 4},
    {word: "Datadreven", margin: 0},
    {word: "Innovasjon", margin: 2},
    {word: "Karriere", margin: 4},
    {word: "#livetibekk", margin: 0},
    {word: "Kultur", margin: 4},
  ];
}
export default function Frame() {
  let LONG_WORD = 9;
  const MARGIN_LONG_WORD = 2;
  const MARGIN_SHORT_WORD = 5;
  let TIMEOUT_NEW_WORD = 6000;
  let TIMEOUT_ROW = 250;
  let BACKGROUND_COLOR = 'black';
  let IS_FRAME = false;

  let words = getDefaultWords();
  let rebelWords = [];
  const [searchParams, setSearchParams] = useSearchParams();
  const [wordIndex, setWordIndex] = useState( 0)

  const isFrameParam = searchParams.get('frame');
  if (isFrameParam) {
    IS_FRAME = true;
    LONG_WORD = 6;
  }

  const wordParams = searchParams.get('words');
  if (wordParams) {
    words = wordParams.split(',').map(w => {
      const margin = w.length > LONG_WORD ? MARGIN_LONG_WORD : MARGIN_SHORT_WORD;
      return {word: w, margin: Math.floor(Math.random()*margin)};
    });
  }

  const newWordTimeout = searchParams.get('delay');
  if (newWordTimeout) {
    TIMEOUT_NEW_WORD = newWordTimeout;
  }

  const speedParams = searchParams.get('speed');
  if (speedParams) {
    TIMEOUT_ROW = speedParams;
  }

  const rebelWordsParams = searchParams.get("rebel");
  if (rebelWordsParams) {
    rebelWords = rebelWordsParams.split(',');
  }

  const bgColorParams = searchParams.get("bgColor");
  if (bgColorParams) {
    BACKGROUND_COLOR = bgColorParams;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      let i = wordIndex + 1;
      if (i >= words.length) {
        i = 0;
      }
      setWordIndex(i);
    }, TIMEOUT_NEW_WORD);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [wordIndex]);

  const word = words[wordIndex];
  return (
      <main className={`main ${IS_FRAME ? 'frame' : ''} bg-${BACKGROUND_COLOR}`}>
        <p>Bekk</p>
        <Row key={"w1-"+wordIndex} word={"Bekk"} margin={1} timeout={TIMEOUT_ROW} removeWordTimeout={TIMEOUT_NEW_WORD/2}></Row>
        <Row key={"w2-"+wordIndex} word={"Bekk"} margin={2} timeout={TIMEOUT_ROW*2} removeWordTimeout={TIMEOUT_NEW_WORD/2}></Row>
        <Row key={"w3-"+wordIndex} word={word.word} margin={3} timeout={TIMEOUT_ROW*3} removeWordTimeout={TIMEOUT_NEW_WORD/2}></Row>
        <Row key={"w4-"+wordIndex} word={word.word} margin={Math.floor((4+word.margin)/2)} timeout={TIMEOUT_ROW*4} removeWordTimeout={TIMEOUT_NEW_WORD/2}></Row>
        <Row key={"w5-"+wordIndex} word={word.word} margin={word.margin} timeout={TIMEOUT_ROW*5} endWord goldenWords={rebelWords} removeWordTimeout={TIMEOUT_NEW_WORD/2}></Row>
      </main>
  )
}
