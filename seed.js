const Stripe = require("stripe");

// import { createClient } from "@supabase/supabase-js";
const stripe = Stripe(
	"sk_test_51OloAWSJobqAwRFPZzZMg1c0Sx4ACgO4AaJNvCmGlc50bxa9ABNXam8QLTUJzyeExJqHguWRqzJwlfDvg8guyFca006MRvJrUO"
);

async function createPaymentLink() {
	const product = await stripe.products.create({
		name: "Gold Plan",
		description: "Gold plan",
		images: [
			"https://images.unsplash.com/photo-1710362921917-2e33bb342a23?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		],
		unit_label: "100",
	});
	console.log(product);
}
createPaymentLink();

//async function getPaymentLinks() {
//  const paymentLinks = await stripe.paymentLinks.list({
//    limit: 3,
//  });
//  console.log(paymentLinks);
//}
//
//getPaymentLinks();
// Create a single supabase client for interacting with your database
// const supabase = createClient(
//	process.env.NEXT_PUBLIC_SUPABASE_URL,
//	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
//);

//const { data, error } = await supabase
//	.from("Game")
//	.insert([
//		{
//			Name: "someValue",
//			Description: "otherValue",
//			Images: ["someValue", "otherValue"],
//			Genre: ["someValue", "otherValue"],
//			Thumbnail: "someValue",
//			Age_Rating: FALSE,
//			Price: 42,
//			Reviews: ["someValue", "otherValue"],
//		},
//	])
//	.select();
//
