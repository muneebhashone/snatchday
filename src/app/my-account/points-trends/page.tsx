import MyAccountLayout from '@/components/my-account/MyAccountLayout';
import PointsTrendsTable from '@/components/my-account/PointsTrendsTable';
import React from 'react'

const page = () => {
  return (
    <MyAccountLayout>
      <PointsTrendsTable/>
    </MyAccountLayout>
  );
};

export default page