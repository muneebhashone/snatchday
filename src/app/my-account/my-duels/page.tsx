import DuelsTable from '@/components/my-account/DuelsTable';
import MyAccountLayout from '@/components/my-account/MyAccountLayout';
import React from 'react'

const page = () => {
  return (
    <MyAccountLayout>
      <DuelsTable/>
    </MyAccountLayout>
  );
};

export default page