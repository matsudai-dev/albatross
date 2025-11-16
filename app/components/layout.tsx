import { PROJECT_NAME } from "@common/consts";
import type { JSX } from "hono/jsx/jsx-runtime";
import { MyAppBar } from "./app-bar";

export interface LayoutProps {
	title?: string;
	showAppBar?: boolean;
	children: JSX.Element | Array<JSX.Element>;
}

export function MyLayout({
	title = PROJECT_NAME,
	showAppBar = true,
	children,
}: LayoutProps) {
	return (
		<>
			<title>{title}</title>
			{showAppBar && <MyAppBar title={title} />}
			<main>{children}</main>
		</>
	);
}
