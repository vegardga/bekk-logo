'use client'
import Image from 'next/image'
import styles from './page.module.css'
import {useState, useEffect} from "react";

function RenderLetter(props) {

}
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

      if (props.endWord || Math.random() < 0.5) {
        it.show = true;
        if (Math.random() > 0.2) {
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
      it.show = false;
      setChar({char: it});
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

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     const chars = word.chars;
  //     chars.forEach(it => {
  //       if (it.marginChar) {
  //         return;
  //       }
  //       if (Math.random() < 0.5) {
  //         it.show = true;
  //         if (Math.random() > 0.2) {
  //           it.transform = true;
  //         }
  //       }
  //     });
  //     console.log("#timeout");
  //     setWord({chars: chars});
  //     setTimeout(() => {
  //       const chars = word.chars;
  //       chars.forEach(it => {
  //         if (props.endWord && !it.marginChar) {
  //           it.show = true;
  //         }
  //         it.transform = false;
  //       });
  //       console.log("#innertimeout");
  //       setWord({chars: chars});
  //     }, 400);
  //   }, props.timeout);
  //   return () => clearTimeout(timer);
  // }, []);

  const [show, setShow] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
     setShow(true);
    }, props.timeout);
    return () => clearTimeout(timer);
  }, []);

  if (show) {
    const margins = new Array(props.margin).fill(0).map(it => {
      return {char: "#", show: false, transform: false, marginChar: true};
    });
    const chars = props.word.split('').map(it => {
      return {char: it, show: false, transform: false, marginChar: false};
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
      "Teknologi",
      "Design"
  ];

  const [wordIndex, setWordIndex] = useState( 0)

  useEffect(() => {
    //Implementing the setInterval method
    const interval = setInterval(() => {
      console.log("change to next word");
      let i = wordIndex + 1;
      if (i >= words.length) {
        i = 0;
      }
      console.log("setting new index " + i);
      setWordIndex(i);
    }, 7000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [wordIndex]);

  const word = words[wordIndex];
  console.log(word);
  return (
    <main className={styles.main}>
      <div>
        <p>Bekk</p>
        <Row key={"w1-"+wordIndex} word={"Bekk"} margin={1} timeout={200}></Row>
        <Row key={"w2-"+wordIndex} word={"Bekk"} margin={2} timeout={400}></Row>
        <Row key={"w3-"+wordIndex} word={word} margin={3} timeout={600}></Row>
        <Row key={"w4-"+wordIndex} word={word} margin={4} timeout={800}></Row>
        <Row key={"w5-"+wordIndex} word={word} margin={5} timeout={1000} endWord></Row>
      </div>
    </main>
  )
}
