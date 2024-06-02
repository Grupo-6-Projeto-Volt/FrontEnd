export const column_options = {
    plugins: {
        legend: {
            position: 'bottom',
            align: 'start',
            labels:{
                usePointStyle: true,
                padding: 15,
            }
          },
    },
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        display: true
      },
    },
  };
  
  const labels = ['21/05', '22/05', '23/05', '24/05'];
  
  export const column_data = {
    labels,
    datasets: [
      {
        label: 'Cancelado',
        data: [6000,4000,8000,7000],
        backgroundColor: '#F94144',
        stack: 'Stack 0',
        borderWidth: 1,
        barPercentage: 0.5,
        categoryPercentage: 0.25
      },
      {
        label: 'Concluído',
        data: [4000,2000,6000,3000],
        backgroundColor: '#90BE6D',
        stack: 'Stack 1',
        borderWidth: 1,
        barPercentage: 0.5,
        categoryPercentage: 0.25
      },
    ],
  };