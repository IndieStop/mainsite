import { login, signup, loginWithGithub } from "./actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
	return (
		<section className="flex flex-col justify-center items-end bg-[url('/bg.png')]  overflow-hidden sm:mx-auto w-full m-auto max-h-max h-screen bg-center bg-no-repeat bg-cover ">
			<form className="w-full px-[10vw]  md:w-[55vw] h-screen bg-background space-y-6 rounded-bl-3xl rounded-tl-3xl flex flex-col justify-center">
				<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
					Indie<span className="text-primary">Stop</span>
				</h1>
				<Label htmlFor="email">Email</Label>
				<Input
					type="email"
					id="email"
					name="email"
					placeholder="Email"
					required
				/>
				<Label htmlFor="email">Password</Label>
				<Input
					type="password"
					id="password"
					name="password"
					placeholder="Password"
					required
				/>
				<span className="flex flex-col justify-between  w-full gap-4 *:w-full">
					<Button type="submit" formAction={login} size="lg">
						Log in
					</Button>
					<Button
						type="submit"
						formAction={signup}
						variant="secondary"
						size="lg"
					>
						Sign up
					</Button>
				</span>{" "}
			</form>
		</section>
	);
}
