import { useEffect, useState } from 'react';
import './App.css';
import Result from './components/Result';
import axios from 'axios';
import Footer from './components/Footer';

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [audio, setAudio] = useState('');
  const [word, setWord] = useState('');

  const fetchData = () => {
    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${search}`)
      .then((response) => {
        const data = response.data;
        if (Array.isArray(data) && data.length > 0) {
          setData(data[0].meanings);
          setAudio(data[0].phonetics[0].audio);
          setWord(data[0].word);
          setSearch('')
        } else {
          setData([]);
          setAudio('');
          setWord('');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  useEffect(() => {
    fetchData();
  },[]);

  return (
    <>
      <div className='flex flex-col items-center w-screen mt-32 flex-wrap'>
        <div className='m-5'>
          <h1 className='font-semibold text-3xl'>D-App</h1>
        </div>
        <div className='flex justify-center m-5'>
          <form onSubmit={handleFormSubmit} className='flex flex-row'>
            <input
              type='text'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
            />
            <button type='submit' className='ml-3 border px-3 bg-amber-400 hover:bg-amber-500 rounded-md'>
              Search
            </button>
          </form>
        </div>
      </div>
      <Result data={data} word={word} audio={audio}/>
      <Footer/>
    </>
  );
}

export default App;
