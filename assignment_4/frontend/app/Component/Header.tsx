"use client"
import React from 'react';
import LogoutButton from './Button/Logout';
import Link from 'next/link';
const Header = () => {
  const isLoggedIn = !!localStorage.getItem("accessToken");

  return (
    <header className="bg-purple-500 text-white py-2 rounded">
      <nav className="flex justify-between">
        <div>
          <Link href="/about" className="text-lg font-bold">About</Link>
        </div>
        <div className="flex items-center">
          {isLoggedIn ? (
            <LogoutButton />
          ) : (
            <>
              <Link href="/login" className="ml-4">Login</Link>
              <Link href="/signup" className="ml-4">Sign Up</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
