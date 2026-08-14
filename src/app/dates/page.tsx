import prisma from "@/lib/prisma";
import { ClientDates } from "./ClientDates";



export default async function DatesPage() {
  const specialDates = await prisma.specialDate.findMany({
    where: { isPublished: true },
    orderBy: { date: 'asc' }
  });

  const serializedDates = specialDates.map(d => ({
    ...d,
    date: d.date.toISOString()
  }));

  return <ClientDates specialDates={serializedDates} />;
}
