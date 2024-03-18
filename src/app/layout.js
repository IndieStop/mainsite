"use client";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { IoCartOutline } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import { Input } from "@/components/ui/input";
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

const inter = Open_Sans({ subsets: ["latin"] });

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<nav className="flex justify-between h-[10vh] w-full items-center p-4 bg-[#1a1a1a] rounded-2xl rounded-bl-2xl text-white sticky top-1 z-50 border-4 border-accent">
					<h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
						Indie<span className="text-primary">Stop</span>
					</h1>
					<NavigationMenu>
						<NavigationMenuList>
							<NavigationMenuItem>
								<NavigationMenuTrigger>
									Item One
								</NavigationMenuTrigger>
								<NavigationMenuContent>
									<NavigationMenuLink>
										Link
									</NavigationMenuLink>
								</NavigationMenuContent>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
					{/* <ul className="flex space-x-4">
						<li>
							<a href="/">Home</a>
						</li>
						<li>
							<a href="/account">Account</a>
						</li>
						<li>
							<a href="/login">Login</a>
						</li>
					</ul> */}
					<Input
						type="text"
						placeholder="Search"
						className="w-1/2 rounded-xl h-full bg-accent text-xl"
					/>
					<ul className="flex space-x-10">
						<IoCartOutline className="text-4xl " />
						<RxAvatar className="text-4xl" />
					</ul>
				</nav>

				{children}
			</body>
		</html>
	);
}
