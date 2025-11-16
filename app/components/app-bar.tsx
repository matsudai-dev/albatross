import type { JSX } from "hono/jsx/jsx-runtime";

export interface MyAppBarProps {
	title: string;
	prepend?:
		| JSX.Element
		| Array<JSX.Element>
		| string
		| Array<JSX.Element | string>;
	append?:
		| JSX.Element
		| Array<JSX.Element>
		| string
		| Array<JSX.Element | string>;
}

export function MyAppBar({ title, prepend, append }: MyAppBarProps) {
	return (
		<>
			<header class="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 shadow-md flex items-center">
				{prepend && <div class="ml-5">{prepend}</div>}
				<h1 class="flex-1 ml-5">{title}</h1>
				{append && <div class="mr-5">{append}</div>}
			</header>
			<div class="h-16" />
		</>
	);
}
