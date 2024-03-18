"use client";
import supabase from "@/lib/supabase/supabase";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { FiShoppingCart } from "react-icons/fi";

export default function Genre({ params }) {
	const [games, setPosts] = useState([]);
	console.log(params);
	useEffect(() => {
		async function fetchData() {
			let { data, error } = await supabase
				.from("Game")
				.select("*")
				.ilike("Genre", params.genre);
			console.log(data, error);
			setPosts(data);
		}
		fetchData();
	}, []);
	return (
		<div>
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
		</div>
	);
}
