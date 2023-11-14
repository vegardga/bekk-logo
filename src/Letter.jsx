import {useState, useEffect} from "react";

export default function Letter(props) {
  const [char, setChar] = useState({...props.char});

  function renderChar() {
    const it = char;
    if (it.transform) {
      const transformCharacters = "Bekk" + props.word;
      return transformCharacters.charAt(Math.floor(Math.random()*transformCharacters.length));
    }
    return it.char;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      const it = char;

      if (it.marginChar) {
        return;
      }

      if (it.shouldShow) {
        it.show = true;
        if (Math.random() > 0.3) {
          it.transform = true;
        }
      }

      setChar({...it});

      setTimeout(() => {
        const it = char;
        it.transform = false;
        setChar({...it});
      }, 100);
    }, props.timeout);

    const hide = setTimeout(() => {
      const it = char;
      if (Math.random() < 0.3) {
        it.transform = true;
      }
      setChar({...it});
      setTimeout(() => {
        const it = char;
        it.show = false;
        setChar({...it});
      }, 100);
    }, props.hideTimeout);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
      <span className={char.show ? 'show' : 'hide'}>{renderChar()}</span>
  );
}
