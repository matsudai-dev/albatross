import { useState } from "hono/jsx";
import { apiV1Client } from "@/routes/api/router";

export default function TestMessage() {
	const [id, setId] = useState("1");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");

	const handleClick = async () => {
		setError("");
		setMessage("");
		try {
			const response = await apiV1Client.$get({ query: { id } });

			if (response.status === 400) {
				throw new Error("Bad Request: Invalid ID");
			}

			const data = await response.json();
			setMessage(`successfully fetched id: ${data.id}`);
		} catch (e) {
			if (e instanceof Error) {
				setError(e.message);
			} else {
				setError("An unknown error occurred.");
			}
		}
	};

	return (
		<div class="border p-4 my-4 mx-auto max-w-md">
			<h2 class="text-lg font-bold mb-2">API Test Component</h2>
			<div class="flex items-center space-x-2">
				<input
					type="number"
					value={id}
					onInput={(e) => setId((e.currentTarget as HTMLInputElement).value)}
					class="border px-2 py-1 w-20"
					placeholder="ID"
				/>
				<button
					type="button"
					onClick={handleClick}
					class="bg-gray-200 px-4 py-1 rounded hover:bg-gray-300"
				>
					Fetch Message
				</button>
			</div>
			{message && (
				<div class="mt-4 p-2 bg-green-100 text-green-800 rounded">
					<strong>Success:</strong> {message}
				</div>
			)}
			{error && (
				<div class="mt-4 p-2 bg-red-100 text-red-800 rounded">
					<strong>Error:</strong> {error}
				</div>
			)}
		</div>
	);
}
