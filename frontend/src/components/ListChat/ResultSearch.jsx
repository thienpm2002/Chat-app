
const API_URL = import.meta.env.VITE_API_URL;
const ResultSearch = ({results = [], onSelect}) => {
    if(results.length === 0){
        return (
            <div className='list_search_result'> Result is empty</div>
        )
    }

  return (
    <ul className='list_search_result'>
        {
            results.map(item => 
                <li key={item._id} className='search_result_item' onClick={() => onSelect(item)}>
                    <img
                        className='result_avatar'
                        src={item.avatar.startsWith('/upload') ? `${API_URL}${item.avatar}` : item.avatar}
                        alt=""
                    />
                    <p className='result_name'>{item.user_name}</p>
                </li>
            )
        }
    </ul>
  )
}

export default ResultSearch