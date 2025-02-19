import MyAccountLayout from '@/components/my-account/MyAccountLayout';
import PaymentHistoryTable from '@/components/my-account/PaymentHistoryTable';
import React from 'react'

const page = () => {
  return (
    <MyAccountLayout>
      <PaymentHistoryTable/>
    </MyAccountLayout>
  );
};

export default page