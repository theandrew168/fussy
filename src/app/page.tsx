import Link from "next/link";

export default async function Dashboard() {
	const owner = "theandrew168";
	const repo = "fussy";
	const ref = "e4e2dc842022c35f7fe27a45effd1dc2602a23b6";

	const example = `${owner}/${repo}/${ref}`;

	return (
		<div className="container">
			<h1>Dashboard</h1>
			<Link href={example}>Summarize an example commit</Link>
		</div>
	);
}
