"use client";

import React from 'react';
import CollectPointsModal from '@/components/my-account/CollectPointsModal';
import { useEffect } from 'react';

const PointsPage = () => {
  useEffect(() => {
    // Automatically trigger the modal when the page loads
    const modalTrigger = document.querySelector('[data-modal-trigger]') as HTMLButtonElement;
    if (modalTrigger) {
      modalTrigger.click();
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <CollectPointsModal />
    </div>
  );
};

export default PointsPage; 