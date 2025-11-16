import type { JSX } from "hono/jsx/jsx-runtime";

export interface MyChipProps {
	children?:
		| JSX.Element
		| Array<JSX.Element>
		| string
		| Array<JSX.Element | string>;
	variant?: "default" | "outlined" | "filled";
	size?: "small" | "medium" | "large";
}

export function MyChip({
	children,
	variant = "default",
	size = "medium",
}: MyChipProps) {
	// Base classes
	const baseClasses = "inline-flex items-center rounded-full";

	// Variant classes
	const variantClasses = {
		default: "bg-gray-200 text-gray-800",
		outlined: "border border-gray-400 bg-transparent text-gray-800",
		filled: "bg-blue-600 text-white",
	};

	// Size classes
	const sizeClasses = {
		small: "text-xs px-2 py-1",
		medium: "text-sm px-3 py-1",
		large: "text-base px-4 py-1.5",
	};

	const className = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`;

	return <span className={className}>{children}</span>;
}
