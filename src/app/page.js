"use client";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
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
	const rising = [
		"https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
		"https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
		"https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
		"https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
	];
	const discount = [
		"https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
		"https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
		"https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
		"https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
	];
	const recent = [
		"https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
		"https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
		"https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
		"https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
	];
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
				className="w-full max-w-7xl mx-auto "
			>
				<CarouselContent>
					{Array.from({ length: 5 }).map((_, index) => (
						<CarouselItem
							key={index}
							className="h-56 sm:h-64 xl:h-80 2xl:h-96"
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
					<div className="space-y-2" key={`rising_${index}`}>
						<Card className="p-3">
							<CardContent className=" space-y-2">
								<img
									src={key}
									className="object-cover w-full max-w-92 h-72 rounded-2xl animate-fade-right animate-once"
								/>
								<span className="flex flex-row justify-between items-center">
									<span className=" space-y-2">
										<h3 className="font-extrabold text-md">
											Indie Game
										</h3>
										<p className="text-brand-primary font-bold">
											$1000
										</p>
									</span>
									<FiShoppingCart className=" font-bold text-2xl" />
								</span>
							</CardContent>
						</Card>
					</div>
				))}
			</div>
			<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">
				Discounted Games
			</h1>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full">
				{discount.map((key, index) => (
					<div className="space-y-2" key={`dis_${index}`}>
						<Card className="p-3">
							<CardContent className=" space-y-2">
								<img
									src={key}
									className="object-cover w-full max-w-92 h-72 rounded-2xl animate-fade-right animate-once"
								/>
								<span className="flex flex-row justify-between items-center">
									<span className=" space-y-2">
										<h3 className="font-extrabold text-md">
											Indie Game
										</h3>
										<p className="text-brand-primary font-bold">
											$1000
										</p>
									</span>
									<FiShoppingCart className=" font-bold text-2xl" />
								</span>
							</CardContent>
						</Card>
					</div>
				))}
			</div>
			<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">
				Recently Updated Games
			</h1>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full">
				{recent.map((key, index) => (
					<div className="space-y-2" key={`rec_${index}`}>
						<Card className="p-3">
							<CardContent className=" space-y-2">
								<img
									src={key}
									className="object-cover w-full max-w-92 h-72 rounded-2xl animate-fade-right animate-once"
								/>
								<span className="flex flex-row justify-between items-center">
									<span className=" space-y-2">
										<h3 className="font-extrabold text-md">
											Indie Game
										</h3>
										<p className="text-brand-primary font-bold">
											$1000
										</p>
									</span>
									<FiShoppingCart className=" font-bold text-2xl" />
								</span>
							</CardContent>
						</Card>
					</div>
				))}
			</div>
		</div>
	);
}
