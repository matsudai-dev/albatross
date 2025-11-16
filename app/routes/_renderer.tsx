import { jsxRenderer } from "hono/jsx-renderer";
import { Link, Script } from "honox/server";

const themeScript = `
(function() {
	const theme = localStorage.getItem('theme') || 
		(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
	if (theme === 'dark') {
		document.documentElement.classList.add('dark');
	}
})();
`;

export default jsxRenderer(({ children }) => {
	return (
		<html lang="ja">
			<head>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>albatross</title>
				<link rel="icon" href="/favicon.svg" />
				{/* biome-ignore lint: Safe static script to prevent theme flash */}
				<script dangerouslySetInnerHTML={{ __html: themeScript }} />
				<Link href="/app/style.css" rel="stylesheet" />
				<Script src="/app/client.ts" async />
			</head>
			<body>{children}</body>
		</html>
	);
});
