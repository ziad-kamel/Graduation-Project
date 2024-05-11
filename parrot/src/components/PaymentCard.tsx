"use client";

import usePostPayment from "@/app/hooks/usePostPayment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
interface customeProps{
    category: string,
    ammount: number,
    first_name :string,
    last_name :string,
    email :string,
}

interface bodyType{
    amount: number,
    currency: string,
    payment_methods: (string | number)[],
    items: [{
        name: string,
        amount: number,
        description: string,
        quantity: number
    }],
    billing_data: {
        first_name: string,
        last_name: string,
        street: string
        phone_number: string,
        country: string,
        email: string,
        state: string
    },
    customer: {
        first_name:string,
        last_name:string,
        email:string
    }
}
export default function PaymentCard({category, ammount, first_name, last_name, email}: customeProps) {

    const {payment} = usePostPayment();
    const [iframeSrc, setIframeSrc] = useState("");

    const handelClick = async (body: Object) => {
        
        const {iframeKey} = await payment(body);
        setIframeSrc(`https://accept.paymob.com/api/acceptance/iframes/838038?payment_token=${iframeKey}`)
    }

    // Define validation schema
    const formSchema = z.object({
        address: z.string({
        required_error: "Address is required",
        }),
        country: z.string({
            required_error: "Country is required",
        }),
        state: z.string({
            required_error: "State is required",
        }),
        phone_number: z.string({
            required_error: "Phone is required"
        })
    });

  // Form hooks
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

   // Form submit handler
   const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const mybody: bodyType = {
        amount: ammount * 100,
        currency: "EGP",
        payment_methods:[12, 'card', "hi"],
        items: [{
            name: category,
            amount: ammount * 100,
            description: "subscription",
            quantity:1
        }],
        billing_data:{
            first_name: first_name,
            last_name: last_name,
            street: data.address,
            phone_number: data.phone_number,
            country: data.country,
            email: email,
            state: data.state
        },
        customer:{
            first_name: first_name,
            last_name: last_name,
            email: email
        }
    }

    handelClick(mybody)
  };
  return (
    <>
    {!iframeSrc && (
        <div className="w-1/4 h-3/4 rounded-xl bg-[#33445c] transition-all hover:bg-secondary flex flex-col justify-center items-center gap-28 p-8">
            <h1 className="text-xl font-semibold">{category}</h1>
            <h1 className="text-6xl font-bold">{ammount}$</h1>
            <Dialog>
            <DialogTrigger className="rounded-lg bg-[#667385] hover:bg-primary w-4/5 h-11 text-xl font-semibold">Select {category}</DialogTrigger>
            <DialogContent>
                <DialogHeader className="m-1">
                <DialogTitle>Billing information</DialogTitle>
                    <Form {...form}>
                    <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-8">
                        <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                            Enter your address
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="Address 1" {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                        <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                            Enter your country
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="Country" {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                        <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                            Enter your state
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="State" {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                        <FormField
                        control={form.control}
                        name="phone_number"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                            Enter your phone number
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="phone" {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                        <Button type="submit" >Pay</Button>
                    </form>
                </Form>

                </DialogHeader>
            </DialogContent>
            </Dialog>

        </div>
    )}

    {iframeSrc && (
            <iframe src={iframeSrc} className="fixed" width={window.innerWidth} height={window.innerHeight}></iframe>
        )}
    </>
  )
}
