'use client'
import Image from 'next/image'
import styles from './page.module.css'
import {useState, useEffect} from "react";

function RenderChar(props) {
  const [char, setChar] = useState({char: props.char});

  function renderChar() {
    const it = char.char;
    if (it.transform) {
      const bekk = "Bekk" + props.word;
      return bekk.charAt(Math.floor(Math.random()*bekk.length));
    }
    return it.char;
  }

  function getClassName() {
    return char.char.show ? styles.show : styles.hide;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      const it = char.char;

      if (it.marginChar) {
        return;
      }

      if (it.shouldShow) {
        it.show = true;
        if (Math.random() > 0.3) {
          it.transform = true;
        }
      }

      setChar({char: it});

      setTimeout(() => {
        const it = char.char;
        it.transform = false;
        setChar({char: it});
      }, 100);
    }, props.timeout);
    const hide = setTimeout(() => {
      const it = char.char;
      if (Math.random() < 0.3) {
        it.transform = true;
      }
      setChar({char: it});
      setTimeout(() => {
        const it = char.char;
        it.show = false;
        setChar({char: it});
      }, 100);
    }, props.hideTimeout);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
      <span className={getClassName()}>{renderChar()}</span>
  );
}

function RenderRow(props) {
  let delay = 0;
  let hideTimeout = 4000;
  return (
      <p>{props.chars.map((it, index) => {
        if (!it.marginChar) {
          delay += 100;
          hideTimeout += 25;
        }
        return <RenderChar key={"char-"+index} char={it} timeout={delay} hideTimeout={hideTimeout} word={props.word} endWord={props.endWord}/>
      })}</p>
  );
}

function Row(props) {

  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
     setShow(true);
    }, props.timeout);
    return () => clearTimeout(timer);
  }, []);

  if (show) {
    let numChars = Math.max(2, Math.min(5, Math.floor(props.word.length / 2)));
    let showChars = [];
    for (let i = 0; i < props.word.length; i++) {
      showChars.push(i);
    }
    for (let i = 0; i < (props.word.length - numChars); i++) {
      showChars.splice(Math.floor(Math.random()*showChars.length), 1);
    }
    const margins = new Array(props.margin).fill(0).map(it => {
      return {char: "#", show: false, shouldShow: false, transform: false, marginChar: true};
    });
    const chars = props.word.split('').map((it, index) => {
      return {char: it, show: false, shouldShow: (props.endWord || showChars.indexOf(index) >= 0), transform: false, marginChar: false};
    });
    const word = {chars: margins.concat(chars)};
    return (
        <RenderRow chars={word.chars} word={props.word} endWord={props.endWord}/>
    );
  } else {
    return (
        <p></p>
    );
  }
}

export default function Home() {
  const words = [
    {word: "Teknologi", margin: 5},
    {word: "Design", margin: 5},
    {word: "Teknologi", margin: 1},
    {word: "Management consulting", margin: 0},
    {word: "Management consulting", margin: 0},
    {word: "Management consulting", margin: 0},
    {word: "Management consulting", margin: 0},
  ];

  const [wordIndex, setWordIndex] = useState( 0)

  useEffect(() => {
    //Implementing the setInterval method
    const interval = setInterval(() => {
      let i = wordIndex + 1;
      if (i >= words.length) {
        i = 0;
      }
      setWordIndex(i);
    }, 6000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [wordIndex]);

  const word = words[wordIndex];
  console.log(word);
  return (
    <main className={styles.main}>
      <div>
        <p>Bekk</p>
        <Row key={"w1-"+wordIndex} word={"Bekk"} margin={1} timeout={250}></Row>
        <Row key={"w2-"+wordIndex} word={"Bekk"} margin={2} timeout={500}></Row>
        <Row key={"w3-"+wordIndex} word={word.word} margin={3} timeout={750}></Row>
        <Row key={"w4-"+wordIndex} word={word.word} margin={Math.floor((4+word.margin)/2)} timeout={1000}></Row>
        <Row key={"w5-"+wordIndex} word={word.word} margin={word.margin} timeout={1250} endWord></Row>
      </div>
    </main>
  )
}
