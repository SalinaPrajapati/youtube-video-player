"use client";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../store";
import { setAuth, setJid } from "../store/slices/authSlice";

const NavigationMenuDemo = () => {
  const router = useRouter();
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuth) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [isAuth]);
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/");
      dispatch(setJid(""));
      dispatch(setAuth(false));
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-between py-2 px-4 md:px-7 fixed top-0 w-full bg-black z-40">
      <div className="">
        <h2 className="text-2xl md:text-4xl font-black md:font-extrabold text-white hover:text-red-200">
          Youtube
        </h2>
      </div>
      <div className="flex items-center gap-5 pr-2">
        <div className="flex">
          <span>
            {!isAuthenticated && (
              <>
                <Button variant="outline" asChild>
                  <Link href="/login">Login</Link>
                </Button>
              </>
            )}
          </span>
          <span>
            {!isAuthenticated && (
              <>
                <Button
                  className="text-white bg-red-600 hover:bg-red-500 ml-1"
                  asChild
                >
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </span>
          <span className="mr-2">
            {isAuthenticated && (
              <>
                <Button variant="outline" asChild onClick={logout}>
                  <Link href="/login">Logout</Link>
                </Button>
              </>
            )}
          </span>
          <span>
            {isAuthenticated && (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NavigationMenuDemo;
