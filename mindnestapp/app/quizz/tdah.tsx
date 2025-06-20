import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const questions = [
  {
    question: "Qu’est-ce que le TDAH ?",
    options: [
      "Un trouble de la vision",
      "Un trouble de l’attention avec ou sans hyperactivité",
      "Une phobie sociale",
    ],
    answer: 1,
  },
  {
    question: "Le TDAH peut causer :",
    options: [
      "Des troubles d’organisation et d’impulsivité",
      "Des problèmes de sommeil uniquement",
      "Une peur de parler en public",
    ],
    answer: 0,
  },
];

export default function QuizTDAH() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (index: number) => {
    setSelected(index);
    if (index === questions[current].answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
        setSelected(null);
      } else {
        setFinished(true);
      }
    }, 800);
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Quiz - TDAH</Text>

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
          {questions[current].options.map((option, i) => (
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
