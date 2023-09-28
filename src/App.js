import "./App.css";
import { useState,useRef,useEffect } from "react";


function App() {
const [BookMarkList, setBookMarkList] = useState([]);
const [currentBookMark, setCurrentBookMark] = useState();
const [CurrentURL, setURL] = useState();

useEffect(
()=>{

console.log("using useeffect");
const savedData = localStorage.getItem('BookMarkData');
        if (savedData) {

          
          //setBookMarkList([...BookMarkList,JSON.parse(savedData)]);
          setBookMarkList(JSON.parse(savedData));
          console.log("Saved data present !!!");



        }

},[]


)

const inputBookMark = useRef(null);
const inputURL = useRef(null);
const  addBookMark= ()=>
{
  console.log(currentBookMark);
  console.log("Calling addtask ---> " );
  if((currentBookMark==="" || currentBookMark===undefined) || (CurrentURL==="" || CurrentURL===undefined))
  {
    alert("please give valid BookMark and URL !!");
  }
  else{
    
  
  setBookMarkList([...BookMarkList,{bookMark:currentBookMark ,url:CurrentURL}]);
  inputBookMark.current.value="";
  setCurrentBookMark("");
  inputURL.current.value="";
  console.log("BookmarkList in addbookmark() --> "+BookMarkList);
  localStorage.setItem('BookMarkData', JSON.stringify(BookMarkList));
  

  }
  
}




const deleteBookMark = (bookMarkToDelete)=>
{
    setBookMarkList(BookMarkList.filter((bookMark)=>{

     return bookMark.bookMark!==bookMarkToDelete;

    }))
console.log("Calling delet bookmark !!")

    localStorage.setItem('BookMarkData', JSON.stringify(BookMarkList));
    console.log("BookMarkList in delet() ---> "+BookMarkList[0].url)
    
}






const openTab = (tabNameString,URLString) =>
{

   
  switch(tabNameString)
      {
        case 'PDFToWord':
        window.open("https://www.ilovepdf.com/pdf_to_word", "_self");
          break;
        case 'WordToPDF':
        window.open("https://www.ilovepdf.com/word_to_pdf", "_self");
          break;
        case 'PDFCompressor':
        window.open("https://www.ilovepdf.com/compress_pdf", "_self");
          break;
          case 'IMGCompressor':
        window.open("https://www.iloveimg.com/compress-image", "_self");
          break;
          default:  alert(tabNameString+" is not a valid tab name !!");
      }
    

}

const redirect = (urlString) =>
{
  window.open(urlString, "_self");

}






  return (
    <div className="App">
      <h1>Custom BookMarks</h1>
     
     <div className="default-buttons">

            <button onClick={()=>{

        openTab("PDFToWord");

        }}>PDF To WORD</button>
    

            <button onClick={()=>{

        openTab("WordToPDF");

        }}>Word To PDF</button>

          <button onClick={()=>{

          openTab("PDFCompressor");

          }}>PDF Compressor</button>

          <button onClick={()=>{

          openTab("IMGCompressor");

          }}>IMG Compressor</button>


     </div>



      
      <div className="main-Frame">
        <div className="bookmark-container" >
          <input ref={inputBookMark} type="text" placeholder="BookMarkName...." onChange={(event)=>{setCurrentBookMark(event.target.value)}}></input>
        
        </div>
        <div className="URL-container">
            <input ref={inputURL} type="text" placeholder="URL...." onChange={(event)=>{setURL(event.target.value)}}></input>
            <button onClick={addBookMark}>Add Custom Button</button>


        </div>
        
       
      </div>
      <hr/>

      <ul>

        {BookMarkList.map((val,key)=>
        {
            return ( <div id="tasks">
              <button  className="customButton-name" onClick={()=>
              {
                redirect(val.url);
              }} key={key}> {val.bookMark} {val.url}</button>
              
              <button onClick={()=>{deleteBookMark(val.bookMark)}}>X</button>

          
           
              </div>
              
             
              
              );
                     
           


        })}


      </ul>

            
           
    
    </div>
  );
}

export default App;
