import { Card, CardContent } from "@/components/ui/card";

export default async function Search(searchParams) {
	const { sort, q: searchValue } = searchParams;
	const { sortKey, reverse } =
		sorting.find((item) => item.slug === sort) || defaultSort;

	const products = await getProducts({
		sortKey,
		reverse,
		query: searchValue,
	});

	const resultsText = products.length > 1 ? "results" : "result";
	return (
		<>
			{searchValue ? (
				<p className="mb-4">
					{products.length === 0
						? "There are no products that match "
						: `Showing ${products.length} ${resultsText} for `}
					<span className="font-bold">&quot;{searchValue}&quot;</span>
				</p>
			) : null}
			{products.length > 0 ? (
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full">
					<h1>Search Results</h1>
					<p>
						Found {products.length} {resultsText} for "{searchValue}
						"
					</p>
					<ul>
						{products.map((product) => (
							<li key={product.id}>
								<ProductCard product={product} />
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
							</li>
						))}
					</ul>
				</div>
			) : null}
		</>
	);
}
