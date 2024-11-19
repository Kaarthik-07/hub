import Form from 'next/form';
import Image from 'next/image';
import SearchFormReset from './SearchFormReset';
const SearchForm = ({query}:{query?:string}) =>{
  return(
    <Form action="/" className='search-form' scroll={false}>
      <input
        name='query'
        type='text'
        className='search-input'
        placeholder='Search OpenSource'
      />
      <div className='flex gap-2'>
        {query && <SearchFormReset />}
        <div className='search-img'>
        <Image
        src="/search.png"
        className="object-contain"
        width={25}  // Adjust the size to fit within the button
        height={25}
        alt="search"
        />
        </div>
      </div>
    </Form>
  )
}

export default SearchForm;
