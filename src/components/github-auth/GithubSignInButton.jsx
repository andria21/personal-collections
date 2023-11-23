"use client";

import Image from "next/image";
import githubLogo from "@/../public/github.png";
import { signIn } from "next-auth/react";
import styles from "./github-button.module.scss"

export function GithubSignInButton() {
  const handleClick = () => {
    signIn("github");
  };

  return (
    <button
      onClick={handleClick}
      className={`${styles.githubButton}`}>
      <Image src={githubLogo} alt="Google Logo" width={20} height={20} />
      <span >Continue with Github</span>
    </button>
  );
}

// export function GithubSignInButton() {
//   const handleClick = () => {
//     signIn("github");
//   };

//   return (
//     <button
//       onClick={handleClick}
//       className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
//     >
//       <Image src={githubLogo} alt="Github Logo" width={20} height={20} />
//       <span className="ml-4">Continue with Github</span>
//     </button>
//   );
// }