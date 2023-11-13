"use client"

import MainMenu from "@/components/main-menu/MainMenu";
import { getDictionary } from "../../../getDictionary";
import { useEffect, useState } from "react";

export default function Home({ params }) {
  const [text, setText] = useState({});

  useEffect(() => {
    const func = async () => {
      const lang = await getDictionary(params.lang);
      setText(lang.page.dashboard)
      
    };
    func();
  }, [params]);
  
  return <MainMenu collectionName={text.collection} colDescription={text.description} colTopic={text.topic} params={params} text={text} />;
}
