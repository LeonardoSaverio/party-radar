import React, { useCallback, useRef, useState } from 'react'
import { View, ScrollView, KeyboardAvoidingView, Platform, TextInput, Alert } from 'react-native'

import { Feather as Icon } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import getValidationErrors from '../../../utils/getValidationErrors'


import Input from '../../../components/Input'
import InputMask from '../../../components/InputMask'
import Button from '../../../components/Button'

import {
  Container,
  Title,
  BackToHome,
} from './styles'


interface PartyRegistrationFormData {
  whatsapp: string,
  uf: string,
  city: string,
  partyName: string,
  typeParty: string,
  description: string,
}

const SignUp: React.FC = () => {

  const navigation = useNavigation()

  const [whatsappMask, setWhatsappMask] = useState('')

   function handleNavigateToRegisterDateTime(data: PartyRegistrationFormData ) {
    navigation.navigate('PartyRegistrationDateTime', {  partyInfo: data  })
  }

  const handleRegisterData = useCallback(async (data: PartyRegistrationFormData) => {
    try {
      formRef.current?.setErrors({})
      const phoneReg = /^\(\d{2}\) \d{4,5}-\d{4}$/gi
      const schema = Yup.object().shape({
        whatsapp: Yup.string().matches(phoneReg, 'Esse número de telefone não é válido').required('Número de telefone obrigatório'),
        uf: Yup.string().required('UF obrigatória').min(2, 'UF inválida'),
        city: Yup.string().required('Cidade obrigatória'),
        partyName: Yup.string().required('Nome da festa obrigatório'),
        typeParty: Yup.string().required('Tipo da festa festa obrigatório'),
        description: Yup.string().optional(),
      })

      await schema.validate(data, {
        abortEarly: false,
      })
      handleNavigateToRegisterDateTime(data)

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err)

        formRef.current?.setErrors(errors)
        console.log(errors)

        return
      }
      Alert.alert('Erro no cadastro',
        'Ocorreu um erro ao fazer cadastro, tente novamente.')
    }
  }, [])


  const formRef = useRef<FormHandles>(null)

  const ufInputRef = useRef<TextInput>(null)
  const cityInputRef = useRef<TextInput>(null)
  const partyNameInputRef = useRef<TextInput>(null)
  const typePartyInputRef = useRef<TextInput>(null)
  const descriptionInputRef = useRef<TextInput>(null)


  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"

        >

          <Container>
            <BackToHome onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={30} color="#34cb78" />
            </BackToHome>
            <View style={{ marginTop: 20 }}>
              <Title>Cadastrar festa</Title>
            </View>

            <Form ref={formRef} onSubmit={handleRegisterData}>
              <InputMask
                returnKeyType="next"
                type='cel-phone'
                name='whatsapp'
                icon=""
                placeholder='Whatssap'
                keyboardType="numeric"
                options={{
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '(99) '
                }}
                onChangeText={(text: string) => {
                  setWhatsappMask(text)
                }}
                value={whatsappMask}
                onSubmitEditing={() => {
                  formRef.current?.setFieldValue('whatsapp', whatsappMask)
                  ufInputRef.current?.focus()
                }}

              />

              <Input
                ref={ufInputRef}
                maxLength={2}
                returnKeyType="next"
                autoCapitalize="characters"
                name="uf"
                icon=""
                placeholder="UF"
                onSubmitEditing={() => {
                  cityInputRef.current?.focus()
                }}
              />
              <Input
                ref={cityInputRef}
                returnKeyType="next"
                autoCapitalize="sentences"
                name="city"
                icon=""
                placeholder="Cidade"
                onSubmitEditing={() => {
                  partyNameInputRef.current?.focus()
                }}
              />
              <Input
                ref={partyNameInputRef}
                returnKeyType="next"
                autoCapitalize="sentences"
                name="partyName"
                icon=""
                placeholder="Nome da festa"
                onSubmitEditing={() => {
                  typePartyInputRef.current?.focus()
                }}
              />
              <Input
                ref={typePartyInputRef}
                returnKeyType="next"
                autoCapitalize="sentences"
                name="typeParty"
                icon=""
                placeholder="Tipo de festa"
                onSubmitEditing={() => {
                  descriptionInputRef.current?.focus()
                }}
              />

              <Input
                ref={descriptionInputRef}
                maxLength={200}
                returnKeyType="send"
                autoCapitalize="sentences"
                name="description"
                icon=""
                placeholder="Descrição"
                onSubmitEditing={() => {
                  {/* Aqui será redirecionado para o proximo form que será horário depois o local */ }
                  formRef.current?.submitForm()
                }}
              />

            </Form>
            <Button onPress={ () => (
              formRef.current?.submitForm()
              )}>Próximo</Button>
          </Container>

        </ScrollView>
      </KeyboardAvoidingView>
    </>

  )
}

export default SignUp