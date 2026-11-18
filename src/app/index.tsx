import {  View, Text, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {

  const [displayText,setDisplayText] = useState("21+22"); 
  const btnArray =[
      ['AC','DEL','%','÷'],
      ['7','8','9','X'],
      ['4','5','6','-'],
      ['1','2','3','+'],
      ['0','.','=']
    ]
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.displayText}>
          {displayText}
        </Text>
      </View>
      <View style={styles.inputSection}>
        {btnArray.map((row,rowIndex)=>(
          <View key={rowIndex} style={styles.row}>
          {row.map((btn) => {
            const isOperator = ['=','+','-','X','÷'].includes(btn);
            const isSpecial = ['AC','DEL','%','.'].includes(btn);
            
            return(
              <Pressable
                style={[
                  styles.btn,
                  isOperator && styles.operator,
                  isSpecial && styles.special,
                  btn==="0" && styles.zero
                ]}
                key={btn}
                // onPress= {()=>{
                //   if(isOperator){
                //     handleOperator(btn);
                //   }
                //   else if(btn === 'AC'){
                //     handleClear();
                //   }
                //   else if(btn === 'DEL'){
                //     handleDelete();
                //   }
                //   else if(btn === '%'){
                //     handlePercent();
                //   }
                //   else if(btn === "."){
                //     handleDecimal();
                //   }
                //   else if(btn == "="){
                //     handleEquals();
                //   }
                //   else{
                //     handleInteger();
                //   }

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
    borderWidth:2,
    borderColor:"white",
    height:"45%",
    display:"flex",
    justifyContent:"flex-end",
    alignItems:"flex-end",
    padding:15
  },
  displayText:{
    color:"white",
    fontSize:60
  },
  row:{
    display: "flex",
    flexDirection: "row",
    justifyContent:"space-around",
    height:"25%"
  },
  btn:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"grey",
    width:"20%",
    margin:5,
    height:"100%",
    borderRadius:15
  },
  btnText:{
    color:"white",
    fontSize:30,
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  },
  operator:{

  },
  special:{

  },
  zero:{
    alignItems:"center",
    color:"green",
    width:"45%",
    borderWidth:1,
    borderColor:"yellow",
  },
  inputSection:{
    height:"50%",
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-between",
    paddingBottom:60
  }
});