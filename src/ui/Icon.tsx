const defaultSize = 24;
const defaultColor = "currentColor";

export type Props = {
	title: string;
	path: string;
	size?: number;
	color?: string;
};

export default function Icon({ title, path, size, color }: Props) {
	const computedSize = size ?? defaultSize;
	const computedColor = color ?? defaultColor;
	return (
		<svg
			width={computedSize}
			height={computedSize}
			fill={computedColor}
			role="img"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>{title}</title>
			<path d={path} />
		</svg>
	);
}
