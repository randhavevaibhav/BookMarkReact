import "./App.css";
import { useState, useRef } from "react";

function App() {
  var savedData = [];
  var savedDataList = [];

  savedData = localStorage.getItem("BookMarkData");

  if (savedData === null && savedData?.length >= 2) {
    savedData = [{ bookMark: "test", url: "test" }];
  } else {
    savedDataList = JSON.parse(savedData);
  }

  const [BookMarkList, setBookMarkList] = useState(savedDataList);

  const [currentBookMark, setCurrentBookMark] = useState();
  const [CurrentURL, setURL] = useState();

  const inputBookMark = useRef(null);
  const inputURL = useRef(null);
  const addBookMark = () => {
    if (
      currentBookMark === "" ||
      currentBookMark === undefined ||
      CurrentURL === "" ||
      CurrentURL === undefined
    ) {
      alert("please give valid BookMark and URL !!");
    } else {
      if (BookMarkList?.length === 0 || BookMarkList?.length === undefined) {
        setBookMarkList([{ bookMark: currentBookMark, url: CurrentURL }]);
      } else {
        setBookMarkList([
          ...BookMarkList,
          { bookMark: currentBookMark, url: CurrentURL },
        ]);
      }

      inputBookMark.current.value = "";
      setCurrentBookMark("");
      inputURL.current.value = "";
    }
  };

  const deleteBookMark = (bookMarkToDelete) => {
    setBookMarkList(
      BookMarkList.filter((bookMark) => {
        return bookMark.bookMark !== bookMarkToDelete;
      })
    );

    localStorage.setItem("BookMarkData", JSON.stringify(BookMarkList));
  };

  const openTab = (tabNameString, URLString) => {
    switch (tabNameString) {
      case "PDFToWord":
        window.open("https://www.ilovepdf.com/pdf_to_word", "_self");
        break;
      case "WordToPDF":
        window.open("https://www.ilovepdf.com/word_to_pdf", "_self");
        break;
      case "PDFCompressor":
        window.open("https://www.ilovepdf.com/compress_pdf", "_self");
        break;
      case "IMGCompressor":
        window.open("https://www.iloveimg.com/compress-image", "_self");
        break;
      default:
        alert(tabNameString + " is not a valid tab name !!");
    }
  };

  const redirect = (urlString) => {
    window.open(urlString, "_self");
  };

  return (
    <div className="App">
      <h1>Custom BookMarks</h1>

      <div className="default-buttons">
        <button
          onClick={() => {
            openTab("PDFToWord");
          }}
        >
          PDF To WORD
        </button>

        <button
          onClick={() => {
            openTab("WordToPDF");
          }}
        >
          Word To PDF
        </button>

        <button
          onClick={() => {
            openTab("PDFCompressor");
          }}
        >
          PDF Compressor
        </button>

        <button
          onClick={() => {
            openTab("IMGCompressor");
          }}
        >
          IMG Compressor
        </button>
      </div>

      <div className="main-Frame">
        <div className="bookmark-container">
          <input
            ref={inputBookMark}
            type="text"
            placeholder="BookMarkName...."
            onChange={(event) => {
              setCurrentBookMark(event.target.value);
            }}
          ></input>
        </div>
        <div className="URL-container">
          <input
            ref={inputURL}
            type="text"
            placeholder="URL...."
            onChange={(event) => {
              setURL(event.target.value);
            }}
          ></input>
          <button onClick={addBookMark}>Add Custom Button</button>
        </div>
      </div>
      <hr />

      <ul>
        {BookMarkList?.length ? (
          BookMarkList.map((val, key) => {
            return (
              <div id="tasks" key={key + "2"}>
                <button
                  className="customButton-name"
                  onClick={() => {
                    redirect(val.url);
                  }}
                  key={key}
                >
                  {" "}
                  {val.bookMark}
                </button>

                <button
                  key={key + "0"}
                  onClick={() => {
                    deleteBookMark(val.bookMark);
                  }}
                >
                  X
                </button>
              </div>
            );
          })
        ) : (
          <p></p>
        )}
      </ul>

      {localStorage.setItem("BookMarkData", JSON.stringify(BookMarkList))}
    </div>
  );
}

export default App;
