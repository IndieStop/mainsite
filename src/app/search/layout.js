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
									href="/search/test"
									className={clsx(
										"w-full text-sm hover:text-neutral-400",
										{
											"underline underline-offset-4":
												pathname === "/search/test",
										}
									)}
								>
									Test
								</a>
							</li>
							<li className="mt-2 flex text-white">
								<a
									href="/search/Nahi"
									className={clsx(
										"w-full text-sm hover:text-neutral-400",
										{
											"underline underline-offset-4":
												pathname === "/search/Nahi",
										}
									)}
								>
									Nahi
								</a>
							</li>
						</ul>
						<ul className="md:hidden">
							<div className="relative">
								<div className="flex w-full items-center justify-between rounded border border-black/30 px-4 py-2 text-sm dark:border-white/30">
									<div>All</div>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="currentColor"
										aria-hidden="true"
										className="h-4"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M19.5 8.25l-7.5 7.5-7.5-7.5"
										></path>
									</svg>
								</div>
							</div>
						</ul>
					</nav>
				</div>
				{children}
			</div>
		</Suspense>
	);
}
