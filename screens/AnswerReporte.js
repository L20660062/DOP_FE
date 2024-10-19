import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AnswerReporte() {
  const [reportes, setReportes] = useState([
    { id: '1', titulo: 'Problema en la cámara', respondido: true, respuesta: 'Hemos solucionado el problema de la cámara.' },
    { id: '2', titulo: 'Error de geolocalización', respondido: false, respuesta: '' },
    { id: '3', titulo: 'Aplicación se cierra inesperadamente', respondido: true, respuesta: 'Se solucionó en la versión 1.2.3.' },
    { id: '4', titulo: 'Problema con el modo oscuro', respondido: false, respuesta: '' },
  ]);

  const [estadisticas, setEstadisticas] = useState({
    totalReportes: 0,
    reportesRespondidos: 0,
    reportesPendientes: 0,
  });

  useEffect(() => {
    const total = reportes.length;
    const respondidos = reportes.filter(reporte => reporte.respondido).length;
    const pendientes = total - respondidos;

    setEstadisticas({
      totalReportes: total,
      reportesRespondidos: respondidos,
      reportesPendientes: pendientes,
    });
  }, [reportes]);

  const renderReporte = ({ item }) => (
    <View style={[styles.reporteItem, item.respondido ? styles.reporteRespondido : styles.reportePendiente]}>
      <View style={styles.reporteHeader}>
        <Text style={styles.reporteTitulo}>{item.titulo}</Text>
        <Ionicons
          name={item.respondido ? "checkmark-circle" : "alert-circle"}
          size={24}
          color={item.respondido ? '#4CAF50' : '#FF9800'}
        />
      </View>
      <Text style={styles.reporteEstado}>
        {item.respondido ? 'Respondido' : 'Pendiente de respuesta'}
      </Text>
      {item.respondido && (
        <Text style={styles.reporteRespuesta}>
          {item.respuesta}
        </Text>
      )}
    </View>
  );

  const renderListHeader = () => (
    <View>
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{estadisticas.totalReportes}</Text>
          <Text style={styles.statLabel}>Total Reportes</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{estadisticas.reportesRespondidos}</Text>
          <Text style={styles.statLabel}>Respondidos</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{estadisticas.reportesPendientes}</Text>
          <Text style={styles.statLabel}>Pendientes</Text>
        </View>
      </View>
      <Text style={styles.sectionTitle}>Lista de Reportes</Text>
    </View>
  );

  return (
    <FlatList
      data={reportes}
      renderItem={renderReporte}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.reporteList}
      ListHeaderComponent={renderListHeader}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F3F4F6',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statBox: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  reporteList: {
    paddingBottom: 20,
    paddingHorizontal: 15,  // Añadir margen horizontal
  },
  reporteItem: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  reporteRespondido: {
    borderLeftWidth: 5,
    borderLeftColor: '#4CAF50',
  },
  reportePendiente: {
    borderLeftWidth: 5,
    borderLeftColor: '#FF9800',
  },
  reporteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  reporteTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  reporteEstado: {
    fontSize: 16,
    color: '#666',
  },
  reporteRespuesta: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
    backgroundColor: '#F3F4F6',
    padding: 10,
    borderRadius: 5,
  },
});
