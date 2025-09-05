import { useState, useEffect } from 'react';

const InputSearch = ({onClick,onSearch,input,setInput}) => {

 useEffect(() => {
    const handler = setTimeout(() => {
            onSearch(input);
    },300)
    return () => clearTimeout(handler);
 },[input])

  return (
        <input 
            className = 'input_search' 
            type="text" 
            placeholder='Search user...'
            value={input}
            onChange={e => setInput(e.target.value)}
            onFocus={onClick} 
        />
  )
}

export default InputSearch