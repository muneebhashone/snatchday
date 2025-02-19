import MyAccountLayout from '@/components/my-account/MyAccountLayout';
import TournamentsTable from '@/components/my-account/TournamentsTable';
import React from 'react'

const page = () => {
  return (
    <MyAccountLayout>
      <TournamentsTable/>
    </MyAccountLayout>
  );
};

export default page