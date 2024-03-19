"use client";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { IoCartOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { RxAvatar } from "react-icons/rx";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	NavigationMenuViewport,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
const inter = Open_Sans({ subsets: ["latin"] });
export default function RootLayout({ children }) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const count = JSON.parse(localStorage.getItem("cart"))?.length || 0;
	const createUrl = (pathname, params) => {
		const paramsString = params.toString();
		const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;
		console.log(queryString);
		return `${pathname}${queryString}`;
	};

	function onSubmit(e) {
		e.preventDefault();

		const val = e.target;
		const search = val.search ? val.search.value : ""; // Check if search exists before accessing its value
		const newParams = new URLSearchParams(searchParams.toString());

		if (search) {
			// Use 'search' instead of 'search.value'
			newParams.set("q", search); // Use 'search' instead of 'val.search.value'
		} else {
			newParams.delete("q");
		}
		router.push(createUrl("/search", newParams));
	}
	return (
		<html lang="en">
			<body className={inter.className}>
				<form
					onSubmit={onSubmit}
					className="flex justify-between h-[10vh] w-full items-center p-4 bg-[#1a1a1a] rounded-2xl rounded-bl-2xl text-white sticky top-1 z-50 border-4 border-accent"
				>
					<a
						href="/"
						className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl"
					>
						Indie<span className="text-primary">Stop</span>
					</a>

					<Input
						key={searchParams?.get("q")}
						type="text"
						name="search"
						defaultValue={searchParams?.get("q")}
						placeholder="Search"
						className="w-1/2 rounded-xl h-full bg-accent text-xl"
					/>
					<ul className="flex space-x-10">
						<a href="/checkout">
							{" "}
							<span className=" relative ">
								{" "}
								<IoCartOutline className="text-4xl " />
								<p className=" px-1 rounded-full absolute -right-3 -top-4 text-sm font-black bg-red-500">
									{count}
								</p>
							</span>{" "}
						</a>
						<RxAvatar className="text-4xl" />
					</ul>
				</form>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
