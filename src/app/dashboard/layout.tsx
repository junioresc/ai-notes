import { DashboardNav } from '@/components/dashboard/DashboardNav'

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div>
			<DashboardNav />
			{children}
		</div>
	)
}
