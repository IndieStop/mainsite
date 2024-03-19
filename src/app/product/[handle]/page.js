"use client";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabase/supabase";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { loadStripe } from "@stripe/stripe-js";

export default function Product({ params }) {
	const [game, setGame] = useState(null);

	const [cart, setCart] = useState(() => {
		if (typeof window !== "undefined") {
			return JSON.parse(localStorage.getItem("cart")) || [];
		}
	});

	const [quantity, setQuantity] = useState(1);
	const { toast } = useToast();

	useEffect(() => {
		async function fetchData() {
			try {
				const { data } = await supabase.from("Game").select();
				const foundGame = data.find(
					(item) => item.uuid === params.handle
				);
				setGame(foundGame);
			} catch (error) {
				console.error("Error fetching data:", error.message);
			}
		}

		if (params.handle) {
			fetchData();
		}
	}, [params.handle]);

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cart));
	}, [cart]);
	async function submit(e) {
		e.preventDefault();
		const val = e.target;
		const rev = val.review.value;
		console.log(rev);
		toast({ title: "Your Review is Added!", description: `${rev}` });
		const { data, error } = await supabase
			.from("Game")
			.update({ Reviews: [...game.Reviews, rev] })
			.eq("uuid", game.uuid)
			.select();
		window.location.reload();
		console.log(error);
	}

	async function handleCheckout() {
		toast({
			title: "Item Added to Cart",
			description: `${quantity} Quantity of ${game.Name} Has Been Added to Cart`,
		});

		game["Quantity"] = quantity;
		setCart((cart) => [...cart, game]);

		const stripe = await loadStripe(
			"pk_test_51OloAWSJobqAwRFPTudtdvYgbXZzbA28vhUsKJcW5dtA4eWywxgnVOWlI0MBhF8i76PibRBS1Pcrexp6TVomIQil00wk3OcfNs"
		);
		console.log(game);
		const lineItems = {
			price_data: {
				currency: "inr",
				product_data: {
					name: game.Name,
					images: [game.Thumbnail],
				},
				unit_amount: game.Price * 100,
			},
			quantity: quantity,
		};

		// const session = await stripe.checkout.sessions.create({
		// 	line_items: lineItems,
		// 	mode: "payment",
		// 	success_url: `${req.headers.origin}/?success=true`,
		// 	cancel_url: `${req.headers.origin}/?canceled=true`,
		// });

		// const result = await stripe.redirectToCheckout({
		// 	sessionId: session.id,
		// });
		// if (result.error) {
		// 	console.error(result.error.message);
		// } else {
		// 	console.log("Success");
		// }
	}

	return (
		<div className="container mx-auto mt-10">
			{game && (
				<div
					key={game.uuid}
					className="bg-[#1a1a1a] rounded-xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-4 min-h-full p-4"
				>
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
							{game.Images.map((img, index) => (
								<CarouselItem key={index} className="h-full">
									<div className="">
										<Card>
											<CardContent className="object-cover w-full h-full ">
												<img
													className=" w-full h-full m-auto"
													src={img}
													alt={game.Name}
												></img>
											</CardContent>
										</Card>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious className="left-2" />
						<CarouselNext className="right-2" />
					</Carousel>
					<div className="p-4 flex flex-col gap-8">
						<div className=" flex flex-col border-b pb-6 border-neutral-700 space-y-4">
							<h1 className="mb-2 text-5xl font-medium">
								{game.Name}
							</h1>
							<div className="mr-auto w-auto rounded-full bg-primary p-2 text-sm text-white">
								<p>₹{game.Price} INR </p>
							</div>
						</div>

						<p className="text-sm ">{game.Description}</p>
						<span className="flex items-center gap-3 bg-background w-fit rounded-2xl">
							<button
								className="bg-background p-2 rounded-l-2xl hover:opacity-50"
								onClick={() => setQuantity(quantity + 1)}
							>
								+
							</button>
							<p className="bg-background p-2"> {quantity} </p>
							<button
								className="bg-background p-2 rounded-r-2xl hover:opacity-50"
								onClick={() => setQuantity(quantity - 1)}
							>
								-
							</button>
						</span>
						<span className=" relative w-full">
							<Button
								className="w-full bg-primary p-3 racking-wide font-bold  hover:opacity-9 rounded-2xl text-white"
								onClick={handleCheckout}
							>
								Add to Cart
							</Button>{" "}
						</span>
					</div>
				</div>
			)}
			{game && (
				<div className="bg-[#1a1a1a] rounded-xl mt-10 space-y-7 shadow-md grid grid-cols-1 md:grid-cols-2 gap-4 min-h-full p-4">
					<div className="p-4">
						<h2 className="text-2xl font-medium mb-4">Reviews</h2>
						<form className="mb-4 space-y-7" onSubmit={submit}>
							<Input
								className="w-full p-2 border border-neutral-300 rounded-md"
								placeholder="Write your review..."
								name="review"
							></Input>
							<button
								className="bg-primary text-white px-4 py-2 rounded-md mt-2"
								type="submit"
							>
								Submit
							</button>
						</form>
						<div>
							<h3 className="text-xl font-bold mb-2">
								Previous Reviews
							</h3>
							{console.log(game.Reviews)}
							{/* Display previous reviews here */}
							{game && game.Reviews.length > 0 ? (
								game.Reviews.map((review, index) => (
									<div
										key={index}
										className="flex flex-col gap-5 "
									>
										<p className="font-medium italic">
											{review}
										</p>
									</div>
								))
							) : (
								<p>No reviews yet</p>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
