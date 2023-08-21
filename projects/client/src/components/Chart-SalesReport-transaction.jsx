import { Bar } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default function ChartSalesReportTransactions(props) {

   // chart awal ===================================================================================
const prepareChartData = () => {
    const dateCountMap = {};
    const dateRevenueMap = {};
  
    props.dtSalesReport.forEach((item) => {
      const date = item.date.split("T")[0];
      if (dateCountMap[date]) {
        dateCountMap[date]++;
        dateRevenueMap[date] += item.total;
      } else {
        dateCountMap[date] = 1;
        dateRevenueMap[date] = item.total;
      }
    });
  
    const dates = Object.keys(dateCountMap);
    const revenues = Object.values(dateRevenueMap);
    const labels = dates.map(date => `${date} (${dateCountMap[date]} transaksi)`);
  
    return {
      labels,
      revenues,
    };
  };
  
  const ChartComponent = () => {
    const chartData = prepareChartData();
    const data = {
      labels: chartData.labels,
      datasets: [
        {
          label: "Pendapatan",
          data: chartData.revenues,
          backgroundColor: "rgb(115,214,115)",
        },
      ],
    };
  
    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };
  
    return (
      <Bar data={data} options={options} />
    );
  };
  
  // chart akhir===================================================================================
    
      

    return (
        <>
        <ChartComponent/>
        </>
    )
}