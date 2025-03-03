"use client"
// components/withAuth.js
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

export const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  allowedRoles: string[],
  restrictedPaths: string[] = [] // Add a parameter for restricted paths
) => {
  return (props: P) => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const sessionData = getCookie("connect.sid");
      console.log(sessionData, "sessionData");
      if (!sessionData) {
        // Allow access to public pages
        setLoading(false);
        return;
      } else {
        try {
          const parsedSession = JSON.parse(sessionData);
          if (parsedSession.expires && new Date(parsedSession.expires) < new Date()) {
            console.log("session expired");
            setLoading(false);
            return;
          } else if (!allowedRoles.includes(parsedSession.user.role)) {
            console.log("role not allowed");
            setLoading(false);
            return;
          } else {
            setSession(parsedSession);
          }
        } catch (error) {
          console.error("Error parsing session cookie:", error);
        }
      }
      setLoading(false);
    }, [router]);

    if (loading) {
      return <div>Loading...</div>;
    }

    // Check if the user is trying to access a restricted path
    // const currentPath = router.pathname;
    // if (restrictedPaths.includes(currentPath) && session && session.user.role === 'user') {
    //   router.push("/"); // Redirect users from restricted paths
    //   return null; // Prevent rendering the wrapped component
    // }

    return <WrappedComponent {...props} session={session} />;
  };
};