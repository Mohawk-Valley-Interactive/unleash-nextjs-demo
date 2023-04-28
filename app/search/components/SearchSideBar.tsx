export default function SearchSideBar() {
  return (
    <div className="w-1/5">
      <div className="border-b pb-4">
        <h1 className="mb-2">Regions</h1>
        <p className="font-light text-reg">Toronto</p>
        <p className="font-light text-reg">Ottawa</p>
        <p className="font-light text-reg">Montreal</p>
        <p className="font-light text-reg">Hamilton</p>
        <p className="font-light text-reg">Kingston</p>
        <p className="font-light text-reg">Niagra</p>
      </div>
      <div className="border-b pb-4 mt-3">
        <h1 className="mb-2">Cuisines</h1>
        <p className="font-light text-reg">Mexican</p>
        <p className="font-light text-reg">Italian</p>
        <p className="font-light text-reg">Chinese</p>
      </div>
      <div className="mt-3 pb-4">
        <div className="mb2">Price</div>
        <div className="flex">
          <button className="border-t border-b border-l w-full text-reg font-light rounded-l p-2">
            $
          </button>
          <button className="border w-full text-reg font-light p-2">$$</button>
          <button className="border-t border-b border-r w-full text-reg font-light rounded-r p-2">
            $$$
          </button>
        </div>
      </div>
    </div>
  );
}
