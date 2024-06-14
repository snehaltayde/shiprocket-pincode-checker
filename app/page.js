'use client';
import { useState } from 'react';
import { PincodeChecker } from '@/actions/pin.actions';
export default function Home() {
  const [pincode, setPincode] = useState('');
  const [message, setMessage] = useState();

  const handleCheckPincode = async () => {
    setMessage(' ');
    const response = await PincodeChecker(pincode);
    if (response.success) {
      setMessage(response.data);
    }
  };
  return (
    <>
      {/* <h1 className="text-center mb-2 mt-2 font-bold text-2xl">Home</h1> */}
      <div className="flex m-auto mt-10 items-center justify-center ">
        <input
          className="bg-gray-100px-20 py-2 border-solid border-gray-800 border-2 rounded-md "
          name="pincode"
          type="number"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          placeholder=" Enter Pincode"
        />
        <button
          onClick={handleCheckPincode}
          className=" ml-2 bg-gray-800 rounded-md text-white px-20 py-2"
        >
          Check
        </button>
      </div>
      <div className="flex justify-center mt-10">
        {' '}
        {message && message.status === 200
          ? `COD is available for ${pincode}`
          : message && message.status === 404
          ? `COD Not Available`
          : message && message.status_code === 422
          ? `Invalid Pin code`
          : ``}
      </div>

      {/* {JSON.stringify(
        (message && message.status) || (message && message.status_code)
      )} */}
    </>
  );
}
