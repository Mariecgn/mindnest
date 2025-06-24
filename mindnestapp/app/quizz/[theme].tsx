import { useLocalSearchParams } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// @ts-ignore
import quizzData from '../../data/quizz.json';

export default function QuizScreen() {
  const { theme } = useLocalSearchParams();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

const questions = quizzData[theme as keyof typeof quizzData];

  const handleAnswer = async (index: number) => {
    setSelected(index);
    if (index === questions[current].answer) {
      setScore(score + 1);
    }

    setTimeout(async () => {
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
        setSelected(null);
      } else {
        setFinished(true);

        // ✅ Incrément progression
        const userId = await SecureStore.getItemAsync('userId');
        if (userId) {
          fetch('http://10.173.148.14:3000/api/progression/quizz', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId }),
          })
            .then(res => res.json())
            .then(data => {
              console.log("✅ Quizz terminés :", data.quizzTermines);
              if (data.quizzTermines % 5 === 0) {
                Alert.alert("🎉 Bravo !", `Tu as terminé ${data.quizzTermines} quizz !`);
              }
            })
            .catch(err => console.error("Erreur progression quiz :", err));
        }
      }
    }, 700);
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  if (!questions) return <Text>❌ Quiz non trouvé</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Quizz - {theme}</Text>

      {finished ? (
        <View style={styles.resultBox}>
          <Text style={styles.result}>Ton score : {score} / {questions.length}</Text>
          <TouchableOpacity onPress={restart} style={styles.button}>
            <Text style={styles.buttonText}>Recommencer</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.question}>{questions[current].question}</Text>
          {questions[current].options.map((option: string, i: number) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.option,
                selected === i && (
                  i === questions[current].answer ? styles.correct : styles.incorrect
                ),
              ]}
              onPress={() => handleAnswer(i)}
              disabled={selected !== null}
            >
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffe0ed',
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#ec6098',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 2,
  },
  question: {
    fontSize: 17,
    marginBottom: 16,
    fontWeight: '600',
  },
  option: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  correct: {
    backgroundColor: '#d0f5c0',
  },
  incorrect: {
    backgroundColor: '#fbcaca',
  },
  resultBox: {
    alignItems: 'center',
  },
  result: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#ec6098',
    padding: 12,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
