// components/Address.js
import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';

const Address = ({ onSelectAddress }) => {
  const [openPostcode, setOpenPostcode] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState({
    address: '',
    zonecode: '',
  });

  const handleSelectAddress = (data) => {
    setSelectedAddress({
      address: data.address,
      zonecode: data.zonecode,
    });
    setOpenPostcode(false);
  };

  return (
    <>
      <button onClick={() => setOpenPostcode(true)}></button>
      {openPostcode && (
        <DaumPostcode
          onComplete={handleSelectAddress}
          autoClose={false}
          defaultQuery="우석대학교 정공관"
        />
      )}
      <input type="hidden" name="address" value={selectedAddress.address} />
    </>
  );
};

export default Address;
