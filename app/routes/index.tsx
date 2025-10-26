import { getDbClient } from "@db/client";
import { birdsTable } from "@db/schemas";
import { createRoute } from "honox/factory";
import TestAddBird from "@/islands/test-add-bird";
import TestMessage from "@/islands/test-message";

export default createRoute(async (c) => {
	const db = getDbClient(c.env.DB);
	const birds = await db
		.select({
			id: birdsTable.id,
			latinName: birdsTable.latinName,
			nameJa: birdsTable.nameJa,
			nameEn: birdsTable.nameEn,
		})
		.from(birdsTable);

	return c.render(
		<div class="py-8 text-center">
			<title>野鳥一覧</title>
			<h1 class="text-2xl font-bold mb-4">野鳥一覧</h1>
			<table className="mx-auto border border-gray-300">
				<thead>
					<tr>
						<th className="border border-gray-300 px-4 py-2">ID</th>
						<th className="border border-gray-300 px-4 py-2">和名</th>
						<th className="border border-gray-300 px-4 py-2">学名</th>
						<th className="border border-gray-300 px-4 py-2">英名</th>
					</tr>
				</thead>
				<tbody>
					{birds.map((bird) => (
						<tr key={String(bird.id)} data-testid="bird-row">
							<td className="border border-gray-300 px-4 py-2">{bird.id}</td>
							<td className="border border-gray-300 px-4 py-2">
								{bird.nameJa}
							</td>
							<td className="border border-gray-300 px-4 py-2">
								{bird.latinName}
							</td>
							<td className="border border-gray-300 px-4 py-2">
								{bird.nameEn}
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<TestMessage />
			<TestAddBird />
		</div>,
	);
});
