import { useThemeColors } from '/@dds/composable/useThemeColors'

export function useApiChart() {
  const themeColors = useThemeColors()

  const apiOption = shallowRef({
    series: [
      {
        name: '호출',
        data: [
          600, 0, 800, 600, 400, 200, 0, 0, 0, 200, 150, 1000, 600, 0, 0, 0, 50, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ],
      },
    ],
    chart: {
      height: 400,
      type: 'area',
      toolbar: {
        show: false,
      },
      background: 'transparent',
    },
    colors: [themeColors.primary],
    title: {
      text: 'API Usage',
      align: 'left',
      style: {
        fontSize: '16px',
        fontWeight: '600',
        color: themeColors.lightText,
      },
    },
    subtitle: {
      text: '5.5k total',
      align: 'left',
      style: {
        fontSize: '14px',
        color: themeColors.lightText,
        marginTop: '4px',
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [2, 2, 2],
      curve: 'smooth',
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      type: 'datetime',
      categories: [
        '2024-08-02T00:00:00.000Z',
        '2024-08-03T00:00:00.000Z',
        '2024-08-04T00:00:00.000Z',
        '2024-08-05T00:00:00.000Z',
        '2024-08-06T00:00:00.000Z',
        '2024-08-07T00:00:00.000Z',
        '2024-08-08T00:00:00.000Z',
        '2024-08-09T00:00:00.000Z',
        '2024-08-10T00:00:00.000Z',
        '2024-08-11T00:00:00.000Z',
        '2024-08-12T00:00:00.000Z',
        '2024-08-13T00:00:00.000Z',
        '2024-08-14T00:00:00.000Z',
        '2024-08-15T00:00:00.000Z',
        '2024-08-16T00:00:00.000Z',
        '2024-08-17T00:00:00.000Z',
        '2024-08-18T00:00:00.000Z',
        '2024-08-19T00:00:00.000Z',
        '2024-08-20T00:00:00.000Z',
        '2024-08-21T00:00:00.000Z',
        '2024-08-22T00:00:00.000Z',
        '2024-08-23T00:00:00.000Z',
        '2024-08-24T00:00:00.000Z',
        '2024-08-25T00:00:00.000Z',
        '2024-08-26T00:00:00.000Z',
        '2024-08-27T00:00:00.000Z',
        '2024-08-28T00:00:00.000Z',
        '2024-08-29T00:00:00.000Z',
        '2024-08-30T00:00:00.000Z',
        '2024-08-31T00:00:00.000Z',
      ],
      labels: {
        style: {
          colors: themeColors.lightText,
          fontSize: '12px',
        },
        format: 'dd/MM/yy',
      },
      axisBorder: {
        color: '#525252',
        height: 1,
      },
      axisTicks: {
        color: '#525252',
        height: 6,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: themeColors.lightText,
          fontSize: '12px',
        },
        formatter: (value: number) => {
          if (value >= 1000) {
            return `${(value / 1000).toFixed(0)}k`
          }
          return value.toString()
        },
      },
      min: 0,
      max: 1000,
      forceNiceScale: false,
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm',
      },
      y: {
        formatter: (value: number) => `${value} `,
      },
    },
    grid: {
      borderColor: '#525252',
    },
    theme: {
      mode: 'dark',
    },
  })

  return {
    apiOption,
  }
}
