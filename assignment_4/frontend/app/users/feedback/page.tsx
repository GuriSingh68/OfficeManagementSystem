"use client"
import Header from "@/app/Component/Header";
import { isAuthenticated } from "@/app/api/auth/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import FeedbackPage from "./feedback";

export default function Page({children}:{
    children:React.ReactNode
}){
  
  return <>
  <Header />
  <FeedbackPage />
  </>;
}