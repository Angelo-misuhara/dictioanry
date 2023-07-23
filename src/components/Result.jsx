/* eslint-disable react/prop-types */
import { v4 as uuidv4 } from 'uuid';



// eslint-disable-next-line react/prop-types
const Result = ({ data, word ,audio  }) => {
  
  console.log(data)
  const playSound = () => {
    new Audio(audio).play()
  }
  return (
    <>
      <div className='grid grid-cols-2 grid-flow-col gap-1 ' id='colRes'>
        <div className=' p-6  justify-items-center justify-self-center'>
          <h1>Word: <strong>{word.toUpperCase()}</strong></h1>
          <div className='mt-5'>
            <button className='text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg' onClick={playSound}>{audio === '' && <h1>No Audio available</h1> || <h1> play</h1>}</button>
          </div>
        </div>
        <div className=' p-2 justify-self-center justify-items-center'>
          <ul>
            <h1 className='font-extrabold m-3'>Definitions</h1>
            {data.map((meaning) => {
              return (
                <>
                  <li className='text-start font-semibold p-1 list-disc list-inside' key={uuidv4()}>
                    { meaning.definitions[0].definition}
                  </li>
                </>
              )
            }
            )}
            </ul>
          </div>
    </div>
    </>
  )
}

export default Result