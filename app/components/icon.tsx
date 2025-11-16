export interface MyIconProps {
	mdi: string;
	size?: "small" | "medium" | "large";
	className?: string;
}

export function MyIcon({ mdi, size = "medium", className = "" }: MyIconProps) {
	const sizeClasses = {
		small: "text-base",
		medium: "text-xl",
		large: "text-2xl",
	};

	const classes = `mdi mdi-${mdi} ${sizeClasses[size]} ${className}`.trim();

	return <span className={classes} aria-hidden="true" />;
}
