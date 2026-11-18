import { useState } from 'react';
import { Pressable, StyleSheet, Text, Vibration, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

let decimalAllowed = true;
let takingSecondNum = false;
let storedNum = 0;
const btnArray = [
  ['AC', 'DEL', '%', '÷'],
  ['7', '8', '9', 'X'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', '.', '=']
]

export default function App() {

  const [displayText, setDisplayText] = useState("0");


  function handleOperator(op: string) {
    if (['.', '+', '-', 'X', '÷'].includes(displayText.slice(-1)) || takingSecondNum || displayText==="") {
      return;
    }
    decimalAllowed = true;
    storedNum = parseFloat(displayText);
    setDisplayText((prev) => prev + op);
    takingSecondNum = true;
  }

  function handleClear() {
    storedNum = 0;
    takingSecondNum = false;
    setDisplayText("0");
  }

  function handleDelete() {
    if (['.', '+', '-', 'X', '÷'].includes(displayText.slice(-1)) || displayText==="") {
      storedNum = 0;
      takingSecondNum = false;
    }
    setDisplayText(prev => prev.slice(0, -1));
  }

  function handleDecimal() {
    if (['.', '+', '-', 'X', '÷'].includes(displayText.slice(-1))) {
      return;
    }
    if (decimalAllowed) {

      displayText ? setDisplayText(prev => prev + ".") : setDisplayText("0.");
      decimalAllowed = false;
    }
  }

  function handleInteger(btn: string) {
    // const num = Number(btn);
    setDisplayText(prev => (prev === '0' ? btn : prev + btn));
  }

  function handlePercent() {
    if (['.', '+', '-', 'X', '÷'].includes(displayText.slice(-1)) || displayText==="") {
      return;
    }
    if (takingSecondNum) {
      setDisplayText((prev) => {
        let tempStr = prev.replace(String(storedNum), "");
        let secondNumString = tempStr.slice(1);
        let prevNum = parseFloat(secondNumString);
        return prev.replace(secondNumString, String(prevNum / 100.0));
      })
    }
    else {
      setDisplayText((prev) => {
        let prevNum = parseFloat(prev);
        return String(prevNum / 100.0);
      })
    }
  }
  function handleEquals() {
    if (['.', '+', '-', 'X', '÷'].includes(displayText.slice(-1)) || !takingSecondNum  || displayText==="") {
      return;
    }


    let tempStr = displayText.replace(String(storedNum), "");
    let op = tempStr.slice(0, 1);
    tempStr = tempStr.slice(1);
    let secondNum = parseFloat(tempStr);
    takingSecondNum = false;
    let result;
    switch (op) {
      case '+':
        result = storedNum + secondNum;
        break;
      case '-':
        result = storedNum - secondNum;
        break;
      case 'X':
        result = storedNum * secondNum;
        break;
      case '÷':
        if (secondNum == 0) {
          break;
        }
        result = storedNum / secondNum;
        break;
    }

    setDisplayText(String(result));
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.displayText}>
          {displayText}
        </Text>
      </View>
      <View style={styles.inputSection}>
        {btnArray.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((btn) => {
              const isOperator = ['=', '+', '-', 'X', '÷'].includes(btn);
              const isSpecial = ['AC', 'DEL', '%'].includes(btn);

              return (
                <Pressable
                  style={[
                    styles.btn,
                    isOperator && styles.operator,
                    isSpecial && styles.special,
                    btn === "0" && styles.zero
                  ]}
                  key={btn}
                  onPress={() => {
                    Vibration.vibrate(50);
                    if (btn === "=") {
                      handleEquals();
                    }
                    else if (isOperator) {
                      handleOperator(btn);
                    }
                    else if (btn === 'AC') {
                      handleClear();
                    }
                    else if (btn === 'DEL') {
                      handleDelete();
                    }
                    else if (btn === '%') {
                      handlePercent();
                    }
                    else if (btn === ".") {
                      handleDecimal();
                    }
                    else {
                      handleInteger(btn);
                    }
                  }}

                >

                  <Text style={styles.btnText}>
                    {btn}
                  </Text>
                </Pressable>
              )
            })}
          </View>
        )
        )}

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  display: {
    borderWidth: 2,
    borderColor: "white",
    height: "45%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 15
  },
  displayText: {
    color: "white",
    fontSize: 60
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    height: "25%"
  },
  btn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333333",
    width: "20%",
    // margin: ,
    height: "80%",
    borderRadius: 10
  },
  btnText: {
    color: "white",
    fontSize: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  operator: {
    backgroundColor: "#935d06",
  },
  special: {
    backgroundColor: "#935d06",

  },
  zero: {
    alignItems: "center",
    color: "green",
    width: "45%",
    borderWidth: 1
  },
  inputSection: {
    height: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: 60,
    paddingTop: 20
  }
});