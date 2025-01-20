// faild system route, enrutamiento basado en sistema de archivos

import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";
import { fetchLatestInvoices, fetchRevenue, fetchCardData } from "../lib/data"
import { lusitana } from "../ui/fonts";
import { CardSkeleton, LatestInvoicesSkeleton, RevenueChartSkeleton } from "../ui/skeletons";
import RevenueChart from "../ui/dashboard/revenue-chart";
import LatestInvoices from "../ui/dashboard/latest-invoices";
import { Card } from "../ui/dashboard/cards";
import { Suspense } from "react";
import { DivideIcon } from "@heroicons/react/24/outline";

// solo se renderiza en el servidor, es decir tengo toda la info en el servidor pero todavia no en el cliente
// 
export default async function Dashboard() {

    const {  
        numberOfInvoices,
        numberOfCustomers,
        totalPaidInvoices,
        totalPendingInvoices,
      } = await fetchCardData();

// cuando tengamos la informacion mostramos todo el html

// streaming utilizando suspend
    return (
        <main>
        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          Dashboard
        </h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card title="Collected" value={totalPaidInvoices} type="collected" />
          <Card title="Pending" value={totalPendingInvoices} type="pending" />
          <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
          <Card
            title="Total Customers"
            value={numberOfCustomers}
            type="customers"
          />
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
          {/* suspense lo que esta envolviendo va a ser asincrono y lo vamos a esperar, con esto hacemos fetching de datos en paralelo */}
          <Suspense fallback={<RevenueChartSkeleton/>}>
            <RevenueChart/>
          </Suspense>
          <Suspense fallback={<LatestInvoicesSkeleton/>}>
            <LatestInvoices/>
          </Suspense>
        </div>
      </main>
    )
}