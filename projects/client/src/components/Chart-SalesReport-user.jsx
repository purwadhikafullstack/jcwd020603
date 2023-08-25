import "../css/indexR.css"
import { Bar, Bubble, Line, PolarArea, Radar } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
import { Flex } from "@chakra-ui/layout";
import { BiArch } from "react-icons/bi";
Chart.register(...registerables);

export default function ChartSalesReportUser(props) {
const windowWidth = window.innerWidth
   // chart awal ===================================================================================
   const prepareChartData = () => {
    const chartData = [];

    props.dtSumQtyUser.forEach((dateItem) => {
      const userCount = dateItem.dataUser.length;
      chartData.push({
        date: dateItem.date,
        userCount: userCount,
        users: dateItem.dataUser.map((user) => ({
          user_name: user.user_name,
          jumlah_transaksi: user.jumlah_transaksi,
        })),
      });
    });

    return chartData;
  };

  const ChartComponent = () => {
    const chartData = prepareChartData();
  
    const labels = chartData.map((item) => item.date);
    const data = chartData.map((item) => item.userCount);
  
    // Menghitung nilai maksimum dari data dengan margin
    const maxValue = Math.max(...data) + 0.5; // Anda bisa menyesuaikan margin sesuai kebutuhan
  
    const chartConfig = {
      labels,
      datasets: [
        {
          label: "Jumlah User (Pembeli)",
          data,
          backgroundColor: "rgba(115, 214, 115)",
          borderColor: "rgb(115, 214, 115)",
          borderWidth: 4,
        },
      ],
    };
  
    const chartOptions = {
      scales: {
        y: {
          beginAtZero: true,
          suggestedMax: maxValue,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const dataIndex = context.dataIndex;
              const usersInfo = chartData[dataIndex].users.map((user) => `${user.user_name} : ${user.jumlah_transaksi} kali transaksi, `);
              return usersInfo.join('\n');
            },
            title: () => null,
          },
        },
      },
    };
  
    return (
      <Flex w={windowWidth <= 500 ? "800px" : null} h={windowWidth <= 500 ? "400px" : null}>
        <Bar data={chartConfig} options={chartOptions} />
      </Flex>
    );
  };

  return (
    <ChartComponent />
  );
}