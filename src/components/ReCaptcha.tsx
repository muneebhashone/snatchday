// components/RecaptchaForm.tsx
"use client"
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const RecaptchaForm: React.FC = () => {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaToken) {
      alert("Please complete the reCAPTCHA");
      return;
    }

    // Send the token to your API for verification
    const res = await fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: captchaToken }),
    });

    const data = await res.json();
    if (data.success) {
      alert("reCAPTCHA verified successfully!");
    } else {
      alert("reCAPTCHA verification failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input
        type="text"
        placeholder="Enter your name"
        className="border p-2 rounded"
        required
      />
      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
        onChange={setCaptchaToken}
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default RecaptchaForm;
