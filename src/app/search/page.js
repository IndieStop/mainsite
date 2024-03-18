"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import supabase from "@/lib/supabase/supabase";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { FiShoppingCart } from "react-icons/fi";

export default function Search({ searchParams }) {
	const [games, setPosts] = useState([]);

	useEffect(() => {
		async function fetchData() {
			try {
				if (searchParams.q === undefined) {
					const { data } = await supabase.from("Game").select("*");
					setPosts(data || []);
				} else {
					const { data } = await supabase
						.from("Game")
						.select()
						.ilike("Name", searchParams.q);
					setPosts(data || []);
				}
			} catch (error) {
				console.error("Error fetching data:", error.message);
			}
		}
		fetchData();
	}, [searchParams.q]);

	return (
		<>

			<div className="grid grid-flow-row gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-10 px-4">
				{games.map((game) => (
					<Card
						key={game.uuid}
						className="aspect-square transition-opacity lg:w-[50vw] xl:w-full group flex h-full w-full items-center justify-center overflow-hidden border border-background  hover:border-primary rounded-xl"
					>
						<Link
							className="relative inline-block h-full w-full"
							href={`/product/${game.uuid}`}
						>
							<CardContent>
								{" "}
								<img
									src={game.Thumbnail}
									alt={game.Name}
									className=" rounded-xl transition duration-300 ease-in-out group-hover:scale-105"
								/>
								<span className="flex flex-row justify-between items-center p-3">
									<span className=" space-y-2">
										<h3 className="font-extrabold text-md">
											{game.Name}
										</h3>
										<p className=" max-w-[40ch] overflow-hidden whitespace-nowrap text-ellipsis">
											{game.Description}
										</p>
										<p className="text-brand-primary font-bold">
											$1000
										</p>
									</span>
									<FiShoppingCart className=" font-bold text-2xl" />
								</span>
							</CardContent>
						</Link>
					</Card>
				))}
			</div>
		</>
	);
}
