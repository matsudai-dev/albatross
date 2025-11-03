export interface BirdRow {
	id: number;
	nameJa: string;
	regions: Array<string>;
	habitats: Array<string>;
	migrationTypes: Array<string>;
	startMonth: number | null;
	endMonth: number | null;
}

export interface BirdsTableProps {
	birds: Array<BirdRow>;
}

export default function BirdsTable({ birds }: BirdsTableProps) {
	return (
		<>
			<h1 class="text-2xl font-bold mb-4">野鳥一覧</h1>
			<table>
				<thead>
					<tr>
						<th>和名</th>
						<th>生息域</th>
						<th>生息環境</th>
						<th>渡り区分</th>
						<th>到着月</th>
						<th>出発月</th>
					</tr>
				</thead>
				<tbody>
					{birds.map((row) => (
						<tr key={String(row.id)} data-testid="bird-row">
							<td>{row.nameJa}</td>
							<td>{row.regions.join(",")}</td>
							<td>{row.habitats.join(",")}</td>
							<td>{row.migrationTypes.join(",")}</td>
							<td>{row.startMonth}</td>
							<td>{row.endMonth}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
