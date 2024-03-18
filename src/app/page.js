"use client";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import supabase from "@/lib/supabase/supabase";
import { useEffect, useState } from "react";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { FiShoppingCart } from "react-icons/fi";
import Nav from "@/components/ui/nav";

export default function Home() {
	const [games, setPosts] = useState([]);

	useEffect(() => {
		async function fetchData() {
			let { data, error } = await supabase.from("Game").select("*");
			setPosts(data);
			console.log(games, error);
		}
		fetchData();
	}, []);
	console.log(games.slice(0, 4));
	const rising = games.slice(0, 4);
	const discount = games.slice(5, 9);
	const recent = games.slice(9, 13);

	return (
		<div className=" flex flex-col justify-center items-start mx-auto min-h-screen max-w-[90erem] px-10 my-[10vh] gap-20 ">
			<Carousel
				plugins={[
					Autoplay({
						delay: 2500,
					}),
				]}
				opts={{
					align: "start",
				}}
				className="w-full max-w-7xl mx-auto animate-fade-up "
			>
				<CarouselContent>
					{Array.from({ length: 5 }).map((_, index) => (
						<CarouselItem
							key={index}
							className="h-56 sm:h-64 xl:h-80 2xl:h-96 animate-fade"
						>
							<div className="">
								<Card>
									<CardContent className="object-cover w-full h-full ">
										<img
											className=" w-full h-full m-auto"
											src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjBhC1Hv7peAo7VhyjPtcv_0iBEyzisJ2pyCLr1bSl-tjPSbNWaRBvp5DlmKDcoEF4NEqRiq-j_wqVB2fFxe6Ra95VNaAwX0o489yOEaigAd51YRlzVkF883MJQJFiz0wXwUHvQlpC-Jo4/s1600/dark15.jpg"
										></img>
									</CardContent>
								</Card>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>{" "}
			<Nav />
			<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">
				{" "}
				Rising Games
			</h1>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full">
				{rising.map((key, index) => (
					<Link
						href={`product/${key.uuid}`}
						className="space-y-2"
						key={`rising_${index}`}
					>
						<Card className="p-3">
							<CardContent className=" space-y-2">
								<img
									src={key.Thumbnail}
									className="object-cover w-full max-w-92 h-72 rounded-2xl transition duration-300 ease-in-out group-hover:scale-105"
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
			<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">
				Discounted Games
			</h1>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full">
				{discount.map((key, index) => (
					<Link
						href={`product/${key.uuid}`}
						className="space-y-2  group border-2 border-background hover:border-primary rounded-xl "
						key={`dis_${index}`}
					>
						<Card className="p-3">
							<CardContent className=" space-y-2">
								<img
									src={key.Thumbnail}
									className="object-cover w-full max-w-92 h-72 rounded-2xl transition duration-300 ease-in-out group-hover:scale-105"
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
			<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">
				Recommended By Us
			</h1>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full">
				{recent.map((key, index) => (
					<Link
						href={`product/${key.uuid}`}
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
