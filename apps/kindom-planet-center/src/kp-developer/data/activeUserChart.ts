import { useThemeColors } from '/@dds/composable/useThemeColors'

export function useActiveUserChart() {
  const themeColors = useThemeColors()

  const activeUserOption = shallowRef({
    series: [
      {
        name: 'MAU',
        data: [
          18, 17, 15, 16, 18, 19, 20, 20, 19, 20, 21, 22, 23, 23, 22, 23, 23, 24, 25, 26,
          27, 27,
        ],
      },
      {
        name: 'WAU',
        data: [2, 3, 4, 5, 6, 7, 8, 8, 7, 6, 5, 4, 6, 7, 5, 4, 6, 7, 8, 8, 8, 8],
      },
      {
        name: 'DAU',
        data: [1, 0, 1, 2, 3, 4, 4, 3, 2, 1, 0, 1, 1, 2, 1, 0, 1, 0, 0, 0, 0, 0],
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
    colors: [themeColors.primary, themeColors.blue, themeColors.orange],
    title: {
      text: 'Active User',
      align: 'left',
      style: {
        fontSize: '16px',
        fontWeight: '600',
        color: themeColors.lightText,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 2,
      curve: 'smooth',
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      type: 'datetime',
      categories: [
        '2024-07-27T00:00:00.000Z',
        '2024-07-28T00:00:00.000Z',
        '2024-07-29T00:00:00.000Z',
        '2024-07-30T00:00:00.000Z',
        '2024-07-31T00:00:00.000Z',
        '2024-08-01T00:00:00.000Z',
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
      ],
      labels: {
        style: {
          colors: themeColors.lightText,
          fontSize: '12px',
        },
        format: 'dd MMM',
        rotate: 0,
      },
      axisBorder: {
        color: themeColors.lightText,
        height: 1,
      },
      axisTicks: {
        color: themeColors.lightText,
        height: 6,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: themeColors.lightText,
          fontSize: '12px',
        },
        formatter: (value: number) => value.toString(),
      },
      min: 0,
      max: 30,
      tickAmount: 4,
      forceNiceScale: false,
    },
    tooltip: {
      x: {
        format: 'EEE dd MMM',
      },
      y: {
        formatter: (value: number) => `${value} Users`,
      },
      shared: true,
      intersect: false,
    },
  })

  return {
    activeUserOption,
  }
}
