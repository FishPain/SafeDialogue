import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { RadioButton } from "react-native-paper"; // Import RadioButton from react-native-paper

const { width } = Dimensions.get("window");
const dynamicPadding = width * 0.05; // 5% of screen width

const RiskProfileScreen = ({ questions }) => {
  // Initialize selectedAnswers with the first choice for each question
  const [selectedAnswers, setSelectedAnswers] = useState(
    questions.map((question) => ({
      id: question.id,
      choice: question.options[0].text,
    }))
  );

  // Function to handle selecting an option for a question
  const handleSelectQuestion = (questionIndex, selectedOption) => {
    // Create a copy of selectedAnswers
    const updatedAnswers = [...selectedAnswers];
    // Update or add the selected option for the question
    updatedAnswers[questionIndex] = {
      id: questions[questionIndex].id,
      choice: selectedOption,
    };
    // Set the updated answers
    setSelectedAnswers(updatedAnswers);
  };

  // Render the questions with radio buttons
  const renderQuestions = () => {
    return questions.map((question, questionIndex) => (
      <View key={question.id} style={styles.questionContainer}>
        <Text style={styles.questionText}>{question.question}</Text>
        {renderOptions(question.options, questionIndex)}
      </View>
    ));
  };

  // Render question options with radio buttons
  const renderOptions = (options, questionIndex) => {
    return options.map((option, index) => (
      <TouchableOpacity
        key={index}
        style={styles.option}
        onPress={() => handleSelectQuestion(questionIndex, option.text)}
      >
        <RadioButton
          value={option.text}
          status={
            selectedAnswers[questionIndex].choice === option.text
              ? "checked"
              : "unchecked"
          }
          onPress={() => handleSelectQuestion(questionIndex, option.text)}
          color="#0000FF"
        />
        <Text>{option.text}</Text>
      </TouchableOpacity>
    ));
  };

  // Submit answers as a JSON array
  const submitAnswers = () => {
    // Convert selectedAnswers to the desired JSON format
    const formattedAnswers = selectedAnswers.map((answer) => ({
      id: answer.id,
      choice: answer.choice,
    }));

    console.log("Formatted Answers:", formattedAnswers);

    // Define the URL where you want to post the data
    const postUrl = "https://example.com/api/submit_answers";

    // Define the request headers
    const headers = {
      "Content-Type": "application/json",
    };

    // Create the fetch request options
    const requestOptions = {
      method: "POST",
      headers,
      body: JSON.stringify(formattedAnswers),
    };

    // Send a POST request with the formatted answers to the server using fetch
    fetch(postUrl, requestOptions)
      .then((response) => {
        // Check if the response status is OK (status code 200)
        if (response.ok) {
          return response.json(); // Parse the JSON response
        } else {
          throw new Error("Failed to post data to the server");
        }
      })
      .then((data) => {
        // Handle the parsed JSON response data
        console.log("Response from server:", data);
      })
      .catch((error) => {
        // Handle errors, if any
        console.error("Error:", error);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Risk Profiling Questionnaire</Text>
      {renderQuestions()}
      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={submitAnswers}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    paddingHorizontal: dynamicPadding,
    paddingVertical: dynamicPadding,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 16,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  submitButton: {
    backgroundColor: "#0000FF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: dynamicPadding * 2,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default RiskProfileScreen;
