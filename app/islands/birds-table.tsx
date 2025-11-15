import {
	MyTable,
	MyTableBody,
	MyTableCell,
	MyTableHead,
	MyTableHeader,
	MyTableRow,
} from "@/components/table";

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
		<MyTable>
			<MyTableHeader>
				<MyTableRow>
					<MyTableHead>和名</MyTableHead>
					<MyTableHead>生息域</MyTableHead>
					<MyTableHead>生息環境</MyTableHead>
					<MyTableHead>渡り区分</MyTableHead>
					<MyTableHead>到着月</MyTableHead>
					<MyTableHead>出発月</MyTableHead>
				</MyTableRow>
			</MyTableHeader>
			<MyTableBody>
				{birds.map((row) => (
					<MyTableRow key={String(row.id)} data-testid="bird-row">
						<MyTableCell>{row.nameJa}</MyTableCell>
						<MyTableCell>{row.regions.join(",")}</MyTableCell>
						<MyTableCell>{row.habitats.join(",")}</MyTableCell>
						<MyTableCell>{row.migrationTypes.join(",")}</MyTableCell>
						<MyTableCell>{row.startMonth ?? "-"}</MyTableCell>
						<MyTableCell>{row.endMonth ?? "-"}</MyTableCell>
					</MyTableRow>
				))}
			</MyTableBody>
		</MyTable>
	);
}
