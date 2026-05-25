/**
 * PROBLEM-BEISPIEL: Login – Verletzung des Smart/Dumb-Prinzips
 *
 * Diese Komponente vereint GLEICHZEITIG:
 *   - API-Aufruf (POST /auth/login)
 *   - State-Management (email, password, loading, error)
 *   - Vollständige UI-Darstellung (View, TextInput, StyleSheet)
 *
 * Das verstößt gegen das Smart/Dumb-Components-Prinzip (CDD).
 * Eine saubere Lösung würde LoginContainer (Smart) und
 * LoginView (Dumb) in separate Dateien aufteilen.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function Login({ navigation }) {


  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);


  async function handleLoginPress() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://api.bibliothek.at/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const body = await response.json();
        throw new Error(body.message ?? 'Anmeldung fehlgeschlagen.');
      }

      const { token } = await response.json();
      // Token weiterverarbeiten …
      navigation.replace('Home');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }


  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.card}>

        {/* Titel */}
        <Text style={styles.title}>Online-Bibliothek</Text>
        <Text style={styles.subtitle}>Melden Sie sich an</Text>

        {/* Fehlermeldung */}
        {error && <Text style={styles.errorText}>{error}</Text>}

        {/* E-Mail-Eingabe */}
        <Text style={styles.label}>E-Mail-Adresse</Text>
        <TextInput
          style={styles.input}
          placeholder="max.mustermann@mail.at"
          placeholderTextColor="#a0aec0"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          value={email}
          onChangeText={setEmail}
        />

        {/* Passwort-Eingabe */}
        <Text style={styles.label}>Passwort</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          placeholderTextColor="#a0aec0"
          secureTextEntry
          autoComplete="password"
          value={password}
          onChangeText={setPassword}
        />

        {/* Anmelden-Button */}
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLoginPress}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading
            ? <ActivityIndicator color="#ffffff" />
            : <Text style={styles.buttonText}>Anmelden</Text>
          }
        </TouchableOpacity>

        {/* Registrierungshinweis */}
        <Text style={styles.registerHint}>
          Noch kein Konto?{' '}
          <Text style={styles.registerLink}
                onPress={() => navigation.navigate('Register')}>
            Jetzt registrieren
          </Text>
        </Text>

      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a2e',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 24,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 6,
  },
  input: {
    width: '100%',
    height: 46,
    borderWidth: 1.5,
    borderColor: '#cbd5e0',
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: 15,
    color: '#1a1a2e',
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  button: {
    width: '100%',
    height: 48,
    backgroundColor: '#4a6fa5',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 16,
  },
  buttonDisabled: {
    backgroundColor: '#a0aec0',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#c53030',
    fontSize: 13,
    marginBottom: 12,
    textAlign: 'center',
  },
  registerHint: {
    textAlign: 'center',
    fontSize: 13,
    color: '#718096',
  },
  registerLink: {
    color: '#4a6fa5',
    fontWeight: '600',
  },
});
