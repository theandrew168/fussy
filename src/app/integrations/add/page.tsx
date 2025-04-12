import Card from "@/ui/Card";
import LinkButton from "@/ui/LinkButton";

export default async function AddIntegration() {
	return (
		<div className="container">
			<section>
				<h1>Add Integration</h1>
			</section>
			<section>
				<h2>Choose an Integration</h2>
				<ul>
					<li>
						<Card>
							<header>
								<h3>GitHub</h3>
							</header>
							<p>Connect to a GitHub account to access commits and pull requests.</p>
							<LinkButton href="/integrations/add/github">Connect to GitHub</LinkButton>
						</Card>
					</li>
					<li>
						<Card>
							<header>
								<h3>Jira</h3>
							</header>
							<p>Connect to a Jira account to access issues.</p>
							<LinkButton href="/integrations/add/jira">Connect to Jira</LinkButton>
						</Card>
					</li>
				</ul>
			</section>
		</div>
	);
}
