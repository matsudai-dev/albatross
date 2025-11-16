import { useEffect, useState } from "hono/jsx";
import { MyIcon } from "@/components/icon";
import { MySwitch } from "@/components/switch";

export default function ThemeToggle() {
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		// Get initial theme from localStorage or browser preference
		const stored = localStorage.getItem("theme");
		const prefersDark = window.matchMedia(
			"(prefers-color-scheme: dark)",
		).matches;
		const initialDark = stored === "dark" || (!stored && prefersDark);

		setIsDark(initialDark);
		document.documentElement.classList.toggle("dark", initialDark);
	}, []);

	const handleToggle = (checked: boolean) => {
		setIsDark(checked);
		document.documentElement.classList.toggle("dark", checked);
		localStorage.setItem("theme", checked ? "dark" : "light");
	};

	return (
		<>
			<span>{isDark}</span>
			<MySwitch
				checked={isDark}
				onChange={handleToggle}
				prepend={<MyIcon mdi="weather-sunny" size="small" />}
				append={<MyIcon mdi="weather-night" size="small" />}
			/>
		</>
	);
}
