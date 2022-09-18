import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  // TextInput,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [modalIsVisible, setModalVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  // function visible modal or not
  function startAddGoalHandeler() {
    setModalVisible(true);
  }
  // function end modal
  function endAddGoalHandeler() {
    setModalVisible(false);
  }

  // console.log(enteredGoalText);

  function addGoalHandle(enteredGoalText) {
    // console.log(enteredGoalText);
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    endAddGoalHandeler();
  }
  // delete the items
  function deleteGoalHandeler(id) {
    console.log("delete");
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button
          title="Add new goal"
          color="#a065ec"
          onPress={startAddGoalHandeler}
        />
        <GoalInput
          visible={modalIsVisible}
          onAddGoal={addGoalHandle}
          onCancel={endAddGoalHandeler}
        />
        <View style={styles.goalsContainer}>
          <Text>List of goals...</Text>
          <FlatList
            data={courseGoals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  onDeleteItem={deleteGoalHandeler}
                  id={itemData.item.id}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5,
    color: "#a065ec",
  },
});
