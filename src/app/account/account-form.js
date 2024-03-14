"use client";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Avatar from "./avatar";
import { useToast } from "@/components/ui/use-toast";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
export default function AccountForm({ user }) {
	const { toast } = useToast();

	const supabase = createClient();
	const [loading, setLoading] = useState(true);
	const [fullname, setFullname] = useState(null);
	const [username, setUsername] = useState(null);
	const [website, setWebsite] = useState(null);
	const [avatar_url, setAvatarUrl] = useState(null);

	const getProfile = useCallback(async () => {
		try {
			setLoading(true);

			const { data, error, status } = await supabase
				.from("profiles")
				.select(`full_name, username, website, avatar_url`)
				.eq("id", user?.id)
				.single();

			if (error && status !== 406) {
				throw error;
			}

			if (data) {
				setFullname(data.full_name);
				setUsername(data.username);
				setWebsite(data.website);
				setAvatarUrl(data.avatar_url);
			}
		} catch (error) {
			alert("Error loading user data!");
		} finally {
			setLoading(false);
		}
	}, [user, supabase]);

	useEffect(() => {
		getProfile();
	}, [user, getProfile]);

	async function updateProfile({ username, website, avatar_url }) {
		try {
			setLoading(true);

			const { error } = await supabase.from("profiles").upsert({
				id: user?.id,
				full_name: fullname,
				username,
				website,
				avatar_url,
				updated_at: new Date().toISOString(),
			});
			if (error) throw error;
			alert("Profile updated!");
		} catch (error) {
			alert("Error updating the data!");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className=" h-screen w-full flex flex-col justify-center items-start max-w-6xl mx-auto">
			<Card className="w-full">
				<CardHeader>
					<CardTitle>Account Information</CardTitle>
					<CardDescription>
						You Can update your account information here
					</CardDescription>
				</CardHeader>

				<CardContent className="space-y-6  p-6">
					<div className="flex w-full justify-between items-center  space-x-1.5 m-auto">
						<label
							htmlFor="email"
							className="font-semibold leading-none tracking-tight"
						>
							Email
						</label>
						<Input
							id="email"
							type="text"
							value={user?.email}
							className="max-w-2xl"
						/>
					</div>
					<div className="flex w-full justify-between items-center  space-x-1.5 m-auto">
						<label
							htmlFor="fullName"
							className="font-semibold leading-none tracking-tight"
						>
							Full Name
						</label>
						<Input
							id="fullName"
							type="text"
							value={fullname || ""}
							onChange={(e) => setFullname(e.target.value)}
							className="max-w-2xl"
						/>
					</div>
					<div className="flex w-full justify-between items-center  space-x-1.5 m-auto">
						<label
							htmlFor="username"
							className="font-semibold leading-none tracking-tight"
						>
							Username
						</label>
						<Input
							id="username"
							type="text"
							value={username || ""}
							onChange={(e) => setUsername(e.target.value)}
							className="max-w-2xl"
						/>
					</div>
					<div className="flex w-full justify-between items-center  space-x-1.5 m-auto">
						<label
							htmlFor="website"
							className="font-semibold leading-none tracking-tight"
						>
							Website
						</label>
						<Input
							id="website"
							type="url"
							value={website || ""}
							onChange={(e) => setWebsite(e.target.value)}
							className="max-w-2xl"
						/>
					</div>
					<Avatar
						uid={user?.id}
						url={avatar_url}
						size={150}
						onUpload={(url) => {
							setAvatarUrl(url);
							updateProfile({
								fullname,
								username,
								website,
								avatar_url: url,
							});
						}}
					/>

					<div className=" flex space-x-10 gap-2.5 *:w-full w-full max-w-sm ">
						<Button
							className="button primary block"
							onClick={() =>
								updateProfile({
									fullname,
									username,
									website,
									avatar_url,
								})
							}
							disabled={loading}
						>
							{loading ? "Loading ..." : "Update"}
						</Button>
						<form action="/auth/signout" method="post">
							<Button
								type="submit"
								className="w-full"
								variant="destructive"
							>
								Sign out
							</Button>
						</form>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
