import React, { useState, useCallback } from 'react';
import { View, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native'

import * as Yup from 'yup'
import getValidationErrors from '../../../utils/getValidationErrors'

import Button from '../../../components/Button'

interface PartyInfo {
  partyInfo: {
    whatsapp: string,
    uf: string,
    city: string,
    partyName: string,
    typeParty: string,
    description: string,
  }
}

interface PartyRegistrationDateTime {
  dateTime: Date,
}

import {
  Container,
  Title,
  BackToHome,
  ButtonDateTime,
  ButtonDateTimeText,
} from './styles'


const PartyRegistrationDateTime = () => {
  const route = useRoute()
  const {partyInfo} = route.params as PartyInfo

  const navigation = useNavigation()

  const [dateTime, setDateTime] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);


  async function navigatoToRegistrationMap() {
    const dateHours = {
      dateTime: dateTime,
    }
    const responseDateTime = await handleValidateHoursAndMinutes(dateHours)

    if (responseDateTime) {
      navigation.navigate('PartyRegistrationMap', { partyInfo, dateTime: responseDateTime?.dateTime.getTime() })
    }

  }

  function formatToHoursAndMinutes(date: Date) {
    const h = date.getHours()
    const m = date.getMinutes()
    const formated = `${(h < 10) ? '0' + h : h}:${(m < 10) ? '0' + m : m}`
    return formated
  }


  function formatDate(date: Date) {
    const d = date.getDate()
    const m = date.getMonth() + 1
    const y = date.getFullYear()
    const formated = `${(d < 10) ? '0' + d : d}/${(m < 10) ? '0' + m : m}/${y}`
    return formated
  }

  const onChange = (event: any, selectedDate: any): any => {
    const currentDate = selectedDate || dateTime;
    setShow(Platform.OS === 'ios');
    setDateTime(currentDate);
  };

  const showMode = (currentMode: string) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const handleValidateHoursAndMinutes = useCallback(async (data: PartyRegistrationDateTime) => {
    try {
      const schema = Yup.object().shape({
        dateTime: Yup.date().required('Data ou hora invalida'),
      })

      await schema.validate(data, {
        abortEarly: false,
      })

      return data

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err)

        console.log(errors)

        return
      }
      Alert.alert('Erro no cadastro',
        'Ocorreu um erro ao fazer cadastro, tente novamente.')
    }
  }, [])

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <Container>
          <View>
            <BackToHome onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={30} color="#34cb78" />
            </BackToHome>

            <Title>Escolha uma data e horário</Title>
          </View>

          <View style={{ width: '100%', marginTop: '30%' }}>

            <ButtonDateTime onPress={showDatepicker}>
              <Icon style={{ marginRight: '3%' }} name="calendar" color="#fff4" size={20} />
              <ButtonDateTimeText>
                {formatDate(dateTime)}
              </ButtonDateTimeText>
            </ButtonDateTime>

            <ButtonDateTime onPress={showTimepicker}>
              <Icon style={{ marginRight: '3%' }} name="clock" color="#fff4" size={20} />
              <ButtonDateTimeText>
                {formatToHoursAndMinutes(dateTime)}
              </ButtonDateTimeText>
            </ButtonDateTime>

          </View>

          <View style={{ width: '100%', marginTop: '60%' }}>
            <Button onPress={navigatoToRegistrationMap}>Próximo</Button>
          </View>


          {show && (
            <DateTimePicker
              locale="pt-BR"
              testID="dateTimePicker"
              value={dateTime}
              mode={mode === 'date' ? 'date' : 'time'}
              is24Hour={true}
              display="default"
              minimumDate={new Date}
              onChange={onChange}
            />
          )}

        </Container>
      </KeyboardAvoidingView>

    </>
  );
};


export default PartyRegistrationDateTime