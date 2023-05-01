import Link from 'next/link';
import NavBar from '../components/NavBar';
import Header from './components/Header';
import SearchSideBar from './components/SearchSideBar';
import RestaurantCard from './components/RestaurantCard';

export default function Search() {
  return (
    <div className="bg-gray-100 min-h-screen w-screen">
      <div className="max-w-screen-2xl m-auto bg-white text-black">
        <NavBar />
        <Header />
        <div className="flex py-4 m-auto w-2/3 justify-between items-start">
          <SearchSideBar />
          <div className="w-5/6">
            <RestaurantCard />
          </div>
        </div>
      </div>
    </div>
  );
}
