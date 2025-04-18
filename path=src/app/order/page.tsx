const onSubmit = async (data: any) => {
  // Check for maximum limits and wallet balance
  const maxSnapPoints = points?.data?.maxSnapPoints || 0;
  const maxDiscountPoints = points?.data?.maxDiscountPoints || 0;
  const userWalletBalance = myprofile?.data?.wallet || 0;

  const snapPoints = Number(data.snapPoints) || 0;
  const discountPoints = Number(data.discountPoints) || 0;

  if (snapPoints > maxSnapPoints) {
    toast.error(`Exceeds maximum snap points limit of ${maxSnapPoints}`, {
      position: "top-right",
      style: { backgroundColor: "red", color: "white" },
    });
    return;
  }

  if (discountPoints > maxDiscountPoints) {
    toast.error(
      `Exceeds maximum discount points limit of ${maxDiscountPoints}`,
      {
        position: "top-right",
        style: { backgroundColor: "red", color: "white" },
      }
    );
    return;
  }

  if (
    snapPoints > userWalletBalance?.snapPoints ||
    discountPoints > userWalletBalance?.discountPoints
  ) {
    toast.error("You have insufficient balance", {
      position: "top-right",
      style: { backgroundColor: "red", color: "white" },
    });
    return;
  }

  const payload = {
    cartId: cart?.data?._id,
    snapPoints: snapPoints,
    discountPoints: discountPoints,
    voucherCode: watchVoucher("voucherCode") || "",
  };

  checkout(payload, {
    onSuccess: () => {
      setCartData(cart?.data);
      // Update to use nextStep function instead of direct navigation
      const newStep = Math.min(currentStep + 1, 3);
      setCurrentStep(newStep);
      router.push(`/order?step=${newStep}`);
      setIsCheckout(true);
      
      toast.success("Proceeding to next step", {
        position: "top-right",
        style: { backgroundColor: "green", color: "white" },
      });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to checkout", {
        position: "top-right",
        style: { backgroundColor: "red", color: "white" },
      });
    },
  });
}; 