// EvadedObjects.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';

export default function EvadedObjects() {
  // Datos de ejemplo para los gráficos
  const dataObstaculos = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'], // Meses
    datasets: [
      {
        data: [5, 8, 10, 4, 7], // Cantidad de obstáculos evadidos por mes
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Color personalizado para la línea
        strokeWidth: 2, // Ancho de la línea
      },
    ],
  };

  const dataAccidentes = {
    labels: ['Accidentes Evitados', 'Accidentes No Evitados'],
    datasets: [
      {
        data: [30, 5], // Ejemplo de accidentes evitados vs no evitados
      },
    ],
  };

  const pieDataObstaculos = [
    {
      name: 'Piedras',
      number: 15,
      color: '#F44336',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Baches',
      number: 10,
      color: '#4CAF50',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Escombros',
      number: 20,
      color: '#2196F3',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Otros',
      number: 5,
      color: '#FFEB3B',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Estadísticas de Obstáculos Evadidos</Text>

      {/* Gráfico de líneas: Obstáculos evadidos por mes */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Obstáculos Evadidos por Mes</Text>
        <View style={styles.chartWrapper}>
          <LineChart
            data={dataObstaculos}
            width={Dimensions.get('window').width - 60} // Ancho del gráfico
            height={220}
            chartConfig={{
              backgroundColor: '#FFF',
              backgroundGradientFrom: '#673AB7',
              backgroundGradientTo: '#512DA8',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#512DA8',
              },
            }}
            bezier
            style={styles.chart}
          />
        </View>
      </View>

      {/* Gráfico de barras: Accidentes evitados vs no evitados */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Accidentes Evitados</Text>
        <View style={styles.chartWrapper}>
          <BarChart
            data={{
              labels: ['Evitados', 'No Evitados'],
              datasets: [{ data: [30, 5] }],
            }}
            width={Dimensions.get('window').width - 60} // Ancho del gráfico
            height={220}
            chartConfig={{
              backgroundColor: '#F57C00',
              backgroundGradientFrom: '#FB8C00',
              backgroundGradientTo: '#FFA726',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            style={styles.chart}
          />
        </View>
      </View>

      {/* Gráfico de pastel: Tipos de obstáculos evadidos */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Tipos de Obstáculos Evadidos</Text>
        <View style={styles.chartWrapper}>
          <PieChart
            data={pieDataObstaculos}
            width={Dimensions.get('window').width - 60}
            height={220}
            chartConfig={{
              backgroundColor: '#fff',
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="number"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
            style={styles.chart}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F3F4F6',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  chartWrapper: {
    alignItems: 'center',
  },
  chart: {
    marginVertical: 10,
    borderRadius: 16,
  },
  chartContainer: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
});
    