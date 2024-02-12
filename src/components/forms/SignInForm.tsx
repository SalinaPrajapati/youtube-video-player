"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { useAppDispatch } from "@/store";
import { setAuth, setJid } from "@/store/slices/authSlice";
import { useToast } from "@/components/ui/use-toast"

const FormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
});
const SignInForm = () => {
  const router = useRouter();
  const { toast } = useToast()
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", values);
      console.log(values)
      if(response.data.success){
        const response = await axios.get("/api/users/me");
        dispatch(setJid(response.data.data));
        dispatch(setAuth(true));
      }
      toast({
        title: "Success",
        description: "Your are successfully logged In",
      })
      router.push("/");
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Error",
        description: "Oops! Something when wrong!",
        variant: "destructive"
      })
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
      <h2>{loading ? "processing.." : ""}</h2>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="mail@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <Button className="mt-6 text-white bg-red-600 hover:bg-red-500" type="submit">
            Sign in
          </Button>
        </div>
        <Link href="/signup"> Visit signup page</Link>
      </form>
    </Form>
  );
};
export default SignInForm;
