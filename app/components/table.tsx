import type { JSX } from "hono/jsx/jsx-runtime";

export function MyTable({
	children,
}: {
	children?: JSX.Element | Array<JSX.Element>;
}) {
	return <table className="w-full caption-bottom text-sm">{children}</table>;
}

export function MyTableHeader({
	children,
}: {
	children?: JSX.Element | Array<JSX.Element>;
}) {
	return <thead>{children}</thead>;
}

export function MyTableBody({
	children,
}: {
	children?: JSX.Element | Array<JSX.Element>;
}) {
	return <tbody className="[&_tr:last-child]:border-0">{children}</tbody>;
}

export function MyTableRow({
	children,
	...props
}: {
	children?: JSX.Element | Array<JSX.Element>;
	[key: string]: unknown;
}) {
	return (
		<tr className="border-b transition-colors hover:bg-gray-100" {...props}>
			{children}
		</tr>
	);
}

export function MyTableHead({
	children,
}: {
	children?: JSX.Element | Array<JSX.Element> | string;
}) {
	return (
		<th className="h-12 px-4 text-left text-gray-900 [&:has([role=checkbox])]:pr-0">
			{children}
		</th>
	);
}

export function MyTableCell({
	children,
}: {
	children?: JSX.Element | Array<JSX.Element> | string | number;
}) {
	return <td className="p-4 [&:has([role=checkbox])]:pr-0">{children}</td>;
}
