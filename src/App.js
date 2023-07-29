import { useEffect, useRef, useState } from 'react';
import './index.js'
import {Form,Button} from 'react-bootstrap';
import axios from 'axios';


const API_URL ='https://api.unsplash.com/search/photos';
const IMAGES_PER_PAGE=20;
const REACT_API_KEY='NbVe9aeE6ZYx--vdjH4CshJG-wVtwMVhkh37tcJDjLI'

function App() {

  const searchInput = useRef(null);
  const [images, setImages]=useState([]);
  const [page,setPage]=useState(1)
  const [totalPage, setTotalPage]=useState(0);


  useEffect(()=>{
    fetchImages();
    // burada her page değiştiğinde  tekardan feth metodunu render ederk tekrar çağırıyor.

  },  [page])



  const fetchImages = async ()=>{
    try {
      const {data}= await axios.get(`${API_URL}?query=${searchInput.current.value}&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${REACT_API_KEY}`)
      
      setImages(data.results);
      console.log(images)
      setTotalPage(data.total_pages)
    } catch (error) {
      console.log(error)
      
    }
  }

  // ortakları tek dublicet kod olmasın diye ayrı yere aldık. 
  const resetSearch=()=>{
    fetchImages();
    setPage(1)
     // burada ve yukaruda ki fonksiyonda 1 e setlememzin sebei kategori değiştirdiğimizde 
    // page numasının sabit kalmasıdır.
  }

  const handleSearch=(event)=>{
    event.preventDefault();
    console.log(searchInput.current.value)
    resetSearch()
  }
  const handleSelection =(selection)=>{
    searchInput.current.value=selection;
    resetSearch()
   
  }

  return (
    <div className="container">
      <h1 className='title'>Snap Shot</h1>
      <div className="search-section">
     <Form onSubmit={handleSearch}>
      <Form.Control 
      type='search'
      placeholder='Bir değer Girin ... '
      className='search-input'
      ref={searchInput}
      
      />
     </Form>
      </div>
      
      <div className="filters">
        <div onClick={()=> handleSelection('mountain')}>mountain</div>
        <div onClick={()=> handleSelection('beaches')}>beaches</div>
        <div onClick={()=> handleSelection('birds')}>birds</div>
        <div onClick={()=> handleSelection('food')}>food</div>,
      </div>
      <div className='images'>
        {images.map((image)=>{
          return(
            <img
            key={image.id}
            src={image.urls.small}
            alt={image.alt_description}
            className='image'
            />
          )
        })}
      </div>
      <div className='buttons'>
        {page>1 && <Button onClick={()=>setPage(page-1)}>Önceki Sayfa</Button>}
        {page<totalPage && <Button onClick={()=>setPage(page+1)}>Sonraki Sayfa</Button>}
      </div>



      
    </div>
  );
}

export default App;
