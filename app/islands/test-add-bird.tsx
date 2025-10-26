import { useState } from "hono/jsx";
import { apiV1Client } from "@/routes/api/router";

export default function TestAddBird() {
	const [latinName, setLatinName] = useState("");
	const [nameJa, setNameJa] = useState("");
	const [nameEn, setNameEn] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");

	const handleClick = async () => {
		setError("");
		setMessage("");
		try {
			const response = await apiV1Client.bird.$post({
				json: {
					latinName,
					nameJa,
					nameEn,
				},
			});

			if (response.status === 400) {
				throw new Error("Bad Request: Invalid ID");
			}
			setMessage(`Added bird successfully.`);
			setTimeout(() => {
				window.location.reload();
			}, 500);
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
			<h2 class="text-lg font-bold mb-2">Add Bird Component</h2>
			<div class="space-y-2">
				<input
					id="latin-name-input"
					type="text"
					value={latinName}
					onInput={(e) =>
						setLatinName((e.currentTarget as HTMLInputElement).value)
					}
					class="border px-2 py-1 w-full"
					placeholder="Latin Name"
				/>
				<input
					id="name-ja-input"
					type="text"
					value={nameJa}
					onInput={(e) =>
						setNameJa((e.currentTarget as HTMLInputElement).value)
					}
					class="border px-2 py-1 w-full"
					placeholder="Japanese Name"
				/>
				<input
					id="name-en-input"
					type="text"
					value={nameEn}
					onInput={(e) =>
						setNameEn((e.currentTarget as HTMLInputElement).value)
					}
					class="border px-2 py-1 w-full"
					placeholder="English Name"
				/>
				<button
					id="add-bird-button"
					type="button"
					onClick={handleClick}
					class="bg-gray-200 px-4 py-1 rounded hover:bg-gray-300 w-full"
				>
					Add Bird
				</button>
			</div>
			{message && (
				<div
					class="mt-4 p-2 bg-green-100 text-green-800 rounded"
					data-testid="success-message"
				>
					<strong>Success:</strong> {message}
				</div>
			)}
			{error && (
				<div
					class="mt-4 p-2 bg-red-100 text-red-800 rounded"
					data-testid="error-message"
				>
					<strong>Error:</strong> {error}
				</div>
			)}
		</div>
	);
}
