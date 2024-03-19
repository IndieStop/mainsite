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
				{games.map((key, index) => (
					<Link
						href={`/product/${key.uuid}`}
						className="space-y-2 group border-2 border-background hover:border-primary rounded-xl "
						key={`rec_${index}`}
					>
						<Card className="p-3">
							<CardContent className=" space-y-2">
								<img
									src={key.Thumbnail}
									className=" object-cover w-full max-w-92 h-72 rounded-2xl transition duration-300 ease-in-out group-hover:scale-105"
								/>
								<span className="flex flex-row justify-between items-center">
									<span className=" space-y-2">
										<h3 className="font-extrabold text-md md:text-xl">
											{key.Name}
										</h3>
										<p className="text-brand-primary font-bold">
											₹ {key.Price}
										</p>
									</span>
								</span>
							</CardContent>
						</Card>
					</Link>
				))}
			</div>
		</div>
	);
}
