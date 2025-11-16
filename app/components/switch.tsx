import type { JSX } from "hono/jsx/jsx-runtime";

export interface MySwitchProps {
	checked?: boolean;
	onChange?: (checked: boolean) => void;
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

export function MySwitch({
	checked,
	onChange,
	prepend,
	append,
}: MySwitchProps) {
	return (
		<label class="inline-flex items-center gap-2 cursor-pointer">
			{prepend}
			<input
				type="checkbox"
				class="sr-only peer"
				checked={checked}
				onChange={(e) => {
					const target = e.currentTarget;
					if (target instanceof HTMLInputElement) {
						onChange?.(target.checked);
					}
				}}
			/>
			<div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
			{append}
		</label>
	);
}
