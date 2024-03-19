"use client";
import { Suspense } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Search({ children }) {
	const pathname = usePathname();
	console.log(pathname);
	return (
		<Suspense>
			<div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-white md:flex-row">
				<div className="order-first w-full flex-none md:max-w-[125px] mt-10">
					<nav>
						<h3 className="hidden text-sm md:text-md text-neutral-400  md:block">
							Collections
						</h3>
						<ul className="hidden md:block">
							<li className="mt-2 flex text-white">
								<a
									href="/search"
									className={clsx(
										"w-full text-sm hover:text-neutral-400",
										{
											"underline underline-offset-4":
												pathname === "/search",
										}
									)}
								>
									All
								</a>
							</li>
							<li className="mt-2 flex text-white">
								<a
									href="/search/action"
									className={clsx(
										"w-full text-sm hover:text-neutral-400",
										{
											"underline underline-offset-4":
												pathname === "/search/action",
										}
									)}
								>
									Action
								</a>
							</li>

							<li className="mt-2 flex text-white">
								<a
									href="/search/rpg"
									className={clsx(
										"w-full text-sm hover:text-neutral-400",
										{
											"underline underline-offset-4":
												pathname === "/search/rpg",
										}
									)}
								>
									RPG
								</a>
							</li>
							<li className="mt-2 flex text-white">
								<a
									href="/search/strategy"
									className={clsx(
										"w-full text-sm hover:text-neutral-400",
										{
											"underline underline-offset-4":
												pathname === "/search/strategy",
										}
									)}
								>
									Strategy
								</a>
							</li>
							<li className="mt-2 flex text-white">
								<a
									href="/search/simulation"
									className={clsx(
										"w-full text-sm hover:text-neutral-400",
										{
											"underline underline-offset-4":
												pathname ===
												"/search/simulation",
										}
									)}
								>
									Simulation
								</a>
							</li>
						</ul>
					</nav>
				</div>
				{children}
			</div>
		</Suspense>
	);
}
