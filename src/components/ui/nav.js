import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Nav() {
	const router = useRouter();
	const searchParams = useSearchParams();

	function onSubmit(e) {
		e.preventDefault();

		const val = e.target;
		const search = val.search;
		const newParams = new URLSearchParams(searchParams.toString());

		if (search.value) {
			newParams.set("q", search.value);
		} else {
			newParams.delete("q");
		}

		router.push("/search", newParams.toString());

		return (
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
								<NavigationMenuLink>Link</NavigationMenuLink>
							</NavigationMenuContent>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
				<Input
					key={searchParams?.get("q")}
					type="text"
					defaultValue={searchParams?.get("q") || ""}
					placeholder="Search"
					className="w-1/2 rounded-xl h-full bg-accent text-xl"
				/>
				<ul className="flex space-x-10">
					<IoCartOutline className="text-4xl " />
					<RxAvatar className="text-4xl" />
				</ul>
			</form>
		);
	}
}
