"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useTransition } from "react";
import { FormField, Form, FormItem, FormControl } from "./ui/form";
import { z } from "zod";
import type { UserForm } from "@padelverse/server/src/types/user";

const authSchema = z.object({
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  password: z.string(),
});

type UserWithPassword = UserForm & { password: string };
export const SignUpForm = () => {
  const form = useForm<UserWithPassword>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(authSchema),
  });
  const onSubmit: SubmitHandler<UserWithPassword> = (data) => {
    console.log("glogin");
  };

  return (
    <Form form={form} onSubmit={onSubmit}>
      <FormField
        control={form.control}
        render={({ field }) => <Input placeholder="Email" {...field} />}
        name="email"
      />
      <FormField
        render={({ field }) => (
          <Input placeholder="Password" type="password" {...field} />
        )}
        control={form.control}
        name="password"
      />

      <Button className="w-full" type="submit">
        Sign up
      </Button>
    </Form>
  );
};
