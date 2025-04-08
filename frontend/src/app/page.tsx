<<<<<<< HEAD
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import Login from "./(auth)/login/page";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/dashboard");
      } else {
        setIsLoggedIn(false);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) return <div>Loading...</div>;
  if (!isLoggedIn) return <Login />;

  return null;
=======
// import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return <div className={styles.page}></div>;
>>>>>>> d65d6f9ac39b85045ebb346cf0a5c9fc3e0efb28
}
