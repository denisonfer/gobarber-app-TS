import React, { useRef, useCallback } from 'react';
import {
  Image,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logo from '../../assets/logo.png';

import getValidationErrors from '../../util/getValidationErrors';

import { useAuth } from '../../hooks/Auth';

import {
  Container,
  Title,
  ForgotPassword,
  ButtonText,
  CreateAccButton,
  CreateAccButtonText,
} from './styles';

interface SignInFormData {
  email: string;
  senha: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const senhaRef = useRef<TextInput>(null);
  const { navigate } = useNavigation();

  const { sigIn } = useAuth();

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('digite um e-mail válido')
            .required('Campo é obrigatório'),
          senha: Yup.string().required('Campo obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await sigIn({ email: data.email, senha: data.senha });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);

          Alert.alert('Erro ao realizar login!', 'Tente novamente');
        }
      }
    },
    [sigIn],
  );

  return (
    <>
      <KeyboardAvoidingView
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <Image source={logo} />

            <View>
              <Title>Faça seu logon</Title>
            </View>

            <Form
              ref={formRef}
              onSubmit={handleSignIn}
              style={{ width: '100%' }}
            >
              <Input
                name="email"
                icon="mail"
                placeholder="E-mail"
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => senhaRef.current?.focus()}
              />

              <Input
                ref={senhaRef}
                name="senha"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Button onPress={() => formRef.current?.submitForm()}>
                Entrar
              </Button>
            </Form>

            <ForgotPassword>
              <ButtonText>Esqueci minha senha</ButtonText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccButton onPress={() => navigate('SignUp')}>
        <Icon name="log-in" type="feather" size={20} color="#ff9000" />
        <CreateAccButtonText>Criar conta</CreateAccButtonText>
      </CreateAccButton>
    </>
  );
};

export default SignIn;
