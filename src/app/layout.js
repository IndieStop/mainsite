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
import Nav from "@/components/ui/nav";
import { useRouter, useSearchParams } from "next/navigation";
const inter = Open_Sans({ subsets: ["latin"] });

export default function RootLayout({ children }) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const createUrl = (pathname, params) => {
		const paramsString = params.toString();
		const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

		return `${pathname}${queryString}`;
	};

	function onSubmit(e) {
		e.preventDefault();

		const val = e.target;
		const search = val.search ? val.search.value : ""; // Check if search exists before accessing its value
		const newParams = new URLSearchParams(searchParams.toString());

		if (search.value) {
			newParams.set("q", search.value);
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
					<Input
						key={searchParams?.get("q")}
						type="text"
						defaultValue={searchParams?.get("q")}
						placeholder="Search"
						className="w-1/2 rounded-xl h-full bg-accent text-xl"
					/>
					<ul className="flex space-x-10">
						<span className=" relative ">
							{" "}
							<IoCartOutline className="text-4xl " />
							<p className=" px-1 rounded-full absolute -right-3 -top-4 text-sm font-black bg-red-500">
								10
							</p>
						</span>{" "}
						<RxAvatar className="text-4xl" />
					</ul>
				</form>
				{children}
			</body>
		</html>
	);
}
