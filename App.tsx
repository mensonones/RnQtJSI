import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';
import SampleTurboModule from './specs/NativeSampleModule';
import QtTurboModule from './specs/NativeQtTurboModule';

function App(): React.JSX.Element {
   const [qtMultiplyTime, setQtMultiplyTime] = React.useState<number | null>(null);
   const [cppMultiplyTime, setCppMultiplyTime] = React.useState<number | null>(null);
   const [qtMessage, setQtMessage] = React.useState<string>('');

   useEffect(() => {
    const start1 = performance.now();
    for (let i = 0; i < 100000; i++) {
      QtTurboModule.multiply(3, 7);
    }
    const end1 = performance.now();
    const time = end1 - start1;
    console.log(`Turbo Modules Qt multiply: ${time} ms`);
    setQtMultiplyTime(time);
  }, []);

  useEffect(() => {
    const m = QtTurboModule.getMessage();
    setQtMessage(m);
    console.log('QtTurboModule.getMessage:', m);
    
    const start = performance.now();
    for (let i = 0; i < 100000; i++) {
      SampleTurboModule.multiply(3, 7);
    }
    const end = performance.now();
    const time = end - start;
    console.log(`Turbo Modules C++ multiply: ${time} ms`);
    setCppMultiplyTime(time);
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>
            Turbo Modules C++
          </Text>

           <View style={styles.benchmarkContainer}>
            <Text style={styles.benchmarkTitle}>Resultados do Benchmark:</Text>
            <View style={styles.benchmarkRow}>
              <Text style={styles.benchmarkLabel}>Qt multiply (100k chamadas):</Text>
              <Text style={styles.benchmarkValue}>
                {qtMultiplyTime !== null ? `${qtMultiplyTime.toFixed(2)} ms` : 'Carregando...'}
              </Text>
            </View>
            <View style={styles.benchmarkRow}>
              <Text style={styles.benchmarkLabel}>C++ multiply (100k chamadas):</Text>
              <Text style={styles.benchmarkValue}>
                {cppMultiplyTime !== null ? `${cppMultiplyTime.toFixed(2)} ms` : 'Carregando...'}
              </Text>
            </View>

          </View>
          
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    width: '98%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  textInput: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  optionLabel: {
    fontSize: 16,
    color: '#555',
  },
  button: {
    backgroundColor: '#4a6da7',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: '#a0aec0',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    backgroundColor: '#f0f4f8',
    padding: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#4a6da7',
  },
  resultLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  resultText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
    marginBottom: 8,
    paddingVertical: 5,
  },
  securityTip: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
  },
  benchmarkContainer: {
    backgroundColor: '#f0f8ff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#4a6da7',
  },
  benchmarkTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  benchmarkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  benchmarkLabel: {
    fontSize: 14,
    color: '#555',
  },
  benchmarkValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
});

export default App;
