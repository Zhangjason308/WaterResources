import Image from 'next/image';
import searchIcon from '@/assets/search-image.png';

function SearchSection() {
  return (
    <div className='p-2 md:p-6 border-[2px] rounded-xl'>
      <p className='text-[20px] font-bold'>Find a pee pee spot</p>
      <div className='bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4'>
        <Image src={searchIcon} width={24} height={24} alt='Search Icon' />
        <input type='text' placeholder='Current Location'
        className='bg-transparent w-full outline-none'/>
      </div>
      <button className=' p-3 bg-black w-full mt-5 text-white rounded-lg'>Search</button>
    </div>
  );
}

export default SearchSection;