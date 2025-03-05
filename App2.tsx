import React, { useEffect } from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
  Switch,
} from 'react-native';
import SampleTurboModule from './specs/NativeSampleModule';
import QtTurboModule from './specs/NativeQtTurboModule';

function App(): React.JSX.Element {
  const [passwordLength, setPasswordLength] = React.useState('12');
  const [useNumbers, setUseNumbers] = React.useState(true);
  const [useSymbols, setUseSymbols] = React.useState(true);
  const [password, setPassword] = React.useState('');
  const [isGenerating, setIsGenerating] = React.useState(false);

  useEffect(() => {
    const start1 = performance.now();
    for (let i = 0; i < 100000; i++) {
      QtTurboModule.multiply(3, 7);
    }
    const end1 = performance.now();
    console.log(`Turbo Modules Qt multiply: ${end1 - start1} ms`);
  }, []);

  useEffect(() => {
    const m = QtTurboModule.getMessage();
    console.log('QtTurboModule.getMessage:', m);
    const start = performance.now();
    for (let i = 0; i < 100000; i++) {
      SampleTurboModule.multiply(3, 7);
    }
    const end = performance.now();
    console.log(`Turbo Modules C++ multiply: ${end - start} ms`);
  }, []);

  const generatePassword = () => {
    setIsGenerating(true);
    try {
      const length = parseInt(passwordLength, 10) || 12;
      // Limitar tamanho para evitar problemas
      const safeLength = Math.min(Math.max(length, 4), 50);
      
      const newPassword = SampleTurboModule.generateSecurityPassword(
        safeLength,
        useNumbers,
        useSymbols
      );
      
      setPassword(newPassword);
    } catch (error) {
      console.error('Erro ao gerar senha:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>
            Turbo Modules C++
          </Text>
          <Text style={styles.subtitle}>
            Gerador de senhas seguras
          </Text>
          
          <Text style={styles.inputLabel}>Tamanho da senha:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Tamanho da senha"
            onChangeText={setPasswordLength}
            value={passwordLength}
            placeholderTextColor="#999"
            keyboardType="numeric"
          />
          
          <View style={styles.optionRow}>
            <Text style={styles.optionLabel}>Incluir números:</Text>
            <Switch
              value={useNumbers}
              onValueChange={setUseNumbers}
              trackColor={{ false: '#d1d1d1', true: '#81b0ff' }}
              thumbColor={useNumbers ? '#4a6da7' : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.optionRow}>
            <Text style={styles.optionLabel}>Incluir símbolos:</Text>
            <Switch
              value={useSymbols}
              onValueChange={setUseSymbols}
              trackColor={{ false: '#d1d1d1', true: '#81b0ff' }}
              thumbColor={useSymbols ? '#4a6da7' : '#f4f3f4'}
            />
          </View>
          
          <TouchableOpacity 
            style={[styles.button, isGenerating && styles.buttonDisabled]} 
            onPress={generatePassword}
            activeOpacity={0.8}
            disabled={isGenerating}
          >
            <Text style={styles.buttonText}>
              {isGenerating ? 'Gerando...' : 'Gerar Senha'}
            </Text>
          </TouchableOpacity>
          
          {password ? (
            <View style={styles.resultContainer}>
              <Text style={styles.resultLabel}>Sua senha segura:</Text>
              <Text style={styles.resultText} selectable={true}>{password}</Text>
              <Text style={styles.securityTip}>
                Toque e segure a senha para copiar
              </Text>
            </View>
          ) : null}
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
    width: '90%',
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
});

export default App;