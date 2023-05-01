import Link from 'next/link';
import NavBar from '../../components/NavBar';
import Header from './components/Header';
import Form from './components/Form';

export default function Reserve() {
  return (
    <div className="bg-gray-100 min-h-screen w-screen">
      <div className="max-w-screen-2xl m-auto bg-white text-black">
        <NavBar />
        <div className="border-t h-screen">
          <div className="w-3/5 py-9 m-auto">
            <Header />
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
}
